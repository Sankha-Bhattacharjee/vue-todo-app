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
        <v-icon class="pr-2">mdi-eye</v-icon> View
      </v-list-item-title>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">View Task</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-card-title>Title</v-card-title>
            <v-card-text>{{ currentTaskItemTitle }}</v-card-text>
          </v-row>
          <v-row>
            <v-card-title>Sub Title</v-card-title>
            <v-card-text>{{ currentTaskItemSubTitle }}</v-card-text>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["currentTaskItem"],
  data() {
    return {
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
    this.fetchCurrentTaskDetails();
  },
  methods: {
    fetchCurrentTaskDetails() {
      this.currentTaskItemTitle = this.currentTaskItem.title;
      this.currentTaskItemSubTitle = this.currentTaskItem.subTitle;
    },
    close() {
      this.editDialog = false;
      //this.fetchCurrentTask();
      //this.$emit("close-menu");
    }
  },
};
</script>
<style scoped>
.v-card__title{
  line-height: 0;
}
</style>
