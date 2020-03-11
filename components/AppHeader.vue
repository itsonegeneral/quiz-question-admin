<template>
  <div>

  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item href="#">Quiz Admin</b-nav-item>
      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown :text="useremail">
        <b-dropdown-item href="#">Account</b-dropdown-item>
        <b-dropdown-item href="#">Settings</b-dropdown-item>
      </b-nav-item-dropdown>


    </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>
    export default {
        name: "AppHeader",
        data(){
            return{
                useremail :''
            }
        },
        mounted() {
            this.useremail = localStorage.getItem("useremail");
        }
    }
</script>

<style scoped>

</style>
