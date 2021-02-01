//TO DO IMPROVE ON CLICK ON CANDIDATES VIEW PROFILE
$('#myIFrame').on("load", function () {
    $("html").scrollTop(0);
    //then set up some access points
    var contents = $(this).contents(); // contents of the iframe
    // $(contents).find("body").on('mouseup', function (event) {
    // alert('test');
    // $(contents).find("#button").on('click', function (event) {
    //     $(".iframe-button").hide();
    // });
    // $(contents).find("#exampleModal").on('hidden.bs.modal', function (e) {
    //     // do something...
    //     (".iframe-button").show();
    // });
    // var location = document.getElementById("iframe_id").contentWindow.location.href;
    document.querySelector("#myIFrame").height = $(contents).find("#wrapper").height();
    $(contents).find("#wrapper").append("<button class='iframe-button btn btn-outline-primary'>" + "Назад" + "</button>");
    console.log($(contents).find("#wrapper").height());
    $(contents).find(".iframe-button").on("click", function () {
        document.getElementById("myIFrame").setAttribute("hidden", "hidden");
        $("#wrapper").show();
    });
    $(contents).find("#button3").on("click", function () {
        document.querySelector("#myIFrame").height = $(contents).find("#wrapper").height();
    });
    $(contents).find("#button2").on("click", function () {
        document.querySelector("#myIFrame").height = $(contents).find("#wrapper").height();
    });
    // });
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $("#button211").click(function () {
            $("html").scrollTop(0);

        })
        $("#button212").click(function () {
            $("html").scrollTop(0);

        })
        $("#button213").click(function () {
            $("html").scrollTop(0);

        })
        $("#button214").click(function () {
            $("html").scrollTop(0);

        })
        $("#button215").click(function () {
            $("html").scrollTop(0);

        })
        $("#button216").click(function () {
            $("html").scrollTop(0);

        })
        $("#button217").click(function () {
            $("html").scrollTop(0);

        })
        $("#button218").click(function () {
            $("html").scrollTop(0);

        })

        $(document).ready(function () {
            if (window.screen.width <= 430) {
                $("html").scrollTop(650);
            }
        });
        var uid = firebase.auth().currentUser.uid;
        firebase.database().ref("companies/" + uid).once('value').then(function (snapshot) {
            var videno = snapshot.val().videno;
            if (videno == 0) {
                setTimeout(function () {
                    if (confirm("Имате апликанти на вашите огласи погледнете подолу во делот Мои огласи.")) {
                        $("html").scrollTop(450);
                        firebase.database().ref("companies/" + uid).update({videno:1});
                        if (window.screen.width <= 430) {
                            $("html").scrollTop(900);
                        }
                    }
                }, 2000)
            }
            $("#wrapper").css("display", "block");
            $(".login-cover").hide();
            var dialog = document.querySelector('#loginDialog');
            if (!dialog.showModal) {
                dialogPolyfill.registerDialog(dialog);
            }
            dialog.close();
            var hashName = window.location.hash;
            console.log(hashName);
            setTimeout(function () {
                // $('.login-cover').hide();
                // $('#wrapper').show();
                if (hashName == '#kandidati') {
                    $(document).scrollTop(500);
                }
                else {
                    $(document).scrollTop(200);
                }
            }, 1000)

        }).catch(function () { $('#najava').trigger('click'); })
        // function buttonMove(brAplikanti) {
        //     if (brAplikanti >= 1 && brAplikanti <= 2) {
        //         $("#nazad1").css({ "top": "421px" });
        //         if (window.screen.width <= 430) {
        //             $("#nazad1").css({ "top": "415px" });
        //         }
        //     }
        //     else if (brAplikanti >= 3 && brAplikanti <= 4) {
        //         $("#nazad1").css({ "top": "580px" });
        //         if (window.screen.width <= 430) {
        //             $("#nazad1").css({ "top": "677px" });
        //         }
        //     }
        //     else if (brAplikanti >= 5 && brAplikanti <= 6) {
        //         $("#nazad1").css({ "top": "725px" });
        //         if (window.screen.width <= 430) {
        //             $("#nazad1").css({ "top": "950px" });
        //         }
        //     }
        //     else if (brAplikanti >= 7 && brAplikanti <= 8) {
        //         $("#nazad1").css({ "top": "854px" });
        //         if (window.screen.width <= 430) {
        //             $("#nazad1").css({ "top": "1206px" });
        //         }
        //     }
        //     else if (brAplikanti >= 9 && brAplikanti <= 10) {
        //         $("#nazad1").css({ "top": "1010px" });
        //         if (window.screen.width <= 430) {
        //             $("#nazad1").css({ "top": "1480px" });
        //         }
        //     }
        // }
        function sendEmail(firmaEmail, imePraktikant, praktikantMail, pozicija, imeFirma, firmaTel, odgLice) {
            var sendEmailNotificationToStudentForInterview = firebase.functions().httpsCallable('sendEmailNotificationToStudentForInterview');
            sendEmailNotificationToStudentForInterview({ firmaEmail: firmaEmail, imePraktikant: imePraktikant, praktikantMail: praktikantMail, pozicija: pozicija, imeFirma: imeFirma, firmaTel: firmaTel, odgLice: odgLice }).then(function (result) {

                window.alert("Вашата покана за интервју е успешно испратена до апликантот.");
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
        function displayApplicants(brStranica, k, pozicija, opisPraksa, brAplikanti, childData, firmaEmail, imeFirma, firmaTel, odgLice, br) {
            $(brStranica).show();
            $(brStranica).click(function () {
                document.querySelector('.kreiraj5').style.display = 'none';
                document.querySelector('.kreiraj6').style.display = 'none';
                document.querySelector('.kreiraj7').style.display = 'none';
                document.querySelector('.kreiraj8').style.display = 'none';
                document.querySelector('.kreiraj9').style.display = 'none';
                document.querySelector('.kreiraj10').style.display = 'none';
                document.querySelector('.kreiraj11').style.display = 'none';
                $("span").css({ "color": "#142757", "font-size": "19px" });
                $(brStranica).css({ "color": "red", "font-size": "24px" });
                $('.kreiraj' + (k + 3)).show();
                // for(let i=3; i<=11;i++){
                //     $('.kreiraj' + i).show();
                // }
                if (pozicija != null && pozicija != "") {
                    $("#besplaten" + (k + 3)).text(pozicija);

                }
                else {
                    $("#besplaten" + (k + 3)).text("Pozicija");
                }
                if (opisPraksa != null && opisPraksa != "") {
                    $("#para" + (k + 3)).text(opisPraksa);
                }
                else {
                    $("#para" + (k + 3)).text("Pozicija");
                }
                if (brAplikanti != null && brAplikanti != "") {
                    $("#brojAplikanti" + (k - 1)).text(brAplikanti);
                }
                else {
                    $("#brojAplikanti" + (k - 1)).text("0");
                }
                $("#button21" + k).click(function () {
                    // buttonMove(brAplikanti);
                    $("#vector1").show();
                    if (pozicija != null && pozicija != "") {
                        $("#digitalen").text(pozicija);
                    }
                    else {
                        $("#digitalen").text("pozicija");
                    }
                    br1++;
                    if (brAplikanti > 10)
                        brAplikanti = 10;
                    if (br1 >= 1 && br1 <= brAplikanti) {
                        console.log(br1);
                        console.log(childData);
                        // document.querySelector('.slikasotekst' + br1).style.display = 'block';
                        // document.querySelector('#vidi' + br1).href = "../../intern-profile.html?" + childData;

                        // $('#vidi' + br1).prop("href", "../../intern-profile.html?" + childData);
                        // $('#vidi' + br1).prop("target", "frame");

                        // $('#vidi' + br1).click(function () {
                        //     $("#wrapper").hide();
                        //     $("#myIFrame").show();
                        // });
                        if(childData){

                        firebase.database().ref('students/' + childData).once('value').then(function (snapshot) {
                            j++;
                            var ImePrezime = snapshot.val().ImePrezime;
                            var slika = snapshot.val().slika;
                            var opis = snapshot.val().Opis;
                            var godinaStudii = snapshot.val().godinaNaStudii;
                            var univerzitet = snapshot.val().univerzitet;
                            var fakultet = snapshot.val().fakultet;
                            var grad = snapshot.val().grad;
                            var vestini = snapshot.val().vestini;
                            var kakvaPraksa = snapshot.val().kakvaPraksaBaram;
                            var proekti = snapshot.val().moiProekti;
                            var knigi = snapshot.val().knigiKoiMiSeDopagaat;
                            var brPraksi = snapshot.val().brPraksi;
                            var kontanktTel = snapshot.val().kontaktTel;
                            var email = snapshot.val().email;
                            var div = document.createElement("div");
                            div.className = "col mb-3";
                            var h5 = document.createElement("h5");
                            var a = document.createElement("a");
                            var img = document.createElement("img");
                            var node = document.createTextNode(ImePrezime);
                            var node1 = document.createTextNode("Види профил");
                            h5.appendChild(node);
                            a.appendChild(node1);
                            a.id = "vidi" + j;
                            a.href = "../../intern-profile.html?" + childData;
                            a.target = "frame";
                            img.height = "119";
                            img.width = "119";
                            a.onclick = function () {
                                $("#wrapper").hide();
                                a.style = "color:blue!important;"
                                setTimeout(function () {
                                    // if (window.screen.width <= 430) {
                                    //     document.getElementById("myIFrame").height = "1400";
                                    // }
                                    //  document.querySelector("#myIFrame").height = $(contents).find("body").height();
                                    document.getElementById("myIFrame").removeAttribute("hidden");
                                    // $("#myIFrame").trigger("load");
                                }, 200);
                            }
                            if (slika != null)
                                img.src = slika;
                            else
                                img.src = "man.png";
                            div.append(img);
                            div.append(h5);
                            div.append(a);
                            // Get the parent element
                            let parentElement = document.getElementById('row');
                            // Get the parent's first child
                            let theFirstChild = parentElement.firstChild;

                            parentElement.insertBefore(div, theFirstChild);


                            // $("#ime" + j).text(ImePrezime);
                            // if (slika != null)
                            //     document.getElementById("slika" + j).src = slika;
                            // else
                            //     document.getElementById("slika" + j).src = "man.png";

                        });
                    }
                        //     $("#vidi" + j).off().on('click', function () {
                        //         if (window.screen.width <= 430) {
                        //             $("html").scrollTop(0);
                        //         }
                        //         else {
                        //             $("html").scrollTop(100);
                        //         }
                        //         document.querySelector('#wrapper1').style.display = 'block';
                        //         if (slika != null)
                        //             document.getElementById("img1").src = slika;
                        //         else
                        //             document.getElementById("img1").src = "man.png";

                        //         if (ImePrezime != null && ImePrezime != "") {
                        //             $("#imeto").text(ImePrezime);
                        //             $("#imeDefault").hide();

                        //         } else {
                        //             $("#imeto").text("Ime i Prezime");
                        //         }
                        //         if (opis != null && opis != "") {
                        //             $("#para1").text(opis);
                        //             $("#paragrafot").hide();

                        //         } else {
                        //             $("#para1").text("Ime i Prezime");
                        //         }
                        //         if (kontanktTel != null) {
                        //             $("#kontaktTel").show();
                        //             $("#kontakt").text(kontanktTel);
                        //         }
                        //         else {
                        //             $("#kontaktTel").hide();
                        //         }
                        //         if (email != null) {
                        //             $("#kontaktMail").text(email);
                        //         }
                        //         else
                        //             $("#kontaktMail").text("");
                        //         if (godinaStudii != null && godinaStudii != "") {
                        //             $("#godina").text(godinaStudii);
                        //         }
                        //         else {
                        //             $("#godina").text("Нема");
                        //         }
                        //         if (univerzitet != null && univerzitet != "") {
                        //             $("#kiril").text(univerzitet);
                        //         }
                        //         else {
                        //             $("#kiril").text("Нема");
                        //         }
                        //         if (fakultet != null && fakultet != "") {
                        //             $("#fakultet1").text(fakultet);
                        //         }
                        //         else {
                        //             $("#fakultet1").text("Нема");
                        //         }
                        //         if (grad != null && grad != "") {
                        //             $("#gradce").text(grad);
                        //         }
                        //         else {
                        //             $("#gradce").text("Нема");
                        //         }
                        //         if (vestini != null && vestini != "") {
                        //             $("#imepre1").text(vestini);
                        //             $("#imepre").hide();
                        //         }
                        //         else {
                        //             $("#imepre1").text("Нема");
                        //         }
                        //         if (kakvaPraksa != null && kakvaPraksa != "") {
                        //             $("#para2").text(kakvaPraksa);

                        //         }
                        //         else {
                        //             $("#para2").text("");
                        //         }
                        //         if (proekti != null && proekti != "") {

                        //             $("#paragraf").text(proekti);
                        //         }
                        //         else {
                        //             $("#paragraf").text("Нема");
                        //         }
                        //         if (knigi != null && knigi != "") {
                        //             $("#para3").text(knigi);

                        //         }
                        //         else {
                        //             $("#para3").text("Нема");
                        //         }
                        //         if (brPraksi != null && brPraksi != 0) {
                        //             $("#nemaPraksa").hide();
                        //             for (let j = 1; j <= brPraksi; j++) {
                        //                 firebase.database().ref('students/' + childData + "/ostvareniPraksi" + j).once('value').then(function (snapshot) {
                        //                     var kade = snapshot.val().kade;
                        //                     var kojaPoz = snapshot.val().kojaPoz;
                        //                     console.log(kade);
                        //                     $('#kakva' + j).show();
                        //                     $('#digitalen' + j).text(kojaPoz);
                        //                     $('#kade' + j).text(kade);
                        //                 });
                        //             }

                        //         }
                        //         else {
                        //             $("#nemaPraksa").show();
                        //         }
                        //         firebase.database().ref("companies/" + uid + "/oglas_" + (k + br)).once('value').then(function (snapshot) {
                        //             var pokani = snapshot.val().brPokani;
                        //             for (let j = 1; j <= pokani; j++) {
                        //                 firebase.database().ref("companies/" + uid + "/oglas_" + (k + br) + "/pokanet_" + j).once('value').then(function (snapshot) {
                        //                     var pokanet = snapshot.val();
                        //                     if (childData == pokanet) {
                        //                         $("#pokani").hide();
                        //                         $("#pokanet").show();
                        //                     }
                        //                 });

                        //             }

                        //             $("#pokani").off().on('click', function () {
                        //                 $(this).hide();
                        //                 $("#pokanet").show();
                        //                 console.log("Izvrseno pokani od function");
                        //                 pokani++;
                        //                 var pokanetRef = firebase.database().ref('companies/' + uid + '/oglas_' + (k + br) + '/pokanet_' + pokani);
                        //                 pokanetRef.set(childData);
                        //                 var brPokaniRef = firebase.database().ref('companies/' + uid + '/oglas_' + (k + br) + '/brPokani');
                        //                 brPokaniRef.set(pokani);
                        //                 sendEmail(firmaEmail, ImePrezime, email, pozicija, imeFirma, firmaTel, odgLice);

                        //             });
                        //         });
                        //     });

                        // })
                    }
                })
            })
        }
        var br = 0, j = 0, br1 = 0;
        firebase.database().ref('companies/' + uid).once('value').then(function (snapshot) {
            var brOglasi = snapshot.val().moiOglasi;
            var imeFirma = snapshot.val().imeFirma;
            var firmaEmail = snapshot.val().email;
            var firmaTel = snapshot.val().kontaktTel;
            var odgLice = snapshot.val().odgLice;
            if (brOglasi != null && brOglasi != "") {
                $("#brOglasi").text(brOglasi);
            }
            else {
                $("#brOglasi").text("0");
            }
            $("#kopce2").click(function () {
                document.querySelector('#wrapper1').style.display = 'none';
                $("#pokani").show();
                $("#pokanet").hide();
                $('html').scrollTop(190);
                for (let i = 1; i <= 4; i++) {
                    $("#kakva" + i).hide();
                }
            })
            $("#nazad1").click(function () {
                document.querySelector('#vector1').style.display = 'none';
                // location.reload();
            })
            // $('#eden').click(function () {
            //     location.reload();
            // })
            for (let i = 1; i <= brOglasi; i++) {
                var query = firebase.database().ref("companies/" + uid + "/oglas_" + i).orderByKey();
                query.once("value")
                    .then(function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            var key = childSnapshot.key; // "ada"
                            // childData will be the actual contents of the child
                            var childData = childSnapshot.val()
                            var pozicija = snapshot.val().pozicija;
                            var opisPraksa = snapshot.val().opisPraksata;
                            var brAplikanti = snapshot.val().brojAplikanti;
                            if (i >= 1 && i <= 8) {
                                displayApplicants("#eden", (i), pozicija, opisPraksa, brAplikanti, childData, firmaEmail, imeFirma, firmaTel, odgLice, 1);
                                setTimeout(()=>{
                          $('#eden').trigger("click");
                                },1000)
                               
                                // $("#eden").show();
                                // $("#eden").css({ "color": "red", "font-size": "24px" });
                                // $('.kreiraj' + (i + 3)).show();
                                // $('.kreiraj' + (i + 3)).addClass('animate__animated animate__zoomIn aimate__slower animate__delay-1s');
                                // $('#button21' + i).addClass('animate__animated animate__heartBeat animate__infinite aimate__slower animate__delay-2s');
                                // if (pozicija != null && pozicija != "") {
                                //     $("#besplaten" + (i + 3)).text(pozicija);

                                // }
                                // else {
                                //     $("#besplaten" + (i + 3)).text("Pozicija");
                                // }
                                // if (opisPraksa != null && opisPraksa != "") {
                                //     $("#para" + (i + 3)).text(opisPraksa);
                                // }
                                // else {
                                //     $("#para" + (i + 3)).text("Pozicija");
                                // }
                                // if (brAplikanti != null && brAplikanti != "") {
                                //     $("#brojAplikanti" + (i - 1)).text(brAplikanti);
                                // }
                                // else {
                                //     $("#brojAplikanti" + (i - 1)).text("0");
                                // }
                                // $("#button21" + i).click(function () {
                                //     $("#vector1").show();
                                //     var videnoRef = firebase.database().ref('companies/' + uid + '/videno');
                                //     videnoRef.set(1);
                                //     if (pozicija != null && pozicija != "") {
                                //         $("#digitalen").text(pozicija);
                                //     }
                                //     else {
                                //         $("#digitalen").text("pozicija");
                                //     }
                                //     br++;
                                //     if (brAplikanti > 10)
                                //         brAplikanti = 10;
                                //     if (br >= 1 && br <= brAplikanti) {
                                //         buttonMove(br);

                                //         document.querySelector('.slikasotekst' + br).style.display = 'block';
                                //         firebase.database().ref('students/' + childData).once('value').then(function (snapshot) {
                                //             j++;
                                //             var ImePrezime = snapshot.val().ImePrezime;
                                //             var slika = snapshot.val().slika;
                                //             var opis = snapshot.val().Opis;
                                //             var godinaStudii = snapshot.val().godinaNaStudii;
                                //             var univerzitet = snapshot.val().univerzitet;
                                //             var fakultet = snapshot.val().fakultet;
                                //             var grad = snapshot.val().grad;
                                //             var vestini = snapshot.val().vestini;
                                //             var kakvaPraksa = snapshot.val().kakvaPraksaBaram;
                                //             var proekti = snapshot.val().moiProekti;
                                //             var knigi = snapshot.val().knigiKoiMiSeDopagaat;
                                //             var brPraksi = snapshot.val().brPraksi;
                                //             var kontanktTel = snapshot.val().kontaktTel;
                                //             var email = snapshot.val().email;
                                //             $("#ime" + j).text(ImePrezime);
                                //             if (slika != null)
                                //                 document.getElementById("slika" + j).src = slika;
                                //             else
                                //                 document.getElementById("slika" + j).src = "man.png";
                                //             $("#vidi" + j).off().on('click', function () {
                                //                 if (window.screen.width <= 430) {
                                //                     $("html").scrollTop(0);
                                //                 } else {
                                //                     $("html").scrollTop(100);
                                //                 }
                                //                 document.querySelector('#wrapper1').style.display = 'block';
                                //                 if (slika != null)
                                //                     document.getElementById("img1").src = slika;
                                //                 else
                                //                     document.getElementById("img1").src = "man.png";
                                //                 if (ImePrezime != null && ImePrezime != "") {
                                //                     $("#imeto").text(ImePrezime);
                                //                     $("#imeDefault").hide();

                                //                 } else {
                                //                     $("#imeto").text("Ime i Prezime");
                                //                 }
                                //                 if (opis != null && opis != "") {
                                //                     $("#para1").text(opis);
                                //                     $("#paragrafot").hide();

                                //                 } else {
                                //                     $("#para1").text("Ime i Prezime");
                                //                 }
                                //                 if (kontanktTel != null) {
                                //                     $("#kontaktTel").show();
                                //                     $("#kontakt").text(kontanktTel);
                                //                 }
                                //                 else {
                                //                     $("#kontaktTel").hide();
                                //                 }
                                //                 if (email != null) {
                                //                     $("#kontaktMail").text(email);
                                //                 }
                                //                 else
                                //                     $("#kontaktMail").text("");
                                //                 if (godinaStudii != null && godinaStudii != "") {
                                //                     $("#godina").text(godinaStudii);
                                //                 }
                                //                 else {
                                //                     $("#godina").text("Нема");
                                //                 }
                                //                 if (univerzitet != null && univerzitet != "") {
                                //                     $("#kiril").text(univerzitet);
                                //                 }
                                //                 else {
                                //                     $("#kiril").text("Нема");
                                //                 }
                                //                 if (fakultet != null && fakultet != "") {
                                //                     $("#fakultet1").text(fakultet);
                                //                 }
                                //                 else {
                                //                     $("#fakultet1").text("Нема");
                                //                 }
                                //                 if (grad != null && grad != "") {
                                //                     $("#gradce").text(grad);
                                //                 }
                                //                 else {
                                //                     $("#gradce").text("Нема");
                                //                 }
                                //                 if (vestini != null && vestini != "") {
                                //                     $("#imepre1").text(vestini);
                                //                     $("#imepre").hide();
                                //                 }
                                //                 else {
                                //                     $("#imepre1").text("Нема");
                                //                 }
                                //                 if (kakvaPraksa != null && kakvaPraksa != "") {
                                //                     $("#para2").text(kakvaPraksa);

                                //                 }
                                //                 else {
                                //                     $("#para2").text("");
                                //                 }
                                //                 if (proekti != null && proekti != "") {

                                //                     $("#paragraf").text(proekti);
                                //                 }
                                //                 else {
                                //                     $("#paragraf").text("Нема");
                                //                 }
                                //                 if (knigi != null && knigi != "") {
                                //                     $("#para3").text(knigi);

                                //                 }
                                //                 else {
                                //                     $("#para3").text("Нема");
                                //                 }
                                //                 if (brPraksi != null && brPraksi != 0) {
                                //                     $("#nemaPraksa").hide();
                                //                     for (let j = 1; j <= brPraksi; j++) {
                                //                         firebase.database().ref('students/' + childData + "/ostvareniPraksi" + j).once('value').then(function (snapshot) {
                                //                             var kade = snapshot.val().kade;
                                //                             var kojaPoz = snapshot.val().kojaPoz;

                                //                             $('#kakva' + j).show();
                                //                             $('#digitalen' + j).text(kojaPoz);
                                //                             $('#kade' + j).text(kade);
                                //                         });
                                //                     }

                                //                 }
                                //                 else {
                                //                     $("#nemaPraksa").show();
                                //                 }

                                //                 firebase.database().ref("companies/" + uid + "/oglas_" + i).once('value').then(function (snapshot) {
                                //                     var pokani = snapshot.val().brPokani;
                                //                     for (let j = 1; j <= pokani; j++) {
                                //                         firebase.database().ref("companies/" + uid + "/oglas_" + i + "/pokanet_" + j).once('value').then(function (snapshot) {
                                //                             var pokanet = snapshot.val();
                                //                             if (childData == pokanet) {
                                //                                 $("#pokani").hide();
                                //                                 $("#pokanet").show();
                                //                             }
                                //                         });

                                //                     }

                                //                     $("#pokani").off().on('click', function () {
                                //                         $(this).hide();
                                //                         $("#pokanet").show();
                                //                         console.log("tuka ne treba");
                                //                         pokani++;
                                //                         var pokanetRef = firebase.database().ref('companies/' + uid + '/oglas_' + i + '/pokanet_' + pokani);
                                //                         pokanetRef.set(childData);
                                //                         var brPokaniRef = firebase.database().ref('companies/' + uid + '/oglas_' + i + '/brPokani');
                                //                         brPokaniRef.set(pokani);
                                //                         sendEmail(firmaEmail, ImePrezime, email, pozicija, imeFirma, firmaTel, odgLice);

                                //                     });
                                //                 });
                                //             });

                                //         })
                                //     }

                                // })
                            }
                            if (i >= 9 && i <= 16) {
                                displayApplicants("#dva", (i - 8), pozicija, opisPraksa, brAplikanti, childData, firmaEmail, imeFirma, firmaTel, odgLice, 8);

                            }
                            if (i >= 17 && i <= 24) {
                                displayApplicants("#tri", (i - 16), pozicija, opisPraksa, brAplikanti, childData, firmaEmail, imeFirma, firmaTel, odgLice, 16);

                            }
                            if (i >= 25 && i <= 32) {
                                displayApplicants("#cetiri", (i - 24), pozicija, opisPraksa, brAplikanti, childData, firmaEmail, imeFirma, firmaTel, odgLice, 24);

                            }
                            if (i >= 33 && i <= 40) {
                                displayApplicants("#pet", (i - 32), pozicija, opisPraksa, brAplikanti, childData, firmaEmail, imeFirma, firmaTel, odgLice, 32);

                            }


                        });
                    });
            }
        }).catch(function () { console.log("Error") });
    }
    else {
        // location.replace("../../index.html");
        // No user is signed in.
        $(".login-cover").show();

        var dialog = document.querySelector('#loginDialog');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
    }
})

$("#najava").click(function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        $("#loginProgress").hide();
        $("#loginBtn").show();
        // location.reload();
        // location.replace("../../index.html");
    }).catch(function (error) {
        // An error happened.
        alert(error.message)
        location.reload();
    });
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
