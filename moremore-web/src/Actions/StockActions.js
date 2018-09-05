import { database } from "../firebase";
import { GET_BEST_SELLER } from "./type";

export function getBestSeller() {
  return dispatch => {
    // database.settings({ timestampsInSnapshots: true });
    const docRef = database.collection("bestSellerProduct");
    docRef.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        dispatch({
          type: GET_BEST_SELLER,
          sheetName: doc.data().name,
          prices: doc.data().price,
          shortDetail: doc.data().short_detail,
          shopName: doc.data().profile
        });
      });
    });
  };
}
