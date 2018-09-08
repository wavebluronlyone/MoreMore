import { auth } from "../firebase";

export function signInWithEmail(email, pass) {
    const signIn = auth.signInWithEmailAndPassword(email, pass);
    signIn.catch(e =>
      console.log(e.message)
    );
}
