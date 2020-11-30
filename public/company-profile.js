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
var hash1 = window.location.href.split('?')[2];
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


            $(document).ready(function () {
                firebase.database().ref('students/' + uid).once('value').then(function (snapshot) {
                    var ImePrezime = snapshot.val().ImePrezime;

                    // once will get all your data in one time
                    firebase.database().ref('companies/' + hash).once('value').then(function (snapshot) {
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
                        var data = snapshot.val();
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
                            document.getElementById("logo").style.backgroundImage = "url('interns/dashboard/company.PNG')";
                        }
                        if (moiOglasi != null && moiOglasi != "") {
                            $("#para3").text(moiOglasi);
                            for (let i = 1; i <= moiOglasi; i++) {
                                $('#li' + i).css({ 'display': 'block' });
                                $('#sp' + i).text(data['oglas_' + i]['pozicija']);
                                var brAplikanti = data['oglas_' + i]['brojAplikanti'];
                                for (let j = 1; j <= brAplikanti; j++) {
                                    if (data['oglas_' + i]['aplikant_' + i] == uid) {
                                        $('#btn' + i).toggleClass('btn-primary btn-success');
                                        $('#btn' + i).addClass('disabled');
                                        $('#btn' + i).text('Аплицирано');
                                        $('#btn' + i).attr('disabled', 'disabled');

                                    }

                                }
                                $("#sp" + i).click(function () {
                                    location.href = 'ads.html?' + data["oglas_" + i]['brojNaOglas'];
                                });
                                $("#btn" + i).click(function () {
                                    $('#btn' + i).toggleClass('btn-primary btn-success');
                                    $('#btn' + i).addClass('disabled');
                                    $('#btn' + i).text('Аплицирано');
                                    $('#btn' + i).attr('disabled', 'disabled');
                                    //TO DO Apply for ads;
                                    var brojAplikanti = data["oglas_" + i]["brojAplikanti"];
                                    var moiOglasi;
                                    brojAplikanti++;
                                    firebase.database().ref('companies/' + hash).once('value').then(function (snapshot) {
                                        moiOglasi = snapshot.val().moiOglasi;
                                        var videno = snapshot.val().videno;
                                        if (videno == null || videno != 0) {
                                            var videnoRef = firebase.database().ref('companies/' + hash + '/videno');
                                            videnoRef.set(0);
                                        }


                                        firebase.database().ref('companies/' + hash + '/oglas_' + i).once('value').then(function (snapshot) {
                                            brojNaOglas = snapshot.val().brojNaOglas;
                                            var aplikantRef = firebase.database().ref('companies/' + hash + '/oglas_' + i + '/aplikant_' + brojAplikanti);
                                            aplikantRef.set(uid);
                                            var brAplikantiteRef = firebase.database().ref('companies/' + hash + '/oglas_' + i + '/brojAplikanti');
                                            brAplikantiteRef.set(brojAplikanti);
                                            var brAplikantiRef = firebase.database().ref('oglasi/oglas_' + brojNaOglas + '/brojAplikanti');
                                            brAplikantiRef.set(brojAplikanti);

                                        });

                                    })
                                    var imePraktikant, praktikantMail, email;
                                    firebase.database().ref('students/' + uid).once('value').then(function (snapshot) {
                                        imePraktikant = snapshot.val().ImePrezime;
                                        praktikantMail = snapshot.val().email;

                                        firebase.database().ref('companies/' + hash).once('value').then(function (snapshot) {
                                            email = snapshot.val().email;
                                            var sendEmailNotificationToCompany = firebase.functions().httpsCallable('sendEmailNotificationToCompany');
                                            sendEmailNotificationToCompany({ email: email, imePraktikant: imePraktikant, praktikantMail: praktikantMail, pozicija: data['oglas_' + i]['pozicija'] }).then(function (result) {
                                                window.alert('Успешно аплициравте!');

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
                                    });
                                });
                            }
                        }
                        else {
                            $("#para3").text("0");
                        }

                        if (brVraboteni != null && brVraboteni != "") {
                            $("#brojVraboteni").text(brVraboteni);

                        }
                        else {
                            $("#brojVraboteni").text("0");
                        }
                        if (Grad != null && Grad != "") {
                            $("#gr").text(Grad);
                        }
                        else {
                            $("#gr").text('Нема');
                        }
                        if (Ul != null && Ul != "") {
                            $("#ulica").text(Ul);
                        } else {
                            $("#ulica").text('Нема');
                        }
                        if (odgLice != null && odgLice != "") {
                            $("#ovlastenoLice").text(odgLice)
                        } else {
                            $("#ovlastenoLice").text('Нема');

                        }
                        if (imeFirma != null && imeFirma != null) {
                            $("#moja").text(imeFirma);
                            $("#gridModalLabel").text('Објавени огласи на ' + imeFirma);
                        } else {
                            $("#moja").text('Нема');
                        }
                        if (textarea != null && textarea != "") {
                            $("#para1").text(textarea);
                        }
                        else {
                            $("#para1").text('Нема');
                        }
                        if (Link != null && Link != "") {
                            $("#link").text(Link);
                            if (Link.substr(0, 4) != 'http') {
                                document.getElementById("link").href = 'https://' + Link;
                            }
                            else {
                                document.getElementById("link").href = Link;
                            }

                        }
                        if (kontaktTel != null && kontaktTel != "") {
                            $("#kontakt").text(kontaktTel);
                        }
                        else {
                            $("#kontakt").text("");
                        }
                        $('#exampleModalLabel').text('Нова порака до ' + imeFirma);
                        $('#recipient-name').val(snapshot.val().email);
                        $("#wrapper").css("display", "block");
                        $(".login-cover").hide();
                    }).catch(error => location.replace('404.html'));
                }).catch(function () { $("#singOutBtn").trigger('click') });
            });

            var dialog = document.querySelector('#loginDialog');
            if (!dialog.showModal) {
                dialogPolyfill.registerDialog(dialog);
            }
            dialog.close();
            $('#button').click(function () {
                $('#gridSystemModal').show();
            });
            $('#nazad').click(function () {
                $('#gridSystemModal').hide();
            });
            $('#nazad1').click(function () {
                $('#gridSystemModal').hide();
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
            $(".login-cover").show();

            // location.reload();
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
            $(".login-cover").show();

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
