

var refForSliderContainer;             
var refForSliderContent;   

var thisSliderID;
var sliderIDArr = [];                  // Stores all the slider jquery id 


var sliderContentWidth;

var sliderLeftIndex;
var sliderRightIndex;




$(document).ready(function () {

    thisSliderID = "test-slider";
    

    // Get the slider content
    refForSliderContainer=  getSliderContainerForSliderWithID(thisSliderID);
    refForSliderContent = getSliderContentForSliderWithID(thisSliderID);
    console.log("Num of items in slider: " + refForSliderContent.length);

   // Get the viewport size so we can use this later for our calculations

    var viewPortWidth = refForSliderContainer.width();
    console.log("Slider Max Width " + refForSliderContainer.width());

    // Determine how many items should be in the display (assume 3 for testing)

    var numToDisplay = 6;                 // Temp variable to control how many items are in the slider


    

  


    sliderContentWidth = viewPortWidth / numToDisplay;

    console.log("Content Max Width " + sliderContentWidth);


    // Set an id for each slider and also set the width %
    for (var i = 0; i < refForSliderContent.length; ++i){

        var tSlideID = `${thisSliderID}-slide-${i+1}`;      

        $(refForSliderContent[i]).attr('id', tSlideID);
        $(refForSliderContent[i]).css("width", `${sliderContentWidth}px`);
        console.log("refForSliderContent set " + refForSliderContent[i].id);

        sliderIDArr.push(tSlideID);
    }

    // Initialize the left / right indexes accordingly

    sliderLeftIndex = 1;
    sliderRightIndex = numToDisplay;


    console.log(`sliderLeftIndex is ${sliderLeftIndex}`);
    console.log(`sliderRightIndex is ${sliderRightIndex}`);

    // Place the first 'X' amount of slides into the appropriate position based off of numToDisplay

    // Remaining items should be sorted into a 'left' or 'right' overflow zone. We'll choose 'left'

    // Calculate where the end zones should be (for our hidden left and right regions)

      var leftHiddenRegion = viewPortWidth;
      var rightHiddenRegion = -sliderContentWidth;

    for (var i = 1; i < refForSliderContent.length; ++i){
        
        if (i < numToDisplay){
            $(refForSliderContent[i]).css("left", `${sliderContentWidth*i}px`);
            console.log(`${refForSliderContent[i].id} set to ${sliderContentWidth*i}` );
        } else {
            // Can do either, we'll decide later
            $(refForSliderContent[i]).css("left", `${leftHiddenRegion}px`);
            // $(refForSliderContent[i]).css("left", `${rightHiddenRegion}px`);
        }

    }


    $('#animate-left-temp').click( function(){
        console.log('Animate left called');
        slideLeftForSlider(thisSliderID)
    });


});


function getSliderContainerForSliderWithID(sliderID){
    return $(`#${sliderID} .slider-container`);
}

function getSliderContentForSliderWithID(sliderID){
    return $(`#${sliderID} .slider-container .slider-content`);
}




function slideLeftForSlider(sliderID){

    // Track the current indexes for the slider (get the object)

    for (var i = sliderLeftIndex; i <= sliderRightIndex+1; ++i){
        $(`#${sliderID}-slide-${i}`).animate({
            left: `-=${sliderContentWidth}`
          }, 300, function() {
  
              console.log(`moved: ${sliderID}-slide-${sliderLeftIndex}`);
            // Animation complete.
          });
    }


    sliderLeftIndex++;
    sliderRightIndex++;

        



}











// Function to configure the slider
// TODO: Extend and use this
function configureSlider(sliderRef, numToDisplay){
    var sliderObj = {
        "numToDisplay" : 3,
        "numToScroll" : 1,
        "identifier" : "test-scroller"
    }
}