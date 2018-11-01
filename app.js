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

  const txtUser = document.getElementById('txtUser');
  const txtPass = document.getElementById('txtPass');
  const txtEmail = document.getElementById('txtEmail');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const btnLogout = document.getElementById('btnLogout');
  const newUser = document.getElementById('new');
  const oldUser = document.getElementById('exist');

  // add new event
  newUser.addEventListener('click', e => {
    newUser.style.display = "none";
    btnLogin.style.display = "none";
    btnSignup.style.display = "block";
    oldUser.style.display = "block";
    e.preventDefault();
  });

  // add exist event
  oldUser.addEventListener('click', e => {
    oldUser.style.display = "none";
    btnLogin.style.display = "block";
    btnSignup.style.display = "none";
    newUser.style.display = "block";
    e.preventDefault();
  });

  // add login event
  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPass.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => document.getElementById('msg').innerHTML = "" + e.message);
  });

  // add sign up event
  btnSignup.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPass.value;
    const username = txtUser.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.then(e => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName:"" + username,
      })
    });
    promise.catch(e => document.getElementById('msg').innerHTML = "" + e.message);

  });

  // add logout event
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  // add realtime addEventListener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log("logged in");
      console.log(firebaseUser.displayName);
      //window.location.href ="hangman.html";
    } else {
      console.log('not logged in');
      //window.location.href ="test.html";
    }
  });
}());
