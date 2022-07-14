<template>
  <div class="home pa-5">
    <v-btn class="ma-2" outlined color="primary" @click="toggleAddTaskForm">
      {{ showAddFormButtonText }}
    </v-btn>
    <div v-if="showAddForm">
      <v-text-field
        v-model="newTaskTitle"
        @blur="checkInput"
        label="Add Title *"
        clearable
        required
      ></v-text-field>
      <v-text-field
        v-model="newTaskSubTitle"
        label="Add Description"
        clearable
      ></v-text-field>

      <v-btn class="mr-4" type="submit" :disabled="invalid" color="primary" @click="addTask">
        submit
      </v-btn>
    </div>
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
              <v-btn icon @click.stop="deleteTask(task.id)">
                <v-icon color="primary lighten-1">mdi-delete</v-icon>
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
      showAddForm: false,
      newTaskTitle:'',
      newTaskSubTitle:'',
      invalid: true,
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
  computed: {
    showAddFormButtonText() {
      return this.showAddForm ? "Close" : "Add Todo";
    },
  },
  methods: {
    addTask(){
      //console.log('addTask');
      const newTask ={
        id: Date.now().toString(),
        title: this.newTaskTitle,
        subTitle: this.newTaskSubTitle,
        done: false
      };
      this.tasks.push(newTask);
      this.newTaskTitle = '';
      this.newTaskSubTitle = '';

    },
    checkInput(){
      if(this.newTaskTitle){
        this.invalid = false;
      }
    },
    completeTask(id) {
      //console.log("id: ", id);
      const task = this.tasks.find((t) => t.id === id);
      task.done = !task.done;
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
    toggleAddTaskForm() {
      this.showAddForm = !this.showAddForm;
    },
  },
};
</script>
