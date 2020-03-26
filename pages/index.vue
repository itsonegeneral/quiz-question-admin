<template>
  <div class="container">
    <b-card >
      <b-card-body >
        <b-form @submit.prevent="login">
            <b-input v-model="email" class="col-sm-12" id="inline-form-input-username" placeholder="Username"></b-input>
          <b-input v-model="password" type="password" id="text-password" placeholder="Password" aria-describedby="password-help-block"></b-input>
          <b-button type="submit" class="col-sm-12">Login</b-button>
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
          isLoading : false
      }
    },
    methods:{
      login(){
          firebase.auth().signInWithEmailAndPassword(this.email,this.password).then((result)=>{
              this.$router.push({
                  name:'add-question'
              });
              localStorage.setItem('useremail',this.email);
          }).catch((result)=>{
              alert("Failed")
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
