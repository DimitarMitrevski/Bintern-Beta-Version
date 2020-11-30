setTimeout(function () {
    $('.login-cover').hide();
    $('#wrapper').show();
}, 1500)


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
function submitUserForm() {
    var response = grecaptcha.getResponse();
    if (response.length == 0) {
        document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">Ова поле е потребно.</span>';
        console.log(response.length);
        return false;
    }
    return true;
}

function verifyCaptcha() {
    document.getElementById('g-recaptcha-error').innerHTML = '';
    function upload(uid) {
        // get your select image
        var image = document.getElementById("element10").files[0];
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
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                //get your upload image url here...

                var logoRef = firebase.database().ref('companies/' + uid + '/logo');
                logoRef.set(downloadURL);
            });
        })
    }



    const singupForm = document.querySelector("#singup-form");
    var messagesRef = firebase.database().ref('companies');
    singupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // get user info
        const email = singupForm['singup-email'].value;
        const password = singupForm['singup-password'].value;
        // sing up the user
        firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
            console.log(cred);
            var user = firebase.auth().currentUser;

            user.sendEmailVerification().then(function () {
                // Email sent.
            }).catch(function (error) {
                // An error happened.
            });
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorMessage);
            // ...
        });
        var imeFirma = getInputVal('name');
        // var email= getInputVal('singup-email');
        // var password= getInputVal('singup-password');
        var textarea = getInputVal('text');
        var industrija = getInputVal('industrija')
        var kontaktTel = getInputVal('kontaktTelefon');
        var url = document.getElementById("element10").files[0];

        function getInputVal(id) {
            return document.getElementById(id).value;
        }
        document.querySelector('.alert').style.display = 'block';
        document.querySelector('.cover').style.display = 'block';

        //Hide alert after 3sec
        setTimeout(function () {
            document.querySelector('.alert').style.display = 'none';
            document.querySelector('.cover').style.display = 'none';
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    var uid = firebase.auth().currentUser.uid;

                    if (url != undefined && url != null) {
                        upload(uid);
                    }
                    //Save messages
                    saveMessage(imeFirma, email, password, textarea, industrija, kontaktTel);



                    function saveMessage(imeFirma, email, password, textarea, industrija, kontaktTel) {
                        var imeRef = firebase.database().ref('companies/' + uid + '/imeFirma');
                        var textareaRef = firebase.database().ref('companies/' + uid + '/textarea');
                        var emailRef = firebase.database().ref('companies/' + uid + '/email');
                        var moiOglasiRef = firebase.database().ref('companies/' + uid + '/moiOglasi');
                        var industrijaRef = firebase.database().ref('companies/' + uid + '/industrija');
                        var kontaktRef = firebase.database().ref('companies/' + uid + '/kontaktTel');
                        moiOglasiRef.set(0);
                        if (kontaktTel != "" && kontaktTel != null) {
                            kontaktRef.set(kontaktTel);
                        }
                        if (imeFirma != "" && imeFirma != null) {
                            imeRef.set(imeFirma)
                        }
                        if (textarea != "" && textarea != null) {
                            textareaRef.set(textarea)
                        }
                        if (email != "" && email != null) {
                            emailRef.set(email)
                        }
                        if (industrija != "" && industrija != null) {
                            industrijaRef.set(industrija)
                        }

                    }

                }
                else {

                }
            })

        }, 2500)
        setTimeout(function () {
            firebase.auth().signOut().then(function () {
                // Sign-out successful.
                singupForm.reset();
                location.replace('profile.html');
            }).catch(function (error) {
                // An error happened.
            });
        }, 4500)

    });
    // singup
    $("#nazad").click(function () {
        $(".alert").hide();
        $(".cover").hide();
    })

}
