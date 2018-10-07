import { auth, database } from "../firebase";
import { ADMIN_LOGOUT, SIGN_IN_WITH_EMAIL_FOR_ADMIN } from "./type";

export function signInWithEmail(email, pass) {
  return dispatch => {
    const signIn = auth.signInWithEmailAndPassword(email, pass);
    signIn.catch(e => {
      if (e.message !== "") {
        dispatch({
          type: SIGN_IN_WITH_EMAIL_FOR_ADMIN,
          text: e.message,
          isloggedIn: false
        });
      }
    });
  };
}

export function isLoggedIn() {
  return dispatch => {
    auth.onAuthStateChanged(firebaseUser => {
      const docRef = database
        .collection("user")
        .where("email", "==", firebaseUser.email)
        .where("isadmin", "==", 1);
      if (firebaseUser) {
        docRef.get().then(snapshot => {
          snapshot.docs.forEach(doc => {
            dispatch({
              type: SIGN_IN_WITH_EMAIL_FOR_ADMIN,
              isloggedIn: true
            });
          });
        });
      }
    });
  };
}

export function adminSignOut() {
  return dispatch => {
    auth.signOut();
    dispatch({
      type: ADMIN_LOGOUT,
      isloggedIn: false
    });
  };
}
