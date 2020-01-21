
var testSlider;
var testSlider2;


$(document).ready(function () {

    
    testSlider = configureSlider("test-slider", 3, 1);
    testSlider2 = configureSlider("test-slider2", 6, 1);


    $('#animate-left').click( function(){
        console.log('Animate left called');
        slideLeftForSlider(testSlider)
    });

    $('#animate-right').click( function(){
        console.log('Animate right called');
        slideRightForSlider(testSlider)
    });

    $('#animate-left-2').click( function(){
        console.log('Animate left called');
        slideLeftForSlider(testSlider2)
    });

    $('#animate-right-2').click( function(){
        console.log('Animate right called');
        slideRightForSlider(testSlider2)
    });


});






// Prepare the indexes for movement to LEFT
function prepareLeftForSlider(sliderObject){

    var indicesToMove = [];

    for (var i = 0; i <= sliderObject.numToDisplay; ++i ){
        var tIndex = sliderObject.sliderLeftIndex + i;
        console.log(`evaluating index: ${tIndex}`);

        tIndex %= sliderObject.sliderMaxItems;

        // Convert the indexes into the appropriate value

        if (tIndex < 0){
            tIndex += sliderObject.sliderMaxItems;
        } 

        // Move the last item to the hidden region and set index
               if (i == sliderObject.numToDisplay){
                console.log(`${sliderObject.identifier}-slide-${tIndex} is shifting to right hidden region`);
                $(`#${sliderObject.identifier}-slide-${tIndex}`).css("left", `${sliderObject.rightHiddenRegion}px`);  
            }

        console.log(`pushing index: ${tIndex}`);
        indicesToMove.push(tIndex);
    }

    sliderObject.sliderLeftIndex++;
    sliderObject.sliderRightIndex++;
    
    return indicesToMove;

}

// Move the slider
function slideLeftForSlider(sliderObject){

    var indicesToMove = prepareLeftForSlider(sliderObject);

    console.log(`indicesToMove: ${indicesToMove}`);    

    // Track the current indexes for the slider (get the object)

    for (var i = 0; i < indicesToMove.length; ++i){

        console.log(`moving: ${sliderObject.identifier}-slide-${indicesToMove[i]}`);

        $(`#${sliderObject.identifier}-slide-${indicesToMove[i]}`).animate({
            left: `-=${sliderObject.sliderContentWidth}`
          }, 300, function() {
            //   console.log(`moved: ${sliderID}-slide-${indicesToMove[i]}`);
          });
    }


}


function prepareRightForSlider(sliderObject){

    var indicesToMove = [];

    for (var i = 0; i < sliderObject.numToDisplay + 1; ++i ){
        var tIndex = sliderObject.sliderRightIndex + i;
        console.log(`evaluating index: ${tIndex}`);

        // Convert the indexes into the appropriate value
        tIndex = tIndex % sliderObject.sliderMaxItems;

        if (tIndex < 0){
            tIndex += sliderObject.sliderMaxItems;
        } 

        // Move the first item to the hidden region and set index
        if (i == 0){
            console.log(`${sliderObject.identifier}-slide-${tIndex} is shifting to right hidden region`);
            $(`#${sliderObject.identifier}-slide-${tIndex}`).css("left", `${sliderObject.leftHiddenRegion}px`);  
            
        }

        console.log(`pushing index: ${tIndex}`);
        indicesToMove.push(tIndex);
        

    }

    sliderObject.sliderLeftIndex--;
    sliderObject.sliderRightIndex--;

        return indicesToMove;

}

function slideRightForSlider(sliderObject){

    var indicesToMove = prepareRightForSlider(sliderObject);

    console.log(`indicesToMove: ${indicesToMove}`);    

    // Track the current indexes for the slider (get the object)

    for (var i = 0; i < indicesToMove.length; ++i){

        console.log(`moving: ${sliderObject.identifier}-slide-${indicesToMove[i]}`);

        $(`#${sliderObject.identifier}-slide-${indicesToMove[i]}`).animate({
            left: `+=${sliderObject.sliderContentWidth}`
          }, 300, function() {
            //   console.log(`moved: ${sliderID}-slide-${indicesToMove[i]}`);
          });
    }


    
}











// Function to configure the slider
function configureSlider(sliderIdentifier, numToDisplay, numToScroll){

    console.log(`configureSlider called for ${sliderIdentifier}`);

    var sliderObj = {
        "identifier" : sliderIdentifier,                // thisSliderID, use to generate refForSliderContainer and refForSliderContent;   
        "numToDisplay" : numToDisplay,                  // Note: # of DOM nodes should be > than numToDisplay
        "numToScroll" : numToScroll,                    // Note: Currently only supports one for now
        "sliderLeftIndex" : 0,                          // Index for tracking slider's next movement to left  
        "sliderRightIndex" : -1,                        // Index for tracking slider's next movement to right 
        "viewPortWidth" : 1000,                         // Calculated by taking the container width
        "sliderContentWidth": 1000,                     // Calculated by taking the viewPortWidth / display number
        "sliderMaxItems": 10,                           // Items scanned from the DOM (slider-content)
        "leftHiddenRegion": 0,                          // Pixel value of the region on the left for hiding objects
        "rightHiddenRegion" : 0                         // Pixel value of the region on the right for hiding objects
    }

    // Get the slider content

    refForSliderContainer=  getSliderContainerForSliderWithID(sliderObj.identifier);
    refForSliderContent = getSliderContentForSliderWithID(sliderObj.identifier);

    sliderObj.sliderMaxItems = refForSliderContent.length;

   // Get the viewport size so we can use this later for our calculations
    sliderObj.viewPortWidth = refForSliderContainer.width();

    // Determine how many items should be in the display (assume 3 for testing)
    sliderObj.sliderContentWidth = sliderObj.viewPortWidth / sliderObj.numToDisplay;


    // Set an id for each slider and also set the width %
    for (var i = 0; i < refForSliderContent.length; ++i){

        var tSlideID = `${sliderObj.identifier}-slide-${i}`;      

        $(refForSliderContent[i]).attr('id', tSlideID);
        $(refForSliderContent[i]).css("width", `${sliderObj.sliderContentWidth}px`);

        console.log("refForSliderContent set " + refForSliderContent[i].id);
    }


    // Place the first 'X' amount of slides into the appropriate position based off of numToDisplay
    // Remaining items should be sorted into a 'left' or 'right' overflow zone. We'll choose 'left'
    // Calculate where the end zones should be (for our hidden left and right regions)

    sliderObj.leftHiddenRegion = -(sliderObj.sliderContentWidth);
    sliderObj.rightHiddenRegion = sliderObj.viewPortWidth;

    for (var i = 0; i < refForSliderContent.length; ++i){
        
        if (i < sliderObj.numToDisplay){
            $(refForSliderContent[i]).css("left", `${sliderObj.sliderContentWidth*i}px`);
            console.log(`${refForSliderContent[i].id} set to ${sliderObj.sliderContentWidth*i}` );
        } else {
            $(refForSliderContent[i]).css("left", `${sliderObj.rightHiddenRegion}px`);
        }

    }

    return sliderObj;
}


// Config Utility functions (TODO: Convert more of the above into smaller util functions)

function getSliderContainerForSliderWithID(sliderID){
    return $(`#${sliderID} .slider-container`);
}

function getSliderContentForSliderWithID(sliderID){
    return $(`#${sliderID} .slider-container .slider-content`);
}