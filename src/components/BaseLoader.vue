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
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: 9999 !important;
  background-color: rgba(163, 155, 155, 0.5);
}
@media only screen and (max-width: 480px){
  .v-progress-circular {
  left: 30%;
  top: 20%;
}
}
</style>