<template>
  <div>
    <v-btn class="ma-2" outlined color="primary" @click="toggleAddTaskForm" v-if="isUserAuthenticated">
      {{ showAddFormButtonText }}
    </v-btn>
    <div v-if="showAddForm">
      <v-text-field
        v-model="newTaskTitle"
        @keyup="checkInput"
        label="Add Title *"
        clearable
        required
      ></v-text-field>
      <v-text-field
        v-model="newTaskSubTitle"
        @keyup="checkInput"
        label="Add Description *"
        clearable
        required
      ></v-text-field>

      <v-btn
        class="mr-4"
        type="submit"
        :disabled="invalid"
        color="primary"
        @click="submitTask"
      >
        submit
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  emits:["toggle-loader", "show-alert"],
  data() {
    return {
      showAddForm: false,
      invalid: true,
      newTaskTitle: "",
      newTaskSubTitle: "",
    };
  },
  computed: {
    showAddFormButtonText() {
      return this.showAddForm ? "Close" : "Add Todo";
    },
    isUserAuthenticated(){
      return this.$store.getters.getIsAuthenticated;
    }
  },
  methods: {
    toggleAddTaskForm() {
      this.showAddForm = !this.showAddForm;
    },
    checkInput() {
      if (this.newTaskTitle && this.newTaskSubTitle) {
        this.invalid = false;
      } else {
        this.invalid = true;
      }
    },
    async submitTask() {
      const isuserLoggedIn = this.$store.getters.getIsAuthenticated;
      let message = "";
      if (!this.newTaskTitle || !this.newTaskSubTitle) {
        message = "This is a mandatory field";
      } else if(isuserLoggedIn) {
        this.$emit("toggle-loader",true);
        try {
          this.showAddForm = false;
        const newTask = {
          id: Date.now().toString(),
          title: this.newTaskTitle,
          subTitle: this.newTaskSubTitle,
          dueDate: null,
          done: false,
        };
        await this.$store.dispatch("addNewTaskToTaskList", newTask);
        this.newTaskTitle = "";
        this.newTaskSubTitle = "";
        this.showAlert = true;
        message = "New Task has been added";
        } catch (err) {
          message = err.message;
        }
      }else{
        this.$router.replace("/auth");
      }
      this.$emit("show-alert", message);
    },
  },
};
</script>

