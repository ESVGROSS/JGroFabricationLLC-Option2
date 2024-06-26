//DROPDOWN NAV MENU
// Function to toggle the dropdown menu
function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdown-content");
    var isVisible = dropdownContent.style.display === "block";

    // Toggle the display of the dropdown menu
    dropdownContent.style.display = isVisible ? "none" : "block";

    if (!isVisible) {
        // If the dropdown is being opened, add the event listener to close it on outside click
        document.addEventListener('click', closeDropdownOnClickOutside);
    } else {
        // If the dropdown is being closed, remove the event listener
        document.removeEventListener('click', closeDropdownOnClickOutside);
    }
}

// Function to close the dropdown if clicking outside of it
function closeDropdownOnClickOutside(event) {
    var dropdownContent = document.getElementById("dropdown-content");
    var dropdownButton = document.getElementById("dropdown-menu");

    // Check if the click is outside the dropdown menu and the dropdown button
    if (!dropdownContent.contains(event.target) && !dropdownButton.contains(event.target)) {
        dropdownContent.style.display = "none";
        document.removeEventListener('click', closeDropdownOnClickOutside);
    }
}

// Automatically close the dropdown menu when an item is clicked
document.querySelectorAll('#dropdown-content ul li a').forEach(item => {
    item.addEventListener('click', function() {
        var dropdownContent = document.getElementById("dropdown-content");
        dropdownContent.style.display = "none";
        document.removeEventListener('click', closeDropdownOnClickOutside);
    });
});

//GALLERY SEE MORE
// Function to toggle the 'See More' section
function seeMore() {
    // Get the elements by their IDs
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    // Toggle visibility and update the button text and sessionStorage
    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "See more";
        moreText.style.display = "none";
        sessionStorage.setItem('galleryExpanded', 'false');
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "See less";
        moreText.style.display = "inline";
        sessionStorage.setItem('galleryExpanded', 'true');
    }
}

// Function to reset the gallery state on page load
function resetGalleryState() {
    // Get the elements by their IDs
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    // Check sessionStorage for the gallery state
    var isExpanded = sessionStorage.getItem('galleryExpanded');

    // Set initial state based on sessionStorage
    if (isExpanded === 'true') {
        dots.style.display = "none";
        btnText.innerHTML = "See less";
        moreText.style.display = "inline";
    } else {
        dots.style.display = "inline";
        btnText.innerHTML = "See more";
        moreText.style.display = "none";
    }
}

// Event listener to call resetGalleryState on page load
document.addEventListener('DOMContentLoaded', resetGalleryState);

// Event listener to reset the gallery state when navigating away from the page
window.addEventListener('beforeunload', function() {
    sessionStorage.removeItem('galleryExpanded'); // Clear sessionStorage on page unload
});


//GALLERY LIGHTBOX
// Function to open the lightbox and display the clicked image
function openLightbox(image) {
    var lightbox = document.getElementById("lightbox");
    var expandedImg = document.getElementById("expandedImg");
    var captionText = document.getElementById("caption");

    // Display the lightbox
    lightbox.style.display = "flex";

    // Set the source of the expanded image to the clicked image's source
    expandedImg.src = image.src;

    // Set the caption text to the alt attribute of the clicked image
    captionText.innerHTML = image.alt || ''; // Fallback to empty string if no alt text
}

// Function to close the lightbox
function closeLightbox() {
    var lightbox = document.getElementById("lightbox");
    // Hide the lightbox
    lightbox.style.display = "none";
}

// Event listener to close lightbox when clicking outside the image
document.getElementById("lightbox").addEventListener("click", function(event) {
    // Close lightbox only if the click is outside the expanded image
    if (event.target === this) {
        closeLightbox();
    }
});

// Event listener to close lightbox with escape key
document.addEventListener("keydown", function(event) {
    // Check if the pressed key is Escape
    if (event.key === "Escape") {
        closeLightbox();
    }
});

// Attach click event to all gallery images
document.querySelectorAll("#gallery img, #more img").forEach(function(img) {
    img.addEventListener("click", function() {
        openLightbox(this);
    });
});


//DETERMINE MOBILE OR DESKTOP
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

window.onload = function() {
    if (isMobileDevice()) {
        // Show phone link and hide text on mobile devices
        document.querySelector('.phone-link').style.display = 'inline';
        document.querySelector('.phone-text').style.display = 'none';
    }
};
