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
          :currentTaskItem="currentTask"
        />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import EditTodo from "./EditTodo.vue";
export default {
  emit: ["update-task"],
  props: ["currentTask"],
  components: {
    EditTodo,
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
    editTask(task) {
      console.log("editTask", task);
      this.$emit("update-task", task);
    },
    closeMenu() {
      this.menu = false;
    },
  },
};
</script>
