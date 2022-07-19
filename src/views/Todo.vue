<template>
  <div class="home pa-5">
    <add-todo @new-task="addTask" @show-alert="showAlertMessageDialog" />
    <v-list flat three-line>
      <div v-for="task in tasks" :key="task.id">
        <base-todo
          :task-item="task"
          @complete-taskitem="completeTask"
          @delete-taskitem="deleteTask"
        />
        <v-divider></v-divider>
      </div>
    </v-list>
    <alert-dialog
      :message="alertMessage"
      v-if="showAlertMessage"
      @close-alert="closeAlertMessageBox"
    />
  </div>
</template>

<script>
import AddTodo from "../components/AddTodo.vue";
import AlertDialog from "../components/AlertDialog.vue";
import BaseTodo from "../components/BaseTodo.vue";
export default {
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
          done: false,
        },
        {
          id: 2,
          title: "Get groceries",
          subTitle: "Grocery for evening party",
          done: false,
        },
        {
          id: 3,
          title: "Get wine",
          subTitle: "Wine for party",
          done: false,
        },
      ],
    };
  },
  methods: {
    addTask(newTask) {
      //console.log("addTask", newTask);
      this.tasks.push(newTask);
    },
    completeTask(id) {
      //console.log("task completed: ", id);
      const task = this.tasks.find((t) => t.id === id);
      task.done = !task.done;
    },
    deleteTask(id) {
      //console.log("task deleted: ", id);
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
    showAlertMessageDialog(msg) {
      this.alertMessage = msg;
      this.showAlertMessage = true;
    },
    closeAlertMessageBox() {
      this.showAlertMessage = false;
    },
  },
};
</script>
