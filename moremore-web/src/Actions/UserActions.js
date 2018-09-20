import { auth, database } from "../firebase";
import {
  SIGN_IN_WITH_EMAIL,
  FIND_PROFILE_WITH_EMAIL,
  FIND_PDF_WITH_EMAIL
} from "./type";

export function signInWithEmail(email, pass) {
  return dispatch => {
    const signIn = auth.signInWithEmailAndPassword(email, pass);
    signIn.catch(e => {
      if (e.message !== "") {
        dispatch({
          type: SIGN_IN_WITH_EMAIL,
          text: e.message,
          isloggedIn: false
        });
      }
    });
  };
}

export function registerWithEmail(Email, Pass, User) {
  return dispatch => {
    const register = auth.createUserWithEmailAndPassword(Email, Pass);
    const docRef = database.collection("user").doc();
    register.then(users => {
      docRef
      .set({
        email: Email,
        user: User
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    }).catch(e => {
      console.log(e.message);
      dispatch({
        type: SIGN_IN_WITH_EMAIL,
        text: e.message
      });
    });
  };
}

export function isLoggedIn() {
  return dispatch => {
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        dispatch({
          type: SIGN_IN_WITH_EMAIL,
          isloggedIn: true,
          email: firebaseUser.email
        });
      }
    });
  };
}

export function findProfileWithEmail(email) {
  return dispatch => {
    const docRef = database.collection("user").where("email", "==", email);
    docRef.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        dispatch({
          type: FIND_PROFILE_WITH_EMAIL,
          myUser: doc.data().user
        });
      });
    });
  };
}

export function findPdfWithEmail(email) {
  return dispatch => {
    const docRef = database.collection("payment").where("email", "==", email);
    docRef.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        dispatch({
          type: FIND_PDF_WITH_EMAIL,
          sheetName: doc.data().name,
          pdfFile: doc.data().pdf
        });
      });
    });
  };
}

export function signOut() {
  return dispatch => {
    auth.signOut();
    dispatch({
      type: SIGN_IN_WITH_EMAIL,
      isloggedIn: false
    });
  };
}
