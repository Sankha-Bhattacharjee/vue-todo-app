<template>
  <div>
    <v-btn class="ma-2" outlined color="primary" @click="toggleAddTaskForm">
      {{ showAddFormButtonText }}
    </v-btn>
    <div v-if="showAddForm">
      <v-text-field
        v-model="newTaskTitle"
        @blur="checkInput"
        label="Add Title *"
        clearable
        required
      ></v-text-field>
      <v-text-field
        v-model="newTaskSubTitle"
        label="Add Description"
        clearable
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
  },
  methods: {
    toggleAddTaskForm() {
      this.showAddForm = !this.showAddForm;
    },
    checkInput() {
      if (this.newTaskTitle) {
        this.invalid = false;
      } else {
        this.invalid = true;
      }
    },
    submitTask() {
      let message = "";
      if (!this.newTaskTitle) {
        message = "Title is a mandatory field";
      } else {
        const newTask = {
          id: Date.now().toString(),
          title: this.newTaskTitle,
          subTitle: this.newTaskSubTitle,
          dueDate: null,
          done: false,
        };
        this.$store.dispatch("addNewTaskToTaskList", newTask);
        this.newTaskTitle = "";
        this.newTaskSubTitle = "";
        this.showAlert = true;
        message = "New Task has been added";
      }
      this.showAddForm = false;
      this.$emit("show-alert", message);

    },
  },
};
</script>

