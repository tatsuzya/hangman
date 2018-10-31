var config = {
  apiKey: "AIzaSyCMNI2NzZ40-5kmz5EyE2PQKg0Qd01ilbA",
  authDomain: "hangman-40aa1.firebaseapp.com",
  databaseURL: "https://hangman-40aa1.firebaseio.com",
  projectId: "hangman-40aa1",
  storageBucket: "hangman-40aa1.appspot.com",
  messagingSenderId: "794869880727"
};
firebase.initializeApp(config);

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
