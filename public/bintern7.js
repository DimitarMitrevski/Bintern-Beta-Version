var mainApp = {};
(function () {
  var firebase = app_fireBase;
  var uid = null;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      uid = user.uid;
    }
    else {
      uid = null;
      window.location.replace("bintern7.html");
    }
  });

  function logOut() {
    firebase.auth().singOut()
  }

  mainApp.logOut = logOut;

}) 