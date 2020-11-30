$(document).ready(function () {
    setTimeout(function () {

        if (window.screen.width <= 430) {
            $('body').scrollTop(0);
        }
        $("#wrapper").css('display', 'block');

    }, 500)

    // $(".img1").on("click", function () {
    //     $("#horzNav").show();
    //     $(".button").hide();
    //     $('.img1').hide();
    //     $("#izlezi").show();
    //     // $("#slika").hide();
    //     $("#urediCV").hide();
    // })
    // $("#izlezi").on("click", function () {
    //     $("#horzNav").hide();
    //     $(".button").show();
    //     $('.img1').show();
    //     // $("#slika").show();
    //     $("#urediCV").show();
    // })

});