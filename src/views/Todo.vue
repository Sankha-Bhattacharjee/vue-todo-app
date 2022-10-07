<template>
  <div class="home pa-5">
    <v-card class="middleImageCard" v-if="!isUserLoggedIn">
      <v-img
        max-height="350"
        max-width="350"
        src="../assets/background.jpg"
      ></v-img>
      <v-card-title class="middleImageText title"
        ><router-link to="/auth" class="mr-1">LogIn</router-link> /
        <router-link to="/auth" class="mr-1 ml-1">SignUp</router-link>to add new
        items</v-card-title
      >
    </v-card>
    <div v-else>
      <base-loader v-if="isLoadingSpinner" />
      <div v-else>
        <add-todo @show-alert="showAlertForAddingTask" @toggle-loader="toggleLoaderSpinner"/>
        <v-list flat three-line>
          <div v-for="task in taskList" :key="task.id">
            <base-todo
              :task-item="task"
              @update-task-item="updateTask"
              @update-due-date="updateDueDate"
              @delete-taskitem="deleteTask"
            />
            <v-divider></v-divider>
          </div>
        </v-list>
        <alert-dialog
          :message="alertMessage"
          :showAlert="showAlertMessage"
          @close-alert="closeAlertDialog"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AddTodo from "../components/AddTodo.vue";
import AlertDialog from "../components/AlertDialog.vue";
import BaseTodo from "../components/BaseTodo.vue";
export default {
  props: ["searchTodo"],
  components: {
    AddTodo,
    AlertDialog,
    BaseTodo,
  },
  data() {
    return {
      alertMessage: "",
      showAlertMessage: false,
      isLoading: false
    };
  },
  watch: {
    searchTodo(newVal, oldVal) {
      //console.log("new ",newVal,"old", oldVal);
      this.filterTodos(newVal);
    },
  },
  created() {
    this.updatedTaskList = this.tasks;
  },
  computed: {
    taskList() {
      return this.$store.getters.getTaskList;
    },
    isUserLoggedIn() {
      return this.$store.getters.getIsAuthenticated;
    },
    isLoadingSpinner(){
      //console.log(this.isLoading)
      return this.isLoading;
    }
  },
  methods: {
    toggleLoaderSpinner(val){
      this.isLoading = val;
      //console.log("loading method", this.isLoading)
    },
    filterTodos(val) {
      const searchedKey = val.toLowerCase();
      this.$store.dispatch("filterTaskList", searchedKey);
    },
    updateTask() {
      const updateTaskMessage = "The task item has been updated.";
      this.showAlertMessageDialog(updateTaskMessage);
    },
    updateDueDate() {
      const dueDateMessage = "Due date has been updated";
      this.showAlertMessageDialog(dueDateMessage);
    },
    deleteTask(id) {
      //console.log("task deleted: ", id);
      this.$store.dispatch("deleteCurrentTask", id);
      const deleteMessage = "The item has been deleted.";
      this.showAlertMessageDialog(deleteMessage);
    },
    showAlertForAddingTask(msg) {
      this.showAlertMessageDialog(msg);
      this.isLoading = false;
    },
    showAlertMessageDialog(msg) {
      this.showAlertMessage = false;
      this.alertMessage = msg;
      this.showAlertMessage = true;
    },
    closeAlertDialog() {
      this.showAlertMessage = false;
    },
  },
};
</script>

<style scoped>
.middleImageCard {
  /* display: flex;
  align-items: center;
  justify-content: center; */
  margin: 0 auto;
  width: 350px;
  box-shadow: none !important;
}
.middleImageText {
  color: #1976d2 !important;
}
</style>