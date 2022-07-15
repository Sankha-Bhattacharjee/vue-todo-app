<template>
  <v-alert
    close-icon="mdi-close-circle-outline"
    elevation="5"
    color="blue"
    dense
    id="alertbox"
  >
    <v-row align="center">
      <v-col class="grow">
        {{ message }}
      </v-col>
      <v-col class="shrink">
        <v-icon dark @click="closeAlert"> mdi-close-circle-outline </v-icon>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  props: ["message"],
  methods: {
    closeAlert() {
      this.$emit('close-alert');
    },
  },
};
</script>

<style scoped>
#alertbox{
    color: white;
}
</style>

