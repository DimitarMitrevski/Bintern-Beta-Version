firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        setTimeout(function () {
            $('.login-cover').hide();
            $('#wrapper').show();
        }, 1000)
        $(".button").text("Мој профил");
        $("#najava").text("Moj профил").css("width", "fit-content");
        $("#najava").hover(
            function () {
                $(this).css({ "padding-bottom": "12px", "top": "0px" });
            });
        firebase.database().ref("companies/" + user.uid).once("value").then(function (snapshot) {
            var ime = snapshot.val().imeFirma;
            document.querySelector("#najava").href = "companies/profile.html";
            $(".button").on("click", function () {
                document.location = "companies/profile.html";
            });
        }).catch(function (err) {
            document.querySelector("#najava").href = "interns/profile.html"
            $(".button").on("click", function () {
                document.location = "interns/profile.html";
            });
        });
    }
    else {
        setTimeout(function () {
            $('.login-cover').hide();
            $('#wrapper').show();
        }, 1000)
        $(".button").on("click", function () {
            $(".popup").show();
            $("#dialog").show();
            if (window.screen.width <= 430) {
                $("html").scrollTop(100);
            }
        });
        $("#nazad").on("click", function () {
            $(".popup").hide();
            $("#dialog").hide();

        });

    }
});
