firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var uid = user.uid;
    var email = user.email;
    var br = 0;
    var uniqueNames = [];
    var keys = [];

    // function moveDiv(br) {
    //   if (br >= 1 && br <= 4) {
    //     if (window.screen.width <= 430) {
    //       if (br == 1) {
    //         $(".aktivni").css({ "top": "528px" });
    //       }
    //       else if (br == 2) {
    //         $(".aktivni").css({ "top": "808px" });
    //       }
    //       else if (br == 3) {
    //         $(".aktivni").css({ "top": "1098px" });
    //       }
    //       else if (br == 4) {
    //         $(".aktivni").css({ "top": "1398px" });
    //       }
    //     } else {
    //       $(".aktivni").css({ "top": "528px" });
    //     }
    //   }
    //   else if (br >= 5 && br <= 8) {

    //     if (window.screen.width <= 430) {
    //       if (br == 5) {
    //         $(".aktivni").css({ "top": "1798px" });
    //       }
    //       else if (br == 6) {
    //         $(".aktivni").css({ "top": "2098px" });
    //       }
    //       else if (br == 7) {
    //         $(".aktivni").css({ "top": "2398px" });
    //       }
    //       else if (br == 8) {
    //         $(".aktivni").css({ "top": "2698px" });
    //       }
    //     }
    //     else {
    //       $(".aktivni").css({ "top": "818px" });
    //     }
    //   }
    //   else if (br >= 9 && br <= 12) {
    //     if (window.screen.width <= 430) {
    //       if (br == 9) {
    //         $(".aktivni").css({ "top": "2998px" });
    //       }
    //       else if (br == 10) {
    //         $(".aktivni").css({ "top": "3198px" });
    //       }
    //       else if (br == 11) {
    //         $(".aktivni").css({ "top": "3498px" });
    //       }
    //       else if (br == 12) {
    //         $(".aktivni").css({ "top": "3798px" });
    //       }
    //     }
    //     else {

    //       $(".aktivni").css({ "top": "1100px" });

    //     }
    //   }
    // }

    function displayAds(brStranica, br, br1, logo, imeFirma, opisPraksata, odKoga, doKoga, pozicija, userID, key, brojAplikanti) {
      $(brStranica).show();
      var broj = br - br1;
      $(brStranica).click(function () {
        for (let j = 1; j <= 12; j++) {
          $("#button" + j).toggleClass('btn-success btn-primary');
          $("#button" + j).removeClass('disabled btn-sm');
          $("#button" + j).text('Аплицирај');
          document.querySelector('.kreiraj' + j).style.display = 'none';
        }
        $(this).button('toggle');
        $('span').css("color", "#142757");
        $('html').scrollTop(0);
        // moveDiv(broj);
        for (let k = 1; k <= broj; k++) {
          document.querySelector('.kreiraj' + k).style.display = 'block';
        }
        if (logo != null)
          document.getElementById("img" + broj).src = logo;
        else
          document.getElementById("img" + broj).src = "company.png";
        if (imeFirma != null && imeFirma != "") {
          $("#besplaten" + broj).text(imeFirma);

        }
        else {
          $("#besplaten" + broj).text("Ime na firmata");
        }
        if (opisPraksata != null && opisPraksata != "") {
          var txt = opisPraksata;
          if (txt.length > 153)
            $('#para' + broj).text(txt.substring(0, 150) + '...');
          else
            $("#para" + broj).text(opisPraksata);


        }
        else {
          $("#para" + broj).text("Opis na praksata");
        }
        if (odKoga != null && odKoga != "") {
          $("#od" + broj).text(odKoga);

        }
        else {
          $("#od" + broj).text("Opis na praksata");
        }
        if (doKoga != null && doKoga != "") {
          $("#do" + broj).text(doKoga);

        }
        else {
          $("#do" + broj).text("Opis na praksata");
        }
        if (pozicija != null) {
          $("#pozicija" + broj).text(pozicija);
        }
        else
          $("#pozicija" + broj).text("Null");

        firebase.database().ref('companies/' + userID).once('value').then(function (snapshot) {
          var moiOglasi = snapshot.val().moiOglasi;
          for (let i = 0; i < moiOglasi; i++) {
            firebase.database().ref('companies/' + userID + '/oglas_' + (i + 1)).once('value').then(function (snapshot) {
              var brojAplikanti = snapshot.val().brojAplikanti;
              var brojNaOglas = snapshot.val().brojNaOglas;
              var oglasBr = 'oglas_' + brojNaOglas;
              if (brojAplikanti != null && oglasBr == key) {
                for (let j = 1; j <= brojAplikanti; j++) {
                  firebase.database().ref('companies/' + userID + '/oglas_' + (i + 1) + '/aplikant_' + j).once('value').then(function (snapshot) {
                    var aplikant = snapshot.val();
                    if (uid == aplikant) {
                      // $("#button" + broj).hide();
                      // $("#aplicirano" + broj).show();
                      $("#button" + broj).toggleClass('btn-primary btn-success');
                      $("#button" + broj).addClass('disabled btn-sm');
                      $("#button" + broj).text('Аплицирано');
                      console.log(broj + " " + uid + ' ' + aplikant);
                    }
                  })
                }
              }
            })
          }
        })
        $('#kopce' + broj).off().on('click', function () {
          window.open("ads.html?" + (broj + br1), "_blank");
        });
        $('#button' + broj).off().on('click', function () {
          // $(this).hide();
          // $("#aplicirano" + broj).show();
          // $(".cover").show();
          // $(".text").show();
          $(this).toggleClass('btn-primary btn-success');
          $(this).addClass('disabled btn-sm');
          $(this).text('Аплицирано');
          console.log(userID);

          var moiOglasi;
          brojAplikanti++;
          firebase.database().ref('companies/' + userID).once('value').then(function (snapshot) {
            moiOglasi = snapshot.val().moiOglasi;
            var videno = snapshot.val().videno;
            if (videno == null || videno != 0) {
              var videnoRef = firebase.database().ref('companies/' + userID + '/videno');
              videnoRef.set(0);
            }
            var brojNaOglas = [moiOglasi];
            var brojNa = [moiOglasi];

            for (let i = 1; i <= moiOglasi; i++) {
              firebase.database().ref('companies/' + userID + '/oglas_' + i).once('value').then(function (snapshot) {
                brojNaOglas[i] = snapshot.val().opisPraksata;
                brojNa[i] = snapshot.val().brojNaOglas;
                var oglas_Br = 'oglas_' + brojNa[i];
                if (oglas_Br == key) {
                  console.log("Najdeno")
                  var aplikantRef = firebase.database().ref('companies/' + userID + '/oglas_' + i + '/aplikant_' + brojAplikanti);
                  aplikantRef.set(uid);
                  var brAplikantiteRef = firebase.database().ref('companies/' + userID + '/oglas_' + i + '/brojAplikanti');
                  brAplikantiteRef.set(brojAplikanti);
                  console.log(brojNa[i] + "go najdovne");
                  var brAplikantiRef = firebase.database().ref('oglasi/oglas_' + brojNa[i] + '/brojAplikanti');
                  brAplikantiRef.set(brojAplikanti);
                }
              });
            }
          })
          var imePraktikant, praktikantMail, email;
          firebase.database().ref('students/' + uid).once('value').then(function (snapshot) {
            imePraktikant = snapshot.val().ImePrezime;
            praktikantMail = snapshot.val().email;

            firebase.database().ref('companies/' + userID).once('value').then(function (snapshot) {
              email = snapshot.val().email;
              var sendEmailNotificationToCompany = firebase.functions().httpsCallable('sendEmailNotificationToCompany');
              sendEmailNotificationToCompany({ email: email, imePraktikant: imePraktikant, praktikantMail: praktikantMail, pozicija: pozicija }).then(function (result) {

                $('#staticBackdrop').modal('show');
              }).catch(function (error) {
                var code = error.code;
                var message = error.message;
                var details = error.details;
                // [START_EXCLUDE]
                console.error('There was an error when calling the Cloud Function', error);
                window.alert('There was an error when calling the Cloud Function:\n\nError Code: '
                  + code + '\nError Message:' + message + '\nError Details:' + details);
                $(".cover").hide();
                $(".text").hide();
              });


            })
          })
          // $("#nazad").click(function () {
          //   $(".cover").hide();
          //   $(".text").hide();
          // })
        })

      });
    }
    function unique(niza, identifier) {
      var uniqueNames = [];
      $.each(niza, function (i, el) {
        if ($.inArray(el, uniqueNames) === -1) {
          uniqueNames.push(el);
          $(identifier).append("<option value='" + `${el}` + "'>" + `${el}` + "</option>");
        }
      });
    }

    firebase.database().ref("oglasi").once("value").then(function (snapshot) {
      var niza = [];
      var niza1 = [];
      var niza2 = [];
      var uniqueNames = [];
      var industr;
      var obj = snapshot.val();
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var val = obj[key]['imefirma'];
          niza.push(val);
          niza2.push(obj[key]['pozicija']);
          firebase.database().ref("companies/" + obj[key]["uid"] + '/industrija').once("value").then(function (snapshot) {
            industr = snapshot.val();
            niza1.push(industr);
            $.each(niza1, function (i, el) {
              if ($.inArray(el, uniqueNames) === -1) {
                uniqueNames.push(el);
                $(".industrija").append("<option value='" + `${el}` + "'>" + `${el}` + "</option>");
              }
            });

          });
        }
      }
      unique(niza, ".kompanija");
      unique(niza2, ".pozicija");


    });

    var a = 0;
    var b = 0;
    function deleteArrayElement(keys, key) {
      var index = keys.indexOf(key);
      if (index > -1) {
        keys.splice(index, 1);
        $("div#" + key).hide();
      }
    }

    function anim(key, val, ime, industrija, pozicija, logoFirma, opisPraksata, kompanija, pozicija1, objekt, adOb) {

      a++;
      if (++anim.counter % a === 0) {
        // Run the special code here
        // ...
        // console.log(key + " " + val + " " + ime + industrija);
        if ((val == industrija && val != "") || (kompanija == ime && kompanija != "") || (pozicija1 == pozicija && pozicija1 != "")) {
          b++;
          keys.push(key);
          console.log(objekt);
          $.each(keys, function (i, el) {
            if ($.inArray(key, uniqueNames) === -1) {
              uniqueNames.push(key);
              var div = document.createElement("div");
              var div1 = document.createElement("div");
              var div2 = document.createElement("div");
              var h51 = document.createElement("h5");
              var h52 = document.createElement("h5");
              var p = document.createElement("p");
              var button = document.createElement("button");
              var button1 = document.createElement("button");
              var img = document.createElement("img")
              h51.className = "card-title";
              h52.className = "card-title";
              h52.id = "pozicija";
              img.className = "card-img-top";
              div.className = "col mb-4 animate__animated animate__zoomIn";
              div.id = key;
              div1.className = "card h-100";
              div2.className = "card-body";
              button.className = "btn btn-primary";
              button1.className = "btn btn-secondary";
              button1.style = "margin-left: 4px;";
              button1.id = "poveke" + b;
              button.id = "apliciraj" + b;
              var node = document.createTextNode(ime);
              if (opisPraksata.length > 165) {
                var node2 = document.createTextNode(opisPraksata.substring(0, 160) + '.....');
              }
              else
                var node2 = document.createTextNode(opisPraksata);
              var node1 = document.createTextNode(pozicija);

              var node3 = document.createTextNode("Аплицирај");
              var node4 = document.createTextNode("Прочитај повеќе");
              // img.id = "slika";
              if (logoFirma != null)
                img.src = logoFirma;
              else
                img.src = "company.png";
              p.className = "card-text";
              button.appendChild(node3);
              button1.appendChild(node4);
              p.appendChild(node2);
              h52.appendChild(node1);
              h51.appendChild(node);
              div2.append(h51);
              div2.append(h52);
              div2.append(p);
              div2.append(button);
              div2.append(button1);
              div1.append(img);
              div1.append(div2);
              div.append(div1);
              document.querySelector(".row-cols-1").append(div);
              //TO DO Applying on ad for filtered ads
              for (let i = 1; i <= objekt['moiOglasi']; i++) {
                for (let j = 1; j <= objekt["oglas_" + i]["brojAplikanti"]; j++) {
                  console.log(objekt["oglas_" + i]["brojNaOglas"] + "=" + key.substring(6, key.length));
                  if (objekt["oglas_" + i]["aplikant_" + j] == uid && objekt["oglas_" + i]["brojNaOglas"] == key.substring(6, key.length)) {

                    // button.className = "btn btn-success disabled";
                    $("#apliciraj" + b).addClass("btn btn-success disabled btn-sm");
                    $("#apliciraj" + b).attr("disabled", "disabled");
                    $(this).text('Аплицирано');

                  }
                  else if (objekt["oglas_" + i]["brojNaOglas"] == key.substring(6, key.length)) {
                    // $("#apliciraj" + b).addClass("btn-primary");
                    $("#apliciraj" + b).prop("value", "oglas_" + i);
                    console.log("tuka");
                  }
                }
              }
              $("#poveke" + b).click(function () {
                window.open("../../ads.html?" + key.substring(6, key.length), "_blank");
              })
              $("#apliciraj" + b).click(function () {
                $(this).toggleClass("btn-success btn-primary");
                $(this).addClass("disabled btn-sm");
                $(this).attr("disabled", "disabled");
                $(this).text('Аплицирано');
                // $('#staticBackdrop').modal('show');
                adOb[key]["brojAplikanti"]++;
                firebase.database().ref("oglasi/" + key).update({ "brojAplikanti": adOb[key]["brojAplikanti"] });
                console.log(objekt["moiOglasi"]);
                if (objekt["moiOglasi"] != 0) {
                  for (let i = 1; i <= objekt["moiOglasi"]; i++) {
                    if (key.substring(6, key.length) == objekt["oglas_" + i]["brojNaOglas"]) {
                      console.log("true");
                      var aplikant = "aplikant_" + adOb[key]["brojAplikanti"];
                      firebase.database().ref("companies/" + adOb[key]["uid"] + "/oglas_" + i).update({ "brojAplikanti": adOb[key]["brojAplikanti"], [aplikant]: uid });
                      firebase.database().ref("students/" + uid + "/ImePrezime").once("value").then(function (snapshot) {
                        console.log(user.email + " " + objekt["email"] + " " + pozicija + " " + snapshot.val());
                        var sendEmailNotificationToCompany = firebase.functions().httpsCallable('sendEmailNotificationToCompany');
                        sendEmailNotificationToCompany({ email: objekt["email"], imePraktikant: snapshot.val(), praktikantMail: user.email, pozicija: pozicija }).then(function (result) {
                          $('#staticBackdrop').modal('show');
                          location.reload();
                        }).catch(function (error) {
                          var code = error.code;
                          var message = error.message;
                          var details = error.details;
                          // [START_EXCLUDE]
                          console.error('There was an error when calling the Cloud Function', error);
                          window.alert('There was an error when calling the Cloud Function:\n\nError Code: '
                            + code + '\nError Message:' + message + '\nError Details:' + details);
                          location.reload();
                        });
                      });
                    }
                  }
                }

              });
            }
          });
        }
        else {
          // deleteArrayElement(keys, uid)
          deleteArrayElement(uniqueNames, key);

        }
      }
    }
    // Initialize static properties.
    anim.counter = 0;
    $(".industrija").on("change", function () {
      var b = 0;
      var industrija = this.value;
      var kompanija = document.querySelector(".kompanija").value;
      var pozicija = document.querySelector(".pozicija").value;
      var niza = [];
      var val;
      if (industrija != "" || kompanija != "" || pozicija != "") {
        $("html").scrollTop("140");
        for (let i = 1; i <= 12; i++) {
          $(".kreiraj" + i).hide();
        }
        $(".aktivni").hide();
        firebase.database().ref("oglasi").once("value").then(function (snapshot) {
          var obj = snapshot.val();
          Object.keys(obj).forEach(key => {
            firebase.database().ref("companies/" + obj[key]["uid"]).once("value").then(function (snapshot) {
              val = snapshot.val().industrija;
              objekt = snapshot.val();

              anim(key, val, obj[key]["imefirma"], industrija, obj[key]["pozicija"], obj[key]["logoFirma"], obj[key]["opisPraksata"], kompanija, pozicija, snapshot.val(), obj);
            });
          });
          for (let j = 1; j <= b; j++)
            $("#button" + j).on().off().click(function () {
              window.open("../../company-profile.html?" + keys[j - 1], "_blank");
            });

        });
      }
      else {
        location.reload();
      }
    });
    $(".kompanija").on("change", function () {
      $(".industrija").trigger("change");
    });
    $(".pozicija").on("change", function () {
      $(".industrija").trigger("change");
    });

    firebase.database().ref("students/" + uid).once("value").then(function (snapshot) {
      var test = snapshot.val().ImePrezime;
      $("#wrapper").css("display", "block");
      $(".login-cover").hide();
      var imefirma;
      firebase.database().ref().once('value').then(function (snapshot) {
        var brOglasi = snapshot.val().broglasi;
        if (brOglasi != null && brOglasi != "") {
          $("#brojOglasi").text(brOglasi);
        }
        else {
          $("#brojOglasi").text(0);
        }
        $("#eden").click(function () {
          location.reload();
        })

        var oglasi = firebase.database().ref("oglasi").orderByKey();
        oglasi.once("value")
          .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
              // key will be "ada" the first time and "alan" the second time
              var key = childSnapshot.key;
              br++;
              // childData will be the actual contents of the child
              var pozicija = childSnapshot.val().pozicija;
              var imeFirma = childSnapshot.val().imefirma;
              var odKoga = childSnapshot.val().odKoga;
              var doKoga = childSnapshot.val().doKoga;
              var opisPraksata = childSnapshot.val().opisPraksata;
              var logo = childSnapshot.val().logoFirma;
              var userID = childSnapshot.val().uid;
              var brojAplikanti = childSnapshot.val().brojAplikanti;
              if (br >= 1 && br <= 12) {

                $("#eden").show();
                $("#eden").button('toggle');
                $(".aktivni").show();
                document.querySelector('.kreiraj' + br).style.display = 'block';
                // moveDiv(br);
                if (logo != null)
                  document.getElementById("img" + br).src = logo;
                // $("#img" + br).attr("src", logo);
                else
                  document.getElementById("img" + br).src = "company.png";
                if (imeFirma != null && imeFirma != "") {
                  $("#besplaten" + br).text(imeFirma);

                }
                else {
                  $("#besplaten" + br).text("Ime na firmata");
                }
                if (opisPraksata != null && opisPraksata != "") {
                  var txt = opisPraksata;
                  if (txt.length > 253)
                    $('#para' + br).text(txt.substring(0, 250) + '...');
                  else
                    $("#para" + br).text(opisPraksata);


                }
                else {
                  $("#para" + br).text("Opis na praksata");
                }
                if (odKoga != null && odKoga != "") {
                  $("#od" + br).text(odKoga);

                }
                else {
                  $("#od" + br).text("Opis na praksata");
                }
                if (doKoga != null && doKoga != "") {
                  $("#do" + br).text(doKoga);

                }
                else {
                  $("#do" + br).text("Opis na praksata");
                }
                if (pozicija != null) {
                  $("#pozicija" + br).text(pozicija);
                }
                else
                  $("#pozicija" + br).text("Null");

                let br1 = br;
                firebase.database().ref('companies/' + userID).once('value').then(function (snapshot) {
                  var moiOglasi = snapshot.val().moiOglasi;

                  for (let i = 0; i < moiOglasi; i++) {
                    firebase.database().ref('companies/' + userID + '/oglas_' + (i + 1)).once('value').then(function (snapshot) {
                      var brojAplikanti = snapshot.val().brojAplikanti;
                      var brojNaOglas = snapshot.val().brojNaOglas;
                      var oglasBr = 'oglas_' + brojNaOglas;

                      if (brojAplikanti != null && oglasBr == key) {
                        for (let j = 1; j <= brojAplikanti; j++) {
                          firebase.database().ref('companies/' + userID + '/oglas_' + (i + 1) + '/aplikant_' + j).once('value').then(function (snapshot) {
                            var aplikant = snapshot.val();
                            if (uid == aplikant) {
                              // $("#button" + br1).hide();
                              // $("#aplicirano" + br1).show();
                              $("#button" + br1).toggleClass('btn-primary btn-success');
                              $("#button" + br1).addClass('disabled btn-sm');
                              $("#button" + br1).text('Аплицирано');
                            }
                          })
                        }
                      }
                    })
                  }
                })
                let j = br;
                $('#kopce' + j).off().on('click', function () {
                  window.open("../../ads.html?" + j, "_blank");
                });
                $('#button' + j).off().on('click', function () {
                  // $(this).hide();
                  // $(this).prop("disabled", true);
                  $(this).toggleClass('btn-primary btn-success');
                  $(this).addClass('disabled btn-sm');
                  $(this).text('Аплицирано');
                  $("#aplicirano" + j).show();
                  $(".cover").show();
                  $(".text").show();
                  console.log(userID);
                  var brojAplikanti = childSnapshot.val().brojAplikanti;
                  var moiOglasi;
                  brojAplikanti++;
                  firebase.database().ref('companies/' + userID).once('value').then(function (snapshot) {
                    moiOglasi = snapshot.val().moiOglasi;
                    var videno = snapshot.val().videno;
                    if (videno == null || videno != 0) {
                      var videnoRef = firebase.database().ref('companies/' + userID + '/videno');
                      videnoRef.set(0);
                    }
                    var brojNaOglas = [moiOglasi];
                    var brojNa = [moiOglasi];

                    for (let i = 1; i <= moiOglasi; i++) {

                      firebase.database().ref('companies/' + userID + '/oglas_' + i).once('value').then(function (snapshot) {
                        brojNaOglas[i] = snapshot.val().opisPraksata;
                        brojNa[i] = snapshot.val().brojNaOglas;
                        var oglas_Br = 'oglas_' + brojNa[i];
                        if (oglas_Br == key) {
                          console.log("Najdeno:" + key)
                          console.log("Oglas_" + i + ' vo inelipse');
                          var aplikantRef = firebase.database().ref('companies/' + userID + '/oglas_' + i + '/aplikant_' + brojAplikanti);
                          aplikantRef.set(uid);
                          var brAplikantiteRef = firebase.database().ref('companies/' + userID + '/oglas_' + i + '/brojAplikanti');
                          brAplikantiteRef.set(brojAplikanti);
                          console.log(brojNa[i] + "go najdovne");
                          var brAplikantiRef = firebase.database().ref('oglasi/oglas_' + brojNa[i] + '/brojAplikanti');
                          brAplikantiRef.set(brojAplikanti);
                        }
                      });
                    }
                  })
                  var brAplikantiRef = firebase.database().ref('oglasi/oglas_' + j + '/brojAplikanti');
                  brAplikantiRef.set(brojAplikanti);
                  var imePraktikant, praktikantMail, email;
                  firebase.database().ref('students/' + uid).once('value').then(function (snapshot) {
                    imePraktikant = snapshot.val().ImePrezime;
                    praktikantMail = snapshot.val().email;

                    firebase.database().ref('companies/' + userID).once('value').then(function (snapshot) {
                      email = snapshot.val().email;
                      var sendEmailNotificationToCompany = firebase.functions().httpsCallable('sendEmailNotificationToCompany');
                      sendEmailNotificationToCompany({ email: email, imePraktikant: imePraktikant, praktikantMail: praktikantMail, pozicija: pozicija }).then(function (result) {
                        $('#staticBackdrop').modal('show');
                        location.reload();
                      }).catch(function (error) {
                        var code = error.code;
                        var message = error.message;
                        var details = error.details;
                        // [START_EXCLUDE]
                        console.error('There was an error when calling the Cloud Function', error);
                        window.alert('There was an error when calling the Cloud Function:\n\nError Code: '
                          + code + '\nError Message:' + message + '\nError Details:' + details);
                        $(".cover").hide();
                        $(".text").hide();
                        location.reload();
                      });


                    })
                  })

                  // $("#nazad").click(function () {
                  //   $(".cover").hide();
                  //   $(".text").hide();
                  // })
                })
              }
              if (br > 12 && br <= 24) {
                displayAds("#dva", br, 12, logo, imeFirma, opisPraksata, odKoga, doKoga, pozicija, userID, key, brojAplikanti);

              }
              if (br > 24 && br <= 36) {
                displayAds("#tri", br, 24, logo, imeFirma, opisPraksata, odKoga, doKoga, pozicija, userID, key, brojAplikanti);
              }
              if (br > 36 && br <= 48) {
                displayAds("#cetiri", br, 36, logo, imeFirma, opisPraksata, odKoga, doKoga, pozicija, userID, key, brojAplikanti);
              }
              if (br > 48 && br <= 60) {
                displayAds("#pet", br, 48, logo, imeFirma, opisPraksata, odKoga, doKoga, pozicija, userID, key, brojAplikanti);
              }
              if (br > 60 && br <= 72) {
                displayAds("#ses", br, 60, logo, imeFirma, opisPraksata, odKoga, doKoga, pozicija, userID, key, brojAplikanti);
              }
              if (br > 72 && br <= 84) {
                displayAds("#sedum", br, 72, logo, imeFirma, opisPraksata, odKoga, doKoga, pozicija, userID, key, brojAplikanti);
              }
              if (br > 84 && br <= 96) {
                displayAds("#osum", br, 84, logo, imeFirma, opisPraksata, odKoga, doKoga, pozicija, userID, key, brojAplikanti);
              }
              if (br > 96 && br <= 108) {
                displayAds("#devet", br, 96, logo, imeFirma, opisPraksata, odKoga, doKoga, pozicija, userID, key, brojAplikanti);
              }
              if (br > 108 && br <= 120) {
                displayAds("#deset", br, 108, logo, imeFirma, opisPraksata, odKoga, doKoga, pozicija, userID, key, brojAplikanti);
              }
              if (br > 120 && br <= 132) {
                displayAds("#edinaeset", br, 120, logo, imeFirma, opisPraksata, odKoga, doKoga, pozicija, userID, key, brojAplikanti);
              }
              if (br > 132 && br <= 144) {
                displayAds("#dvanaeset", br, 132, logo, imeFirma, opisPraksata, odKoga, doKoga, pozicija, userID, key, brojAplikanti);
              }
              if (br > 144 && br <= 156) {
                displayAds("#trinaeset", br, 144, logo, imeFirma, opisPraksata, odKoga, doKoga, pozicija, userID, key, brojAplikanti);
              }
              if (br > 156 && br <= 168) {
                displayAds("#cetirinaeset", br, 156, logo, imeFirma, opisPraksata, odKoga, doKoga, pozicija, userID, key, brojAplikanti);
              }
              if (br > 168 && br <= 180) {
                displayAds("#petnaeset", br, 168, logo, imeFirma, opisPraksata, odKoga, doKoga, pozicija, userID, key, brojAplikanti);
              }

            });
          });

      });


    }).catch(err => location.replace("../../index.html"));
  }
  else {
    // No user is signed in.
    location.replace("../../index.html");

  }
});
$("#najava").click(function () {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    //  location.reload();
    location.replace("../../index.html");
  }).catch(function (error) {
    // An error happened.
    alert(error.message)
  });
}
);


