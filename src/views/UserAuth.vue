<template>
  <v-form v-model="valid" @submit.prevent="submitForm">
    <v-container>
      <v-text-field
        v-model="firstname"
        :rules="firstNameRules"
        :counter="15"
        label="First name"
        required
      ></v-text-field>

      <v-text-field
        v-model="lastname"
        :rules="lastNameRules"
        :counter="20"
        label="Last name"
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
      <v-btn color="primary" type="submit">SignUp</v-btn>
      <v-btn color="blue lighten-3" type="button">Login</v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      firstname: "",
      lastname: "",
      password: "",
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
  methods:{
    submitForm(){
        this.$store.dispatch("signup",{
            email: this.email,
            password: this.password
        });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  /* padding: 15px;
  margin-top: 20px;
  border-radius: 15px;
  box-shadow: 3px 3px 3px grey;
  border: 1px solid grey; */
}
</style>
