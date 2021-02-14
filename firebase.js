// import * as firebase from '@firebase/app';
import * as firebase from 'firebase';

import "firebase/auth";
import "firebase/firestore";
// require('firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyCkTungBD0mkA1R0gCeKrcUZxoL7Z7UX3Y",
  authDomain: "signal-c29b4.firebaseapp.com",
  projectId: "signal-c29b4",
  storageBucket: "signal-c29b4.appspot.com",
  messagingSenderId: "778467147686",
  appId: "1:778467147686:web:00906bea2334244a069967"
};

let app;

if(firebase.default.apps.length===0){
  app =firebase.default.initializeApp(firebaseConfig)
}else{
  app =firebase.default.app
}

const db = app.firestore();
const auth = firebase.default.auth();

export {db ,auth}
