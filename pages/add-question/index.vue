<template>
  <div align="center">
    <b-card align="center" class="col-md-8 col-sm-12">
      <b-card-header>
        Add Question
      </b-card-header>
      <b-card-body class="col-sm-12">
        <b-form @submit.prevent="addQuestion">
            <b-form-select v-model="selected" class="mb-3">
              <b-form-select-option v-for="cat in categories" :value="cat">{{cat}}</b-form-select-option>
            </b-form-select>
          <b-textarea placeholder="Question" v-model="questionModel.question"/>
            <b-input v-model="questionModel.options[0]" placeholder="Option 1"/>
          <b-input v-model="questionModel.options[1]" placeholder="Option 2"/>
          <b-input v-model="questionModel.options[2]" placeholder="Option 3"/>
          <b-input v-model="questionModel.options[3]" placeholder="Option 4"/>
          {{questionModel.answer}}
          <div v-if="!isOptionsEntered">
            <label>Select Answer</label>
            <b-radio-group >
              <b-radio  v-model="questionModel.answer" :value="questionModel.options[0]" class="col-sm-12" >{{questionModel.options[0]}}</b-radio>
              <b-radio  v-model="questionModel.answer" :value="questionModel.options[1]" class="col-sm-12">{{questionModel.options[1]}}</b-radio>
              <b-radio  v-model="questionModel.answer" :value="questionModel.options[2]" class="col-sm-12" >{{questionModel.options[2]}}</b-radio>
              <b-radio  v-model="questionModel.answer" :value="questionModel.options[3]" class="col-sm-12">{{questionModel.options[3]}}</b-radio>
            </b-radio-group>
          </div>

          <br>
          <b-spinner v-if="isLoading" variant="success" label="Spinning"></b-spinner>
          <b-button v-else type="submit" variant="success">Add Question</b-button>

        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import {firestore,realtimedb} from "../../plugins/firebase";
  import firebase from 'firebase';
  import {store} from "../../store";

  export default {
        name: "index.html",
        data(){
            return {
                currentDatabase : '',
                questionModel:{
                    question :'',
                    options : [],
                    answer : '',
                    keywords : []
                },
                selected : 'Select a option',
                isOptionsEntered : false,
                categories : [
                    'Sports',
                    'History'
                ],
                isLoading:false
            }
        },
      methods:{
            addQuestion(){
                //TODO validate input
                if(!this.validateInput()){
                    return
                }
                this.isLoading = true;
                firestore.collection("questions").add(this.questionModel).
                    then( (ref)=>{
                        alert("Question Written to " + ref.id);
                        this.isLoading = false
                }).catch( (error)=>{
                    alert("Failed");
                    this.isLoading = false
                })
            },
          validateInput(){
                if(this.questionModel.question.length <1){

                }
          },
          loadList(){
                realtimedb.ref('/admin').child('categories').on('value',(snapshot)=>{
                    console.log(snapshot.val());
                    this.categories = snapshot.val();
                },(error)=>{
                    console.log(error);
                })
          }
      },
      created(){
          if(firebase.auth().currentUser ===null){
              this.$router.push({
                  path :'/'
              })
          }else{
              this.loadList();
          }
      },
    }
</script>

<style scoped>
  input{
    margin-top: 7px;
  }
  label{
    margin-top: 10px;
  }
  .answer-holder{
    vertical-align: center;
  }
</style>
