<template>
  <v-form v-model="valid" @submit.prevent="submitForm">
    <v-container>
      <v-text-field
        v-model="firstname"
        :rules="firstNameRules"
        :counter="15"
        label="First name"
        v-if="mode==='signup'"
        required
      ></v-text-field>

      <v-text-field
        v-model="lastname"
        :rules="lastNameRules"
        :counter="20"
        label="Last name"
        v-if="mode==='signup'"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        type="email"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <span v-if="isError">{{errorText}}<br></span>
      <v-btn color="primary" type="submit">{{button1Text}}</v-btn>
      <v-btn color="blue lighten-3" type="button" @click="toggleMode">{{button2Text}}</v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      mode: "signup",
      valid: false,
      firstname: "",
      lastname: "",
      password: "",
      errorText: "",
      isError: false,
      firstNameRules: [
        (v) => !!v || "FirstName is required",
        (v) => v.length <= 15 || "FirstName must be less than 15 characters",
      ],
      lastNameRules: [
        (v) => !!v || "LastName is required",
        (v) => v.length <= 20 || "LastName must be less than 20 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length > 8 || "Password must be atleast 8 characters",
      ],
    };
  },
  computed:{
    button1Text(){
      if(this.mode === "signup"){
        return "Signup";
      }else{
        return "Login";
      }
    },
    button2Text(){
      if(this.mode === "login"){
        return "Signup";
      }else{
        return "Login";
      }
    }
  },
  methods:{
    toggleMode(){
      this.isError = false;
      if(this.mode === "signup"){
        this.mode = "login";
      }else{
        this.mode ="signup";
      }
    },
    submitForm(){
      if(this.mode === "signup"){
        if(!this.firstname || !this.lastname || !this.email || !this.password){
          this.isError = true;
          this.errorText = "Please enter all the required details!";
          console.log(this.errorText);
        }else{
          //signup logic
          this.$store.dispatch("signup",{
              email: this.email,
              password: this.password,
              firstName: this.firstname,
              lastName: this.lastname
          });
          this.$router.replace("/");
        }
      }else if(this.mode==="login"){
        if(!this.email || !this.password){
          this.isError = true;
          this.errorText = "Please enter all the required details!";
          console.log(this.errorText);
        }else{
          //login logic
          this.$store.dispatch("login",{
            enteredEmail: this.email,
            enteredPassword: this.password
          });
          this.$router.replace("/");
          this.$store.dispatch("fetchTodos");
        }
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  padding: 20px;
  margin-top: 20px;
  border-radius: 15px;
  box-shadow: 3px 3px 3px grey;
  border: 1px solid rgb(192, 186, 186);
}
</style>
