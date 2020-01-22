/*
    This allows for a user to specify a container as a slider. (work is still in progress)
    This utilizes jQuery animation to shift the contents of a div around as a slideshow.

    Sample implementation:

            // [required] id (passed into configure function) and the class, slider
            <div id="test-slider" class="slider">

            // Slider Controls [required] slider-controller-content
            <div class="slider-controller-content"> *
                <div class="button-left-zone">
                    // Hook this into the slideLeftForSlider function
                    <button id="animate-left-2">Left</button>
                </div>
                <div class="button-right-zone">
                    // Hook this into the slideRightForSlider function
                    <button id="animate-right-2">Right</button>
                </div>
            </div>

            // Slider Content [required] slider-container
             <div class="slider-container">

                // Slider Content [required] slider-content
                <div class="slider-content">1</div>
                <div class="slider-content">2</div>
                ...
                ..
            </div>
            

 </div>


    ** TODO LIST: **
    ================
    * API is inverted. I fixed this temporarily by renaming the top level API...
    * Support being able to scroll multiple images at once (presently only scrolls once)
    * Allow for easier controls (for now, need to style/attach listeners to buttons myself)
    * Fix issue that occurs when the # of items in the slider = the number being scrolled
    * Further optimize the animation / don't depend on jQuery
    

*/
const carouselConfig = {};

// Move the slider to the left
function slideRightForSlider(sliderObject) {


    // Track the current indexes for the slider (get the object)
        var indicesToMove = prepareRightForSlider(sliderObject);
        const half = Math.floor(indicesToMove.length / 2);
        
        for (let i = 0; i < indicesToMove.length; ++i) {
            const child = $(sliderObject.children[indicesToMove[i]]);
            console.log(indicesToMove[i], child[0]);
            // console.log("TCL: slideRightForSlider -> child", child[0])
            // console.log("TCL: slideRightForSlider -> `-=${sliderObject.sliderContentWidth * sliderObject.numToDisplay}`", `-=${sliderObject.sliderContentWidth * sliderObject.numToDisplay}`)
            if (i >= half) {
                const offset = sliderObject.sliderContentWidth * (i - half);
                // console.log("TCL: slideRightForSlider -> offset", offset)
                const left = sliderObject.viewPortWidth + offset;
                // console.log("TCL: slideRightForSlider -> left", left)
                child.css('left', left)
            }
            child.animate({
                left: `-=${sliderObject.sliderContentWidth * sliderObject.numToDisplay}`
            }, {
                duration: 500,
                start: function() {
                    
                }
            });   
        }

}


// Move the slider to the right
function slideLeftForSlider(sliderObject) {

    var indicesToMove = prepareLeftForSlider(sliderObject);

    // Track the current indexes for the slider (get the object)

    for (var i = 0; i < indicesToMove.length; ++i) {

        $(`#${sliderObject.identifier}-slide-${indicesToMove[i]}`).animate({
            left: `+=${sliderObject.sliderContentWidth}`
        }, 100, function () {
        });
    }



}



// Prepare the indexes for movement to LEFT
function prepareRightForSlider(sliderObject) {

    var indicesToMove = [];
    let tIndex = sliderObject.sliderLeftIndex;
    console.log("TCL: prepareRightForSlider -> tIndex", tIndex)
    indicesToMove.push(tIndex);
    for (var i = 1; i < sliderObject.numToDisplay * 2; ++i) {
        tIndex = (tIndex + 1) % sliderObject.children.length;
        console.log(`Assessing: ${tIndex}`);
        indicesToMove.push(tIndex);
    }

    sliderObject.sliderLeftIndex = indicesToMove[(indicesToMove.length/2) ];
    console.log("TCL: prepareRightForSlider -> sliderObject.sliderLeftIndex", sliderObject.sliderLeftIndex)
    sliderObject.sliderRightIndex = indicesToMove[0];

    console.log(indicesToMove);

    return indicesToMove;
}

