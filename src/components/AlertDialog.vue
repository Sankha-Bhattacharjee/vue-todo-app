<template>
  <v-snackbar v-model="snackbar" color="primary">
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="closeAlert">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  emit: ["close-alert"],
  props: ["message", "showAlert"],
  data() {
    return {
      snackbar: false,
    };
  },
  watch: {
    showAlert(val) {
      if (!val) {
        //console.log("watch close")
        this.snackbar = false;
      } else {
        this.snackbar = true;
      }
    },
  },
  methods: {
    closeAlert() {
      this.$emit("close-alert");
    },
  },
};
</script>

<style scoped>
#alertbox {
  color: white;
}
</style>

