import { database } from "../firebase";
import axios from "axios";
import {
  GET_BEST_SELLER,
  FIND_DATA_WITH_NAME,
  GET_ALL_PRODUCT,
  RESET_STOCK,
  IS_PAID,
  ADD_PRODUCT_TO_CART,
  CREATE_SLIDE_IMAGE,
  RESET_IMAGE,
  CREATE_LINE_PAYMENT,
  GET_TOTAL_PRODUCT
} from "./type";

export function getBestSeller() {
  return dispatch => {
    const sheetRef = database.collection("product");
    const paymentRef = database.collection("payment");
    const imageRef = database.collection("image");
    const sheetArray = [];
    const bestSellerSheetData = [];
    let index = 0;
    let count = 3;
    sheetRef.get().then(sheetData => {
      sheetData.docs.forEach(sheet => {
        paymentRef
          .where("name", "==", sheet.id)
          .get()
          .then(payment => {
            sheetArray[index] = {
              name: sheet.id,
              payment: payment.size
            };
            index++;
            if (index === sheetData.size) {
              sheetArray.sort(
                (min, max) => parseFloat(max.payment) - parseFloat(min.payment)
              );
              for (let i = 0; i < count; i++) {
                sheetRef
                  .doc(sheetArray[i].name)
                  .get()
                  .then(sheet => {
                    imageRef
                      .doc(sheetArray[i].name)
                      .get()
                      .then(image => {
                        bestSellerSheetData[i] = {
                          name: sheetArray[i].name,
                          price: sheet.data().price,
                          hiLight: sheet.data().hiLight,
                          img: image.data().image
                        };
                        if (i === count - 1) {
                          dispatch({
                            type: GET_BEST_SELLER,
                            product: bestSellerSheetData
                          });
                        }
                      });
                  });
              }
            }
          });
      });
    });
  };
}

export function findSheetDataWithPagination(currentPage, limitPage) {
  return dispatch => {
    const sheetRef = database.collection("product"); //sheet
    const imageRef = database.collection("image");
    const sheetData = [];
    let index = 0;
    let startPage = currentPage * limitPage - limitPage;
    let endPage = startPage + limitPage;
    sheetRef.get().then(sheet => {
      imageRef.get().then(image => {
        for (let i = startPage; i < endPage; i++) {
          dispatch({
            type: GET_TOTAL_PRODUCT,
            isTyping: 0,
            pageNumber: sheet.docs.length
          });
          sheetData[index] = {
            name: sheet.docs[i].id,
            price: sheet.docs[i].data().price,
            hiLight: sheet.docs[i].data().hiLight,
            img: image.docs[i].data().image
          };
          index++;
          if (index === limitPage || i === sheet.docs.length - 1) {
            dispatch({
              type: GET_ALL_PRODUCT,
              product: sheetData
            });
          }
        }
      });
    });
  };
}

export function findSheetDataWithPaginationFromSearch(
  currentPage,
  limitPage,
  input
) {
  return dispatch => {
    input = input.toUpperCase();
    const sheetRef = database.collection("product");
    const imageRef = database.collection("image");
    const sheetData = [];
    const query = [];
    let queryCount = 0;
    let index = 0;
    sheetRef.get().then(sheet => {
      imageRef.get().then(image => {
        for (let i = 0; i < sheet.docs.length; i++) {
          if (
            sheet.docs[i].id.toUpperCase().indexOf(input) >= 0 ||
            sheet.docs[i]
              .data()
              .profile.toUpperCase()
              .indexOf(input) >= 0
          ) {
            queryCount++;
            query[index] = i;
            index++;
            if (i === sheet.docs.length - 1) {
              dispatch({
                type: GET_TOTAL_PRODUCT,
                isTyping: 1,
                pageNumber: queryCount
              });
            }
          } else {
            if (i === sheet.docs.length - 1) {
              dispatch({
                type: GET_TOTAL_PRODUCT,
                isTyping: 1,
                pageNumber: queryCount
              });
            }
          }
        }
        index = 0;
        if (currentPage === 1) {
          index = 0;
        } else {
          index = currentPage + (limitPage - currentPage);
        }
        for (let i = 0; i < limitPage; i++) {
          sheetData[i] = {
            name: sheet.docs[query[index]].id,
            price: sheet.docs[query[index]].data().price,
            hiLight: sheet.docs[query[index]].data().hiLight,
            img: image.docs[query[index]].data().image
          };
          if (index === query.length - 1) {
            dispatch({
              type: GET_ALL_PRODUCT,
              product: sheetData
            });
          }
          index++;
        }
        dispatch({
          type: GET_ALL_PRODUCT,
          product: sheetData
        });
      });
    });
  };
}

