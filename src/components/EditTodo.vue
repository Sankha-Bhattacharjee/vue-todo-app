<template>
  <v-dialog v-model="editDialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item-title
        color="primary"
        dark
        class="mb-2"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon class="pr-2">mdi-pencil</v-icon> Edit
      </v-list-item-title>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit Task</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="currentTaskItemTitle"
                label="Enter Task Title"
              ></v-text-field
            ></v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="currentTaskItemSubTitle"
                label="Enter Task Subtitle"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
        <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  emit: ["edited-task", "close-menu", "enable-loading","update-fail"],
  props: ["currentTaskItem"],
  data() {
    return {
      loading: false,
      editDialog: false,
      currentTaskItemTitle: "",
      currentTaskItemSubTitle: "",
    };
  },
  watch: {
    editDialog(val) {
      if (!val) {
        //console.log("dialog watch:", val);
        this.$emit("close-menu");
      }
    },
  },
  created() {
    this.fetchCurrentTask();
  },
  methods: {
    fetchCurrentTask() {
      this.currentTaskItemTitle = this.currentTaskItem.title;
      this.currentTaskItemSubTitle = this.currentTaskItem.subTitle;
    },
    close() {
      this.editDialog = false;
      this.fetchCurrentTask();
      this.$emit("close-menu");
    },
    async save() {
      try {
        this.editDialog = false;
        this.$emit("enable-loading", true);
        //console.log("Saved: ", this.task);
        const updatedTask = {
          firebaseId: this.currentTaskItem.firebaseId,
          id: this.currentTaskItem.id,
          newTitle: this.currentTaskItemTitle,
          newSubTitle: this.currentTaskItemSubTitle,
        };
        await this.$store.dispatch("updateTodoDescription", updatedTask);
        this.$emit("edited-task");
      } catch (er) {
        this.$emit("update-fail");
      }finally{
        this.$emit("close-menu");
      }
    },
  },
};
</script>
