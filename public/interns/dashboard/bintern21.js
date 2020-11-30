firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var uid = firebase.auth().currentUser.uid;
    var br = 0;
    var keys = [];
    var uniqueNames = [];
    function unique(niza, identifier) {
      var uniqueNames = [];
      $.each(niza, function (i, el) {
        if ($.inArray(el, uniqueNames) === -1) {
          uniqueNames.push(el);
          $(identifier).append("<option value='" + `${el}` + "'>" + `${el}` + "</option>");
        }
      });
    }
    firebase.database().ref("companies").once("value").then(function (snapshot) {
      var niza = [];
      var niza2 = [];
      var niza1 = [];
      var obj = snapshot.val();
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var val = obj[key]['imeFirma'];
          niza.push(val);
          niza2.push(obj[key]['industrija']);
          if (obj[key]['Grad'] != null) {
            niza1.push(obj[key]['Grad']);
          }
        }
      }
      unique(niza, ".kompanija");
      unique(niza2, ".industrija");
      unique(niza1, ".grad");
    });

    function displayCompanies(brStranica, br, key) {
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
        // $("html").scrollTop(100);
        $("span").css("font-size", "23px");
        $(this).button('toggle');
        if (window.screen.width <= 430) {
          $("span").css("font-size", "17px");
        }
        for (let j = k - 1; j < k; j++) {
          firebase.database().ref('companies/' + klucevi[j]).once('value').then(function (snapshot) {
            var ImePrezime = snapshot.val().imeFirma;
            var slikata = snapshot.val().logo;
            var pozicija = snapshot.val().industrija;
            var opis = snapshot.val().textarea;
            var grad = snapshot.val().Grad;
            var ul = snapshot.val().Ul;
            var brVraboteni = snapshot.val().brVraboteni;
            var email = snapshot.val().email;
            var odgLice = snapshot.val().odgLice;
            var Link = snapshot.val().Link;
            var kontaktTel = snapshot.val().kontaktTel;

            $(".aktivni" + (j + 1)).show();
            $("#akoglasi" + (j + 1)).text(ImePrezime);
            if (slikata != null)
              document.getElementById("slika" + (j + 1)).src = slikata;
            else
              document.getElementById("slika" + (j + 1)).src = "company.png";
            $("#marketer" + (j + 1)).text(pozicija);
            if (opis != null && opis.length > 165) {
              $("#paragraf" + (j + 1)).text(opis.substring(0, 160) + '.....');
            }
            else
              $("#paragraf" + (j + 1)).text(opis);

            $("#button" + (j + 1)).on().off().click(function () {
              window.open('../../company-profile.html?' + klucevi[j], "_blank");
            })
          });

        }
      });
    }
    var query = firebase.database().ref("companies").orderByKey();
    query.once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var key = childSnapshot.key;

          br++;
          $("#brojPr").text(br);
          // childData will be the actual contents of the child
          var childData = childSnapshot.val().imeFirma;
          var slika = childSnapshot.val().logo;
          var pozicija = childSnapshot.val().industrija;
          var opis = childSnapshot.val().textarea;
          var grad = childSnapshot.val().Grad;
          var ul = childSnapshot.val().Ul;
          var brVraboteni = childSnapshot.val().brVraboteni;
          var email = childSnapshot.val().email;
          var odgLice = childSnapshot.val().odgLice;
          var Link = childSnapshot.val().Link;
          var kontaktTel = childSnapshot.val().kontaktTel;
          if (br >= 1 && br <= 6) {
            // displayCompanies("#eden", br - 1, key);
            $("#eden").show();
            $("#eden").button("toggle");
            $(".aktivni" + br).show();
            $("#akoglasi" + br).text(childData);
            $("#marketer" + br).text(pozicija);
            if (opis.length > 165) {
              $("#paragraf" + br).text(opis.substring(0, 160) + '.....');
            }
            else
              $("#paragraf" + br).text(opis);
            if (slika != null)
              document.getElementById("slika" + br).src = slika;
            else
              document.getElementById("slika" + br).src = "company.png";
            $("#button" + br).on().off().click(function () {
              window.open('../../company-profile.html?' + key, "_blank");
            });
            displayCompanies("#eden", (br - 1), key);
          }
          if (br > 6 && br < 13) {
            displayCompanies("#dva", (br - 7), key);
          }
          if (br > 12 && br < 19) {
            displayCompanies("#tri", (br - 13), key);
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
    function deleteArrayElement(keys, key) {
      var index = keys.indexOf(key);
      if (index > -1) {
        keys.splice(index, 1);
        $("#" + key).hide();
      }
    }
    $(".industrija").on("change", function () {
      var b = 0;
      var industrija = this.value;
      var kompanija = document.querySelector(".kompanija").value;
      var grad = document.querySelector(".grad").value;
      if (industrija != "" || kompanija != "" || grad != "") {
        $("html").scrollTop("140");
        for (let i = 1; i <= 6; i++) {
          $(".aktivni" + i).hide();
        }
        query.once("value").then(function (snapshot) {
          var obj = snapshot.val();
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              var val = obj[key]['industrija'];
              if ((val == industrija && val != "") || (kompanija == obj[key]['imeFirma'] && kompanija != "") || (grad == obj[key]["Grad"] && grad != "")) {
                b++;
                keys.push(key);
                $(".aktivni7").hide();
                $.each(keys, function (i, el) {
                  if ($.inArray(key, uniqueNames) === -1) {
                    uniqueNames.push(key);
                    // $(identifier).append("<option value='" + `${el}` + "'>" + `${el}` + "</option>");
                    var div = document.createElement("div");
                    var div1 = document.createElement("div");
                    var div2 = document.createElement("div");
                    var div3 = document.createElement("div");
                    var h51 = document.createElement("h5");
                    var h52 = document.createElement("h5");
                    var p = document.createElement("p");
                    var a = document.createElement("a");
                    var img = document.createElement("img")
                    h51.className = "mt-0";
                    h52.className = "mt-0";
                    a.className = "streched-link";
                    h52.id = "marketer1";
                    img.className = "w-100";
                    div.className = "col mb-3 animate__animated animate__zoomIn";
                    div.id = key;
                    div1.className = "row no-gutters h-100 position-relative";
                    div2.className = "col-md-6 mb-md-0 p-md-4";
                    div3.className = "col-md-6 position-static p-4 pl-md-0";
                    var node = document.createTextNode(obj[key]['imeFirma']);
                    var node1 = document.createTextNode(obj[key]['industrija']);
                    var node2 = document.createTextNode(obj[key]['textarea']);
                    var node3 = document.createTextNode("Види профил");
                    if (obj[key]['logo'] != null)
                      img.src = obj[key]['logo'];
                    else
                      img.src = "company.png";
                    a.href = "../../company-profile.html?" + key;
                    a.target = "_blank";
                    a.appendChild(node3);
                    p.append(node2);
                    h52.append(node1);
                    h51.appendChild(node);
                    div3.append(p);
                    div3.append(a);
                    div2.append(img);
                    div2.append(h51);
                    div2.append(h52);
                    // div2.append(div3);
                    div1.append(div2);
                    div1.append(div3);
                    div.append(div1);
                    document.querySelector("#row").append(div);
                  }
                });
              }
              else {
                // deleteArrayElement(keys, key)
                deleteArrayElement(uniqueNames, key);

              }
              for (let j = 1; j <= b; j++)
                $("#button" + j).on().off().click(function () {
                  window.open("../../company-profile.html?" + keys[j - 1], "_blank");
                });
            }
          }

        });
      }
      else {
        location.reload();
      }
    });
    $(".kompanija").on("change", function () {
      $(".industrija").trigger("change");
    });
    $(".grad").on("change", function () {
      $(".industrija").trigger("change");
    });

    // const singupForm = document.querySelector("#search1");
    // singupForm.addEventListener('submit', (e) => {
    //   e.preventDefault();
    //   $(".aktivni1").hide();
    //   $(".aktivni2").hide();
    //   $(".aktivni3").hide();
    //   $(".aktivni4").hide();
    //   $(".aktivni5").hide();
    //   $(".aktivni6").hide();
    //   function getInputVal(id) {
    //     return document.getElementById(id).value;
    //   }
    //   var br = 0;
    //   var ImeIPrezime = getInputVal('element2');
    //   var ime = ImeIPrezime.toLowerCase();
    //   var query = firebase.database().ref("companies").orderByKey();
    //   query.once("value")
    //     .then(function (snapshot) {
    //       snapshot.forEach(function (childSnapshot) {
    //         // key will be "ada" the first time and "alan" the second time
    //         var key = childSnapshot.key;
    //         // childData will be the actual contents of the child
    //         var ImePrezime = childSnapshot.val().imeFirma;
    //         var slika = childSnapshot.val().logo;
    //         var pozicija = childSnapshot.val().industrija;
    //         var opis = childSnapshot.val().textarea;
    //         var poz = pozicija.toLowerCase();
    //         var grad = childSnapshot.val().Grad;
    //         var ul = childSnapshot.val().Ul;
    //         var brVraboteni = childSnapshot.val().brVraboteni;
    //         var email = childSnapshot.val().email;
    //         var odgLice = childSnapshot.val().odgLice;
    //         var Link = childSnapshot.val().Link;
    //         var kontaktTel = childSnapshot.val().kontaktTel;
    //         if ((ime == poz || ime == ImePrezime.toLowerCase() || ime == ImePrezime.substring(0, 4).toLowerCase()) || (ime.charAt(0) == poz.charAt(0) && ime.charAt(1) == poz.charAt(1) && ime.charAt(2) == poz.charAt(2) && ime.charAt(3) == poz.charAt(3))) {
    //           br++;
    //           if (br >= 1 && br <= 6) {
    //             $("span").css({ "color": "#142757", "font-size": "23px" });
    //             $("#eden").button('toggle');
    //             if (window.screen.width <= 430) {
    //               $("span").css("font-size", "17px");
    //             }
    //             $(".aktivni" + br).show();
    //             $("#akoglasi" + br).text(ImePrezime);
    //             if (slika != null)
    //               document.getElementById("slika" + br).src = slika;
    //             else
    //               document.getElementById("slika" + br).src = "company.png";
    //             $("#marketer" + br).text(pozicija);
    //             if (opis.length > 165) {
    //               $("#paragraf" + br).text(opis.substring(0, 160) + '.....');
    //             }
    //             else
    //               $("#paragraf" + br).text(opis)
    //             $("#alertMessage").hide();
    //             $("#button" + br).click(function () {
    //               window.open('../../company-profile.html?' + key, "_blank");
    //             })
    //           }
    //         }
    //         else if (br == 0) {
    //           $("#alertMessage").show();
    //         }
    //       });
    //     });
    // });
    $("#nazad").click(function () {
      $(".cover").hide();
      $("#block").hide();
    });
    // $("#eden").click(function () {
    //   location.reload();
    // });
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
    alert(error.message)
  });
});