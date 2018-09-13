import { database } from "../firebase";
import { GET_BEST_SELLER,FIND_DATA_WITH_NAME } from "./type";

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

export function findDataWithNameOfProduct(name) {
  return dispatch => {
    const docRef = database.collection("bestSellerProduct").where("name","==",name);
    docRef.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        dispatch({
          type: FIND_DATA_WITH_NAME,
          prices: doc.data().price,
          longDetail: doc.data().product_description
        });
      });
    });
  };
}
