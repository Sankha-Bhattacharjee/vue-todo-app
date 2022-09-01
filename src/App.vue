<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>UserName</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Todo App </v-list-item-title>
          <v-list-item-subtitle> List your Todos! </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark prominent>
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Todo List</v-app-bar-title>

      <v-spacer></v-spacer>

      <search-todo v-if="isSearchTextBox" @search-todo="searchParticularTodo"/>
      <v-btn icon v-else>
        <v-icon @click="toggleSearchTextBox">mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view :search-todo="searchTodoKey"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import SearchTodo from "./components/SearchTodo.vue";
export default {
  components: {
    SearchTodo,
  },
  data: () => ({
    drawer: null,
    isSearchTextBox: false,
    searchTodoKey:'',
    items: [
      { title: "Todo", icon: "mdi-format-list-checks", to: "/" },
      { title: "About", icon: "mdi-information", to: "/about" },
    ],
  }),
  methods: {
    toggleSearchTextBox() {
      this.isSearchTextBox = !this.isSearchTextBox;
      //console.log(this.isSearchTextBox);
    },
    searchParticularTodo(val){
      this.searchTodoKey = val;
    },
  },
};
</script>