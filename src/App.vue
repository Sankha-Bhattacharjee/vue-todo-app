<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{computeUserName}}</v-list-item-title>
            <v-list-item-subtitle>
              <router-link :class="{'menu-subtitle':!isLoggedIn}" :to="authPath">{{computeIsLoggedInMessage}}</router-link>
            </v-list-item-subtitle>
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
      <template v-slot:append>
        <div class="pa-2" v-if="$store.getters.getIsAuthenticated">
          <v-btn block class="primary" @click="logout">
            Logout
          </v-btn>
        </div>
      </template>
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
    isLoggedIn: false,
    items: [
      { title: "Todo", icon: "mdi-format-list-checks", to: "/" },
      { title: "About", icon: "mdi-information", to: "/about" },
    ],
  }),
  computed:{
    authPath(){
      return !this.isLoggedIn ? "/auth" : "";
    },
    computeUserName(){
      if(this.$store.getters.getIsAuthenticated){
        const userFirstName = this.$store.getters.getUserFirstName;
        const userLastName = this.$store.getters.getUserLastName;
        this.isLoggedIn = true;
        return `${userFirstName} ${userLastName}`;
      }else{
        return "Anonymous";
      }
    },
    computeIsLoggedInMessage(){
      if(this.$store.getters.getIsAuthenticated){
        return "Logged in";
      }else{
        return "Signup/Login";
      }
    }
  },
  created(){
    this.$store.dispatch("autoLogin");
  },
  methods: {
    toggleSearchTextBox() {
      this.isSearchTextBox = !this.isSearchTextBox;
      //console.log(this.isSearchTextBox);
    },
    searchParticularTodo(val){
      this.searchTodoKey = val;
    },
    logout(){
    this.$store.dispatch("logout");
    }
  },
};
</script>

<style scoped>
.menu-subtitle{
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
}
.menu-subtitle:hover{
  text-decoration: underline;
  color: #226eba !important;
  cursor: pointer;
}
.router-link-active{
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
  cursor: text;
}
</style>