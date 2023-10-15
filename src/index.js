import { check } from 'prettier';

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

  slider.insertBefore(slider.firstElementChild, slider.lastElementChild.nextSibling);

  findSliderPosition();
  slider.style.transform = `translateX(${sliderPosition + cardWidth}px)`;

  cards.forEach((card) => {
    findCardPosition(card);
    card.style.transform = `translateX(${cardPosition - cardWidth}px)`;
  });

  setTimeout(finishedAnimating, 500);
}

// Basic move left function for all sliders
function moveLeft() {
  findCardWidth();

  slider.insertBefore(slider.lastElementChild, slider.firstElementChild);

  findSliderPosition();
  slider.style.transform = `translateX(${sliderPosition - cardWidth}px)`;

  cards.forEach((card) => {
    findCardPosition(card);
    card.style.transform = `translateX(${cardPosition + cardWidth}px)`;
  });

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

  swipeArea.addEventListener('touchstart', function (event) {
    startCoordinates.x = event.touches[0].clientX;
    startCoordinates.y = event.touches[0].clientY;
  });

  swipeArea.addEventListener('touchmove', function (event) {
    event.preventDefault(); // Prevent scrolling while swiping
  });

  swipeArea.addEventListener('touchend', function (event) {
    var deltaX = event.changedTouches[0].clientX - startCoordinates.x;
    var deltaY = event.changedTouches[0].clientY - startCoordinates.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
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
    } else {
      if (deltaY > 0) {
        // Down swipe
        // console.log('Swiped down');
      } else {
        // Up swipe
        // console.log('Swiped up');
      }
    }
  });
}

var bestSellersSwipeArea = document.getElementById('best-sellers-swipe-area');
addSwipeInteraction(bestSellersSwipeArea);

var reviewsSwipeArea = document.getElementById('reviews-swipe-area');
addSwipeInteraction(reviewsSwipeArea);

var igPostsSwipeArea = document.getElementById('ig-posts-swipe-area');
addSwipeInteraction(igPostsSwipeArea);

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

// Initializing an array to store the open/close state of each accordion item
let accordionItemIsOpen = [false, true, true, true];

// Initializing an array for accordion content
const accordionContent = document.querySelectorAll('[accordion-content]');
const accordionArrow = document.querySelectorAll('[accordion-arrow]');

// Take a snapshot of the height of each accordion content
let contentHeight = [];
let contentPaddingTop = [];
let contentPaddingBottom = [];

function updateMeasurementArrays() {
  contentHeight = [];
  contentPaddingTop = [];
  contentPaddingBottom = [];

  accordionContent.forEach((element) => {
    let height = element.offsetHeight;
    let computedStyle = getComputedStyle(element);
    let elementPaddingTop = parseFloat(computedStyle.paddingTop);
    let elementPaddingBottom = parseFloat(computedStyle.paddingBottom);
    contentHeight.push(height);
    contentPaddingTop.push(elementPaddingTop);
    contentPaddingBottom.push(elementPaddingBottom);
  });

  console.log(contentHeight);
  console.log(contentPaddingTop);
  console.log(contentPaddingBottom);
}

//initial snapshot of measurements
updateMeasurementArrays();

let resizeTimer;
let isResizing = false;

function handleResize() {
  if (isResizing) {
    clearTimeout(resizeTimer);
  } else {
    isResizing = true;
  }

  resizeTimer = setTimeout(() => {
    isResizing = false;
    updateMeasurementArrays();
  }, 1000); // Adjust the debounce time as needed
}

window.addEventListener('resize', handleResize);

// Function to toggle the state of an accordion item based on its index
function accordionButtonClick(accordionItemNumber) {
  // Get the index for the accordion item (0-based)
  const itemIndex = accordionItemNumber - 1;

  // Iterate through all accordion items
  accordionItemIsOpen.forEach((isOpen, index) => {
    if (index === itemIndex) {
      // if its the accordion item you clicked
      if (accordionItemIsOpen[itemIndex]) {
        // and its open, then close it
        accordionContent[itemIndex].style.maxHeight = '0px';
        accordionContent[itemIndex].style.paddingTop = '0px';
        accordionContent[itemIndex].style.paddingBottom = '0px';
        accordionArrow[itemIndex].style.transform = 'rotateZ(0deg)';
        accordionItemIsOpen[itemIndex] = !accordionItemIsOpen[itemIndex];
      } else {
        // and its closed, then open it
        accordionContent[itemIndex].style.maxHeight = contentHeight[itemIndex] + 'px';
        accordionContent[itemIndex].style.paddingTop = contentPaddingTop[itemIndex] + 'px';
        accordionContent[itemIndex].style.paddingBottom = contentPaddingBottom[itemIndex] + 'px';
        accordionArrow[itemIndex].style.transform = 'rotateZ(180deg)';
        accordionItemIsOpen[itemIndex] = !accordionItemIsOpen[itemIndex];
      }
    } else if (isOpen) {
      // if its not the accordion item you clicked
      accordionContent[index].style.maxHeight = '0px';
      accordionContent[index].style.paddingTop = '0px';
      accordionContent[index].style.paddingBottom = '0px';
      accordionArrow[index].style.transform = 'rotateZ(0deg)';
      accordionItemIsOpen[index] = false;
    }
  });
  // check the status of which items are open
  console.log(accordionItemIsOpen);
}

// Adding event listeners to buttons
const accordionButtons = document.querySelectorAll('[id^="accordion-button-"]');

accordionButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    accordionButtonClick(index + 1);
  });
});

// Closing the accordion items when the page loads
accordionButtonClick(1);
