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

  // const var for elements
  const txtUser = document.getElementById('txtUser');
  const txtPass = document.getElementById('txtPass');
  const txtEmail = document.getElementById('txtEmail');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const btnLogout = document.getElementById('btnLogout');
  const btnSave = document.getElementById('save');
  const btnRank = document.getElementById('ranking');
  const newUser = document.getElementById('new');
  const oldUser = document.getElementById('exist');
  const user = document.getElementById('user');

  // function for test.html
  if (window.location.href.match('test.html') != null) {

    // add new event
    newUser.addEventListener('click', e => {
      newUser.style.display = "none";
      btnLogin.style.display = "none";
      btnSignup.style.display = "block";
      oldUser.style.display = "block";
      user.style.display = "block";
      e.preventDefault();
    });

    // add exist event
    oldUser.addEventListener('click', e => {
      oldUser.style.display = "none";
      btnLogin.style.display = "block";
      btnSignup.style.display = "none";
      newUser.style.display = "block";
      user.style.display = "none";
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
          displayName: "" + username,
        })
      });
      promise.catch(e => document.getElementById('msg').innerHTML = "" + e.message);
    });
  }

  // funcion for hangmant.html
  if (window.location.href.match('hangman.html') != null) {
    // add logout event
    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
    });

    // add save event
    btnSave.addEventListener('click', e => {
      var user = firebase.auth().currentUser;
      firebase.database().ref('users/' + user.uid).set({
        name: user.displayName,
        score: score
      });
    });

    // add rank event
    btnRank.addEventListener('click', e => {
      window.location.href = "ranking.html";
    });
  }

  if(window.location.href.match('ranking.html')!= null){
    
  }

  // add realtime addEventListener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log("logged in");
      console.log(firebaseUser.displayName);
      if (window.location.href.match('test.html') != null) {
        window.location.href = "hangman.html";
      }
      if (window.location.href.match('hangman.html') != null) {
        document.getElementById('displayname').innerHTML = "Welcome! " + firebaseUser.displayName;
        var user = firebase.auth().currentUser;
        var ref = firebase.database().ref('users/' + user.uid);
        ref.on("value", snapshot => {
          console.log("" + score);
          score = snapshot.val().score;
          document.getElementById('score').innerHTML = "score: " + score;
        });
      }
    } else {
      console.log('not logged in');
      if (window.location.href.match('hangman.html') != null) {
        window.location.href = "test.html";
      }
    }
  });
}());
