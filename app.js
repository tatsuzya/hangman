(function() {
  var config = {
    apiKey: "AIzaSyCMNI2NzZ40-5kmz5EyE2PQKg0Qd01ilbA",
    authDomain: "hangman-40aa1.firebaseapp.com",
    databaseURL: "https://hangman-40aa1.firebaseio.com",
    projectId: "hangman-40aa1",
    storageBucket: "hangman-40aa1.appspot.com",
    messagingSenderId: "794869880727"
  };
  firebase.initializeApp(config);

  const txtEmail = document.getElementById('txtEmail');
  const txtPass = document.getElementById('txtPass');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const btnLogout = document.getElementById('btnLogout');

  // add login event
  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPass.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => document.getElementById('msg').innerHTML = "" + e.message);
  });

  // add login event
  btnSignup.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPass.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => document.getElementById('msg').innerHTML = "" + e.message);
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  // add realtime addEventListener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log("logged in");
      btnLogout.style.display = "block";
      //window.location.href ="hangman.html";
    } else {
      console.log('not logged in');
      btnLogout.style.display = "none";
    }
  });
}());
