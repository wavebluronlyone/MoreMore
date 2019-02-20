import { auth, database } from "../firebase";
import firebase from "firebase";
import {
  SIGN_IN_WITH_EMAIL,
  FIND_PROFILE_WITH_EMAIL,
  FIND_PDF_WITH_EMAIL,
  RESET_USER,
  GET_SHEET_GROUP,
  GET_TOTAL_PAYMENT,
  FIND_PDF_WITH_SHEET_NAME,
  RESET_SHEET_PDF,
  RESET_MESSAGE,
  LOGOUT
} from "./type";
import axios from "axios";

export function signInWithEmail(email, password) {
  return dispatch => {
    const signIn = auth.signInWithEmailAndPassword(email, password);
    signIn.catch(error => {
      if (error.message !== "") {
        dispatch({
          type: SIGN_IN_WITH_EMAIL,
          text: error.message,
          isloggedIn: false
        });
      }
    });
  };
}

export function signInWithFacebook(accessToken, image) {
  return dispatch => {
    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
      accessToken
    );
    const signIn = auth.signInWithCredential(facebookCredential);
    signIn
      .then(user => {
        const userRef = database.collection("user").doc(user.email);
        userRef
          .set({
            email: user.email,
            user: user.displayName,
            image: image,
            isadmin: 0
          })
          .then(() => {
            console.log("Document successfully written!");
            dispatch({
              type: SIGN_IN_WITH_EMAIL,
              email: user.email,
              isloggedIn: true
            });
          })
          .catch(error => {
            console.error("Error writing document: ", error);
          });
      })
      .catch(error => {
        if (error.message !== "") {
          dispatch({
            type: SIGN_IN_WITH_EMAIL,
            text: error.message,
            isloggedIn: false
          });
        }
      });
  };
}

export function registerWithEmail(email, password, confirmPassword, user) {
  return dispatch => {
    if (password !== confirmPassword) {
      dispatch({
        type: SIGN_IN_WITH_EMAIL,
        text: "กรุณากรอกรหัสผ่านให้ตรงกัน"
      });
    } else {
      const register = auth.createUserWithEmailAndPassword(email, password);
      const userRef = database.collection("user").doc();
      register
        .then(() => {
          userRef
            .set({
              email: email,
              user: user,
              isadmin: 0
            })
            .then(() => {
              console.log("Document successfully written!");
              dispatch({
                type: SIGN_IN_WITH_EMAIL,
                text: "Register เสร็จสิ้น"
              });
            })
            .catch(error => {
              console.error("Error writing document: ", error);
            });
        })
        .catch(error => {
          console.log(error.message);
          dispatch({
            type: SIGN_IN_WITH_EMAIL,
            text: error.message
          });
        });
    }
  };
}

export function sendEmailToResetPassword(email) {
  return dispatch => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch({
          type: SIGN_IN_WITH_EMAIL,
          text: "ส่งอีเมลเสร็จสิ้น กรุณาตรวจสอบที่อีเมลของคุณ"
        });
      })
      .catch(error => {
        if (
          error.toString().indexOf("The email address is badly formatted") >= 0
        ) {
          alert(
            "email isn't formatted maybe you should type (email@example.com)"
          );
        }
      });
  };
}

export function isLoggedIn() {
  return dispatch => {
    auth.onAuthStateChanged(firebaseUser => {
      const userRef = database
        .collection("user")
        .where("email", "==", firebaseUser.email)
        .where("isadmin", "==", 0);
      if (firebaseUser) {
        userRef.get().then(user => {
          dispatch({
            type: SIGN_IN_WITH_EMAIL,
            email: user.docs[0].data().email,
            isloggedIn: true
          });
        });
      }
    });
  };
}

export function findProfileWithEmail(email) {
  if (email === undefined) {
    return dispatch => {
      dispatch({
        type: SIGN_IN_WITH_EMAIL,
        isloggedIn: false
      });
    };
  } else {
    return dispatch => {
      const userRef = database.collection("user").where("email", "==", email);
      userRef.get().then(userData => {
        userData.docs.forEach(user => {
          dispatch({
            type: FIND_PROFILE_WITH_EMAIL,
            myUser: user.data().user,
            image: user.data().image
          });
        });
      });
    };
  }
}

export function getSheetDataFromAddCart(email, transactionId) {
  if (email === undefined) {
    return dispatch => {
      dispatch({
        type: SIGN_IN_WITH_EMAIL,
        isloggedIn: false
      });
    };
  } else {
    return dispatch => {
      const transactionRef = database
        .collection("transaction")
        .where("email", "==", email);
      transactionRef.get().then(transactionData => {
        transactionData.docs.forEach(transaction => {
          let transactionNumber = transactionId.split("=");
          let confirmTransactionData = {
            transactionId: transactionNumber[1],
            prices: transaction.data().totalPrice
          };
          axios
            .post(
              "https://phiyawat-comsci.herokuapp.com/confirm",
              confirmTransactionData
            )
            .then(function(response) {
              if (
                response.data.info.transactionId ===
                transaction.data().transactionId
              ) {
                dispatch({
                  type: GET_SHEET_GROUP,
                  product: transaction.data().data
                });
              }
            });
          database
            .collection("transaction")
            .doc(email)
            .delete()
            .then(function() {
              console.log("Document successfully deleted!");
            })
            .catch(function(error) {
              console.error("Error removing document: ", error);
            });
        });
      });
    };
  }
}

export function findPdfWithSheetName(sheetName, email) {
  if (email === undefined) {
    return dispatch => {
      dispatch({
        type: SIGN_IN_WITH_EMAIL,
        isloggedIn: false
      });
    };
  }
  return dispatch => {
    const paymentRef = database
      .collection("payment")
      .where("email", "==", email)
      .where("name", "==", sheetName);
    paymentRef.get().then(paymentData => {
      paymentData.docs.forEach(payment => {
        dispatch({
          type: FIND_PDF_WITH_SHEET_NAME,
          product: payment.data().pdf
        });
      });
    });
  };
}

export function findPdfWithEmailFromPagination(currentPage, limitPage, email) {
  if (email === undefined) {
    return dispatch => {
      dispatch({
        type: SIGN_IN_WITH_EMAIL,
        isloggedIn: false
      });
    };
  } else {
    return dispatch => {
      const paymentRef = database
        .collection("payment")
        .where("email", "==", email);
      const sheetData = [];
      let index = 0;
      let startPage = currentPage * limitPage - limitPage;
      let endPage = startPage + limitPage;
      paymentRef.get().then(payment => {
        for (let i = startPage; i < endPage; i++) {
          dispatch({
            type: GET_TOTAL_PAYMENT,
            pageNumber: payment.docs.length
          });
          sheetData[index] = { name: payment.docs[i].data().name };
          index++;
          if (index === limitPage || i === payment.docs.length - 1) {
            dispatch({
              type: FIND_PDF_WITH_EMAIL,
              product: sheetData
            });
          }
        }
      });
    };
  }
}

export function resetSheetPdf() {
  return dispatch => {
    dispatch({
      type: RESET_SHEET_PDF,
      pdf: ""
    });
  };
}

export function resetData() {
  return dispatch => {
    dispatch({
      type: RESET_USER
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

export function signOut() {
  return dispatch => {
    auth.signOut();
    dispatch({
      type: LOGOUT
    });
    dispatch({
      type: SIGN_IN_WITH_EMAIL,
      isLoggedIn: false
    });
  };
}
