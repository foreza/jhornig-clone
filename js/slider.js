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
    * Support being able to scroll multiple images at once (presently only scrolls once) - in progress, done for slide RIGHT
    * Allow for easier controls (for now, need to style/attach listeners to buttons myself)
    * Further optimize the animation / don't depend on jQuery
    * Allow for passing in the slider animation speed as a param
    * Convert more of the config function into smaller util functions
    

*/
                  

// Animates the slider to the right given a sliderObject reference
function slideRightForSlider(sliderObject) {

        // Get an array of slider indices to be animated.
        var indicesToMove = prepareRightIndicesForSlider(sliderObject);

        // Get the halfway point for the indices array (rounding down)
        // Note: The total indices array length included indices for sliders sliding into view, and also out of view. 
        const half = Math.floor(indicesToMove.length / 2);

        // Loop through the slider indices and animate each slider
        for (let i = 0; i < indicesToMove.length; ++i) {

            // Obtain a reference to the corresponding slider given the provided index
            const child = $(sliderObject.children[indicesToMove[i]]);

            // If we are GREATER than the halfway point, this tells us that we are looking at sliders that are sliding INTO the view.
            if (i >= half) {

                // Calculate the offset given the content width of the slider
                // As we increase the iterator (i), we want to increase the multiplier.
                const offset = sliderObject.sliderContentWidth * (i - half);

                // The offset is then added to the viewPortWidth.
                // The first element that is past the halfway point would be positioned first.
                const left = sliderObject.viewPortWidth + offset;

                // The child then is moved into position, effectively 'staging' it for animation.
                // Subsequent children would be placed further and further away for a RIGHT slide.
                child.css('left', left)
            }

            // Animate all children by a uniform amount
            // This amount is the width of the viewport.
            child.animate({
                left: `-=${sliderObject.viewPortWidth}`
            }, {
                duration: 500, function (){
                    // Animation done.
                }
            });   
        }

         // We need to update the new slider object left and right indexes after movement.
        // The left slider index should be updated to point to the first element that was scrolled in from off-screen
        sliderObject.sliderLeftIndex = indicesToMove[half];
        sliderObject.sliderRightIndex =  indicesToMove[indicesToMove.length-1]; 

        console.log(`Left Index: ${sliderObject.sliderLeftIndex}`)
        console.log(`Right Index: ${sliderObject.sliderRightIndex}`)

}


// Return a set of slider indices for a right slide animation
function prepareRightIndicesForSlider(sliderObject) {

    let indicesToMove = [];     

    // We want to animate double the amount that is shown in the viewport for a smooth animation.            
    let numOfIndicesToShift =  sliderObject.numToDisplay * 2;   

    // Create an initial 'tIndex' so we can freely increment the indices for our array.
    let tIndex = sliderObject.sliderLeftIndex;

    // sliderLeftIndex always represents the index of the slider currently visible furthest to the left
    // Our initial slider left index default value shall be '0'.
    // We'll push this as it's the first index we'd like to move.
    indicesToMove.push(tIndex);

    for (let i = 0; i < numOfIndicesToShift - 1; ++i) {

        // We want to 'wrap' around the index so we don't animate something that is out of bounds
        // Increment the index, and then only store the remainder after performing a modulo
        tIndex = (tIndex + 1) % sliderObject.children.length;
        indicesToMove.push(tIndex);
    }

    return indicesToMove;
}



// Animates the slider to the right given a sliderObject reference
function slideRightOnceForSlider(sliderObject) {

    // Get an array of slider indices to be animated.
    var indicesToMove = prepareRightIndicesForSingleSlider(sliderObject);

    // Get the halfway point for the indices array (rounding down)
    // Note: The total indices array length included indices for sliders sliding into view, and also out of view. 
    // const half = Math.floor(indicesToMove.length / 2);

    // Loop through the slider indices and animate each slider
    for (let i = 0; i < indicesToMove.length; ++i) {

        // Obtain a reference to the corresponding slider given the provided index
        const child = $(sliderObject.children[indicesToMove[i]]);

        console.log("found you, ", i)


        // If we are GREATER than the halfway point, this tells us that we are looking at sliders that are sliding INTO the view.
        if (i == indicesToMove.length - 1) {
            
            // Calculate the offset given the content width of the slider
            // As we increase the iterator (i), we want to increase the multiplier.
            const offset = sliderObject.sliderContentWidth;

            // The offset is then added to the viewPortWidth.
            // The first element that is past the halfway point would be positioned first.
            const left = sliderObject.viewPortWidth;

            // The child then is moved into position, effectively 'staging' it for animation.
            child.css('left', left)
        }

        // Animate all children by a uniform amount
        // This amount is the width of the slider content.
        child.animate({
            left: `-=${sliderObject.sliderContentWidth}`
        }, {
            duration: 500, function (){
                // Animation done.
            }
        });   
    }

     // We need to update the new slider object left and right indexes after movement.
    // The left slider index should be updated to point to the first element that was scrolled in from off-screen
    sliderObject.sliderLeftIndex++;
    sliderObject.sliderRightIndex++; 

    if (sliderObject.sliderLeftIndex > sliderObject.children.length){
        sliderObject.sliderLeftIndex = 0;
    }

    if (sliderObject.sliderRightIndex > sliderObject.children.length){
        sliderObject.sliderRightIndex = 0;
    }

    console.log(`Left Index: ${sliderObject.sliderLeftIndex}`)
    console.log(`Right Index: ${sliderObject.sliderRightIndex}`)

}


