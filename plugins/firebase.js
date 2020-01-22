import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBDL2sjOT0-7DcuVz7ltvThO_KlUC0ixOo",
  authDomain: "servertimersample.firebaseapp.com",
  databaseURL: "https://servertimersample.firebaseio.com",
  projectId: "servertimersample",
  storageBucket: "servertimersample.appspot.com",
  messagingSenderId: "1079751477026",
  appId: "1:1079751477026:web:d90e781e01652171ff477b",
  measurementId: "G-XEDY9Z9RT8"
}
let app=null;

app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig)

export const firestore = app.firestore()
export const realtimedb = app.database()
