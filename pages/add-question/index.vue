<template>
  <div align="center">
    <b-card align="center" class="col-md-8 col-sm-12">
      <b-card-header>
        Add Question
      </b-card-header>
      <b-card-body class="col-sm-12">
        <b-form @submit.prevent="addQuestion">
          Parent Category : {{ questionModel.parentCategory }}<br />
          Sub Category : {{ questionModel.category }}
          <b-form-select
            v-model="questionModel.parentCategory"
            class="mb-3"
            :options="categories"
            :value="categories"
            v-on:change="changeSubCategory()"
          />
          <b-form-select
            v-model="questionModel.category"
            :options="subcategories"
            class="mb-3"
            :value="subcategories"
          />
          <b-textarea placeholder="Question" v-model="questionModel.question" />
          <b-input v-model="questionModel.option1" placeholder="Option 1" />
          <b-input v-model="questionModel.option2" placeholder="Option 2" />
          <b-input v-model="questionModel.option3" placeholder="Option 3" />
          <b-input v-model="questionModel.option4" placeholder="Option 4" />
          <div v-if="!isOptionsEntered">
            <label>Select Answer : </label>

            {{ questionModel.answer }}

            <b-radio-group>
              <b-radio
                v-model="questionModel.answer"
                :value="questionModel.option1"
                class="col-sm-12"
                >{{ questionModel.option1 }}</b-radio
              >
              <b-radio
                v-model="questionModel.answer"
                :value="questionModel.option2"
                class="col-sm-12"
                >{{ questionModel.option2 }}</b-radio
              >
              <b-radio
                v-model="questionModel.answer"
                :value="questionModel.option3"
                class="col-sm-12"
                >{{ questionModel.option3 }}</b-radio
              >
              <b-radio
                v-model="questionModel.answer"
                :value="questionModel.option4"
                class="col-sm-12"
                >{{ questionModel.option4 }}</b-radio
              >
            </b-radio-group>
          </div>

          <br />
          <b-spinner
            v-if="isLoading"
            variant="success"
            label="Spinning"
          ></b-spinner>
          <b-button v-else type="submit" variant="success"
            >Add Question</b-button
          >
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { firestore, realtimedb } from "../../plugins/firebase";
import firebase from "firebase";
import { baseURL, store } from "../../store";
import {myMixin} from "../../middleware/mixins";

export default {
  name: "add-question",
    mixins:[myMixin],
  data() {
    return {
      currentDatabase: "",
      questionModel: {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
        parentCategory: "",
        level: 1,
        category: "",
        adminEmail: ""
      },
      isOptionsEntered: false,
      categories: [],
      subcategories: [],
      isLoading: false
    };
  },
  methods: {
    addQuestion() {
      //TODO validate input
      if (!this.validateInput()) {
        console.log("Input validation " + this.validateInput());
        return;
      } else {
        this.uploadQuestion();
      }
    },
    uploadQuestion() {
      this.isLoading = true;
      let url = baseURL;
      url = url + "addquestion?question=" + JSON.stringify(this.questionModel);
      console.log(url);

      var config = {
        headers: { "Access-Control-Allow-Origin": "*" }
      };
      this.$axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded";
      this.$axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      this.$axios
        .get(
          url,
          {
            data: this.questionModel
          },
          config
        )
        .then(res => {
          alert("Question Added");
          this.clearData();
          this.isLoading = false;
        })
        .catch(err => {
          console.error(err);
          this.isLoading = false;
        });
    },
    clearData() {
      this.questionModel = {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
        parentCategory: this.questionModel.parentCategory,
        level: 1,
        category: this.questionModel.category,
        adminEmail: ""
      };
    },
    validateInput() {
      if (
        this.questionModel.question.length === 0 ||
        this.questionModel.option1.length === 0 ||
        this.questionModel.option2.length === 0 ||
        this.questionModel.option3.length === 0 ||
        this.questionModel.option4.length === 0 ||
        this.questionModel.answer.length === 0
      ) {
        alert("Enter all feilds");
        return false;
      }
      return true;
    },
    changeSubCategory() {
      this.loadList(this.questionModel.parentCategory);
    },
    loadParentList() {
      this.categories = [];
      this.isLoading = true;

      realtimedb.ref("categories").on(
        "value",
        snapshot => {
          console.log(snapshot.val());
          this.categories = snapshot.val();
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          console.log(error);
        }
      );
      /*  this.$axios.get(baseURL + 'getcategories').then((res)=>{
                  console.log(res.data.parentCategories);
                  for (let i=0 ;i <res.data.parentCategories.length ; i ++){
                      this.categories.push(res.data.parentCategories[i].categoryName);
                  }
                  this.isLoading = false;
              }).catch((err)=>{
                  this.isLoading = false;
              });
*/
    },
    loadList(cat = "Sports") {
      realtimedb
        .ref("subcategories")
        .child(cat)
        .on(
          "value",
          snapshot => {
            console.log(snapshot.val());
            this.subcategories = snapshot.val();
            this.questionModel.category = this.subcategories[0];
            this.isLoading = false;
          },
          error => {
            this.isLoading = false;
            console.log(error);
          }
        );
      /*

              this.$axios.get(baseURL + 'getcategories').then((res)=>{
                  console.log(res.data.categories);
                  this.subcategories = [];
                  this.questionModel.category = res.data.categories[i].categoryName;
                  for (let i=0 ;i <res.data.categories.length ; i ++){
                      if(res.data.categories[i].parentCategory === cat) {
                          this.subcategories.push(res.data.categories[i].categoryName);
                      }
                  }
                  this.isLoading = false;
              }).catch((err)=>{
                  this.isLoading = false;
              });
*/
    }
  },
  mounted() {
    this.loadParentList();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.questionModel.adminEmail = user.email;
      } else {
        this.$router.replace({
          path: "/"
        });
      }
    });
    /* if (firebase.auth().currentUser === null) {
      if (localStorage.getItem("useremail") == null) {
        this.$router.push({
          path: "/"
        });
      } else {
        this.questionModel.adminEmail = localStorage.getItem("useremail");
        console.log("Email " + this.questionModel.adminEmail);
      }
    }*/
  },
  watch: {
    categories() {
      this.questionModel.parentCategory = this.categories[0];
      this.loadList(this.questionModel.parentCategory);
    },
    questionModel() {
      this.questionModel.adminEmail = localStorage.getItem("useremail");
      console.log("updated");
    }
  }
};
</script>

<style scoped>
input {
  margin-top: 7px;
}
label {
  margin-top: 10px;
}
.answer-holder {
  vertical-align: center;
}
</style>
