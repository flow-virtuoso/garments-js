//  ---------
//   Sliders
//  ---------

// Array of slider cards in the DOM
const sliderCards = Array.from(document.querySelectorAll('[slider="card"]'));
const slider = document.querySelector('[slider="wrapper"]');

// Setting the X value of the slider and cards to 0.
sliderCards.forEach((card) => {
  card.style.transform = `translateX(0px)`;
});
slider.style.transform = `translateX(0px)`;

// Declaring variables
let cardWidth;
let cardPosition;
let sliderPosition;
let isAnimating = false;

// Find the width of a card (width + margin))
function findCardWidth() {
  //main width
  let card = sliderCards[0];
  let cardRect = card.getBoundingClientRect();

  //margins
  let cardStyle = window.getComputedStyle(sliderCards[0]);
  let cardMarginRight = parseFloat(cardStyle.marginRight);
  let cardMarginLeft = parseFloat(cardStyle.marginLeft);

  //full width (width + margins)
  cardWidth = cardRect.width + cardMarginRight + cardMarginLeft;
}

// Find current x position of a single card
function findCardPosition(card) {
  let cardTransformMatrix = window.getComputedStyle(card).getPropertyValue('transform');
  let cardTransformValues = cardTransformMatrix.split(',');
  cardPosition = parseFloat(cardTransformValues[4]);
}

// Find current x position of the slider
function findSliderPosition() {
  let sliderTransformMatrix = window.getComputedStyle(slider).getPropertyValue('transform');
  let sliderTransformValues = sliderTransformMatrix.split(',');
  sliderPosition = parseFloat(sliderTransformValues[4]);
}

// Function to tell us when the last slide has finished
function finishedAnimating() {
  isAnimating = false;
}

function moveLeft() {
  findCardWidth(); // find width of a single card
  sliderCards.forEach((card) => {
    // update the current card positions
    findCardPosition(card);
    gsap.to(card, { duration: 0.5, x: cardPosition + cardWidth, ease: 'power2.easeOut' });
  });
  setTimeout(function () {
    findSliderPosition(); // find position of the slider
    // move the first slider card to the back (so that the slider will loop infinitely)
    slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
    // maintain the sliders position now that this card has been moved
    gsap.to(slider, { duration: 0, x: sliderPosition - cardWidth });
  }, 500);
  setTimeout(finishedAnimating, 500);
}

function moveRight() {
  findCardWidth(); // find width of a single card
  sliderCards.forEach((card) => {
    // update the current card positions
    findCardPosition(card);
    gsap.to(card, { duration: 0.5, x: cardPosition - cardWidth, ease: 'power2.easeOut' });
  });
  setTimeout(function () {
    findSliderPosition(); // find position of the slider
    // move the last slider card to the front (so that the slider will loop infinitely)
    slider.insertBefore(slider.firstElementChild, slider.lastElementChild.nextSibling);
    // maintain the sliders position now that this card has been moved
    gsap.to(slider, { duration: 0, x: sliderPosition + cardWidth });
  }, 500);
  setTimeout(finishedAnimating, 500);
}

function leftButtonPressed() {
  if (isAnimating === false) {
    isAnimating = true;
    moveLeft();
  }
}

function rightButtonPressed() {
  if (isAnimating === false) {
    isAnimating = true;
    moveRight();
  }
}

// Finding the buttons in the DOM
const leftButton = document.querySelector('[slider="left-button"]');
const rightButton = document.querySelector('[slider="right-button"]');

// Applying click event listeners to the buttons only if they actually exist
if (leftButton) {
  leftButton.addEventListener('click', leftButtonPressed);
}
if (rightButton) {
  rightButton.addEventListener('click', rightButtonPressed);
}

// Touch screen Swipe Support

