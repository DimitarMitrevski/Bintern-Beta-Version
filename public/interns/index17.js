// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome;




if (isChrome == true && isOpera != true && isSafari != true && isFirefox != true && isEdge != true && isIE != true) {
  $("#msg").hide();
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var uid = user.uid;
      var user = firebase.auth().currentUser;
      var emailVerified = user.emailVerified;
      var slika;
      if (!emailVerified) {
        if (window.screen.width <= 430) {
          $("#izvestuvanje").show();
          setTimeout(function () {
            firebase.auth().signOut().then(function () {
              // Sign-out successful.
              location.reload();
            }).catch(function (error) {
              // An error happened.
              location.reload();
            });
          }, 2000)
        } else {
          if (confirm("Вашата емаил адреса не е верифицирана, ве молиме проверете го вашиот мејл.")) {
            firebase.auth().signOut().then(function () {
              // Sign-out successful.
              window.alert("Проверете ја вашата е-пошта имате добиено е-меил за верификација. ")
              location.reload();
            }).catch(function (error) {
              // An error happened.
              location.reload();
            });
          } else {
            firebase.auth().signOut().then(function () {
              // Sign-out successful.
              window.alert("Проверете ја вашата е-пошта имате добиено е-меил за верификација. ")
              location.reload();
            }).catch(function (error) {
              // An error happened.
              location.reload();
            });

          }
        }
      }
      $("#element10").on('change', function () {
        var file = this.files[0];
        var fileType = file["type"];
        var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if ($.inArray(fileType, validImageTypes) < 0) {
          // invalid file type code goes here.
          window.alert("Избраната датотека мора да биде слика!");
          this.value = '';
        }
      });
      function upload(uid, element, slika) {
        // get your select image
        var image = document.getElementById(element).files[0];
        // get your imageName
        var imageName = image.name;
        // firebase storage reference
        // it is the path were your image will store
        var storageRef = firebase.storage().ref('images/' + imageName);
        // upload image to slected storage referece
        var uploadTask = storageRef.put(image);
        uploadTask.on('state_changed', function (snapshot) {
          //observe state change events such as progress, pause, resume
          //get task progress by including the number of bytes uploaded and total
          //number of bytes
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('upload is' + progress + 'done');

        }, function (error) {
          //handle error here 
          console.log(error.message);
        }, function () {
          //handle successful uploads on complete 
          deleteOldImage(slika);
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            //get your upload image url here...
            console.log(downloadURL);
            url = downloadURL;
            var logoRef = firebase.database().ref('students/' + uid + '/slika');
            logoRef.set(downloadURL);
          });
        })
      }
      function deleteOldImage(logo) {
        var m = logo.toString().match(/\/([^\/?#]+)[^\/]*$/);
        if (m && m.length > 1) {
          var m1 = m[1].substr(9, m[1].length);
          console.log(m1);
          // Create a reference to the file to delete
          var desertRef = firebase.storage().ref('images/' + m1);
          // Delete the file
          desertRef.delete().then(function () {
            // File deleted successfully
          }).catch(function (error) {
            // Uh-oh, an error occurred!
          });
        }
      }
      var query = firebase.database().ref("students").orderByKey();
      query.once("value")
        .then(function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            // key will be "ada" the first time and "alan" the second time
            var key = childSnapshot.key;
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            var control = 0;
            if (uid == key) {
              control = 1;
              $(".login-cover").hide();
              $("#wrapper").css('display', 'block');
              var dialog = document.querySelector('#loginDialog');
              if (!dialog.showModal) {
                dialogPolyfill.registerDialog(dialog);
              }
              dialog.close();
              if (window.screen.width <= 430) {
                $("html").scrollTop(40);
                // $("body").css("overflow-y", "auto");
              }


              const editForm = document.querySelector("#editForm");
              var messagesRef = firebase.database().ref('companies');

              editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                var brVraboteni = getInputVal('brVraboteni');
                // //var email= getInputVal('singup-email');
                var odgLice = getInputVal('odgLice');
                var Ul = getInputVal('Ul');
                var Grad = getInputVal('Grad');
                var Link = getInputVal('Link');
                var imeFirma = getInputVal('imeFirma');
                var textarea = getInputVal('textarea');
                var kontaktTel = getInputVal('kontaktTel');
                var pozicija = getInputVal('pozicija');
                var url = document.getElementById("element10").files[0];
                if (url != undefined && url != null) {
                  upload(uid, 'element10', slika);
                }

                //Save messages
                saveMessage(brVraboteni, odgLice, Ul, Grad, Link, imeFirma, textarea, kontaktTel, pozicija);
                // //Show alert
                document.querySelector('.alert').style.display = 'block';

                // //Hide alert after 3sec
                setTimeout(function () {
                  document.querySelector('.alert').style.display = 'none';
                  location.reload();
                }, 2000)

                editForm.reset();

                // );

                function getInputVal(id) {
                  return document.getElementById(id).value;
                }
                function saveMessage(brVraboteni, odgLice, Ul, Grad, Link, imeFirma, textarea, kontaktTel, pozicija) {
                  // var newMessageRef= messagesRef.push();
                  var vraboteniRef = firebase.database().ref('students/' + uid + '/godinaNaStudii');
                  var odgliceRef = firebase.database().ref('students/' + uid + '/univerzitet');
                  var ulRef = firebase.database().ref('students/' + uid + '/fakultet');
                  var gradRef = firebase.database().ref('students/' + uid + '/grad');
                  var linkRef = firebase.database().ref('students/' + uid + '/email');
                  var imeRef = firebase.database().ref('students/' + uid + '/ImePrezime');
                  var textareaRef = firebase.database().ref('students/' + uid + '/Opis');
                  var kontaktTelRef = firebase.database().ref('students/' + uid + '/kontaktTel');
                  var pozicijaRef = firebase.database().ref('students/' + uid + '/pozicija');
                  if (brVraboteni != "" && brVraboteni != null) {
                    vraboteniRef.set(brVraboteni)
                  }
                  if (odgLice != "" && odgLice != null) {
                    odgliceRef.set(odgLice)
                  }
                  if (Ul != "" && Ul != null) {
                    ulRef.set(Ul)
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
                  if (kontaktTel != "" && kontaktTel != null) {
                    kontaktTelRef.set(kontaktTel)
                  }
                  if (pozicija != null && pozicija != "") {
                    pozicijaRef.set(pozicija);
                  }


                }
              });
              $(document).ready(function () {
                firebase.database().ref().once('value').then(function (snapshot) {
                  var brOglasi = snapshot.val().broglasi;
                  if (brOglasi != null && brOglasi != "") {
                    $("#para31").text(brOglasi);
                  }
                  else {
                    $("#para31").text(0);
                  }
                });

                // once will get all your data in one time
                firebase.database().ref('students/' + uid).once('value').then(function (snapshot) {
                  var ImePrezime = snapshot.val().ImePrezime;
                  var opis = snapshot.val().Opis;
                  var email = snapshot.val().email;
                  var fakultet = snapshot.val().fakultet;
                  var univerzitet = snapshot.val().univerzitet;
                  var godinaNaStudii = snapshot.val().godinaNaStudii;
                  var grad = snapshot.val().grad;
                  slika = snapshot.val().slika;
                  var kontaktTel = snapshot.val().kontaktTel;
                  var pozicija = snapshot.val().pozicija;
                  if (slika != null) {
                    document.getElementById("img1").src = slika;
                    // $(".vnesi8").hide();
                  }
                  else {
                    // $(".vnesi8").show();
                    document.getElementById("img1").src = "../man.png";
                  }
                  if (ImePrezime != null && ImePrezime != "") {
                    $("#moja").text(ImePrezime);
                    $("#imeFirma").val(ImePrezime);
                    document.getElementById("img1").alt = ImePrezime;
                  }
                  else {
                    $("#moja").text('Име и презиме');
                    document.getElementById("img1").alt = "Слика";
                  }
                  if (opis != null && opis != "") {
                    $("#para12").text(opis);
                    $("#textarea").val(opis);
                  }
                  else {
                    $("#para12").text("Личен опис-Немате внесено");
                  }

                  if (email != null && email != "") {
                    $("#link").text(email);
                    $("#Link").val(email);
                  }
                  else {
                    $("#link").text("email-nema");
                  }
                  if (godinaNaStudii != null && godinaNaStudii != "") {
                    $("#godinaStudii").text(godinaNaStudii);
                    $("#brVraboteni").val(godinaNaStudii);
                  }
                  else {
                    $("#godinaStudii").text('Нема');
                  }
                  if (univerzitet != null && univerzitet != "") {
                    $("#univerzitet").text(univerzitet);
                    $("#odgLice").val(univerzitet);
                  }
                  else {
                    $("#univerzitet").text('Нема');
                  }
                  if (fakultet != null && fakultet != "") {
                    $("#fakultet").text(fakultet);
                    $("#Ul").val(fakultet);
                  }
                  else {
                    $("#fakultet").text('Нема');
                  }
                  if (grad != null && grad != "") {
                    $("#gradot").text(grad);
                    $("#Grad").val(grad);
                  }
                  else {
                    $("#gradot").text("Нема");
                  }
                  if (kontaktTel != null && kontaktTel != "") {
                    $("#kontakt").text(kontaktTel);
                    $("#kontaktTel").val(kontaktTel);
                  }
                  else {
                    $("#kontakt").text("");
                  }
                  if (pozicija != null && pozicija != "") {
                    $("#pozicija").val(pozicija);
                    $("#pozicijata").text(pozicija);
                  }
                  if (control == 0) {
                    location.replace("bintern8.html");
                  }

                })

              })

              //LogOut Process
              $("#singOutBtn").click(function () {
                firebase.auth().signOut().then(function () {
                  // Sign-out successful.
                  $("#loginProgress").hide();
                  $("#loginBtn").show();
                  $("#loginEmail").show();
                  $("#loginPassword").show();

                  location.reload();
                }).catch(function (error) {
                  // An error happened.
                  alert(error.message)
                });
              }
              );

            }

          });
        });
    } else {
      // No user is signed in.
      $(".login-cover").show();

      var dialog = document.querySelector('#loginDialog');
      if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }
      dialog.showModal();
    }
  });

  //   Login Process
  $("#loginBtn").click(
    function () {
      var email = $("#loginEmail").val().trim();
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

  //LogOut Process
  $("#singOutBtn").click(function () {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      $("#loginProgress").hide();
      $("#loginBtn").show();
      $("#loginEmail").show();
      $("#loginPassword").show();

      location.reload();
    }).catch(function (error) {
      // An error happened.
      alert(error.message)
    });
  }
  );
  $("#button1").click(
    function () {
      $(".cover").show();
      $("#uredi").show();
      $("html").scrollTop(100);
      if (window.screen.width <= 430) {
        $("html").scrollTop(220);
      }

    });
  $("#Nazad").click(
    function () {
      $(".cover").hide();
      $("#uredi").hide();

    });
}
else {
  $("#msg").show();
  $("#spiner").hide();
}

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
$("#singOutBtn1").click(function () {
  $("#singOutBtn").trigger("click");
});
// $("#loginPassword").focusin(function () {
//   console.log('true');
//   $(window).scrollTop(250);
// });
// Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('img1');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function () {
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}