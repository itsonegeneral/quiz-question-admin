<template>
  <div class="container">
    <b-card class="main-card">
      <h5>Create New Quiz Option</h5>
      <b-form @submit.prevent="uploadData">
        Select Category
        <b-form-select
          class="col-md-3 col-sm-12"
          :options="categories"
          item-text="categoryName"
          item-value="id"
          label-field="Select Category"
          v-model="quizoption.catid"
        ></b-form-select>
        <section>
          <b-input
            placeholder="Quiz Title"
            class="col-md-7 col-sm-12"
            v-model="quizoption.title"
          />
          <b-textarea
            placeholder="Description"
            style="display: inline-block"
            v-model="quizoption.description"
            class="col-md-7 col-sm-12"
          />
        </section>

        <div>
          <label> Reward Coins</label>
          <b-input
            v-model="quizoption.rewardcoins"
            placeholder="eg.1000"
            class="number-input col-sm-12 col-md-4"
            type="number"
            min="0"
          />
        </div>

        <div>
          <label> Entry Coins</label>
          <b-input
            v-model="quizoption.entrycoins"
            class="number-input col-md-4 col-sm-12"
            type="number"
            min="0"
            placeholder="0 for free"
          />
        </div>

        <div>
          <span>
            <label>Time for each question</label>
            <b-input
              v-model="quizoption.gametime"
              class="number-input col-md-4 col-sm-12"
              type="number"
              min="0"
              placeholder="0 for no time limit (in seconds)"
            />
            <br />
          </span>
          <span>
            <label>No of questions</label>
            <b-input
              v-model="quizoption.questionsize"
              class="number-input col-md-4 col-sm-12"
              type="number"
              min="5"
              max="30"
              placeholder="Min 5"
            />
            <br />
          </span>
        </div>
        <div>
          <span>
            <label>Difficulty Level</label>
            <b-input
              v-model="quizoption.difficulty"
              class="number-input col-md-4 col-sm-12"
              type="number"
              min="0"
              max="3"
              placeholder="1-3"
            />
          </span>
        </div>

        <b-spinner
          v-if="isLoading"
          variant="success"
          label="Spinning"
        ></b-spinner>
        <b-button v-else type="submit">Add Option</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { baseURL, testURL } from "../../store";
import firebase from 'firebase';
import {myMixin} from "../../middleware/mixins";

export default {
  name: "new-category",
    mixins:[myMixin],
  data() {
    return {
      isLoading: true,
      quizoption: {
        title: "",
        catid: "",
        rewardcoins: "",
        description: "",
        entrycoins: "",
        gametime: "",
        questionsize: "",
        difficulty: ""
      },
      categories: []
    };
  },
  methods: {
    uploadData() {
      if (this.validateInput()) {
          return;
      }
      let url =
        testURL + "addquizoption?option=" + JSON.stringify(this.quizoption);
      this.$axios
        .get(url)
        .then(res => {
          if (res.data.status === "success") {
            alert("Option Added");
          }
        })
        .catch(err => {
          alert("Error Adding");
        });
    },
    validateInput() {
      if (this.quizoption.catid === '' || this.quizoption.title ==='') {
          alert('Enter all values');
          return true;
      }
      return false;
    }
  },
  watch: {
    quizoption() {

    }
  },
  mounted() {
    this.categories = [];
    this.$axios
      .get(testURL + "getsubcategories")
      .then(res => {
        this.isLoading = false;
        for (let i = 0; i < res.data.data.length; i++) {
          let option = {
            value: res.data.data[i].id,
            text: res.data.data[i].categoryName
          };
          this.categories.push(option);
        }
        console.log(Object.values(res.data.data));
      })
      .catch(err => {
        this.isLoading = false;
        console.error(err);
      });

  }
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
input {
  margin-top: 10px;
  display: inline-block;
  margin-bottom: 10px;
}
button {
  margin-top: 10px;
  display: flex;
}
textarea {
  margin-top: 10px;
  margin-bottom: 10px;
}
.main-card {
  padding: 10px;
  text-align: center;
}
label {
  width: 150px;
  margin-bottom: 3px;
}
</style>
