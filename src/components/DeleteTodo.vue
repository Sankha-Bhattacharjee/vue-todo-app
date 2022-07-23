<template>
  <v-dialog v-model="deleteDialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item-title v-bind="attrs" v-on="on">
        <v-icon class="pr-2">mdi-delete</v-icon> Delete
      </v-list-item-title>
    </template>
    <v-card>
      <v-app-bar color="primary" class="text-h5"
        ><span style="color: white"> Delete Task!</span>
      </v-app-bar>
      <v-card-title class="text-h7"
        >Are you sure you want to delete this item?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined @click="closeDelete">Cancel</v-btn>
        <v-btn color="primary" outlined @click="deleteItemConfirm">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  emit: ["delete-task"],
  props: ["currentTaskItemId"],
  data() {
    return {
      deleteDialog: false,
    };
  },
  watch: {
    deleteDialog(val) {
      if (!val) {
        this.$emit("close-menu");
      }
    },
  },
  methods: {
    closeDelete() {
      //console.log(this.currentTaskItemId);
      this.deleteDialog = false;
      this.$emit("close-menu");
    },
    deleteItemConfirm() {
      this.$emit("delete-task", this.currentTaskItemId);
      this.$emit("close-menu");
    },
  },
};
</script>
