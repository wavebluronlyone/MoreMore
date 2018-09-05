import { database } from "../firebase";
import { GET_STOCK } from "./type";

export function getStock() {
  return dispatch => {
    // database.settings({ timestampsInSnapshots: true });
    const docRef = database.collection("users");
    docRef.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        dispatch({
          type: GET_STOCK,
          shop: doc.data().name,
          is_admin: doc.data().is_Admin
        });
      });
    });
  };
}
