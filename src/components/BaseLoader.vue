<template>
  <div class="backdrop">
    <v-progress-circular
      :size="100"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<style scoped>
.v-progress-circular {
  left: 50%;
  top: 30%;
  z-index: 999 !important;
  margin: 1rem;
}
.backdrop {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  z-index: 9999 !important;
  background-color: rgba(165, 159, 159, 0.5);
}
</style>