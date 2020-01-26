$(document).ready(function () {

    
    logoSlider = configureSlider("logo-slider", 8, 8);
   

    $('#logo-slider-animate-left').click( function(){
        slideLeftOnceForSlider(logoSlider)
    });

    $('#logo-slider-animate-right').click( function(){
        slideRightOnceForSlider(logoSlider)
    });

});
