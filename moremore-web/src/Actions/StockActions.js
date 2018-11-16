import { database } from "../firebase";
import axios from "axios";
import {
  GET_BEST_SELLER,
  FIND_DATA_WITH_NAME,
  FIND_PDF_WITH_NAME,
  GET_ALL_PRODUCT,
  RESET_STOCK,
  IS_PAID,
  ADD_PRODUCT_TO_CART
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
    const docRef = database.collection("product").doc(name);
    const imageRef = database.collection("image").doc(name);
    docRef.get().then(doc => {
      imageRef.get().then(doc2 => {
        dispatch({
          type: FIND_DATA_WITH_NAME,
          price: doc.data().price,
          longDetail: doc.data().longDetail,
          img: doc2.data().image
        });
      });
    });
  };
}

export function getAllProduct() {
  return dispatch => {
    const docRef = database.collection("product");
    const imageRef = database.collection("image");
    const data = [];
    let i = 0;
    docRef.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        imageRef
          .doc(doc.id)
          .get()
          .then(doc2 => {
            data[i] = {
              name: doc.id,
              hiLight: doc.data().hiLight,
              price: doc.data().price,
              profile: doc.data().profile,
              img: doc2.data().image
            };
            i++;
            if (i === snapshot.docs.length) {
              dispatch({
                type: GET_ALL_PRODUCT,
                product: data
              });
            }
          });
      });
    });
  };
}

export function findPdfWithNameOfProduct(name) {
  return dispatch => {
    const docRef = database.collection("file").doc(name);
    docRef.get().then(doc => {
      dispatch({
        type: FIND_PDF_WITH_NAME,
        pdfFile: doc.data().pdf
      });
    });
  };
}

export function resetStock() {
  return dispatch => {
    dispatch({
      type: RESET_STOCK
    });
  };
}

export function createSheetforUser(Email, sheetName, pdfFile) {
  return dispatch => {
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
        dispatch({
          type: IS_PAID,
          isPaid: false
        });
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };
}

export function addProductToCart(name) {
  return dispatch => {
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      product: name,
      message: "คุณเพิ่มสินค้าแล้ว"
    });
  };
}

export function createCardWithToken(
  cardNumber,
  nameOnCard,
  expiryDate,
  securityCode,
  totalPrice
) {
  return dispatch => {
    var expiryDateSplit = expiryDate.split("/");
    var year = parseInt(expiryDateSplit[1], 10) + 2000;
    var data = {
      number: cardNumber,
      name: nameOnCard,
      expireMonth: expiryDateSplit[0],
      expireYear: year,
      code: securityCode,
      prices: totalPrice * 100
    };
    axios
      .post("https://phiyawat-comsci.herokuapp.com/card", data)
      .then(function(response) {
        var data2 = {
          tokens: response.data.id,
          prices: data.prices
        };
        axios
          .post("https://phiyawat-comsci.herokuapp.com/charges", data2)
          .then(function(response2) {
            console.log(response2);
            if (response2.data.paid === true) {
              dispatch({
                type: IS_PAID,
                isPaid: true
              });
            }
          });
      });
  };
}
