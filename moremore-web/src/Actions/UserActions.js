import { auth } from "../firebase";
import { SIGN_IN_WITH_EMAIL } from "./type";

export function signInWithEmail(email, pass) {
  return dispatch => {
    const signIn = auth.signInWithEmailAndPassword(email, pass);
    signIn.catch(e => {
      dispatch({
        type: SIGN_IN_WITH_EMAIL,
        text: e.message
      });
    });
  };
}
