<template>
  <v-row justify="end">
    <v-col class="d-flex" cols="4" mg="2">
      <v-select
        :items="filterOptions"
        label="Filter By"
        dense
        outlined
        color="primary"
        v-model="filterByText"
        @change="filterTodosBy"
      ></v-select> </v-col
  ></v-row>
</template>

<script>
export default {
  emit:['filterBy'],
  data() {
    return {
      filterOptions: ["All", "Completed", "Pending"],
      filterByText: "",
    };
  },
  methods: {
    filterTodosBy() {
      //console.log("Value changed: " + this.filterByText);
      this.$router.push({query: { filterBy: this.filterByText }});
      this.$emit('filterBy');
    },
  },
};
</script>
