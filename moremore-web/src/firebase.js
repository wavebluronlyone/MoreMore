import firebase from "firebase";
const config = {
  apiKey: "AIzaSyDj_5k_RYw1Pys1p_lmT3dka68aNP6TYUo",
  authDomain: "my-project-9d06f.firebaseapp.com",
  databaseURL: "https://my-project-9d06f.firebaseio.com",
  projectId: "my-project-9d06f",
  storageBucket: "my-project-9d06f.appspot.com",
  messagingSenderId: "790990984652"
};
firebase.initializeApp(config);

export const database = firebase.firestore();
export const auth = firebase.auth();