// Prepare the indexes for movement to RIGHT
function prepareLeftForSlider(sliderObject) {

    var indicesToMove = [];
    const targetLeft = `${sliderObject.leftHiddenRegion}px`;

    for (var i = 0; i < sliderObject.numToDisplay + 1; ++i) {
        var tIndex = sliderObject.sliderRightIndex + i;

        // Convert the indexes into the appropriate value
        tIndex = tIndex % sliderObject.sliderMaxItems;

        if (tIndex < 0) {
            tIndex += sliderObject.sliderMaxItems;
        }

        // Move the first item to the hidden region and set index
        if (i == 0) {
            $(sliderObject.children[tIndex]).css("left", targetLeft);
        }

        indicesToMove.push(tIndex);
    }

    sliderObject.sliderLeftIndex--;
    sliderObject.sliderRightIndex--;

    return indicesToMove;

}




// Function to configure the slider
function configureSlider(sliderIdentifier, numToDisplay, numToScroll) {

    console.log(`[SLIDER-SENSEI] configureSlider called for ${sliderIdentifier}`);
    if (carouselConfig[sliderIdentifier] === undefined) {
        carouselConfig[sliderIdentifier] = [];
    }

    var sliderObj = {
        "identifier": sliderIdentifier,                // thisSliderID, use to generate refForSliderContainer and refForSliderContent;   
        "numToDisplay": numToDisplay,                  // Note: # of DOM nodes should be > than numToDisplay
        "numToScroll": numToScroll,                    // Note: Currently only supports one for now
        "sliderLeftIndex": 0,                          // Index for tracking slider's next movement to left  
        "sliderRightIndex": -1,                        // Index for tracking slider's next movement to right 
        "viewPortWidth": 1000,                         // Calculated by taking the container width
        "sliderContentWidth": 1000,                     // Calculated by taking the viewPortWidth / display number
        "sliderMaxItems": 10,                           // Items scanned from the DOM (slider-content)
        "leftHiddenRegion": 0,                          // Pixel value of the region on the left for hiding objects
        "rightHiddenRegion": 0,                         // Pixel value of the region on the right for hiding objects
        "children": [],
    }

    carouselConfig[sliderIdentifier] = sliderObj;

    // Get the slider content

    refForSliderContainer = getSliderContainerForSliderWithID(sliderObj.identifier);
    refForSliderContent = getSliderContentForSliderWithID(sliderObj.identifier);

    // Duplicate the amount of content:

    var tLen = refForSliderContent.length;
    let children = refForSliderContainer.find('.slider-content');
    
    if (children.length < numToDisplay * 2) {
        const content = refForSliderContainer.html(); // refForSliderContainer[0].innerHTML;
        refForSliderContainer.append(content);
        children = refForSliderContainer.find('.slider-content');
    }

    sliderObj.children = children;


    sliderObj.sliderMaxItems = children.length;

    // Get the viewport size so we can use this later for our calculations
    sliderObj.viewPortWidth = refForSliderContainer.width();

    // Determine how many items should be in the display (assume 3 for testing)
    sliderObj.sliderContentWidth = sliderObj.viewPortWidth / sliderObj.numToDisplay;

    // Set an id for each slider and also set the width %
    
    // Place the first 'X' amount of slides into the appropriate position based off of numToDisplay
    // Remaining items should be sorted into a 'left' or 'right' overflow zone. We'll choose 'left'
    // Calculate where the end zones should be (for our hidden left and right regions)

    sliderObj.leftHiddenRegion = sliderObj.sliderContentWidth * -1;
    sliderObj.rightHiddenRegion = sliderObj.viewPortWidth+sliderObj.sliderContentWidth;

    const targetWidth = `${sliderObj.sliderContentWidth}px`;
    for (var i = 0; i < children.length; ++i) {
        const child = $(children[i]);
        const targetLeft = (i < numToDisplay)
                            ? `${sliderObj.sliderContentWidth * i}px`
                            : `${sliderObj.rightHiddenRegion}px`;

        child
            .css('width', targetWidth)
            .css('left', targetLeft);
    }

    return sliderObj;
}


// Config Utility functions (TODO: Convert more of the above into smaller util functions)

function getSliderContainerForSliderWithID(sliderID) {
    return $(`#${sliderID} .slider-container`);
}

function getSliderContentForSliderWithID(sliderID) {
    return $(`#${sliderID} .slider-container .slider-content`);
}