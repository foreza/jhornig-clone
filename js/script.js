
var numToDisplay = 3;                 // Temp variable to control how many items are in the slider

var refForSliderContainer;             
var refForSliderContent;   

var thisSliderID;
var sliderIDArr = [];                  // Stores all the slider jquery id 


var sliderContentWidth;

var sliderLeftIndex;
var sliderRightIndex;


var sliderMaxItems;

var leftHiddenRegion;
var rightHiddenRegion;


var slider


$(document).ready(function () {

    thisSliderID = "test-slider";
    

    // Get the slider content
    refForSliderContainer=  getSliderContainerForSliderWithID(thisSliderID);
    refForSliderContent = getSliderContentForSliderWithID(thisSliderID);
    console.log("Num of items in slider: " + refForSliderContent.length);

    sliderMaxItems = refForSliderContent.length;


   // Get the viewport size so we can use this later for our calculations

    var viewPortWidth = refForSliderContainer.width();
    console.log("Slider Max Width " + refForSliderContainer.width());

    // Determine how many items should be in the display (assume 3 for testing)






    sliderContentWidth = viewPortWidth / numToDisplay;

    console.log("Content Max Width " + sliderContentWidth);


    // Set an id for each slider and also set the width %
    for (var i = 0; i < refForSliderContent.length; ++i){

        var tSlideID = `${thisSliderID}-slide-${i}`;      

        $(refForSliderContent[i]).attr('id', tSlideID);
        $(refForSliderContent[i]).css("width", `${sliderContentWidth}px`);
        console.log("refForSliderContent set " + refForSliderContent[i].id);

        sliderIDArr.push(tSlideID);
    }

    // Initialize the left / right indexes accordingly (should be the viewport)

    sliderLeftIndex = 0;                 // Far left index
    sliderRightIndex = numToDisplay;    // 

    console.log(`sliderLeftIndex is ${sliderLeftIndex}`);
    console.log(`sliderRightIndex is ${sliderRightIndex}`);

    // Place the first 'X' amount of slides into the appropriate position based off of numToDisplay

    // Remaining items should be sorted into a 'left' or 'right' overflow zone. We'll choose 'left'

    // Calculate where the end zones should be (for our hidden left and right regions)

      leftHiddenRegion = -sliderContentWidth;
      rightHiddenRegion = viewPortWidth;

    for (var i = 0; i < refForSliderContent.length; ++i){
        
        if (i < numToDisplay){
            $(refForSliderContent[i]).css("left", `${sliderContentWidth*i}px`);
            console.log(`${refForSliderContent[i].id} set to ${sliderContentWidth*i}` );
        } else {
            // Can do either, we'll decide later
            // $(refForSliderContent[i]).css("left", `${leftHiddenRegion}px`);
            $(refForSliderContent[i]).css("left", `${rightHiddenRegion}px`);
        }

    }


    $('#animate-left').click( function(){
        console.log('Animate left called');
        slideLeftForSlider(thisSliderID)
    });

    $('#animate-right').click( function(){
        console.log('Animate right called');
        slideRightForSlider(thisSliderID)
    });


});


function getSliderContainerForSliderWithID(sliderID){
    return $(`#${sliderID} .slider-container`);
}

function getSliderContentForSliderWithID(sliderID){
    return $(`#${sliderID} .slider-container .slider-content`);
}



function adjustIndexForSlider(sliderID){

}

// Prepare the indexes for movement
function prepareLeftForSlider(sliderID){

    var indicesToMove = [];

    for (var i = 0; i <= numToDisplay; ++i ){

        var tIndex = sliderLeftIndex + i;
        console.log(`evaluating index: ${tIndex}`);

        // Convert the indexes into the appropriate value
        if (tIndex >= sliderMaxItems){
            tIndex %= sliderMaxItems;

            // Move the last item to the hidden region and set index
            if (i == numToDisplay){
                console.log(`${sliderID}-slide-${tIndex} is shifting to right hidden region`);
                $(`#${sliderID}-slide-${tIndex}`).css("left", `${rightHiddenRegion}px`);  
                
            }

            sliderLeftIndex

        } 

        console.log(`pushing index: ${tIndex}`);
        indicesToMove.push(tIndex);
        
        

    }


    sliderLeftIndex++;
        console.log(`sliderRightIndex: ${sliderRightIndex}`);
        console.log(`sliderLeftIndex: ${sliderLeftIndex}`);


    
        return indicesToMove;

}

// Move the slider
function slideLeftForSlider(sliderID){

    var indicesToMove = prepareLeftForSlider(sliderID);

    console.log(`indicesToMove: ${indicesToMove}`);    


    // Track the current indexes for the slider (get the object)

    for (var i = 0; i < indicesToMove.length; ++i){

        console.log(`moving: ${sliderID}-slide-${indicesToMove[i]}`);


        $(`#${sliderID}-slide-${indicesToMove[i]}`).animate({
            left: `-=${sliderContentWidth}`
          }, 300, function() {
            //   console.log(`moved: ${sliderID}-slide-${indicesToMove[i]}`);
          });
    }






}

function slideRightForSlider(sliderID){


    
}











// Function to configure the slider
// TODO: Extend and use this
function configureSlider(sliderRef, numToDisplay){
    var sliderObj = {
        "numToDisplay" : 3,
        "numToScroll" : 1,
        "identifier" : "test-scroller",
        "sliderLeftIndex" : 1,
        "sliderRightIndex" : 3
    }
}