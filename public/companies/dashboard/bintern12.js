firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var uid = firebase.auth().currentUser.uid;
    var emailVerified = user.emailVerified;
    var br = 0;
    var imeFirma, firmaMail;
    var uniqueNames = [];
    var keys = [];
    setTimeout(function () {
      $('.login-cover').hide();
      $('#wrapper').show();
    }, 2000);
    //TO DO SHOW ADS ON FIlTER CHANGE
    function unique(niza, identifier) {
      var uniqueNames = [];
      $.each(niza, function (i, el) {
        if ($.inArray(el, uniqueNames) === -1) {
          uniqueNames.push(el);
          $(identifier).append("<option value='" + `${el}` + "'>" + `${el}` + "</option>");
        }
      });
    }
    firebase.database().ref("students").once("value").then(function (snapshot) {
      var niza = [];
      var niza2 = [];
      var niza1 = [];
      var obj = snapshot.val();
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (obj[key]['pozicija'] != null && obj[key]['pozicija'].length > 3) {
            var val = obj[key]['pozicija'];
            niza.push(val.toUpperCase());
          }
          if (obj[key]['fakultet'] != null) {
            niza2.push(obj[key]['fakultet'].toUpperCase());
          }
          if (obj[key]['univerzitet'] != null) {
            niza1.push(obj[key]['univerzitet'].toUpperCase());
          }
        }
      }
      unique(niza, ".pozicija");
      unique(niza2, ".fakultet");
      unique(niza1, ".univerzitet");
    });


    function deleteArrayElement(keys, key) {
      var index = keys.indexOf(key);
      if (index > -1) {
        keys.splice(index, 1);
        $("div#" + key).hide();
      }
    }
    var b = 0;
    $(".pozicija").on("change", function () {
      var pozicija = this.value;
      var fakultet = document.querySelector(".fakultet").value;
      var univerzitet = document.querySelector(".univerzitet").value;
      var fak, uni;
      if (pozicija != "" || fakultet != "" || univerzitet != "") {
        $("html").scrollTop("140");
        for (let i = 1; i <= 6; i++) {
          $(".aktivni" + i).hide();
        }
        firebase.database().ref("students").once("value").then(function (snapshot) {
          var obj = snapshot.val();
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              var val = obj[key]['pozicija'];
              if (obj[key]["fakultet"] != undefined)
                fak = obj[key]["fakultet"].toUpperCase();
              else
                fak = "";
              if (obj[key]["univerzitet"] != undefined)
                uni = obj[key]["univerzitet"].toUpperCase();
              else
                uni = "";
              if ((val.toUpperCase() == pozicija && pozicija != "") || (fakultet == fak && fakultet != "") || (univerzitet == uni && univerzitet != "")) {
                b++;
                keys.push(key);
                console.log(obj[key]["fakultet"] + fak + " " + obj[key]["ImePrezime"]);
                $(".aktivni7").hide();

                $.each(keys, function (i, el) {
                  if ($.inArray(key, uniqueNames) === -1) {
                    uniqueNames.push(key);
                    var div = document.createElement("div");
                    var div1 = document.createElement("div");
                    var div2 = document.createElement("div");
                    var br = document.createElement("br");
                    var h51 = document.createElement("h5");
                    var h52 = document.createElement("h5");
                    var p = document.createElement("p");
                    var p1 = document.createElement("p");
                    var a = document.createElement("a");
                    var img = document.createElement("img");
                    var header = document.createElement("header");
                    var hr = document.createElement("hr");
                    var button = document.createElement("button");
                    button.className = "w3-button w3-block w3-dark-grey";
                    header.className = "w3-container w3-light-grey";
                    h52.className = "mt-0";
                    a.className = "streched-link";
                    h52.id = "marketer1";
                    img.className = "w3-left w3-circle w3-margin-right";
                    img.style = "width: 95px; height:95px;";
                    img.alt = obj[key]["ImePrezime"];
                    div.className = "col mb-3 w3-container animate__animated animate__zoomIn";
                    div.id = key;
                    div1.className = "w3-card-4";
                    div2.className = "w3-container";
                    p.className = "marketer";
                    p1.className = "paragraf";
                    button.id = "kopce" + b;
                    button.value = key;
                    var node = document.createTextNode(obj[key]['ImePrezime']);
                    var node1 = document.createTextNode(obj[key]['pozicija']);
                    var node2 = document.createTextNode(obj[key]['Opis'].substring(0, 155) + '...');
                    var node3 = document.createTextNode("Види профил");
                    if (obj[key]['slika'] != null)
                      img.src = obj[key]['slika'];
                    else
                      img.src = "man.png";
                    a.href = "../../company-profile.html?" + key;
                    a.target = "_blank";
                    button.appendChild(node3);
                    p.appendChild(node1);
                    p1.appendChild(node2);
                    h51.appendChild(node);
                    header.append(img);
                    header.append(h51);
                    div2.append(p);
                    div2.append(hr);
                    div2.append(p1);
                    div2.append(br);
                    div1.append(header);
                    div1.append(div2);
                    div1.append(button);
                    div.append(div1);
                    document.querySelector("#row").append(div);
                  }
                });
                $("#kopce" + b).on().off().click(function () {
                  window.open("../../intern-profile.html?" + this.value, "_blank");
                });
              }
              else {
                deleteArrayElement(keys, key)
                deleteArrayElement(uniqueNames, key);

              }
              // for (let j = 1; j <= b; j++) {
              //   $("#kopce" + j).on().off().click(function () {
              //     window.open("../../intern-profile.html?" + this.value, "_blank");
              //   });
              // }
            }
          }

        });
      }
      else {
        location.reload();
      }
    });
    $(".fakultet").on("change", function () {
      $(".pozicija").trigger("change");
    });
    $(".univerzitet").on("change", function () {
      $(".pozicija").trigger("change");
    });

    function sendEmail(email, imeFirma, firmaMail, childData) {
      var sendEmailNotification = firebase.functions().httpsCallable('sendEmailNotification');
      sendEmailNotification({ email: email, imeFirma: imeFirma, firmaMail: firmaMail, imePraktikant: childData }).then(function (result) {

        window.alert("Вашата покана е успешно испратена до кандидатот.");
      }).catch(function (error) {
        var code = error.code;
        var message = error.message;
        var details = error.details;
        // [START_EXCLUDE]
        console.error('There was an error when calling the Cloud Function', error);
        window.alert('There was an error when calling the Cloud Function:\n\nError Code: '
          + code + '\nError Message:' + message + '\nError Details:' + details);
      })
    }
    firebase.database().ref('companies/' + uid).once('value').then(function (snapshot) {
      imeFirma = snapshot.val().imeFirma;
      firmaMail = snapshot.val().email;
    });
    function brPokani1(brPokani, key1) {
      if (brPokani != 0) {
        for (let i = 1; i <= brPokani; i++) {
          firebase.database().ref('students/' + key1 + '/pokana_' + i).once('value').then(function (snapshot) {
            var pokana = snapshot.val();
            if (pokana == uid) {
              $('#pokaniNaOglas').hide();
              $('#pokanet').show();
              return true;
            } else {
              $('#pokaniNaOglas').show();
              $('#pokanet').hide();
              return false;
            }
          })

        }
      } else {
        $('#pokaniNaOglas').show();
        $('#pokanet').hide();
        return false;
      }
    }


    function displayInterns(brStranica, br, key) {
      $(brStranica).show();
      var k = br;
      var klucevi = [];
      klucevi[k] = key;
      k++;
      $(brStranica).click(function () {
        $(".aktivni1").hide();
        $(".aktivni2").hide();
        $(".aktivni3").hide();
        $(".aktivni4").hide();
        $(".aktivni5").hide();
        $(".aktivni6").hide();
        $("html").scrollTop(150);
        if (window.screen.width <= 430) {
          $("span").css("font-size", "17px");
        }
        $(this).button('toggle')
        // moveDiv(br + 1);
        for (let j = k - 1; j < k; j++) {
          firebase.database().ref('students/' + klucevi[j]).once('value').then(function (snapshot) {
            var ImePrezime = snapshot.val().ImePrezime;
            var slikata = snapshot.val().slika;
            var pozicija = snapshot.val().pozicija;
            var fakultet = snapshot.val().fakultet;
            var godStudii = snapshot.val().godinaNaStudii;
            var univerzitet = snapshot.val().univerzitet;
            var kakvaPraksa = snapshot.val().kakvaPraksaBaram;
            var brPokani = snapshot.val().brPokani;
            var opis = snapshot.val().Opis;
            var email = snapshot.val().email;
            // console.log(j + 1);
            $(".aktivni" + (j + 1)).show();
            // document.querySelector(".aktivni" + (j + 1)).style.display = "block";
            $("#akoglasi" + (j + 1)).text(ImePrezime);
            if (slikata != null)
              document.getElementById("slika" + (j + 1)).src = slikata;
            else
              document.getElementById("slika" + (j + 1)).src = "man.png";
            $("#marketer" + (j + 1)).text(pozicija);
            if (opis.length > 165) {
              $("#paragraf" + (j + 1)).text(opis.substring(0, 160) + '.....');
            }
            else
              $("#paragraf" + (j + 1)).text(opis);
            $("#button" + (j + 1)).off().on('click', function () {
              window.open('../../intern-profile.html?' + klucevi[j], '_blank');

            })
          });

        }
      });
    }


    var query = firebase.database().ref("students").orderByKey();
    query.once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var key = childSnapshot.key;
          // const firebase = require('firebase');
          // const firebaseFunctions = require('firebase/functions');

          br++;
          $("#brojPr").text(br);
          // childData will be the actual contents of the child
          var childData = childSnapshot.val().ImePrezime;
          var slika = childSnapshot.val().slika;
          var pozicija = childSnapshot.val().pozicija;
          var opis = childSnapshot.val().Opis;
          var fakultet = childSnapshot.val().fakultet;
          var godStudii = childSnapshot.val().godinaNaStudii;
          var univerzitet = childSnapshot.val().univerzitet;
          var kakvaPraksa = childSnapshot.val().kakvaPraksaBaram;
          var brPokani = childSnapshot.val().brPokani;
          var email = childSnapshot.val().email;
          if (br >= 1 && br <= 6) {
            displayInterns("#eden", br - 1, key);
            $("#eden").trigger('click');
          }
          if (br > 6 && br < 13) {
            displayInterns("#dva", (br - 7), key);
          }
          if (br > 12 && br < 19) {
            displayInterns("#tri", (br - 13), key);

          }
          if (br > 18 && br < 25) {
            displayInterns("#cetiri", (br - 19), key);
          }
          if (br > 24 && br < 31) {
            displayInterns("#pet", (br - 25), key);
          }
          if (br > 30 && br < 37) {
            displayInterns("#ses", (br - 31), key);
          }
          if (br > 36 && br < 43) {
            displayInterns("#sedum", (br - 37), key);
          }
          if (br > 42 && br < 49) {
            displayInterns("#osum", (br - 43), key);
          }
          if (br > 48 && br < 55) {
            displayInterns("#devet", (br - 49), key);
          }
          if (br > 54 && br < 61) {
            displayInterns("#deset", (br - 55), key);
          }
          if (br > 60 && br < 67) {
            displayInterns("#edinaeset", (br - 61), key);
          }
          if (br > 66 && br < 73) {
            displayInterns("#dvanaeset", (br - 67), key);
          }
          if (br > 72 && br < 79) {
            displayInterns("#trinaeset", (br - 73), key);
          }
          if (br > 78 && br < 85) {
            displayInterns("#cetirinaeset", (br - 79), key);
          }
          if (br > 84 && br < 91) {
            displayInterns("#petnaeset", (br - 85), key);
          }
          if (br > 90 && br < 97) {
            displayInterns("#sesnaeset", (br - 91), key);
          }
          if (br > 96 && br < 103) {
            displayInterns("#sedumnaeset", (br - 97), key);
          }
          if (br > 102 && br < 109) {
            displayInterns("#osumnaeset", (br - 103), key);
          }




        });
      });

    $("#nazad").click(function () {
      $(".cover").hide();
      $("#block").hide();
      $(".aktivni7").show();
    });
    $("#izlezi").click(function () {
      $("#kaver").hide();
      $("#poraka").hide();
      $("#block").hide();
      $(".cover").hide();
      $(".aktivni7").show();
    });
  }
  else {
    location.replace("../../index.html");
  }
})

$("#najava").click(function () {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    //  location.reload();
    location.replace("../../index.html");
  }).catch(function (error) {
    // An error happened.
    alert(error.message);
  });
});


