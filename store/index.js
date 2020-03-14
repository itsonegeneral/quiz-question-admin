import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    username :'This is store',
    password : ''
  }
});

export const baseURL = 'https://node-server-quiz.herokuapp.com/';
export  const  testURL = 'http://localhost:8080/';
