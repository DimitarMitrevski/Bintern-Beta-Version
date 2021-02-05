var hash = window.location.href.split('?')[1];
console.log(hash);
var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();
var date = month + '/' + day + '/' + year;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in..
        var uid = user.uid;
        firebase.database().ref('oglasi/' + 'oglas_' + hash).once('value').then(function (snapshot) {
            var data = snapshot.val();
            $("#pozicija").text(data.pozicija);
            $(".text-break").text(data.opisPraksata);
            var initial = data.vremetraenje.do.split(/\//);
            var datum = [initial[1], initial[0], initial[2]].join('/');
            const date1 = new Date(datum);
            const date2 = new Date(date);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            $("#vremetraenjeOglasot").text("Активен уште: " + diffDays + ' денови');
            $("#vremetraenjePraksa").text("Времетраење на праксата: " + data.odKoga + " - " + data.doKoga);
            if (data.logoFirma != null) {
                document.querySelector('#img1').src = data.logoFirma;
            }
            firebase.database().ref('companies/' + data.uid).once('value').then(function (snapshot) {
                $("#imeKompanija").text(snapshot.val().imeFirma);
                document.querySelector('#img1').alt = snapshot.val().imeFirma;
                var moiOglasi = snapshot.val().moiOglasi;
                for (let i = 0; i < moiOglasi; i++) {
                    firebase.database().ref('companies/' + data.uid + '/oglas_' + (i + 1)).once('value').then(function (snapshot) {
                        var brojAplikanti = snapshot.val().brojAplikanti;
                        var brojNaOglas = snapshot.val().brojNaOglas;
                        var oglasBr = 'oglas_' + brojNaOglas;

                        if (brojAplikanti != null && oglasBr == 'oglas_' + hash) {
                            for (let j = 1; j <= brojAplikanti; j++) {
                                firebase.database().ref('companies/' + data.uid + '/oglas_' + (i + 1) + '/aplikant_' + j).once('value').then(function (snapshot) {
                                    var aplikant = snapshot.val();
                                    if (uid == aplikant) {
                                        $("#button").toggleClass('btn-primary btn-success');
                                        $("#button").addClass('disabled');
                                        $("#button").text('Аплицирано');
                                        $("#button").attr('disabled', 'disabled');
                                    }
                                })
                            }
                        }
                    })
                }
            });
            $("#button").click(function () {
                $("#button").toggleClass('btn-primary btn-success');
                $("#button").addClass('disabled');
                $("#button").text('Аплицирано');
                $("#button").attr('disabled', 'disabled');
                $('#staticBackdrop').modal('show');
                // TO DO
                // Send E-mail notification to company and write in database
                var brojAplikanti = data.brojAplikanti;
                var moiOglasi;
                brojAplikanti++;
                firebase.database().ref('companies/' + data.uid).once('value').then(function (snapshot) {
                    moiOglasi = snapshot.val().moiOglasi;
                    var videno = snapshot.val().videno;
                    if (videno == null || videno != 0) {
                        var videnoRef = firebase.database().ref('companies/' + data.uid + '/videno');
                        videnoRef.set(0);
                    }
                    var brojNaOglas = [moiOglasi];
                    var brojNa = [moiOglasi];

                    for (let i = 1; i <= moiOglasi; i++) {

                        firebase.database().ref('companies/' + data.uid + '/oglas_' + i).once('value').then(function (snapshot) {
                            brojNaOglas[i] = snapshot.val().opisPraksata;
                            brojNa[i] = snapshot.val().brojNaOglas;
                            var oglas_Br = 'oglas_' + brojNa[i];
                            if (oglas_Br == 'oglas_' + hash) {
                                console.log("Najdeno:" + hash)
                                console.log("Oglas_" + hash + ' vo Bintern');
                                var aplikantRef = firebase.database().ref('companies/' + data.uid + '/oglas_' + i + '/aplikant_' + brojAplikanti);
                                aplikantRef.set(uid);
                                var brAplikantiteRef = firebase.database().ref('companies/' + data.uid + '/oglas_' + i + '/brojAplikanti');
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

                    firebase.database().ref('companies/' + data.uid).once('value').then(function (snapshot) {
                        email = snapshot.val().email;
                        var sendEmailNotificationToCompany = firebase.functions().httpsCallable('sendEmailNotificationToCompany');
                        sendEmailNotificationToCompany({ email: email, imePraktikant: imePraktikant, praktikantMail: praktikantMail, pozicija: data.pozicija }).then(function (result) {
                            $('#staticBackdrop').modal('show');
                            $("#nazad").click(function () {
                                $("#staticBackdrop").modal('hide');
                            });
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


                    })
                })

            });
            $("#profil").click(function () {
                location.href = 'company-profile.html?' + data.uid + '?' + hash;
            });
            setTimeout(function () {
                $(".login-cover").hide();
                $("#wrapper").show();
            }, 2000)

        }).catch(function () { location.replace('404.html') });
    } else {
        // User is signed out.

    }
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