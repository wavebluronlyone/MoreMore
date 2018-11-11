import { auth, database, storage } from "../firebase";
import {
  ADMIN_LOGOUT,
  SIGN_IN_WITH_EMAIL_FOR_ADMIN,
  GET_ALL_PRODUCT,
  IS_EDIT
} from "./type";

export function signInWithEmail(email, pass) {
  return dispatch => {
    const signIn = auth.signInWithEmailAndPassword(email, pass);
    signIn.catch(e => {
      if (e.message !== "") {
        dispatch({
          type: SIGN_IN_WITH_EMAIL_FOR_ADMIN,
          text: e.message,
          isloggedIn: false
        });
      }
    });
  };
}

export function isLoggedIn() {
  return dispatch => {
    auth.onAuthStateChanged(firebaseUser => {
      const docRef = database
        .collection("user")
        .where("email", "==", firebaseUser.email)
        .where("isadmin", "==", 1);
      if (firebaseUser) {
        docRef.get().then(snapshot => {
          snapshot.docs.forEach(doc => {
            dispatch({
              type: SIGN_IN_WITH_EMAIL_FOR_ADMIN,
              isloggedIn: true
            });
          });
        });
      }
    });
  };
}

export function createPdf(pdf, sheetName) {
  const fileRef = storage.ref("file/" + pdf.name);
  const task = fileRef.put(pdf);
  const pdfRef = database.collection("file").doc(sheetName);

  task.on(
    "state_changed",
    function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload Pdf is " + progress + "% done");
    },
    function(error) {
      // Handle unsuccessful uploads
    },
    function() {
      task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        pdfRef
          .set({
            image: downloadURL
          })
          .then(function() {
            console.log("Document successfully written " + pdf.name);
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
      });
    }
  );
}

export function createImage(img, sheetName) {
  const imageRef = storage.ref("image/" + img.name);
  const task = imageRef.put(img);
  const imgRef = database.collection("image").doc(sheetName);

  task.on(
    "state_changed",
    function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload Image is " + progress + "% done");
    },
    function(error) {
      // Handle unsuccessful uploads
    },
    function() {
      task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        imgRef
          .set({
            image: downloadURL
          })
          .then(function() {
            console.log("Document successfully written Image " + img.name);
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
      });
    }
  );
}

export function createProductText(
  sheetName,
  price,
  hiLight,
  longDetail,
  profile
) {
  price = parseInt(price);
  const docRef = database.collection("product").doc(sheetName);
  docRef
    .set({
      price: price,
      hiLight: hiLight,
      longDetail: longDetail,
      profile: profile
    })
    .then(function() {
      console.log("Document successfully written Text");
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

export function editProduct(sheetName, price, hiLight, longDetail, profile) {
  price = parseInt(price);
  const docRef = database.collection("product").doc(sheetName);
  docRef
    .set({
      price: price,
      hiLight: hiLight,
      longDetail: longDetail,
      profile: profile
    })
    .then(function() {
      console.log("Document successfully written Text");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}

export function deleteProduct(name) {
  database
    .collection("product")
    .doc(name)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });

  database
    .collection("file")
    .doc(name)
    .delete()
    .then(function() {
      console.log("File successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });

  database
    .collection("image")
    .doc(name)
    .delete()
    .then(function() {
      console.log("Image successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
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
