<template>
  <div class="home pa-5">
    <v-list flat three-line>
      <div v-for="task in tasks" :key="task.id">
        <v-list-item
          @click="completeTask(task.id)"
          :class="{ 'blue lighten-4': task.done }"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content
              :class="{ 'text-decoration-line-through': task.done }"
            >
              <v-list-item-title>{{ task.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ task.subTitle }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: "Wake up",
          subTitle: "wake up at 7 AM",
          done: false,
        },
        {
          id: 2,
          title: "Get groceries",
          subTitle: "Grocery for evening party",
          done: false,
        },
        {
          id: 3,
          title: "Get wine",
          subTitle: "Wine for party",
          done: false,
        },
      ],
    };
  },
  methods: {
    completeTask(id) {
      console.log("id: ", id);
      const task = this.tasks.find((t) => t.id === id);
      task.done = !task.done;
    },
  },
};
</script>
