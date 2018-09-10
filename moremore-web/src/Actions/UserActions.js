import { auth } from "../firebase";
import { SIGN_IN_WITH_EMAIL } from "./type";

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

export function isloggedIn() {
  return dispatch => {
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
        dispatch({
          type: SIGN_IN_WITH_EMAIL,
          isloggedIn: true
        });
      }
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
