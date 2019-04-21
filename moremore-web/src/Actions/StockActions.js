import { database } from "../firebase";
import axios from "axios";
import {
  GET_BEST_SELLER,
  FIND_SHEET_DATA_WITH_SHEET_NAME,
  GET_ALL_SHEET,
  IS_PAID,
  ADD_SHEET_TO_CART,
  CREATE_SLIDE_IMAGE,
  RESET_IMAGE,
  CREATE_LINE_PAYMENT,
  GET_NEW_ARRIVAL,
  GET_TOTAL_SHEET,
  FIND_SHEET_DATA_WITH_PROFILE,
  BUY_COMPLETE,
  GET_TOTAL_USER_PAYMENT
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

export function getNewArrival() {
  return dispatch => {
    const sheetRef = database.collection("product");
    const imageRef = database.collection("image");
    const sheetArrivalArray = [];
    const newArrivalData = [];
    let index = 0;
    let count = 3;
    sheetRef.get().then(sheetData => {
      sheetData.docs.forEach(sheet => {
        sheetArrivalArray[index] = {
          name: sheet.id,
          createAt: sheet.data().createAt.seconds
        };
        index++;
        if (index === sheetData.size) {
          sheetArrivalArray.sort((min, max) => max.createAt - min.createAt);
          for (let i = 0; i < count; i++) {
            sheetRef
              .doc(sheetArrivalArray[i].name)
              .get()
              .then(sheet => {
                imageRef
                  .doc(sheetArrivalArray[i].name)
                  .get()
                  .then(image => {
                    newArrivalData[i] = {
                      name: sheetArrivalArray[i].name,
                      price: sheet.data().price,
                      hiLight: sheet.data().hiLight,
                      img: image.data().image
                    };
                    if (i === count - 1) {
                      dispatch({
                        type: GET_NEW_ARRIVAL,
                        product: newArrivalData
                      });
                    }
                  });
              });
          }
        }
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
            type: GET_TOTAL_SHEET,
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
              type: GET_ALL_SHEET,
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
                type: GET_TOTAL_SHEET,
                isTyping: 1,
                pageNumber: queryCount
              });
            }
          } else {
            if (i === sheet.docs.length - 1) {
              dispatch({
                type: GET_TOTAL_SHEET,
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
              type: GET_ALL_SHEET,
              product: sheetData
            });
          }
          index++;
        }
        dispatch({
          type: GET_ALL_SHEET,
          product: sheetData
        });
      });
    });
  };
}

export function getTotalUserPayment() {
  return dispatch => {
    const paymentRef = database.collection("payment");
    const emailData = [];
    let index = 0;
    const distinct = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    paymentRef.get().then(paymentData => {
      paymentData.docs.forEach(payment => {
        emailData[index] = payment.data().email;
        index++;
      });
      const uniqueEmailData = emailData.filter(distinct);
      dispatch({
        type: GET_TOTAL_USER_PAYMENT,
        total: uniqueEmailData.length
      });
    });
  };
}

export function findSheetDataWithSheetName(sheetName) {
  return dispatch => {
    const sheetRef = database.collection("product").doc(sheetName);
    const imageRef = database.collection("image").doc(sheetName);
    sheetRef.get().then(sheet => {
      imageRef.get().then(image => {
        dispatch({
          type: FIND_SHEET_DATA_WITH_SHEET_NAME,
          price: sheet.data().price,
          longDetail: sheet.data().longDetail,
          img: image.data().image,
          profile: sheet.data().profile
        });
      });
    });
  };
}

export function findSheetDataWithProfile(profile, sheetName) {
  return dispatch => {
    const sheetRef = database.collection("product");
    const imageRef = database.collection("image");
    const sheetDataArray = [];
    let index = 0;
    let i = 0;
    sheetRef
      .where("profile", "==", profile)
      .get()
      .then(sheetData => {
        sheetData.forEach(sheet => {
          imageRef
            .doc(sheet.id)
            .get()
            .then(image => {
              if (sheet.id !== sheetName) {
                sheetDataArray[index] = {
                  name: sheet.id,
                  price: sheet.data().price,
                  hiLight: sheet.data().hiLight,
                  img: image.data().image
                };
                index++;
                i++;
              } else {
                i++;
              }
              if (i === sheetData.size) {
                dispatch({
                  type: FIND_SHEET_DATA_WITH_PROFILE,
                  product: sheetDataArray
                });
              }
            });
        });
      });
  };
}

export function createSlideImage(sheetName) {
  return dispatch => {
    dispatch({
      type: RESET_IMAGE,
      subImg: [],
      message: ""
    });
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

export function resetImage() {
  return dispatch => {
    dispatch({
      type: RESET_IMAGE
    });
  };
}

export function createSheetforUser(email, sheetName) {
  return dispatch => {
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
          dispatch({
            type: BUY_COMPLETE,
            message: "การสั่งซื้อสินค้าเสร็จสิ้น กรุณาตรวจสอบที่หน้า Profile"
          });
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    });
  };
}

export function resetPayment() {
  return dispatch => {
    dispatch({
      type: IS_PAID,
      message: ""
    });
  };
}

export function addSheetToCart(
  sheetName,
  sheetPrice,
  sheetImage,
  sheetAddCart
) {
  return dispatch => {
    const sheetData = [];
    const sheetNameArray = [];
    let totalSheetPrices = 0;
    sheetAddCart.map((sheet, index) => {
      return (sheetNameArray[index] = sheet.name);
    });

    if (sheetNameArray.indexOf(sheetName) >= 0) {
      alert("คุณเลือกสินค้านี้แล้ว");
      return;
    } else {
      if (sheetAddCart.length === 0) {
        sheetData[0] = { name: sheetName, price: sheetPrice, img: sheetImage };
        totalSheetPrices += sheetPrice;
      } else {
        sheetData[0] = { name: sheetName, price: sheetPrice, img: sheetImage };
        totalSheetPrices += sheetPrice;
        let i = 0;
        sheetAddCart.forEach(sheet => {
          sheetData[i + 1] = {
            name: sheet.name,
            price: sheet.price,
            img: sheet.img
          };
          totalSheetPrices += sheetData[i + 1].price;
          i++;
        });
      }
      dispatch({
        type: ADD_SHEET_TO_CART,
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
        sheetData[i] = {
          name: sheet.name,
          price: sheet.price,
          img: sheet.img
        };
        totalSheetPrices += sheetData[i].price;
        i++;
      }
    });
    dispatch({
      type: ADD_SHEET_TO_CART,
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
    .then(() => {
      console.log("Document successfully written!");
      window.location.href = url;
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}

export function createLinePayment(totalSheetPrices) {
  return dispatch => {
    dispatch({
      type: CREATE_LINE_PAYMENT,
      orderId: "",
      transactionId: "",
      price: 0,
      url: "",
      message: "กรุณารอสักครู่ระบบกำลังเข้าสู่ line pay"
    });
    var reservePayment = {
      prices: totalSheetPrices,
      date: Date.now()
    };
    axios
      .post("https://phiyawat-comsci.herokuapp.com/linePay", reservePayment)
      .then(function(response) {
        console.log(response);
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