// Return a set of slider indices for a right slide animation
function prepareRightIndicesForSingleSlider(sliderObject) {

let indicesToMove = [];     
          
let numOfIndicesToShift =  sliderObject.numToDisplay + 1;   

// Create an initial 'tIndex' so we can freely increment the indices for our array.
let tIndex = sliderObject.sliderLeftIndex;

// sliderLeftIndex always represents the index of the slider currently visible furthest to the left
// Our initial slider left index default value shall be '0'.
// We'll push this as it's the first index we'd like to move.
indicesToMove.push(tIndex);

for (let i = 0; i < numOfIndicesToShift - 1; ++i) {

    // We want to 'wrap' around the index so we don't animate something that is out of bounds
    // Increment the index, and then only store the remainder after performing a modulo
    tIndex = (tIndex + 1) % sliderObject.children.length;
    indicesToMove.push(tIndex);
}

return indicesToMove;
}


// Animates the slider to the LEFT given a sliderObject reference
function slideLeftForSlider(sliderObject) {

    var indicesToMove = prepareLeftIndicesForSlider(sliderObject);

    // Get the halfway point for the indices array (rounding down)
    // Note: The total indices array length included indices for sliders sliding into view, and also out of view. 
    const half = Math.floor(indicesToMove.length / 2);

    for (let i = 0; i < indicesToMove.length; ++i) {

        // Obtain a reference to the corresponding slider given the provided index
        const child = $(sliderObject.children[indicesToMove[i]]);

        // If we are GREATER than the halfway point, this tells us that we are looking at sliders that are sliding INTO the view.
        if (i >= half) {

            // Calculate the offset given the content width of the slider
            // As we increase the iterator (i), we want to increase the multiplier.
            const offset = sliderObject.sliderContentWidth * (i - half + 1);
            
            // For a left shift, the offset should be negative.
            const left = offset * -1;

            // The child then is moved into position, effectively 'staging' it for animation.
            // Subsequent children would be placed further and further starting from the left edge for a LEFT slide.
            child.css('left', left)

        }

        // Animate all children by a uniform amount
        // This amount is the width of the viewport.
        child.animate({
            left: `+=${sliderObject.viewPortWidth}`
        }, {
            duration: 500, function (){
                // Animation done.
            }
        });   
    }
        
        // We need to update the new slider object left and right indexes after movement.
        // The left slider index should be updated to point to the first element that was scrolled in from off-screen
        sliderObject.sliderLeftIndex = indicesToMove[indicesToMove.length-1];
        sliderObject.sliderRightIndex = indicesToMove[half];

        console.log(`Left Index: ${sliderObject.sliderLeftIndex}`)
        console.log(`Right Index: ${sliderObject.sliderRightIndex}`)


}


// Return a set of slider indices for a left slide animation
function prepareLeftIndicesForSlider(sliderObject) {

    var indicesToMove = [];

    // We want to animate double the amount that is shown in the viewport for a smooth animation.            
    let numOfIndicesToShift =  sliderObject.numToDisplay * 2;   

    // Create an initial 'tIndex' so we can freely increment the indices for our array.
    let tIndex = sliderObject.sliderRightIndex;

    // sliderRightIndex always represents the index of the slider currently visible furthest to the right
    // Our initial slider right index default value shall be 'sliderObject.numToDisplay-1'.
    // We'll push this as it's the first index we'd like to move.
    indicesToMove.push(tIndex);

     for (let i = 0; i < numOfIndicesToShift - 1; ++i) {

        // We want to 'wrap' around the index so we don't animate something that is out of bounds
        // Increment the index, and then only store the remainder after performing a modulo

        tIndex = (tIndex - 1) % sliderObject.children.length;

        // Do a negative indices check. If we generate a negative index, instead, set it to the maximum length of all the children - 1
        if (tIndex < 0){
            tIndex = sliderObject.children.length - 1;
        }

        indicesToMove.push(tIndex);
    }

    return indicesToMove;

}

