<template>
  <v-list-item
    @click="completeTaskItem"
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
          <v-row
            justify="end"
            class="mr-10 pb-5 font-weight-light text-body-2"
            v-if="isDueDateSet"
          >
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
          @show-loading-spinner="showLoadingSpinner"
          @fail-update="emitFailUpdate"
          :currentTask="taskItem"
          v-if="!taskItem.done"
        />
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script>
import OptionsMenu from "./OptionsMenu.vue";
export default {
  emit: ["delete-taskitem","update-task-item","update-due-date","loading-spinner","fail-update"],
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
    showLoadingSpinner(val) {
      this.$emit("loading-spinner", val);
    },
    emitFailUpdate() {
      this.$emit("fail-update");
    },
    async completeTaskItem() {
      this.$emit("loading-spinner", true);
      try {
        await this.$store.dispatch("completeCurrentTask", {
        id: this.taskItem.id,
        firebaseId: this.taskItem.firebaseId,
        done: !this.taskItem.done,
      });
      } catch (error) {
        this.$emit("fail-update");
      }
      this.$emit("loading-spinner", false);
    },
    async deleteTaskItem(id) {
      this.$emit("loading-spinner", true);
      try {
        await this.$store.dispatch("deleteCurrentTask", {
        id: id,
        firebaseId: this.taskItem.firebaseId,
      });
      this.$emit("delete-taskitem", id);
      } catch (err) {
        this.$emit("fail-update",1);
      }
      
    },
    updateCurrentTask(updatedTask) {
      this.$emit("update-task-item");
    },
    async updateDueDateForCurrentTask(dueDate) {
      this.$emit("loading-spinner", true);
      try {
        await this.$store.dispatch("updateDueDate", {
        newDueDate: dueDate,
        id: this.taskItem.id,
        firebaseId: this.taskItem.firebaseId,
      });
      this.$emit("update-due-date");
      } catch (error) {
        this.$emit("fail-update");
      }
    },
  },
};
</script>
