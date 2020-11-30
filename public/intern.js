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

var hash = window.location.href.split('?')[1];

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
console.log(inIframe());
if (inIframe() == true) {
    $("header").css("display", "none");
    $(".navbar").prop("hidden", "hidden");
    if (window.screen.width > 430)
        $("#wrapper").css("top", "-106px");
    else
        $("#wrapper").css("top", "-80px");

}

if (isChrome == true && isOpera != true && isSafari != true && isFirefox != true && isEdge != true && isIE != true) {
    $("#msg").hide();
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var uid = user.uid;
            firebase.database().ref('companies/' + uid).once('value').then(function (snapshot) {
                var imeFirma = snapshot.val().imeFirma;
                var emailFirma = snapshot.val().emailFirma;
                var user = firebase.auth().currentUser;
                var emailVerified = user.emailVerified;
                var slika;
                var dialog = document.querySelector('#loginDialog');
                if (!dialog.showModal) {
                    dialogPolyfill.registerDialog(dialog);
                }
                dialog.close();
                $(".login-cover").hide();
                $("#wrapper").css('display', 'block');
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
                function brPokani1(brPokani, key1) {
                    if (brPokani != 0) {
                        for (let i = 1; i <= brPokani; i++) {
                            firebase.database().ref('students/' + key1 + '/pokana_' + i).once('value').then(function (snapshot) {
                                var pokana = snapshot.val();
                                if (pokana == uid) {
                                    $('#button1').toggleClass('btn-outline-primary btn-success');
                                    $('#button1').addClass('disabled');
                                    $('#button1').text('Поканет на оглас');
                                    $('#button1').prop('disabled', true);
                                    return true;
                                } else {
                                    $('#button1').show();
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

                var query = firebase.database().ref("students").orderByKey();
                query.once("value")
                    .then(function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            // key will be "ada" the first time and "alan" the second time
                            var key = childSnapshot.key;
                            // childData will be the actual contents of the child
                            var childData = childSnapshot.val();
                            var control = 0;
                            if (key == hash) {
                                control = 1;
                                if (window.screen.width <= 430) {
                                    $("html").scrollTop(40);
                                    // $("body").css("overflow-y", "auto");
                                }
                                $("#button3").click(function () {
                                    // window.open('CV.html?' + key, '_blank');
                                    location.replace('CV.html?' + hash);
                                });
                                brPokani1(childData.brPokani, key);
                                $(document).ready(function () {
                                    // once will get all your data in one time
                                    firebase.database().ref('students/' + key).once('value').then(function (snapshot) {
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
                                            document.getElementById("img1").src = "man.png";
                                        }
                                        if (ImePrezime != null && ImePrezime != "") {
                                            $("#moja").text(ImePrezime);
                                            $("#imeFirma").val(ImePrezime);
                                            document.getElementById("img1").alt = ImePrezime;
                                            $('#exampleModalLabel').text("Нова порака до " + ImePrezime);
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
                                            $("#recipient-name").val(email);

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

                                        $('#button1').click(function () {
                                            $(this).toggleClass('btn-outline-primary btn-success');
                                            $(this).addClass('disabled');
                                            $(this).text('Поканет на оглас');
                                            $(this).prop('disabled', true);
                                            console.log('Kliknato button1');
                                            childData.brPokani++;
                                            var brPokaniRef = firebase.database().ref('students/' + key);
                                            brPokaniRef.update({ "brPokani": childData.brPokani });
                                            var pokaniRef = firebase.database().ref('students/' + key + '/pokana_' + childData.brPokani);
                                            pokaniRef.set(uid);
                                            sendEmail(email, imeFirma, firmaMail, ImePrezime);
                                        });
                                    })

                                })


                            }

                        });
                    });
            }).catch(function () { $('#singOutBtn').trigger('click'); });
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