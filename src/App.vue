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

      <search-key v-if="isSearchTextBox" />
      <v-btn icon v-else>
        <v-icon @click="toggleSearchTextBox">mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import SearchKey from "./components/SearchTask.vue";
export default {
  components: {
    SearchKey,
  },
  data: () => ({
    drawer: null,
    isSearchTextBox: false,
    items: [
      { title: "Todo", icon: "mdi-format-list-checks", to: "/" },
      { title: "About", icon: "mdi-information", to: "/about" },
    ],
  }),
  methods: {
    toggleSearchTextBox() {
      this.isSearchTextBox = !this.isSearchTextBox;
      console.log(this.isSearchTextBox);
    },
  },
};
</script>