<template>
  <div class="home pa-5">
    <add-todo  @show-alert="showAlertForAddingTask" />
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
      if(this.searchTodo !==""){
        return this.$store.getters["getsearchedTaskList"];
      }
      return this.$store.getters["getTaskList"];
    },
  },
  methods: {
    filterTodos(val) {
      console.log(this.$store.getters["getTaskList"],val);
      const searchedKey = val.toLowerCase();
      const filteredTodo = this.$store.getters["getTaskList"].filter(
        (t) =>
          t.title.toLowerCase().includes(searchedKey) ||
          t.subTitle.toLowerCase().includes(searchedKey)
      );
      console.log(filteredTodo);
      this.$store.dispatch("updateTaskList",filteredTodo);
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
      this.$store.dispatch("deleteCurrentTask",id);
      const deleteMessage = "The item has been deleted.";
      this.showAlertMessageDialog(deleteMessage);
    },
    showAlertForAddingTask(msg) {
      this.showAlertMessageDialog(msg);
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
