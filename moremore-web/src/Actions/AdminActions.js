import { auth, database, storage } from "../firebase";
import {
  ADMIN_LOGOUT,
  SIGN_IN_WITH_EMAIL_FOR_ADMIN,
  IS_EDIT,
  GET_ALL_ORDER_FROM_PROFILE,
  CREATE_PDF,
  UPLOAD_IMAGE,
  DELETE_SHEET_NAME,
  RESET_ORDER,
  RESET_MESSAGE,
  GET_ALL_SHEET
} from "./type";
var request = require("request");

export function signInWithEmail(email, password) {
  return dispatch => {
    const signIn = auth.signInWithEmailAndPassword(email, password);
    signIn.catch(error => {
      if (error.message !== "") {
        dispatch({
          type: SIGN_IN_WITH_EMAIL_FOR_ADMIN,
          text: error.message,
          isloggedIn: false
        });
      }
    });
  };
}

export function isAdminLoggedIn() {
  return dispatch => {
    auth.onAuthStateChanged(firebaseUser => {
      const userRef = database
        .collection("user")
        .where("email", "==", firebaseUser.email)
        .where("isadmin", "==", 1);
      if (firebaseUser) {
        userRef.get().then(user => {
          dispatch({
            type: SIGN_IN_WITH_EMAIL_FOR_ADMIN,
            email: user.docs[0].data().email,
            isLoggedIn: true
          });
        });
      }
    });
  };
}

export function createPdf(sheetPdf, sheetName) {
  return dispatch => {
    const fileStorage = storage.ref("file/" + sheetName + "/" + sheetPdf.name);
    const task = fileStorage.put(sheetPdf);
    const fileRef = database.collection("file").doc(sheetName);
    task.on(
      "state_changed",
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch({
          type: CREATE_PDF,
          uploadPdf: progress,
          text: ""
        });
      },
      function(error) {
        // Handle unsuccessful uploads
      },
      function() {
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          fileRef
            .set({
              pdf: downloadURL
            })
            .then(function() {
              dispatch({
                type: CREATE_PDF,
                uploadPdf: 0,
                text: "เพิ่มสินค้า " + sheetName + " เสร็จสิ้น"
              });
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        });
      }
    );
  };
}

export function createImage(image, sheetName) {
  return dispatch => {
    const imageStorage = storage.ref("image/" + sheetName + "/" + image.name);
    const task = imageStorage.put(image);
    const imageRef = database.collection("image").doc(sheetName);
    task.on(
      "state_changed",
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload Image is " + progress + "% done");
        dispatch({
          type: UPLOAD_IMAGE,
          uploadImage: progress
        });
      },
      function(error) {
        // Handle unsuccessful uploads
      },
      function() {
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          imageRef
            .set({
              image: downloadURL
            })
            .then(function() {
              console.log("Document successfully written Image " + image.name);
              dispatch({
                type: UPLOAD_IMAGE,
                uploadImage: 0
              });
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        });
      }
    );
  };
}

export function createSubImage(arrImage, sheetName) {
  const multipleImageData = [];
  let index = 0;
  for (let i = 0; i < arrImage.length; i++) {
    console.log(arrImage.length);
    const image = arrImage[i];
    const multipleImageStorage = storage.ref(
      "subImage/" + sheetName + "/" + image.name
    );
    const task = multipleImageStorage.put(image);
    const multipleImageRef = database.collection("subImage").doc(sheetName);
    task.on(
      "state_changed",
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload Image is " + progress + "% done");
      },
      function(error) {
        console.log(error);
      },
      function() {
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          multipleImageData.push(downloadURL);
          index++;
          if (index === arrImage.length) {
            multipleImageRef
              .set({
                name: sheetName,
                subImage: multipleImageData
              })
              .then(function() {
                console.log("Document successfully written subImage");
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              });
          }
        });
      }
    );
  }
}

export function createProductText(
  sheetName,
  sheetPrice,
  sheetHiLight,
  sheetProductDescription,
  profile
) {
  if (sheetName === "") {
    return;
  }
  sheetPrice = parseInt(sheetPrice, 10);
  const sheetRef = database.collection("product").doc(sheetName);
  sheetRef
    .set({
      price: sheetPrice,
      hiLight: sheetHiLight,
      longDetail: sheetProductDescription,
      profile: profile,
      createAt: new Date()
    })
    .then(() => {
      console.log("Document successfully written Text");
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
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}

export function isEdit(boolean, sheetName) {
  return dispatch => {
    dispatch({
      type: IS_EDIT,
      isEdit: boolean,
      name: sheetName
    });
  };
}

export function getAllOrderFromProfile(month, year) {
  return dispatch => {
    dispatch({
      type: RESET_ORDER,
      data: []
    });
    const sheetRef = database.collection("product");
    const paymentRef = database.collection("payment");
    let count = 0;
    sheetRef.get().then(sheetData => {
      sheetData.docs.forEach(sheet => {
        paymentRef
          .where("name", "==", sheet.id)
          .get()
          .then(payment => {
            count = 0;
            for (let i = 0; i < payment.size; i++) {
              const date = payment.docs[i]
                .data()
                .date.toDate()
                .toString()
                .split(" ");
              if (date[1] === month && date[3] === year) {
                count++;
              }
              if (i === payment.size - 1) {
                dispatch({
                  type: GET_ALL_ORDER_FROM_PROFILE,
                  name: sheet.id,
                  profile: sheet.data().profile,
                  price: sheet.data().price,
                  payment: count,
                  sheetCount: sheetData.docs.length
                });
              }
            }
            if (payment.size === 0) {
              dispatch({
                type: GET_ALL_ORDER_FROM_PROFILE,
                name: sheet.id,
                profile: sheet.data().profile,
                price: sheet.data().price,
                payment: count,
                sheetCount: sheetData.docs.length
              });
            }
          });
      });
    });
  };
}

export function editProduct(
  sheetName,
  sheetPrice,
  sheetHiLight,
  sheetProductDescription,
  profile
) {
  sheetPrice = parseInt(sheetPrice, 10);
  const sheetRef = database.collection("product").doc(sheetName);
  sheetRef
    .set({
      price: sheetPrice,
      hiLight: sheetHiLight,
      longDetail: sheetProductDescription,
      profile: profile
    })
    .then(function() {
      console.log("Document successfully written Text");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}

export function deleteProduct(sheetName, sheetData) {
  return dispatch => {
    const data = [];
    let index = 0;
    sheetData.map(sheet => {
      if (sheet.name !== sheetName) {
        data[index] = {
          name: sheet.name,
          img: sheet.img,
          hiLight: sheet.hiLight,
          price: sheet.price
        };
        index++;
      }
      return null;
    });
    database
      .collection("product")
      .doc(sheetName)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });

    database
      .collection("file")
      .doc(sheetName)
      .delete()
      .then(function() {
        console.log("File successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });

    database
      .collection("image")
      .doc(sheetName)
      .delete()
      .then(function() {
        console.log("Image successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });

    database
      .collection("subImage")
      .doc(sheetName)
      .delete()
      .then(function() {
        console.log("subImage successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
    dispatch({
      type: GET_ALL_SHEET,
      product: data
    });
    dispatch({
      type: DELETE_SHEET_NAME,
      text: "ลบ " + sheetName + " เสร็จสิ้น"
    });
  };
}

export function resetMessage() {
  return dispatch => {
    dispatch({
      type: RESET_MESSAGE
    });
  };
}

export function adminSignOut() {
  return dispatch => {
    auth.signOut();
    dispatch({
      type: ADMIN_LOGOUT,
      isloggedIn: false
    });
  };
}
