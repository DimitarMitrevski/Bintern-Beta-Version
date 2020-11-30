$(document).ready(function () {
    $('#blogSliki').hide();
    $('section#animate').hide();
    setTimeout(function () {
        const element = document.querySelector('svg');
        element.classList.add('animate__animated', 'animate__zoomOut', 'aimate__fast');
        setTimeout(function () {
            $('body').scrollTop(0);
            $('svg').hide();
            $('#wrapper').show();
        }, 900)
        setTimeout(function () {
            $('body').css('overflow-y', 'auto');
        }, 3800)
    }, 1500)
    if (window.screen.height > 700 && window.screen.width > 430) {
        setTimeout(function () {
            $('#kako').show(1000);
        }, 3800)
    } else {
        $(window).scroll(function () {
            var scrollPos = $(document).scrollTop();
            // console.log(scrollPos);
            if (scrollPos >= 200 && window.screen.width > 430 || window.screenTop > 200) {
                const element = document.querySelector('#kako');
                $('#kako').show();
                element.classList.add('animate__animated', 'animate__zoomIn', 'aimate__fast');
            }
        });
    }
    if (window.screen.width <= 430) {
        setTimeout(() => {
            $('section#animate').show(1200);
        }, 4500);
    }

    $(window).scroll(function () {
        var scrollPos = $(document).scrollTop();
        // console.log(scrollPos);
        if (scrollPos >= 700 && window.screen.width <= 430) {
            const element = document.querySelector('#blog');
            $('#blog').show();
        }
        if (scrollPos + window.screen.height > 1000) {
            $('section#animate').show(1500);
        }
        else {
            $("#slika22").show();
            $('#oglas2').show();
        }
        if (scrollPos >= 670) {
            $('#blogSliki').addClass('animate__animated animate__zoomIn aimate__slow').show();
        }

    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
});