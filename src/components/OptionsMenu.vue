<template>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon color="primary lighten-1">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
         <v-list-item v-for="(option, i) in options" :key="i">
          <v-icon class="pr-2">{{ option.icon }}</v-icon>
          <v-list-item-title>{{
            option.title
          }}</v-list-item-title>
        </v-list-item> 
      </v-list>
    </v-menu>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { title: "Edit Task", icon: "mdi-pencil" },
        { title: "Due Date", icon: "mdi-calendar" },
        { title: "Delete", icon: "mdi-delete" },
      ],
    };
  },
};
</script>
