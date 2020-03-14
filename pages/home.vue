<template>
    <div class="container">
      <b-col class="col-sm-12 col-md-10">

          <h5 class="text-center">Statistics</h5>
          <b-card class=" card col-sm-12 col-md-5 align-content-center">
            <b-table :items="userdata.data">
              <b-row v-for="obj in userdata.data">
                <b-td>  {{obj.category}}</b-td>
                <b-td> {{obj['count(*)']}}</b-td>
              </b-row>
            </b-table>
          </b-card>


        <h5 class="text-center">Admins</h5>
        <b-card class=" card col-sm-12 col-md-5 align-content-center">
          <b-table :items="adminData.data">
            <b-row v-for="obj in adminData.data">
              <b-td>  {{obj.category}}</b-td>
              <b-td> {{obj['count(*)']}}</b-td>
            </b-row>
          </b-table>
        </b-card>


      </b-col>

      <b-button class="fixed-bottom col-sm-12 col-md-3  bottom-button">Add Question</b-button>
    </div>
</template>

<script>
  import {baseURL} from "../store";

  export default {
        name: "home",
        data(){
            return{
                userdata: '',
                catData : [],
                adminData : []
            }
        },
        methods:{
            loadData(){

                var config = {
                    headers: {'Access-Control-Allow-Origin': '*'}
                };
                this.$axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
                this.$axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
                this.$axios.get(baseURL + 'totalstatus',{

                },config).then((res)=>{
                    this.userdata  =res.data;
                    console.log('response');
                }).catch((err)=>{
                    console.log('err');
                    console.error(err);
                })

                this.$axios.get(baseURL + 'adminstatus').then((res)=>{
                    this.adminData = res;
                }).catch((err)=>{

                });

            }

        },
        mounted() {
            this.loadData();
        }
    }
</script>

<style scoped>
.container{
  text-align: center;
  padding-top: 20px;
  padding-bottom: 50px;
  align-items: center;
  align-content: center;
}
  .bottom-button{
    margin: auto;
  }
  .card{
    margin: auto;
  }
</style>
