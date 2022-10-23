<template>
  <v-text-field
    v-model="searchKey"
    placeholder="Search..."
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      searchKey: "",
    };
  },
  watch: {
    searchKey(newVal, oldVal) {
      if (newVal !== oldVal) {
        setTimeout(() => {
          //console.log(this.searchKey);
          this.$emit('search-todo',newVal);
        }, 500);
      }
    },
  },
};
</script>
