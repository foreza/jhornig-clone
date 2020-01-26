
var topSlider;
var blogSlider;
var igSlider;


$(document).ready(function () {

    
    topSlider = configureSlider("top-slider", 1, 1);
    blogSlider = configureSlider("blog-slider", 3, 3);
    igSlider = configureSlider("ig-slider", 6, 6);


    $('#top-slider-animate-left').click( function(){
        slideLeftForSlider(topSlider)
    });

    $('#top-slider-animate-right').click( function(){
        slideRightForSlider(topSlider)
    });

    $('#blog-slider-animate-left').click( function(){
        slideLeftForSlider(blogSlider)
    });

    $('#blog-slider-animate-right').click( function(){
        slideRightForSlider(blogSlider)
    });

    $('#ig-slider-animate-left').click( function(){
        slideLeftForSlider(igSlider)
    });

    $('#ig-slider-animate-right').click( function(){
        slideRightForSlider(igSlider)
    });



});