export function findSheetDataWithNameOfProduct(sheetName) {
  return dispatch => {
    const sheetRef = database.collection("product").doc(sheetName);
    const imageRef = database.collection("image").doc(sheetName);
    sheetRef.get().then(sheet => {
      imageRef.get().then(image => {
        dispatch({
          type: FIND_DATA_WITH_NAME,
          price: sheet.data().price,
          longDetail: sheet.data().longDetail,
          img: image.data().image
        });
      });
    });
  };
}

export function createSlideImage(sheetName) {
  return dispatch => {
    const multipleImageRef = database
      .collection("subImage")
      .where("name", "==", sheetName);
    multipleImageRef.get().then(multipleImageData => {
      multipleImageData.docs.forEach(multipleImage => {
        dispatch({
          type: CREATE_SLIDE_IMAGE,
          subImage: multipleImage.data().subImage
        });
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

export function resetImage() {
  return dispatch => {
    dispatch({
      type: RESET_IMAGE,
      subImg: [],
      message: ""
    });
  };
}

export function createSheetforUser(email, sheetName) {
  const fileRef = database.collection("file").doc(sheetName);
  const paymentRef = database.collection("payment").doc();
  fileRef.get().then(file => {
    paymentRef
      .set({
        date: new Date(),
        email: email,
        pdf: file.data().pdf,
        name: sheetName
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  });
}

export function resetPayment() {
  return dispatch => {
    dispatch({
      type: IS_PAID,
      isPaid: false
    });
  };
}

export function addSheetToCart(sheetName, sheetPrice, sheetAddCart) {
  return dispatch => {
    const sheetData = [];
    const sheetNameArray = [];
    let totalSheetPrices = 0;
    sheetAddCart.map((sheet, index) => {
      return sheetNameArray[index] = sheet.name;
    });

    if (sheetNameArray.indexOf(sheetName) >= 0) {
      alert("คุณเลือกสินค้านี้แล้ว");
      return;
    } else {
      if (sheetAddCart.length === 0) {
        sheetData[0] = { name: sheetName, price: sheetPrice };
        totalSheetPrices += sheetPrice;
      } else {
        sheetData[0] = { name: sheetName, price: sheetPrice };
        totalSheetPrices += sheetPrice;
        let i = 0;
        sheetAddCart.forEach(sheet => {
          sheetData[i + 1] = {
            name: sheet.name,
            price: sheet.price
          };
          totalSheetPrices += sheetData[i + 1].price;
          i++;
        });
      }
      dispatch({
        type: ADD_PRODUCT_TO_CART,
        product: sheetData,
        total: totalSheetPrices,
        message: "เพิ่ม " + sheetName + " ลงในตะกร้าสำเร็จ"
      });
    }
  };
}

export function removeSheetCart(sheetName, sheetAddCart) {
  return dispatch => {
    const selectIndex = sheetAddCart.indexOf(sheetName);
    const sheetData = [];
    let totalSheetPrices = 0;
    let i = 0;
    sheetAddCart.forEach((sheet, index) => {
      if (index !== selectIndex) {
        sheetData[i + 1] = {
          name: sheet.name,
          price: sheet.price
        };
        totalSheetPrices += sheetData[i + 1].price;
      }
      i++;
    });
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      product: sheetData,
      total: totalSheetPrices
    });
  };
}

export function linkPayment(
  sheetAddCart,
  url,
  transactionId,
  orderId,
  totalSheetPrices,
  email
) {
  const transactionRef = database.collection("transaction").doc(email);
  transactionRef
    .set({
      data: sheetAddCart,
      totalPrice: totalSheetPrices,
      email: email,
      transactionId: transactionId,
      orderId: orderId
    })
    .then(function() {
      console.log("Document successfully written!");
      window.location.href = url;
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}

export function createLinePayment(totalSheetPrices) {
  return dispatch => {
    var reservePayment = {
      prices: totalSheetPrices,
      date: Date.now()
    };
    axios
      .post("https://phiyawat-comsci.herokuapp.com/linePay", reservePayment)
      .then(function(response) {
        dispatch({
          type: CREATE_LINE_PAYMENT,
          orderId: reservePayment.date,
          transactionId: response.data.info.transactionId,
          price: totalSheetPrices,
          url: response.data.info.paymentUrl.web,
          message: "กรุณารอสักครู่ระบบกำลังเข้าสู่ line pay"
        });
      });
  };
}
