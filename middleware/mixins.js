import firebase from "firebase";
export  const  myMixin = {
  created: function () {
    this.checkLogin()
  },
  methods: {
    checkLogin: function () {
      firebase.auth().onAuthStateChanged((user)=>{
        if(user){

        }else{
          alert('Please sign in');
          this.$router.push({
            path: "/"
          });
        }
      });

    }
  }
};
