import { auth, database } from "../firebase";
import {
  SIGN_IN_WITH_EMAIL,
  FIND_PROFILE_WITH_EMAIL,
  FIND_PDF_WITH_EMAIL,
  LOGOUT
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
    register
      .then(users => {
        docRef
          .set({
            email: Email,
            user: User,
            isadmin: 0
          })
          .then(function() {
            console.log("Document successfully written!");
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
      })
      .catch(e => {
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
      const docRef = database
        .collection("user")
        .where("email", "==", firebaseUser.email)
        .where("isadmin", "==", 0);
      if (firebaseUser) {
        docRef.get().then(snapshot => {
          snapshot.docs.forEach(doc => {
            dispatch({
              type: SIGN_IN_WITH_EMAIL,
              email: firebaseUser.email,
              isloggedIn: true
            });
          });
        });
      }
    });
  };
}

export function findProfileWithEmail(email) {
  if (email === undefined) {
    return dispatch => {
      dispatch({
        type: SIGN_IN_WITH_EMAIL,
        isloggedIn: false
      });
    };
  } else {
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
}

export function findPdfWithEmail(email) {
  if (email === undefined) {
    return dispatch => {
      dispatch({
        type: SIGN_IN_WITH_EMAIL,
        isloggedIn: false
      });
    };
  } else {
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
}

export function signOut() {
  return dispatch => {
    auth.signOut();
    dispatch({
      type: LOGOUT
    });
    dispatch({
      type: SIGN_IN_WITH_EMAIL,
      isLoggedIn: false
    });
  };
}
