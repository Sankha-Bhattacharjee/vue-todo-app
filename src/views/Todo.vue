<template>
  <div class="home pa-5">
    <add-todo @new-task="addTask" @show-alert="showAlertMessageDialog" />
    <v-list flat three-line>
      <div v-for="task in tasks" :key="task.id">
        <v-list-item
          @click="completeTask(task.id)"
          :class="{ 'blue lighten-4': task.done }"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content
              :class="{ 'text-decoration-line-through': task.done }"
            >
              <v-list-item-title>{{ task.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ task.subTitle }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click.stop="deleteTask(task.id)">
                <v-icon color="primary lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
    <alert-dialog :message="alertMessage" v-if="showAlertMessage" @close-alert="closeAlertMessageBox"/>
  </div>
</template>

<script>
import AddTodo from "../components/AddTodo.vue";
import AlertDialog from "../components/AlertDialog.vue";
export default {
  components: {
    AddTodo,
    AlertDialog,
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
      //console.log("id: ", id);
      const task = this.tasks.find((t) => t.id === id);
      task.done = !task.done;
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
    showAlertMessageDialog(msg) {
      this.alertMessage = msg;
      this.showAlertMessage = true;
    },
    closeAlertMessageBox(){
      this.showAlertMessage = false;
    }
  },
};
</script>
