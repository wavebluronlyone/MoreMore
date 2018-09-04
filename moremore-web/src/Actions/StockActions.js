import { database } from "../firebase";

export const GET_STOCK = "get_stock";
// export const GET_CREATE_AT = "get_create_at";

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
