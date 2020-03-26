<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item v-on:click="$router.replace({path:'/'})">Quiz Admin</b-nav-item>
        <b-nav-item-dropdown v-if="loggedIn"  :text="useremail">
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
          <b-dropdown-item v-on:click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>

  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "AppHeader",
  data() {
    return {
      useremail: "",
      loggedIn: false
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      localStorage.setItem("useremail", null);

    },
    initData() {
      this.useremail = localStorage.getItem("useremail");
    },
    loginPage() {
      this.$router.replace({
        path: "/"
      });
    }
  },
  mounted() {
    this.initData();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.loggedIn = true;
        this.initData();
      } else {
        this.loggedIn = false;
        this.initData();
        this.$router.replace({
          path: "/"
        });
      }
    });
  }
};
</script>

<style scoped></style>
