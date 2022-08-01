<template>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="primary">
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
export default {
  props: ["message","showAlert"],
  data(){
    return {
      snackbar:false,
      timeout: 2500,
    };
  },
  watch:{
    showAlert(val){
      if (val){
        this.snackbar = true;
      }
    }
  }
};
</script>

<style scoped>
#alertbox {
  color: white;
}
</style>

