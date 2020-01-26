window.onscroll = function() {
    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("nav-sticky")
    } else {
      navbar.classList.remove("nav-sticky");
    }
  };

// Get the navbar
var navbar = document.getElementById("nav-bar");

// Get the offset position of the navbar
var sticky = 60;