function addSwipeInteraction(swipeArea) {
  var startCoordinates = {};
  var isSwiping = false; // Variable to track whether a swipe is in progress

  swipeArea.addEventListener(
    'touchstart',
    function (event) {
      startCoordinates.x = event.touches[0].clientX;
      startCoordinates.y = event.touches[0].clientY;
      isSwiping = false; // Initialize isSwiping to false
    },
    { passive: true }
  ); // Mark the event listener as passive

  swipeArea.addEventListener(
    'touchmove',
    function (event) {
      var deltaX = event.touches[0].clientX - startCoordinates.x;
      var deltaY = event.touches[0].clientY - startCoordinates.y;

      // Check if the swipe is more horizontal than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        event.preventDefault(); // Prevent scrolling while swiping horizontally
        isSwiping = true; // Set isSwiping to true when a horizontal swipe is detected
      }
    },
    { passive: true }
  ); // Mark the event listener as passive

  swipeArea.addEventListener(
    'touchend',
    function (event) {
      if (isSwiping) {
        // Check if a horizontal swipe was detected
        var deltaX = event.changedTouches[0].clientX - startCoordinates.x;

        if (deltaX > 0) {
          // Right swipe
          leftButtonPressed();
        } else {
          // Left swipe
          rightButtonPressed();
        }
      }
    },
    { passive: true }
  ); // Mark the event listener as passive
}

const swipeArea = document.querySelector('[slider="swipe-area"]');
addSwipeInteraction(swipeArea);

// make it work with multiple sliders.

//  ------------------------
//   Categories Interaction
//  ------------------------

document.addEventListener('DOMContentLoaded', function () {
  const flannelShirtsLink = document.querySelector('#flannel-shirts-link');
  const flannelShirtsLabel = document.querySelector('#flannel-shirts-label');
  const flannelShirtsUnderlay = document.querySelector('.is-flannel-shirts');

  const tShirtsLink = document.querySelector('#t-shirts-link');
  const tShirtsLabel = document.querySelector('#t-shirts-label');
  const tShirtsUnderlay = document.querySelector('.is-t-shirts');

  const coatsLink = document.querySelector('#coats-link');
  const coatsLabel = document.querySelector('#coats-label');
  const coatsUnderlay = document.querySelector('.is-coats');

  const jacketsLink = document.querySelector('#jackets-link');
  const jacketsLabel = document.querySelector('#jackets-label');
  const jacketsUnderlay = document.querySelector('.is-jackets');

  // Defining the interactions
  function categoryHover(label, underlay) {
    label.style.transform = `translateX(25px)`;
    underlay.style.opacity = '1';
  }

  function categoryReset(label, underlay) {
    label.style.transform = `translateX(0px)`;
    underlay.style.opacity = '0';
  }

  // Adding Event Listeners to each category link block
  flannelShirtsLink.addEventListener('mouseover', () => {
    categoryHover(flannelShirtsLabel, flannelShirtsUnderlay);
  });
  flannelShirtsLink.addEventListener('mouseout', () => {
    categoryReset(flannelShirtsLabel, flannelShirtsUnderlay);
  });

  tShirtsLink.addEventListener('mouseover', () => {
    categoryHover(tShirtsLabel, tShirtsUnderlay);
  });
  tShirtsLink.addEventListener('mouseout', () => {
    categoryReset(tShirtsLabel, tShirtsUnderlay);
  });

  coatsLink.addEventListener('mouseover', () => {
    categoryHover(coatsLabel, coatsUnderlay);
  });
  coatsLink.addEventListener('mouseout', () => {
    categoryReset(coatsLabel, coatsUnderlay);
  });

  jacketsLink.addEventListener('mouseover', () => {
    categoryHover(jacketsLabel, jacketsUnderlay);
  });
  jacketsLink.addEventListener('mouseout', () => {
    categoryReset(jacketsLabel, jacketsUnderlay);
  });
});

//  ------------------------
//   Footer Accordian Menu
//  ------------------------

// Get all elements with the attribute fs-accordion-element="arrow"
const arrowElements = document.querySelectorAll('[fs-accordion-element="arrow"]');

// Create a MutationObserver for each element
arrowElements.forEach((arrowElement) => {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (arrowElement.classList.contains('is-active-accordion')) {
          // Find and set the opacity of the child element with fs-accordion-element="horizontal-line"
          const horizontalLine = arrowElement.querySelector(
            '[fs-accordion-element="horizontal-line"]'
          );
          if (horizontalLine) {
            horizontalLine.style.opacity = 0;
          }
        } else {
          // Reset the opacity when is-active-accordion is removed
          const horizontalLine = arrowElement.querySelector(
            '[fs-accordion-element="horizontal-line"]'
          );
          if (horizontalLine) {
            horizontalLine.style.opacity = 1;
          }
        }
      }
    }
  });

  // Define the configuration for the MutationObserver
  const config = { attributes: true, attributeFilter: ['class'] };

  // Start observing each target element
  observer.observe(arrowElement, config);
});
