<template>
  <v-menu bottom left v-model="menu">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon color="primary lighten-1">mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <!-- <v-list-item v-for="(option, i) in options" :key="i">
        <v-icon class="pr-2">{{ option.icon }}</v-icon>
        <v-list-item-title @click="toggleDialog">{{ option.title }}</v-list-item-title>
      </v-list-item> -->
      <v-list-item>
        <edit-todo
          @edited-task="editTask"
          @close-menu="closeMenu"
          @enable-loading="enableLoading"
          :currentTaskItem="currentTask"
        />
      </v-list-item>
      <v-list-item>
        <delete-todo
          @delete-task="deleteCurrentTaskItem"
          @close-menu="closeMenu"
          :currentTaskItemId="currentTask.id"
        />
      </v-list-item>
      <v-list-item>
        <due-date @due-date="updateDueDate" @close-menu="closeMenu"/>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import EditTodo from "./EditTodo.vue";
import DeleteTodo from "./DeleteTodo.vue";
import DueDate from "./DueDate.vue";
export default {
  emit: ["update-task", "delete-current-task","update-date","show-loading-spinner"],
  props: ["currentTask"],
  components: {
    EditTodo,
    DeleteTodo,
    DueDate,
  },
  data() {
    return {
      menu: "",
      options: [
        { title: "Edit Task", icon: "mdi-pencil" },
        { title: "Due Date", icon: "mdi-calendar" },
        { title: "Delete", icon: "mdi-delete" },
      ],
    };
  },
  methods: {
    enableLoading(val){
      this.$emit("show-loading-spinner",val);
    },
    editTask(task) {
      //console.log("editTask", task);
      this.$emit("update-task", task);
    },
    closeMenu() {
      this.menu = false;
    },
    deleteCurrentTaskItem(id) {
      this.$emit("delete-current-task", id);
    },
    updateDueDate(dueDate){
      this.$emit("update-date", dueDate);
    }
  },
};
</script>
