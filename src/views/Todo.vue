<template>
<div>
<base-loader v-if="isLoading" />
  <div class="home pa-5">
    <v-card class="middleImageCard" v-if="!isUserLoggedIn">
      <v-img
        max-height="350"
        max-width="350"
        src="../assets/background.jpg"
        loading="lazy"
      ></v-img>
      <v-card-title class="middleImageText title"
        ><router-link to="/auth" class="mr-1 mobview">LogIn</router-link> /
        <router-link to="/auth" class="mr-1 ml-1">SignUp</router-link>
        to add new items</v-card-title
      >
    </v-card>
    <div v-else>
      <div>
          <add-todo @show-alert="showAlertForAddingTask" @toggle-loader="toggleLoaderSpinner"/>
          <filter-todo id="todo-filter" />
        <v-list flat three-line>
          <div v-for="task in taskList" :key="task.id">
            <base-todo
              :task-item="task"
              @update-task-item="updateTask"
              @update-due-date="updateDueDate"
              @delete-taskitem="deleteTask"
              @loading-spinner="toggleLoaderSpinner"
              @fail-update="showFailUpdateMessage"
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
</div>
</template>

<script>
import AddTodo from "../components/AddTodo.vue";
import AlertDialog from "../components/AlertDialog.vue";
import BaseTodo from "../components/BaseTodo.vue";
import FilterTodo from "../components/FilterTodo.vue"
export default {
  props: ["searchTodo"],
  components: {
    AddTodo,
    AlertDialog,
    BaseTodo,
    FilterTodo
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
      this.filterTodos(newVal);
    },
    filterBy(val){
        if(!val){
          val = "All";
        }
        console.log(val);
      this.filterByTodos(val);
    }
  },
  // created() {
  //   // console.log(this.updatedTaskList, this.tasks)
  //   // this.updatedTaskList = this.tasks
  // },
  computed: {
    taskList() {
      return this.$store.getters.getTaskList;
    },
    isUserLoggedIn() {
      return this.$store.getters.getIsAuthenticated;
    },
    filterBy(){
      return this.$route.query.filterBy;
    },
  },
  methods: {
    toggleLoaderSpinner(val){
      this.isLoading = val;
    },
    async filterTodos(val) {
      this.isLoading = true;
      try {
        const searchedKey = val.toLowerCase();
        await this.$store.dispatch("filterTaskList", searchedKey);
      } catch (err) {
        this.showAlertMessageDialog(err.message);
      }
      
      this.isLoading = false;
    },
    async filterByTodos(val){
      this.isLoading = true;
      try {
        await this.$store.dispatch("filterByTaskList", val);
      } catch (err) {
        this.showAlertMessageDialog(err.message);
      }
      
      this.isLoading = false;
    },
    updateTask() {
      this.isLoading = false;
      const updateTaskMessage = "The task item has been updated.";
      this.showAlertMessageDialog(updateTaskMessage);
    },
    updateDueDate() {
      this.isLoading = false;
      const dueDateMessage = "Due date has been updated";
      this.showAlertMessageDialog(dueDateMessage);
    },
    async deleteTask(payload) {
      this.isLoading = true;
      try{
        await this.$store.dispatch("deleteCurrentTask", payload);
        const deleteMessage = "The item has been deleted.";
        this.showAlertMessageDialog(deleteMessage);
      }catch{
        this.isLoading = false;
        this.showFailUpdateMessage(1);
      }finally{
        this.isLoading = false;
      } 
      
    },
    showAlertForAddingTask(msg) {
      this.showAlertMessageDialog(msg);
      this.isLoading = false;
    },
    showFailUpdateMessage(type=0){
      this.isLoading = false;
      let failedUpdateMessage=""
      if(type===0){
        failedUpdateMessage = "Failed to update, try again later!";
      }else if(type===1){
        failedUpdateMessage = "Failed to delete, try again later!";
      }
      this.showAlertMessageDialog(failedUpdateMessage);
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
@media only screen and (max-width: 480px){
  .middleImageText{
    margin-left: 40px;
  }
 .mobview{
   margin-left: 8px;
 }
}
#todo-filter{
    margin-top: -58px;
}
</style>