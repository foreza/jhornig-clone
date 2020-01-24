$(document).ready(function () {

    
    logoSlider = configureSlider("logo-slider", 8, 8);
   

    $('#logo-slider-animate-left').click( function(){
        slideLeftForSlider(logoSlider)
    });

    $('#logo-slider-animate-right').click( function(){
        slideRightForSlider(logoSlider)
    });

});
