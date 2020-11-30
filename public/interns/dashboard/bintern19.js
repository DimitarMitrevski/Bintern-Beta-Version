
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var uid = firebase.auth().currentUser.uid;
    var query = firebase.database().ref("students").orderByKey();
    query.once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var key = childSnapshot.key;
          var brPokani = childSnapshot.val().brPokani;
          var videno = childSnapshot.val().videno;
          var imePraktikant = childSnapshot.val().ImePrezime;
          var praktikantMail = childSnapshot.val().email;
          if (uid == key) {
            $("#wrapper").css("display", "block");
            var dialog = document.querySelector('#loginDialog');
            if (!dialog.showModal) {
              dialogPolyfill.registerDialog(dialog);
            }
            dialog.close();
            $(".login-cover").hide();
            firebase.database().ref().once('value').then(function (snapshot) {
              var brOglasi = snapshot.val().broglasi;

              if (brOglasi != null && brOglasi != "") {
                $("#brOglasi").text(brOglasi);
              }
              else {
                $("#brOglasi").text(0);
              }
            });
            if (brPokani != null && brPokani != 0) {
              $("#pokani").text(brPokani);
              $("#marketer1").text("Имате покани на оглас од комапнии, видете ги!").css({ "color": "black", "font-weight": "bold", "font-size": "16px" });
              $("#vidiPokani").click(function () {
                if (window.screen.width <= 430) {
                  $("#wrapper").css({ "height": "3800px" });
                }
                $(".cover").show();
                $('html').scrollTop(0);
                var videnoRef = firebase.database().ref('students/' + uid + '/videno');
                videnoRef.set(1);
              });
              $("#izlezi").click(function () {
                $(".cover").hide();
                if (window.screen.width <= 430) {
                  $("#wrapper").css({ "height": "1600px" });
                }
              });
              $("#nazad").click(function () {
                $(".cover1").hide();
                for (let j = 1; j <= 12; j++) {
                  $(".oglas" + j).hide();
                  $("#kopce" + j).show();
                }
              });
              setTimeout(function () {
                if (videno == 0) {
                  if (confirm("Имате покана на оглас проверете подолу во делот покани од компании")) {
                    $("html").scrollTop(0);
                    $("#vidiPokani").css({ "font-size": "16px" });
                    $(".cover").show();
                  }
                }

              }, 2000)
              for (let i = 1; i <= brPokani; i++) {
                firebase.database().ref('students/' + uid + '/pokana_' + i).once('value').then(function (snapshot) {
                  $(".pokana" + i).show();
                  var kompanija = snapshot.val();
                  firebase.database().ref('companies/' + kompanija).once('value').then(function (snapshot) {
                    var imeFirma = snapshot.val().imeFirma;
                    var slika = snapshot.val().logo;
                    var industr = snapshot.val().industrija;
                    var opis = snapshot.val().textarea;
                    var brOglasi = snapshot.val().moiOglasi;
                    var email = snapshot.val().email;
                    $("#ime" + i).text(imeFirma);
                    if (slika != null) {
                      document.getElementById("slika" + i).src = slika;
                    }
                    $("#industr" + i).text(industr);
                    $("#para" + i).text(opis);
                    $("#brOglasite" + i).text(brOglasi).css({ "all": "unset", "padding-left": "4px" });
                    $("#button" + i).click(function () {
                      console.log(i);
                      var videnoRef = firebase.database().ref('students/' + uid + '/videno');
                      videnoRef.set(1);
                      $(".cover1").show();
                      $("#kompanija").text(imeFirma);
                      for (let i = 1; i <= brOglasi; i++) {
                        $(".oglas" + i).show();
                        firebase.database().ref('companies/' + kompanija + "/oglas_" + i).once('value').then(function (snapshot) {
                          var opisPraksata = snapshot.val().opisPraksata;
                          var pozicija = snapshot.val().pozicija;
                          var brAplikanti = snapshot.val().brojAplikanti;
                          var brojNaOglas = snapshot.val().brojNaOglas;
                          $("#pozicija" + i).text(pozicija);
                          $("#praksa" + i).text(opisPraksata);
                          firebase.database().ref('oglasi/' + "oglas_" + brojNaOglas + '/vremetraenje').once('value').then(function (snapshot) {
                            var datumObjavuvnje = snapshot.val().od;
                            $("#datumObjavuvanje" + i).text(datumObjavuvnje);
                          })
                          for (let j = 1; j <= brAplikanti; j++) {
                            firebase.database().ref('companies/' + kompanija + "/oglas_" + i + "/aplikant_" + j).once('value').then(function (snapshot) {
                              var aplikant = snapshot.val();
                              if (uid == aplikant) {
                                $("#kopce" + i).hide();
                              }
                            })

                          }
                          $("#kopce" + i).click(function () {
                            $(this).hide();
                            $("#opacity").show();
                            $('#message').show();
                            if (brAplikanti == null)
                              brAplikanti = 0;
                            brAplikanti++;
                            console.log(kompanija);
                            console.log(brAplikanti);
                            var aplikantRef = firebase.database().ref('companies/' + kompanija + '/oglas_' + i + '/aplikant_' + brAplikanti);
                            aplikantRef.set(uid);
                            var brAplikantiRef = firebase.database().ref('companies/' + kompanija + '/oglas_' + i + '/brojAplikanti');
                            brAplikantiRef.set(brAplikanti);
                            var oglasRef = firebase.database().ref('oglasi/' + 'oglas_' + brojNaOglas + '/brojAplikanti');
                            oglasRef.set(brAplikanti);
                            firebase.database().ref('students/' + kompanija).once('value').then(function (snapshot) {

                              var sendEmailNotificationToCompany = firebase.functions().httpsCallable('sendEmailNotificationToCompany');
                              sendEmailNotificationToCompany({ email: email, imePraktikant: imePraktikant, praktikantMail: praktikantMail, pozicija: pozicija }).then(function (result) {

                                window.alert("Успешно аплициравте на огласот");
                                setTimeout(function () {
                                  $("#opacity").hide();
                                  $('#message').hide();
                                }, 4500);
                              }).catch(function (error) {
                                var code = error.code;
                                var message = error.message;
                                var details = error.details;
                                // [START_EXCLUDE]
                                console.error('There was an error when calling the Cloud Function', error);
                                window.alert('There was an error when calling the Cloud Function:\n\nError Code: '
                                  + code + '\nError Message:' + message + '\nError Details:' + details);
                              });


                            })
                          })

                        })

                      }
                    })
                  });
                }).catch(function () { $('#najava').trigger('click') });


              }
            }
            else {
              $("#marketer1").text("Сеуште немате покани на оглас од компании");
              $("#pokani").text('0');
            }

          }
        });
      });
  }
  else {
    // No user is signed in.
    $(".login-cover").show();

    var dialog = document.querySelector('#loginDialog');
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();

    //location.replace("../../index.html");
  }
})

$("#najava").click(function () {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    location.reload();
    // location.replace("../../index.html");
  }).catch(function (error) {
    // An error happened.
    alert(error.message)
  });
});
//   Login Process
$("#loginBtn").click(
  function () {
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    if (email != "" && password != "") {
      $("#loginProgress").show();
      $("#loginBtn").hide();

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {

        $("#loginError").show().text(error.message);
        $("#loginProgress").hide();
        $("#loginBtn").show();

      });

    }
  }
);
function inputKeyUp(e) {
  e.which = e.which || e.keyCode;
  if (e.which == 13) {
    $("#loginPassword").focus();
  }
}
function inputKeyUp1(e) {
  e.which = e.which || e.keyCode;
  if (e.which == 13) {
    $("#loginBtn").trigger("click");
  }
}




















