//  ---------
//   Sliders
//  ---------

// Declaring global variables for use in the below functions
let slider;
let cards;
let card;
let cardWidth;

let sliderPosition = 0;
let cardPosition = 0;
let isAnimating = false;

// Adding event listeners

document
  .querySelector('.best-sellers-slider_left-button')
  .addEventListener('click', bestSellersMoveLeft);
document
  .querySelector('.best-sellers-slider_right-button')
  .addEventListener('click', bestSellersMoveRight);

document.querySelector('.reviews-slider_left-button').addEventListener('click', reviewsMoveLeft);
document.querySelector('.reviews-slider_right-button').addEventListener('click', reviewsMoveRight);

// Helper functions for moveLeft() and moveRight()
function findCardWidth() {
  let cardStyle = window.getComputedStyle(card);
  let cardMarginRight = parseFloat(cardStyle.marginRight);
  cardWidth = card.offsetWidth + cardMarginRight;
}

function findSliderPosition() {
  let sliderTransformMatrix = window.getComputedStyle(slider).getPropertyValue('transform');
  let sliderTransformValues = sliderTransformMatrix.split(',');
  sliderPosition = parseFloat(sliderTransformValues[4]);
}

function findCardPosition(card) {
  let cardTransformMatrix = window.getComputedStyle(card).getPropertyValue('transform');
  let cardTransformValues = cardTransformMatrix.split(',');
  cardPosition = parseFloat(cardTransformValues[4]);
}

function finishedAnimating() {
  isAnimating = false;
}

// Assigns the global slider variables to the relevant slider's elements when that slider's left/right button is clicked
function assignVariables(sliderPrefix) {
  slider = document.querySelector('.' + sliderPrefix + '-slider_wrapper');
  cards = document.querySelectorAll('.' + sliderPrefix + '-slider_card');
  card = document.querySelector('.' + sliderPrefix + '-slider_card');
}

// Basic move right function for all sliders
function moveRight() {
  findCardWidth();

  findSliderPosition();
  slider.style.transform = `translateX(${sliderPosition + cardWidth}px)`;

  cards.forEach((card) => {
    findCardPosition(card);
    card.style.transform = `translateX(${cardPosition - cardWidth}px)`;
  });

  setTimeout(function () {
    slider.insertBefore(slider.firstElementChild, slider.lastElementChild.nextSibling);
  }, 500); // Add a delay

  setTimeout(finishedAnimating, 500);
}

// Basic move left function for all sliders
function moveLeft() {
  findCardWidth();

  findSliderPosition();
  slider.style.transform = `translateX(${sliderPosition - cardWidth}px)`;

  cards.forEach((card) => {
    findCardPosition(card);
    card.style.transform = `translateX(${cardPosition + cardWidth}px)`;
  });

  setTimeout(function () {
    slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
  }, 500); // Add a delay

  setTimeout(finishedAnimating, 500);
}

// Best Sellers Slider's left button
function bestSellersMoveLeft() {
  if (isAnimating === false) {
    isAnimating = true;

    assignVariables('best-sellers');
    moveLeft();
  }
}

// Best Sellers Slider's right button
function bestSellersMoveRight() {
  if (isAnimating === false) {
    isAnimating = true;

    assignVariables('best-sellers');
    moveRight();
  }
}

// Reviews Slider's left button
function reviewsMoveLeft() {
  if (isAnimating === false) {
    isAnimating = true;

    assignVariables('reviews');
    moveLeft();
  }
}

// Review Slider's right button
function reviewsMoveRight() {
  if (isAnimating === false) {
    isAnimating = true;

    assignVariables('reviews');
    moveRight();
  }
}

// Mobile IG Slider's left button
function igPostsMoveLeft() {
  if (isAnimating === false) {
    isAnimating = true;

    assignVariables('ig-posts');
    moveLeft();
    dotNumberDecrease();
    updateDots();
  }
}

// Mobile IG Slider's right button
function igPostsMoveRight() {
  if (isAnimating === false) {
    isAnimating = true;

    assignVariables('ig-posts');
    moveRight();
    dotNumberIncrease();
    updateDots();
  }
}

// Updating the IG slider's dots
var dotNumber = 1;

function dotNumberIncrease() {
  dotNumber += 1;
  if (dotNumber >= 5) {
    dotNumber = 1;
  }
}

function dotNumberDecrease() {
  dotNumber -= 1;
  if (dotNumber <= 0) {
    dotNumber = 4;
  }
}

function updateDots() {
  var dot1 = document.querySelector('#ig-posts-slider-dot-1');
  var dot2 = document.querySelector('#ig-posts-slider-dot-2');
  var dot3 = document.querySelector('#ig-posts-slider-dot-3');
  var dot4 = document.querySelector('#ig-posts-slider-dot-4');

  if (dotNumber === 1) {
    dot1.classList.add('is-selected');
    dot2.classList.remove('is-selected');
    dot3.classList.remove('is-selected');
    dot4.classList.remove('is-selected');
  } else if (dotNumber === 2) {
    dot2.classList.add('is-selected');
    dot1.classList.remove('is-selected');
    dot3.classList.remove('is-selected');
    dot4.classList.remove('is-selected');
  } else if (dotNumber === 3) {
    dot3.classList.add('is-selected');
    dot1.classList.remove('is-selected');
    dot2.classList.remove('is-selected');
    dot4.classList.remove('is-selected');
  } else if (dotNumber === 4) {
    dot4.classList.add('is-selected');
    dot1.classList.remove('is-selected');
    dot2.classList.remove('is-selected');
    dot3.classList.remove('is-selected');
  }
}

// Puts the Reviews slider back into place when the user resizes the window
window.addEventListener('resize', function () {
  assignVariables('reviews');
  findCardWidth();
  cards.forEach((card) => {
    card.style.transition = 'none';
    findCardPosition(card);
    card.style.transform = `translateX(${-(cardWidth * 2)}px)`;
    setTimeout(() => {
      card.style.transition = 'transform 0.5s ease';
    }, 500);
  });
  slider.style.transform = `translateX(0px)`;
});

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
          if (swipeArea === bestSellersSwipeArea) {
            bestSellersMoveLeft();
          } else if (swipeArea === reviewsSwipeArea) {
            reviewsMoveLeft();
          } else if (swipeArea === igPostsSwipeArea) {
            igPostsMoveLeft();
          }
        } else {
          // Left swipe
          if (swipeArea === bestSellersSwipeArea) {
            bestSellersMoveRight();
          } else if (swipeArea === reviewsSwipeArea) {
            reviewsMoveRight();
          } else if (swipeArea === igPostsSwipeArea) {
            igPostsMoveRight();
          }
        }
      }
    },
    { passive: true }
  ); // Mark the event listener as passive
}

var bestSellersSwipeArea = document.getElementById('best-sellers-swipe-area');
addSwipeInteraction(bestSellersSwipeArea);

var reviewsSwipeArea = document.getElementById('reviews-swipe-area');
addSwipeInteraction(reviewsSwipeArea);

var igPostsSwipeArea = document.getElementById('ig-posts-swipe-area');
addSwipeInteraction(igPostsSwipeArea);
