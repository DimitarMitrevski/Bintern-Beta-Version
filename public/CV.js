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
    if (window.screen.width > 430) {
        $("#wrapper").css("top", "-88px");
    }
}
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in
        var uid = user.uid;
        var user = firebase.auth().currentUser;
        var emailVerified = user.emailVerified;
        var imeFirma, firmaMail;
        if (!emailVerified)
            window.alert("Вашата емаил адреса не е верифицирана, ве молиме проверете го вашиот мејл.");
        var brPraksi;
        //TO DO ADD Event listeners for Click on two buttons for Invitation on Ads
        var hash = window.location.href.split('?')[1];
        console.log(hash);
        function brPokani1(brPokani, key1) {
            if (brPokani != 0) {
                for (let i = 1; i <= brPokani; i++) {
                    firebase.database().ref('students/' + key1 + '/pokana_' + i).once('value').then(function (snapshot) {
                        var pokana = snapshot.val();
                        if (pokana == uid) {
                            $('#pokani1').toggleClass('btn-primary btn-success');
                            $('#pokani1').addClass('disabled');
                            $('#pokani1').text('Поканет на оглас');
                            $('#pokani1').prop('disabled', true);
                            $('#pokani').toggleClass('btn-primary btn-success');
                            $('#pokani').addClass('disabled');
                            $('#pokani').text('Поканет на оглас');
                            $('#pokani').prop('disabled', true);
                            return true;
                        } else {
                            $('#pokani1').show();
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
        $("#button2").click(function () {
            location.replace('intern-profile.html?' + hash);
        })
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

        $(document).ready(function () {
            // once will get all your data in one time
            //.on('value', function (snapshot) {
            firebase.database().ref('students/' + hash).once('value').then(function (snapshot) {
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
                var brPokani = snapshot.val().brPokani;
                brPokani1(brPokani, hash);
                if (brPraksi != 0) {
                    for (let j = 1; j <= brPraksi; j++) {
                        firebase.database().ref('students/' + hash + "/ostvareniPraksi" + j).once('value').then(function (snapshot) {
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
                setTimeout(function () {
                    $("#wrapper").css('display', 'block');
                    $("#skri").css({ 'all': 'unset', 'display': 'none' });
                    $('.spinner-border').hide();
                    $('html').scrollTop(0);
                }, 400);
                $("#pokani").click(function () {
                    $('#pokani1').toggleClass('btn-primary btn-success');
                    $('#pokani1').addClass('disabled');
                    $('#pokani1').text('Поканет на оглас');
                    $('#pokani1').prop('disabled', true);
                    $('#pokani').toggleClass('btn-primary btn-success');
                    $('#pokani').addClass('disabled');
                    $('#pokani').text('Поканет на оглас');
                    $('#pokani').prop('disabled', true);
                    console.log('Kliknato pokani');
                    brPokani++;
                    var brPokaniRef = firebase.database().ref('students/' + hash);
                    brPokaniRef.update({ "brPokani": brPokani });
                    var pokaniRef = firebase.database().ref('students/' + hash + '/pokana_' + brPokani);
                    pokaniRef.set(uid);
                    sendEmail(email, imeFirma, firmaMail, ImePrezime);
                });
                $("#pokani1").click(function () {
                    $("#pokani").trigger('click');
                });

            })
        })

    } else {
        // No user is signed in.
        location.replace("../index.html");
    }
});