function slideLeftOnceForSlider(sliderObject) {

    var indicesToMove = prepareLeftIndicesForSingleSlider(sliderObject);

    // Get the index that we are shifting onto the screen
    const offScreenIndex = indicesToMove.length - 1;

    for (let i = 0; i < indicesToMove.length; ++i) {

        // Obtain a reference to the corresponding slider given the provided index
        const child = $(sliderObject.children[indicesToMove[i]]);

        if (i >= offScreenIndex) {

            // Calculate the offset given the content width of the slider
            // As we increase the iterator (i), we want to increase the multiplier.
            const offset = sliderObject.sliderContentWidth;
            
            // For a left shift, the offset should be negative.
            const left = offset * -1;

            // The child then is moved into position, effectively 'staging' it for animation.
            // Subsequent children would be placed further and further starting from the left edge for a LEFT slide.
            child.css('left', left)

        }

        // Animate all children by a uniform amount
        // This amount is the width of the viewport.
        child.animate({
            left: `+=${sliderObject.sliderContentWidth}`
        }, {
            duration: 500, function (){
                // Animation done.
            }
        });   
    }
        
        // We need to update the new slider object left and right indexes after movement.
        // The left slider index should be updated to point to the first element that was scrolled in from off-screen
        sliderObject.sliderLeftIndex--;
        sliderObject.sliderRightIndex--;

        if (sliderObject.sliderLeftIndex < 0){
            sliderObject.sliderLeftIndex = sliderObject.children.length - 1
        }

        if (sliderObject.sliderRightIndex < 0){
            sliderObject.sliderRightIndex = sliderObject.children.length - 1
        }

        console.log(`Left Index: ${sliderObject.sliderLeftIndex}`)
        console.log(`Right Index: ${sliderObject.sliderRightIndex}`)


}

function prepareLeftIndicesForSingleSlider(sliderObject) {

    var indicesToMove = [];

    // We want to animate all of the visible objects, plus one.           
    let numOfIndicesToShift =  sliderObject.numToDisplay + 1;   

    // Create an initial 'tIndex' so we can freely increment the indices for our array.
    let tIndex = sliderObject.sliderRightIndex;

    // sliderRightIndex always represents the index of the slider currently visible furthest to the right
    // Our initial slider right index default value shall be 'sliderObject.numToDisplay-1'.
    // We'll push this as it's the first index we'd like to move.
    indicesToMove.push(tIndex);

     for (let i = 0; i < numOfIndicesToShift - 1; ++i) {

        // We want to 'wrap' around the index so we don't animate something that is out of bounds
        // Increment the index, and then only store the remainder after performing a modulo

        tIndex = (tIndex - 1) % sliderObject.children.length;

        // Do a negative indices check. If we generate a negative index, instead, set it to the maximum length of all the children - 1
        if (tIndex < 0){
            tIndex = sliderObject.children.length - 1;
        }

        indicesToMove.push(tIndex);
    }

    return indicesToMove;

}








// Function to configure the slider
function configureSlider(sliderIdentifier, numToDisplay, numToScroll) {

    console.log(`[SLIDER-SENSEI] configureSlider called for ${sliderIdentifier}`);

    var sliderObj = {
        "identifier": sliderIdentifier,                // The unique ID for the slider
        "numToDisplay": numToDisplay,                  // Note: # of DOM nodes should be > than numToDisplay
        "numToScroll": numToScroll,                    // Note: Currently only supports one for now
        "sliderLeftIndex": 0,                          // Index for tracking slider's next movement to left  
        "sliderRightIndex": -1,                        // Index for tracking slider's next movement to right 
        "viewPortWidth": 1000,                         // Calculated by taking the container width
        "sliderContentWidth": 1000,                     // Calculated by taking the viewPortWidth / display number
        "children": [],                                 // Store a reference to all slides as 'children' in the sliderObject
    }



    // Get a reference to the slider content using the identifier
    refForSliderContainer = getSliderContainerForSliderWithID(sliderObj.identifier);

    // Get all children sliders that presently exist
    let children = refForSliderContainer.find('.slider-content');
    
    // Duplicate the amount of children nodes if we don't have enough to comfortably wrap around
    if (children.length < numToDisplay * 2) {
        const content = refForSliderContainer.html();
        refForSliderContainer.append(content);

        // Update the reference so we now include the new additional children we just created
        children = refForSliderContainer.find('.slider-content');
    }

    sliderObj.children = children;

    // Get the viewport size so we can use this later for our calculations
    sliderObj.viewPortWidth = refForSliderContainer.width();

    // Determine the uniform width for each of the slider objects
    sliderObj.sliderContentWidth = sliderObj.viewPortWidth / sliderObj.numToDisplay;

    // Set initial value for the indices:

    sliderObj.sliderLeftIndex = 0;
    sliderObj.sliderRightIndex = sliderObj.numToDisplay - 1        


    // Place the first 'X' amount of slides into the appropriate position based off of numToDisplay
    // Remaining items should be sorted into a overflow zone. We'll choose to put far off in the - area
    const hiddenDisplayRegion = sliderObj.sliderContentWidth * -1;

    // Format target width string so we can use it
    const targetWidth = `${sliderObj.sliderContentWidth}px`;

    // Loop through all the children. Place the first children in the viewport, and the rest off screen.
    for (var i = 0; i < children.length; ++i) {
        const child = $(children[i]);
        const targetLeft = (i < numToDisplay)
                            ? `${sliderObj.sliderContentWidth * i}px`
                            : `${hiddenDisplayRegion}px`;

        child
            .css('width', targetWidth)
            .css('left', targetLeft);
    }

    return sliderObj;
}


// Config Utility functions 

function getSliderContainerForSliderWithID(sliderID) {
    return $(`#${sliderID} .slider-container`);
}
