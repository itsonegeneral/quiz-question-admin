<template>
  <div class="container">
    <b-col class="col-sm-12 col-md-10">
      <b-row class="content-row ">
        <b-card class="col-sm-12 col-md-4 card-css">

          <div>
            <b>Total questions added</b>
            <p class="float-right">{{myQuestionCount}}</p>
          </div>
          <b-button
            v-on:click="$router.replace({name:'add-question'})"
            style="margin-top: 20px;"
            class="col-sm-12  bottom-button"
          >Add Question</b-button
          >
          <b-button
            v-on:click="$router.replace({name:'view-questions'})"
            style="margin-top: 20px;"
            class="col-sm-12  bottom-button"
          >View All Questions</b-button
          >
        </b-card>
      </b-row>

      <b-row>
        <b-card class=" card col-sm-12 col-md-4 align-content-center card-css">
          <b>Database Status</b>
          <b-table :items="userdata.data">
            <b-row v-for="obj in userdata.data">
              <b-td> {{ obj.category }}</b-td>
              <b-td> {{ obj["count(*)"] }}</b-td>
            </b-row>
          </b-table>
        </b-card>

        <b-card class=" card col-sm-12 col-md-5 align-content-center card-css">
          <b>Admin Performance</b>
          <b-table :items="adminData.data">
            <b-row v-for="obj in adminData.data">
              <b-td> {{ obj.category }}</b-td>
              <b-td> {{ obj["count(*)"] }}</b-td>
            </b-row>
          </b-table>
        </b-card>
      </b-row>
    </b-col>
  </div>
</template>

<script>
import { baseURL } from "../store";
import { myMixin } from "../middleware/mixins";

export default {
  name: "home",
  mixins: [myMixin],
  data() {
    return {
      userdata: "",
      catData: [],
      adminData: [],
        myQuestionCount : 0
    };
  },
  methods: {
    loadData() {
      var config = {
        headers: { "Access-Control-Allow-Origin": "*" }
      };
      this.$axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded";
      this.$axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      this.$axios
        .get(baseURL + "totalstatus", {}, config)
        .then(res => {
          this.userdata = res.data;
          console.log("response");
        })
        .catch(err => {
          console.log("err");
          console.error(err);
        });

      this.$axios
        .get(baseURL + "adminstatus")
        .then(res => {
          this.adminData = res;
          for(let i =0 ; i < this.adminData.data.length ; i++){
              let obj = this.adminData.data[i];
              if(this.adminData.data[i].adminemail.toLowerCase() === localStorage.getItem("useremail").toLowerCase() ) {
                  this.myQuestionCount = res.data[i]['count(*)'];
              }
          }

        })
        .catch(err => {});
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  padding-top: 20px;
  padding-bottom: 50px;
  align-items: center;
  align-content: center;
}
.bottom-button {
  margin: auto;
}
.card {
  margin: auto;
}
  .card-css{
    margin-bottom: 20px;
  }
</style>
