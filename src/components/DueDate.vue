<template>
  <v-dialog v-model="dateDialog" max-width="300px">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item-title v-bind="attrs" v-on="on">
        <v-icon class="pr-2">mdi-calendar</v-icon> Due Date
      </v-list-item-title>
    </template>

    <v-date-picker
      class="mt-4"
      color="primary"
      v-model="picker"
      :min="currentDate"
      :show-current="false"
    >
      <v-row justify="end" class="mb-2">
        <v-btn color="primary" text @click="closeDate">Cancel</v-btn>
        <v-btn color="primary" text @click="confirmDate">Confirm</v-btn>
      </v-row>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  emit: ["close-menu", "due-date"],
  data() {
    return {
      dateDialog: false,
      picker: "",
      currentDate: "",
    };
  },
  watch: {
    dateDialog(val) {
      if (!val) {
        this.$emit("close-menu");
      }
    },
  },
  computed: {
    computeCurrentDate() {
      return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
    },
  },
  created() {
    this.picker = this.computeCurrentDate;
    this.currentDate = this.computeCurrentDate;
  },
  methods: {
    closeDate() {
      this.dateDialog = false;
      this.$emit("close-menu");
    },
    confirmDate() {
      //console.log("date:", this.picker);
      this.dateDialog = false;
      this.$emit("close-menu");
      const formattedDueDate = this.formatDueDate(this.picker);
      this.$emit("due-date", formattedDueDate);
    },
    formatDueDate(dueDate) {
      if (!dueDate) {
        return null;
      }
      const [year, month, day] = dueDate.split("-");
      return `${day}/${month}/${year}`;
    },
  },
};
</script>
