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
var request = require("request");

export function getBestSeller(limitPage) {
  return dispatch => {
    const sheetRef = database.collection("product");
    const imageRef = database.collection("image");
    const bestSellerSheetData = [];
    const count = limitPage;
    axios.post("https://poomrokc.services:4242/best", {}).then(response => {
      if (response.data.success) {
        for (let i = 0; i < response.data.info.length; i++) {
          sheetRef
            .doc(response.data.info[i])
            .get()
            .then(sheet => {
              imageRef
                .doc(sheet.id)
                .get()
                .then(image => {
                  const dat = sheet.data();
                  bestSellerSheetData.push({
                    name: sheet.id,
                    price: dat.price,
                    hiLight: dat.hiLight,
                    img: image.data().image
                  });
                  if (bestSellerSheetData.length === count) {
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
  };
}

export function getNewArrival(limitPage) {
  return dispatch => {
    const sheetRef = database.collection("product");
    const imageRef = database.collection("image");
    const newArrivalData = [];
    let count = limitPage;
    sheetRef
      .orderBy("createAt", "desc")
      .limit(count)
      .get()
      .then(sheetData => {
        sheetData.docs.forEach(sheet => {
          imageRef
            .doc(sheet.id)
            .get()
            .then(image => {
              const dat = sheet.data();
              newArrivalData.push({
                name: sheet.id,
                price: dat.price,
                hiLight: dat.hiLight,
                img: image.data().image
              });
              if (newArrivalData.length === count) {
                dispatch({
                  type: GET_NEW_ARRIVAL,
                  product: newArrivalData
                });
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
    let count = 0;
    axios
      .post("https://poomrokc.services:4242/sheetlist", {})
      .then(response => {
        if (response.data.success) {
          var sheets = response.data.info;
          var count = Math.max(
            Math.min(sheets.length - startPage, endPage - startPage),
            0
          );
          for (var i = startPage; i < endPage && i < sheets.length; i++) {
            dispatch({
              type: GET_TOTAL_SHEET,
              isTyping: 0,
              pageNumber: sheets.length
            });
            sheetRef
              .doc(sheets[i])
              .get()
              .then(sheet => {
                imageRef
                  .doc(sheet.id)
                  .get()
                  .then(image => {
                    var dat = sheet.data();
                    if (dat === undefined) {
                      count--;
                      if (sheetData.length === count) {
                        dispatch({
                          type: GET_ALL_SHEET,
                          product: sheetData
                        });
                      }
                      return;
                    }
                    sheetData.push({
                      name: sheet.id,
                      price: dat.price,
                      hiLight: dat.hiLight,
                      img: image.data().image
                    });
                    if (sheetData.length === count) {
                      dispatch({
                        type: GET_ALL_SHEET,
                        product: sheetData
                      });
                    }
                  });
              });
          }
        }
      });
  };
}

export function findSheetDataWithPaginationFromSearch(
  currentPage,
  limitPage,
  input
) {
  return dispatch => {
    console.log(input);
    input = input.toUpperCase();
    const sheetRef = database.collection("product");
    const imageRef = database.collection("image");
    const sheetData = [];
    let count = 0;
    let startPage = currentPage * limitPage - limitPage;
    let endPage = startPage + limitPage;
    axios
      .post("https://poomrokc.services:4242/sheetlist", {})
      .then(response => {
        if (response.data.success) {
          const sheetprev = response.data.info;
          const sheets = [];
          for (let i = 0; i < sheetprev.length; i++)
            if (sheetprev[i].toUpperCase().indexOf(input) >= 0)
              sheets.push(sheetprev[i]);
          let count = Math.max(
            Math.min(sheets.length - startPage, endPage - startPage),
            0
          );
          if (count === 0) {
            dispatch({
              type: GET_TOTAL_SHEET,
              isTyping: 1,
              pageNumber: sheets.length
            });
            dispatch({
              type: GET_ALL_SHEET,
              product: sheetData,
              input
            });
            return;
          }
          for (let i = startPage; i < endPage && i < sheets.length; i++) {
            dispatch({
              type: GET_TOTAL_SHEET,
              isTyping: 1,
              pageNumber: sheets.length
            });
            sheetRef
              .doc(sheets[i])
              .get()
              .then(sheet => {
                imageRef
                  .doc(sheet.id)
                  .get()
                  .then(image => {
                    const dat = sheet.data();
                    if (dat === undefined) {
                      count--;
                      if (sheetData.length === count) {
                        console.log("---------------->");
                        console.log(sheetData);
                        dispatch({
                          type: GET_ALL_SHEET,
                          product: sheetData
                        });
                      }
                      return;
                    }
                    sheetData.push({
                      name: sheet.id,
                      price: dat.price,
                      hiLight: dat.hiLight,
                      img: image.data().image
                    });
                    if (sheetData.length === count) {
                      console.log("<----------------");
                      console.log(sheetData);
                      dispatch({
                        type: GET_ALL_SHEET,
                        product: sheetData,
                        input
                      });
                    }
                  });
              });
          }
        }
      });
  };
}

export function getTotalUserPayment() {
  return dispatch => {
    axios.post("https://poomrokc.services:4242/num", {}).then(response => {
      if (response.data.success) {
        dispatch({
          type: GET_TOTAL_USER_PAYMENT,
          total: response.data.info
        });
      }
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
    var headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    var dataString = {
      ID: "5cc770ee2df95d22dfdcdcc0",
      sheets: JSON.stringify([sheetName])
    };
    request({
      url: "https://poomrokc.services:4242/ac",
      method: "POST",
      headers: headers,
      form: dataString
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
      //console.log("Document successfully written!",url);
      window.location.href = url;
      return false;
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

export function createPromptPay(fourDigit, totalSheetPrices, time) {
  return dispatch => {
    dispatch({
      type: CREATE_LINE_PAYMENT,
      orderId: "",
      transactionId: "",
      price: 0,
      url: "loading",
      message: "กรุณารอสักครู่ระบบกำลังเชื่อมต่อ PromptPay"
    });
    var reservePayment = {
      prices: totalSheetPrices,
      fourDigit,
      amount: totalSheetPrices,
      time,
      date: Date.now()
    };
    axios
      .post("https://phiyawat-comsci.herokuapp.com/promptPay", reservePayment)
      .then(function(response) {
        if (response.data.success)
          dispatch({
            type: CREATE_LINE_PAYMENT,
            orderId: reservePayment.date,
            transactionId: response.data.trans,
            price: totalSheetPrices,
            url: "/BuyComplete?transactionId=" + response.data.trans,
            message: "กรุณารอสักครู่ระบบกำลังเข้าสู่ Promptpay"
          });
        else
          dispatch({
            type: CREATE_LINE_PAYMENT,
            orderId: reservePayment.date,
            transactionId: "",
            price: totalSheetPrices,
            url: "error",
            message: "กรุณารอสักครู่ระบบกำลังเข้าสู่ Promptpay"
          });
      });
  };
}
