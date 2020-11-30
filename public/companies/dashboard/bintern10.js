$(document).ready(function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setTimeout(function () {
        $('.login-cover').hide();
        $('#wrapper').show();
      }, 1000)
      var uid = firebase.auth().currentUser.uid;
      firebase.database().ref('companies/' + uid).once('value').then(function (snapshot) {
        var brOglasi = snapshot.val().moiOglasi;
        if (brOglasi != null && brOglasi != "") {
          $("#brMoiOglasi").text(brOglasi);
        }
        else {
          $("#brMoiOglasi").text("0");
        }
      })
      $("#button").click(function () {

        location.replace("myAds.html#kandidati");

      })
    }
    else {
      location.replace("../../index.html");
    }
  })
})
$("#najava").click(function () {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    //  location.reload();
    location.replace("../../index.html");
  }).catch(function (error) {
    // An error happened.
    alert(error.message)
  });
});