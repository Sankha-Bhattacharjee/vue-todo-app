<template>
  <v-list-item
    @click="completeTaskItem(taskItem.id)"
    :class="{ 'blue lighten-4': taskItem.done }"
  >
    <template v-slot:default>
      <v-list-item-action>
        <v-checkbox :input-value="taskItem.done"></v-checkbox>
      </v-list-item-action>

      <v-list-item-content
        :class="{ 'text-decoration-line-through': taskItem.done }"
      >
        <v-list-item-title>{{ taskItem.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ taskItem.subTitle }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <options-menu />
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script>
import OptionsMenu from './OptionsMenu.vue';
export default {
  emit: ["complete-taskitem", "delete-taskitem"],
  props: ["taskItem"],
  components:{
      OptionsMenu
  },
  methods: {
    completeTaskItem(id) {
      this.$emit("complete-taskitem", id);
    },
    deleteTaskItem(id) {
      //this.tasks = this.tasks.filter((t) => t.id !== id);
      this.$emit("delete-taskitem", id);
    },
  },
};
</script>
