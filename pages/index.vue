<template>
  <div class="container">
    <b-card >
      <b-alert show  variant="warning" v-if="isError">Login Failed</b-alert>
      <b-card-body >
        ADMIN LOGIN
        <b-form @submit.prevent="login">
            <b-input v-model="email" class="col-sm-12" id="inline-form-input-username" placeholder="Username"></b-input>
          <b-input v-model="password" type="password" id="text-password" placeholder="Password" aria-describedby="password-help-block"></b-input>
          <b-spinner
            v-if="isLoading"
            variant="success"
            label="Spinning"
          ></b-spinner>
          <b-button v-else type="submit" class="col-sm-12">Login</b-button>
        </b-form>
      </b-card-body>
    </b-card>

  </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name:'login',
  components: {

  },
    data(){
      return{
          email:'',
          password :'',
          isLoading : false,
          isError: false
      }
    },
    methods:{
      login(){
          this.isLoading = true;
          this.isError = false;
          firebase.auth().signInWithEmailAndPassword(this.email,this.password).then((result)=>{
              this.isLoading = false;
              this.$router.push({
                  name:'add-question'
              });
              localStorage.setItem('useremail',this.email);
          }).catch((result)=>{
              this.isLoading = false;
              this.isError = true;
          });
      }
    },
    created() {
        firebase.auth().onAuthStateChanged((user)=> {
            if(user){
                this.$router.push({
                    name: "home"
                });
            }
        })
    }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
  input{
    margin-top: 10px;
    width: 100%;
  }
  button{
    margin-top: 14px;
  }
</style>
