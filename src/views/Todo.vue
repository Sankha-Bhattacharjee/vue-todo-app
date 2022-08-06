<template>
  <div class="home pa-5">
    <add-todo @new-task="addTask" @show-alert="showAlertForAddingTask" />
    <v-list flat three-line>
      <div v-for="task in updatedTaskList" :key="task.id">
        <base-todo
          :task-item="task"
          @complete-taskitem="completeTask"
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
      tasks: [
        {
          id: 1,
          title: "Wake up",
          subTitle: "wake up at 7 AM",
          dueDate: null,
          done: false,
        },
        {
          id: 2,
          title: "Get groceries",
          subTitle: "Grocery for evening party",
          dueDate: null,
          done: false,
        },
        {
          id: 3,
          title: "Get wine",
          subTitle: "Wine for party",
          dueDate: null,
          done: false,
        },
      ],
      updatedTaskList: null,
    };
  },
  watch: {
    searchTodo(newVal, oldVal) {
      //console.log("new ",newVal,"old", oldVal);
      this.filterTodos(newVal);
    },
  },
  created(){
    this.updatedTaskList = this.tasks;
  },
  methods: {
    filterTodos(val) {
      const searchedKey = val.toLowerCase();
      const filteredTodo = this.tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(searchedKey) ||
          t.subTitle.toLowerCase().includes(searchedKey)
      );
      this.updatedTaskList = filteredTodo;
    },
    addTask(newTask) {
      //console.log("addTask", newTask);
      this.tasks.push(newTask);
      this.updatedTaskList = this.tasks;
    },
    completeTask(id) {
      //console.log("task completed: ", id);
      const task = this.tasks.find((t) => t.id === id);
      task.done = !task.done;
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
      this.tasks = this.tasks.filter((t) => t.id !== id);
      const deleteMessage = "The item has been deleted.";
      this.showAlertMessageDialog(deleteMessage);
    },
    showAlertForAddingTask(msg) {
      this.showAlertMessageDialog(msg);
    },
    showAlertMessageDialog(msg) {
      this.alertMessage = msg;
      this.showAlertMessage = true;
    },
    closeAlertDialog() {
      this.showAlertMessage = false;
    },
  },
};
</script>
