<template>
  <div style="" class="align-self-center">
    <b-col class="col-sm-12 col-md-12" style="display: inline-block;">
      <b-card-text style="text-align: center">Questions</b-card-text>
      <b-card class="col-sm-12 col-md-7" v-for="question in questions" style="margin-bottom: 7px">
          <p>Category : {{question.category}}</p>
          <b>{{ question.id }}</b>
        <div class="d-inline-block" style="margin-left: 10px">
          {{ question.question }}
          <table  class="">
            <tr>
              <td>1) {{ question.option1 }}</td>
              <td>3) {{ question.option3 }}</td>
            </tr>
            <tr>
              <td>2) {{ question.option2 }}</td>
              <td>4) {{ question.option4 }}</td>
            </tr>
          </table>
        </div>
        <img v-on:click="deleteQuestion(question.id)" class="btn-outline-warning float-right" src="https://ya-webdesign.com/images600_/edit-delete-icon-png-4.png">

      </b-card>
    </b-col>
  </div>
</template>

<script>
import { myMixin } from "../middleware/mixins";
import firebase from "firebase";
import { testURL, baseURL } from "../store";

export default {
  name: "view-questions",
  mixins: [myMixin],
  data() {
    return {
      questions: []
    };
  },
  methods: {
    loadData() {
      let email = firebase.auth().currentUser.email;


      let url = baseURL + "getadminquestions?email=" + email;
      console.log(url);
      this.$axios
        .get(url)
        .then(res => {
          console.log(res.data);
          this.questions = res.data.data;
        })
        .catch(err => {});
    },
      deleteQuestion(id){

          let url = baseURL + "deletequestion?id=" + id;
          console.log(url);
          this.$axios
              .get(url)
              .then(res => {
                  if(res.data.status === 'success'){
                      alert('Question deleted')
                      this.loadData();
                  }else{
                      alert('Failed')
                  }
              })
              .catch(err => {
                  alert('Failed')
              });
      }
  },
  mounted() {
    setTimeout(() => {
      this.loadData();
    }, 1000);
  }
};
</script>

<style scoped>
  .button,img{
    width: 30px;
    height: 30px;
    float: end;
  }
</style>
