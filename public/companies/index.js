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
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      // Loop through users in order with the forEach() method. The callback
      // provided to forEach() will be called synchronously with a DataSnapshot
      // for each child:

      var uid = firebase.auth().currentUser.uid;
      var user = firebase.auth().currentUser;
      var emailVerified = user.emailVerified;
      var logo;
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
      function upload(uid, element, logo) {
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
          deleteOldImage(logo);
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            //get your upload image url here...
            console.log(downloadURL);
            url = downloadURL;
            var logoRef = firebase.database().ref('companies/' + uid + '/logo');
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
      var query = firebase.database().ref("companies").orderByKey();
      query.once("value")
        .then(function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            // key will be "ada" the first time and "alan" the second time
            var key = childSnapshot.key;
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            if (uid == key) {
              $(document).ready(function () {
                // once will get all your data in one time
                firebase.database().ref('companies/' + uid).once('value').then(function (snapshot) {
                  var imeFirma = snapshot.val().imeFirma;
                  var textarea = snapshot.val().textarea;
                  var brVraboteni = snapshot.val().brVraboteni;
                  var odgLice = snapshot.val().odgLice;
                  var Link = snapshot.val().Link;
                  var Ul = snapshot.val().Ul;
                  var Grad = snapshot.val().Grad;
                  var moiOglasi = snapshot.val().moiOglasi;
                  logo = snapshot.val().logo;
                  var kontaktTel = snapshot.val().kontaktTel;
                  if (logo != null) {
                    // $('.vnesi8').hide();
                    document.getElementById("logo").style.backgroundImage = "url('" + logo + "')";
                    // Get the modal
                    var modal = document.getElementById('myModal');

                    // Get the image and insert it inside the modal - use its "alt" text as a caption
                    var img = document.getElementById('logo');
                    var modalImg = document.getElementById("img01");
                    var captionText = document.getElementById("caption");
                    img.onclick = function () {
                      modal.style.display = "block";
                      modalImg.src = logo;
                      captionText.innerHTML = imeFirma;
                    }

                    // Get the <span> element that closes the modal
                    var span = document.getElementsByClassName("close")[0];

                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function () {
                      modal.style.display = "none";
                    }

                  }
                  else {
                    // $('.vnesi8').show();
                    document.getElementById("logo").style.backgroundImage = "url('../interns/dashboard/company.png')";
                  }
                  if (moiOglasi != null && moiOglasi != "") {
                    $("#para3").text(moiOglasi);
                  }
                  else {
                    $("#para3").text("0");
                  }

                  if (brVraboteni != null && brVraboteni != "") {
                    $("#brojVraboteni").text(brVraboteni);
                    $('#brVraboteni').val(brVraboteni);
                  }
                  else {
                    $("#brojVraboteni").text("0");
                  }
                  if (Grad != null && Grad != "") {
                    $("#gr").text(Grad);
                    $('#Grad').val(Grad);
                  }
                  else {
                    $("#gr").text('Нема');
                  }
                  if (Ul != null && Ul != "") {
                    $("#ulica").text(Ul);
                    $('#Ul').val(Ul);
                  } else {
                    $("#ulica").text('Нема');
                  }
                  if (odgLice != null && odgLice != "") {
                    $("#ovlastenoLice").text(odgLice)
                    $('#odgLice').val(odgLice);
                  } else {
                    $("#ovlastenoLice").text('Нема');

                  }
                  if (imeFirma != null && imeFirma != null) {
                    $("#moja").text(imeFirma);
                    $('#imeFirma').val(imeFirma);
                  } else {
                    $("#moja").text('Нема');
                  }
                  if (textarea != null && textarea != "") {
                    $("#para1").text(textarea);
                    $('#textarea').val(textarea);
                  }
                  else {
                    $("#para1").text('Нема');
                  }
                  if (Link != null && Link != "") {
                    $("#link").text(Link);
                    document.getElementById("link").href = Link;
                    $('#Link').val(Link);
                  }
                  if (kontaktTel != null && kontaktTel != "") {
                    $("#kontaktTel").val(kontaktTel);
                    $("#kontakt").text(kontaktTel);
                  }
                  else {
                    $("#kontakt").text("");
                  }

                })
              })
              {
                $("#wrapper").css("display", "block");
                $(".login-cover").hide();
                var dialog = document.querySelector('#loginDialog');
                if (!dialog.showModal) {
                  dialogPolyfill.registerDialog(dialog);
                }
                dialog.close();

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
                  var url = document.getElementById("element10").files[0];
                  if (url != undefined && url != null) {
                    upload(uid, 'element10', logo);

                  }

                  //Save messages
                  saveMessage(brVraboteni, odgLice, Ul, Grad, Link, imeFirma, textarea, kontaktTel);
                  // //Show alert
                  document.querySelector('.alert').style.display = 'block';


                  // //Hide alert after 3sec
                  setTimeout(function () {
                    document.querySelector('.alert').style.display = 'none';
                    // document.location.reload(true);
                    location.reload();
                  }, 2000)

                  editForm.reset();

                  // );

                  function getInputVal(id) {
                    return document.getElementById(id).value;
                  }
                  function saveMessage(brVraboteni, odgLice, Ul, Grad, Link, imeFirma, textarea, kontaktTel) {
                    // var newMessageRef= messagesRef.push();
                    var vraboteniRef = firebase.database().ref('companies/' + uid + '/brVraboteni');
                    var odgliceRef = firebase.database().ref('companies/' + uid + '/odgLice');
                    var ulRef = firebase.database().ref('companies/' + uid + '/Ul');
                    var gradRef = firebase.database().ref('companies/' + uid + '/Grad');
                    var linkRef = firebase.database().ref('companies/' + uid + '/Link');
                    var imeRef = firebase.database().ref('companies/' + uid + '/imeFirma');
                    var textareaRef = firebase.database().ref('companies/' + uid + '/textarea');
                    var kontaktTelRef = firebase.database().ref('companies/' + uid + '/kontaktTel');
                    var logoRef = firebase.database().ref('companies/' + uid + '/logo');


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
                    if (kontaktTelRef != "" && kontaktTelRef != null) {
                      kontaktTelRef.set(kontaktTel);
                    }


                  }
                });

                $(document).ready(function () {

                  var rootRef = firebase.database().ref().child("companies");

                  rootRef.once('child_added', snap => {
                    var name = snap.child("name").val();
                    var email = snap.child("email").val();
                    var text = snap.child("text").val();

                    if (name != null && name != null) {
                      $("#moja").append("<h3>" + name + "</h3>");
                      $("#moja1").hide();
                    } else {
                      $("#moja1").show();
                    }
                    if (text != null && text != "") {
                      $("#para1").append("<p>" + text + "</p>");
                      $("#para2").hide();
                    }
                    else {
                      $("#para2").show();
                    }

                  })
                })


              }
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
  $("#singOutBtn1").click(function () {
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

  $("#button2").click(
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
} else {
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
