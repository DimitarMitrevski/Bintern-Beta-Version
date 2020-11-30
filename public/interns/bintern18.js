firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in
    var uid = user.uid;
    var user = firebase.auth().currentUser;
    var emailVerified = user.emailVerified;
    if (!emailVerified)
      window.alert("Вашата емаил адреса не е верифицирана, ве молиме проверете го вашиот мејл.");
    var brPraksi;

    const editForm = document.querySelector("#editForm");
    var messagesRef = firebase.database().ref('companies');

    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      var brVraboteni = getInputVal('brVraboteni');
      // //var email= getInputVal('singup-email');
      var odgLice = getInputVal('odgLice');
      var Grad = getInputVal('Grad');
      var Link = getInputVal('Link');
      var imeFirma = getInputVal('imeFirma');
      var textarea = getInputVal('textarea');

      //Save messages
      saveMessage(brVraboteni, odgLice, Grad, Link, imeFirma, textarea);
      // //Show alert
      document.querySelector('.alert').style.display = 'block';

      // //Hide alert after 3sec
      setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
      }, 3000)

      editForm.reset();

      // );

      function getInputVal(id) {
        return document.getElementById(id).value;
      }
      function saveMessage(brVraboteni, odgLice, Grad, Link, imeFirma, textarea) {
        // var newMessageRef= messagesRef.push();
        var vraboteniRef = firebase.database().ref('students/' + uid + '/vestini');
        var odgliceRef = firebase.database().ref('students/' + uid + '/moiProekti');
        var gradRef = firebase.database().ref('students/' + uid + '/knigiKoiMiSeDopagaat');
        var linkRef = firebase.database().ref('students/' + uid + '/preporaka');
        var imeRef = firebase.database().ref('students/' + uid + '/preporacatel');
        var textareaRef = firebase.database().ref('students/' + uid + '/kakvaPraksaBaram');

        if (brVraboteni != "" && brVraboteni != null) {
          vraboteniRef.set(brVraboteni)
        }
        if (odgLice != "" && odgLice != null) {
          odgliceRef.set(odgLice)
        }
        if (Grad != "" && Grad != null) {
          gradRef.set(Grad)
        }
        if (Link != "" && Link != null) {
          linkRef.set(Link)
        }
        if (imeFirma != "" && imeFirma != null) {
          imeRef.set(imeFirma)
        }
        if (textarea != "" && textarea != null) {
          textareaRef.set(textarea)
        }


      }
    });
    $(document).ready(function () {
      // once will get all your data in one time
      //.on('value', function (snapshot) {
      firebase.database().ref('students/' + uid).once('value').then(function (snapshot) {
        // firebase.database().ref('students/' + uid).on('value', function (snapshot) {
        var ImePrezime = snapshot.val().ImePrezime;
        var opis = snapshot.val().Opis;
        var email = snapshot.val().email;
        var fakultet = snapshot.val().fakultet;
        var univerzitet = snapshot.val().univerzitet;
        var godinaNaStudii = snapshot.val().godinaNaStudii;
        var grad = snapshot.val().grad;
        var kakvaPraksaBaram = snapshot.val().kakvaPraksaBaram;
        var vestini = snapshot.val().vestini;
        var moiProekti = snapshot.val().moiProekti;
        var knigiKoiMiSeDopagaat = snapshot.val().knigiKoiMiSeDopagaat;
        var ostvareniPraksi = snapshot.val().ostvareniPraksi;
        var slika = snapshot.val().slika;
        var brPraksi = snapshot.val().brPraksi;
        $("#dodaj").click(function () {
          function getInputVal(id) {
            return document.getElementById(id).value;
          }
          var kojaPoz = getInputVal('Ul');
          var kade = getInputVal('Ul1');
          if (kojaPoz != null && kojaPoz != "" && kade != null && kade != "") {
            firebase.database().ref('students/' + uid).once('value').then(function (snapshot) {
              var brPraksi = snapshot.val().brPraksi;
              brPraksi++;
              console.log('Dodadeno brPraksi:' + brPraksi);
              var kojaRef = firebase.database().ref('students/' + uid + '/ostvareniPraksi' + brPraksi + '/kojaPoz');
              var kadeRef = firebase.database().ref('students/' + uid + '/ostvareniPraksi' + brPraksi + '/kade');
              var broj = firebase.database().ref('students/' + uid + '/brPraksi');
              broj.set(brPraksi);
              kojaRef.set(kojaPoz);
              kadeRef.set(kade);
              $('#li' + brPraksi).css('display', 'block');
              $('#txt' + brPraksi).text(kojaPoz + ' во ' + kade);
            });
            document.getElementById('Ul').value = ''
            document.getElementById('Ul1').value = ''
            $("#Dodadeno").show();
            setTimeout(function () {
              document.querySelector('#Dodadeno').style.display = 'none';
            }, 2000)

          }
        });
        if (brPraksi != 0) {
          for (let j = 1; j <= brPraksi; j++) {
            firebase.database().ref('students/' + uid + "/ostvareniPraksi" + j).once('value').then(function (snapshot) {
              var kade = snapshot.val().kade || 'Anonymous';
              var kojaPoz = snapshot.val().kojaPoz || 'Anonymous';
              $("#kakva" + j).show();
              $('#digitalen' + j).text(kojaPoz);
              $('#kade' + j).text(kade);
              $('#li' + j).css('display', 'block');
              $('#txt' + j).text(kojaPoz + ' во ' + kade);
            });
          }
        }
        else {
          $("#kakva1").text('Нема');
          $("#kakva1").show();
        }

        for (let j = 1; j <= 4; j++) {
          $('#brisi' + j).on('click', function () {
            console.log('Kliknato e #brisi:' + j);
            $('#li' + j).css('display', 'none');
            firebase.database().ref('students/' + uid).once('value').then(function (snapshot) {
              var brPraksi = snapshot.val().brPraksi;
              if (j != brPraksi) {
                var booksRef = firebase.database().ref('students/' + uid);
                booksRef.child('ostvareniPraksi' + brPraksi).once('value').then(function (snap) {
                  var data = snap.val();
                  // data.bookInfo.bookTitle = 'ostvareniPraksi' + j;
                  // data = 'ostvareniPraksi' + j;
                  var update = {};
                  update['ostvareniPraksi' + brPraksi] = null;
                  update['ostvareniPraksi' + j] = data;

                  var brisiRef = firebase.database().ref('students/' + uid + "/ostvareniPraksi" + brPraksi);
                  brisiRef.remove();
                  return booksRef.update(update);
                })

              }
              else if (j == brPraksi) {
                var brisiRef = firebase.database().ref('students/' + uid + "/ostvareniPraksi" + j);
                brisiRef.remove();

              }
              var praksiRef = firebase.database().ref('students/' + uid + '/brPraksi');
              brPraksi--;
              if (brPraksi > 0)
                praksiRef.set(brPraksi);
              else
                praksiRef.set(0);

            });
          });
        }


        if (slika != null)
          document.getElementById("img1").src = slika;
        else
          document.getElementById("img1").src = "man.png";
        if (ImePrezime != null && ImePrezime != "") {
          $("#ime1").text(ImePrezime);
        }
        else {
          $("#ime1").text('Име и Презиме');
        }
        if (opis != null && opis != "") {
          $("#para1").text(opis);
        }
        else {
          $("#para1").text('Нема');
        }

        if (email != null && email != "") {
          $("#link").text(email);
          $("#link1").hide();
        }
        else {
          $("#link1").show();
        }
        if (godinaNaStudii != null && godinaNaStudii != "") {
          $("#godinaStudii").text(godinaNaStudii);
        }
        else {
          $("#godinaStudii").text('Нема');
        }
        if (univerzitet != null && univerzitet != "") {
          $("#univerzitetot").text(univerzitet);
        }
        else {
          $("#univerzitetot").text('Нема');
        }
        if (fakultet != null && fakultet != "") {
          $("#fakultet").text(fakultet);
        }
        else {
          $("#fakultet").text('Нема');
        }
        if (grad != null && grad != "") {
          $("#gradot").text(grad);
        }
        else {
          $("#gradot").text('Нема');
        }
        if (kakvaPraksaBaram != null && kakvaPraksaBaram != "") {
          $("#para22").text(kakvaPraksaBaram);
          $("#para2").hide();
          $("#textarea").val(kakvaPraksaBaram);
        }
        else {
          $("#para2").show();
        }

        if (vestini != null && vestini != "") {
          $("#imepre1").text(vestini);
          $("#brVraboteni").val(vestini);

        }
        else {
          $("#imepre1").text('Нема');
        }
        if (moiProekti != null && moiProekti != "") {
          $("#paragraf1").text(moiProekti);
          $('#odgLice').val(moiProekti);

        }
        else {
          $("#paragraf1").text('Нема');
        }

        if (knigiKoiMiSeDopagaat != null && knigiKoiMiSeDopagaat != "") {
          $("#para33").text(knigiKoiMiSeDopagaat);
          $('#Grad').val(knigiKoiMiSeDopagaat);

        }
        else {
          $("#para33").text('Нема');
        }


      })
      setTimeout(function () {
        $("#wrapper").css('display', 'block');
        $("#skri").css({ 'all': 'unset', 'display': 'none' });
        $('.spinner-border').hide();
      }, 2000)
    })

  } else {
    // No user is signed in.
    location.replace("../index.html");
  }
});
$("#urediCV").click(
  function () {
    $(".cover").show();
    $("#uredi").show();
    if (window.screen.width <= 430) {
      $(window).scrollTop(150);
    }
    else {
      $(window).scrollTop(170);
    }
  });
$("#Nazad").click(
  function () {
    $(".cover").hide();
    $("#uredi").hide();

  });
