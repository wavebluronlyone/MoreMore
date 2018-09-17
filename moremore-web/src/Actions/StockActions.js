import { database } from "../firebase";
import {
  GET_BEST_SELLER,
  FIND_DATA_WITH_NAME,
  FIND_PDF_WITH_NAME
} from "./type";

export function getBestSeller() {
  return dispatch => {
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
    const docRef = database
      .collection("bestSellerProduct")
      .where("name", "==", name);
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

export function findPdfWithNameOfProduct(name) {
  return dispatch => {
    const docRef = database
      .collection("bestSellerProduct")
      .where("name", "==", name);
    docRef.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        dispatch({
          type: FIND_PDF_WITH_NAME,
          pdfFile: doc.data().pdf
        });
      });
    });
  };
}

export function createSheetforUser(Email, sheetName, pdfFile) {
  if (pdfFile === "") {
    return;
  }
  const docRef = database.collection("payment").doc();
  docRef
    .set({
      email: Email,
      pdf: pdfFile,
      name: sheetName
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}
