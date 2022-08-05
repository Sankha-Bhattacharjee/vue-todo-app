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
        <v-list-item-title>{{ taskItem.title }} </v-list-item-title>
        <v-list-item-subtitle>
          {{ taskItem.subTitle }}
          <v-row justify="end" class="mr-10 pb-5" v-if="isDueDateSet">
            <v-icon small>mdi-calendar</v-icon> Due Date:
            {{ calculatedDueDate }}
          </v-row>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <options-menu
          @update-task="updateCurrentTask"
          @delete-current-task="deleteTaskItem"
          @update-date="updateDueDateForCurrentTask"
          :currentTask="taskItem"
        />
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script>
import OptionsMenu from "./OptionsMenu.vue";
export default {
  emit: ["complete-taskitem", "delete-taskitem", "update-task-item","update-due-date"],
  props: ["taskItem"],
  components: {
    OptionsMenu,
  },
  computed: {
    isDueDateSet() {
      return this.taskItem.dueDate ? true : false;
    },
    calculatedDueDate() {
      return this.taskItem.dueDate;
    },
  },
  methods: {
    completeTaskItem(id) {
      this.$emit("complete-taskitem", id);
    },
    deleteTaskItem(id) {
      //this.tasks = this.tasks.filter((t) => t.id !== id);
      this.$emit("delete-taskitem", id);
    },
    updateCurrentTask(updatedTask) {
      //console.log('updatedTask: ', updatedTask);
      this.taskItem.title = updatedTask.newTitle;
      this.taskItem.subTitle = updatedTask.newSubTitle;
      this.$emit("update-task-item");
    },
    updateDueDateForCurrentTask(dueDate) {
      this.taskItem.dueDate = dueDate;
      //console.log(this.taskItem.dueDate);
      this.$emit("update-due-date");
    },
  },
};
</script>
