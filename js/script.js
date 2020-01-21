
var testSlider;
var testSlider2;


$(document).ready(function () {

    
    testSlider = configureSlider("test-slider", 3, 1);
    testSlider2 = configureSlider("test-slider2", 6, 1);


    $('#animate-left').click( function(){
        slideLeftForSlider(testSlider)
    });

    $('#animate-right').click( function(){
        slideRightForSlider(testSlider)
    });

    $('#animate-left-2').click( function(){
        slideLeftForSlider(testSlider2)
    });

    $('#animate-right-2').click( function(){
        slideRightForSlider(testSlider2)
    });


});
