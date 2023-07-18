"use strict";

// add Event on multiple element

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

// PRELOADING

const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function () {
  loadingElement.classList.add("loaded");
  document.body.classList.remove("active");
});

// mobile nav toggle

const [navTogglers, navLinks, navbar, overlay] = [
  document.querySelectorAll("[data-nav-toggler]"),
  document.querySelectorAll("[data-nav-link]"),
  document.querySelector("[data-navbar]"),
  document.querySelector("[data-overlay]"),
];

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
};

addEventOnElements(navTogglers, "click", toggleNav);

const closeNav = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
};

addEventOnElements(navLinks, "click", closeNav);

// HEADER

const header = document.querySelector("[data-header]");

const activeElementOnScroll = function () {
  if (windwow.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

window.addEventListener("scroll", activeElementOnScroll);

/**
 * TEXT ANIMATION EFFECT FOR HEADER SECTION
 */

const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLeterBoxDelay = 0;

const setLetterEffect = function () {
  // loop through all letter boxes
  for (let i = 0; i < letterBoxes.length; i++) {
    // set initial animation delay
    let letterAnimationDelay = 0;

    // get all character from the current letter box
    const letters = letterBoxes[i].textContent.trim();
    // remove al character from the current letter box
    letterBoxes[i].textContent = "";

    // loop through all letters
    for (let j = 0; j < letters.length; j++) {
      // crewate a span
      const span = document.createElement("span");

      // set animation dealay on span
      span.style.animationDelay = "${letterAnimationDelay}s";

      // set the "in" class on the span, if current box is active
      // other wise class is "out"
      if (i === activeLetterBoxIndex) {
        span.classList.add("in");
      } else {
        span.classList.add("out");
      }

      // pass current letter into span
      span.textContent = letters[j];

      // add space class on span, when curent letter contain space
      if (letters[j] === " ") span.classList.add("space");

      // pass the span on current letter box
      letterBoxes[i].appendChild(span);

      // skip letterAnimationDelay when loop is in the last imdex
      if (j >= letters.length - 1) break;
      // otherwise update
      letterAnimationDelay += 0.5;
    }

    // get total delay of active letter box
    if (i === activeLetterBoxIndex) {
      totalLeterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    }

    // add active class on last active letter box
    if (i === lastActiveLetterBoxIndex) {
      letterBoxes[i].classList.add("active");
    } else {
      letterBoxes[i].classList.remove("active");
    }
  }

  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;

    // update activeBoxIndex based on total letter boxes
    activeLetterBoxIndex >= letterBoxes.length - 1
      ? (activeLetterBoxIndex = 0)
      : activeLetterBoxIndex++;

    setLetterEffect();
  }, totalLeterBoxDelay * 1000 + 3000);
};

// call the letter efect function after window loaded
window.addEventListener("load", setLetterEffect);

/**
 * BACK TO TOP BOTTON
 */

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollEndPos = bodyHeight - windowHeight;
  const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

  backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

  // visible back top btn when scrolled 5% of the page
  if (totalScrollPercent > 5) {
    backTopBtn.classList.add("show");
  } else {
    backTopBtn.classList.remove("show");
  }
});

/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementIsInScreen =
      revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
};

window.addEventListener("scroll", scrollReveal);

scrollReveal();

/**
 * CUSTOM CURSOR
 */

const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll("botton");

// change cursorElements based on cursor move
document.body.addEventListener("mousemove", function (event) {
  setTimeout(function () {
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }, 100);
});

//add cursor hovered class
const hoverActive = function () {
  cursor.classList.add("hovered");
};

// remove cursor hovered class
const hoverDeactive = function () {
  cursor.classList.remove("hovered");
};

// add hover effect on cursor, when hover on any button or any hyperlink
addEventOnElements(anchorElements, "mousemove", hoverActive);
addEventOnElements(anchorElements, "mouseout", hoverDeactive);
addEventOnElements(buttons, "mousemove", hoverActive);
addEventOnElements(buttons, "mouseout", hoverDeactive);

// add disabled class on  cursorElement, when mouse out of body
document.body.addEventListener("mouseout", function () {
  cursor.classList.add("disabled");
});

// remove disabled class on cursorElement, when mouse in the body
document.body.addEventListener("mouseover", function () {
  cursor.classList.remove("disabled");
});

// changed from here
function togglePopup() {
  var popup = document.getElementById("popup");
  var links = popup.getElementsByTagName("a");

  if (window.getComputedStyle(popup).display === "none") {
    // Show the popup and links
    popup.style.display = "flex";
    setTimeout(function () {
      popup.classList.add("show");
      for (var i = 0; i < links.length; i++) {
        links[i].style.display = "inline-block";
      }
    }, 50);
  } else {
    // Hide the popup and links
    popup.classList.remove("show");
    for (var i = 0; i < links.length; i++) {
      links[i].style.display = "none";
    }
    setTimeout(function () {
      popup.style.display = "none";
    }, 300);
  }
}

document.addEventListener("click", function (event) {
  var photo = document.getElementsByClassName("bimon-image")[0];
  var popup = document.getElementById("popup");

  if (
    event.target !== photo &&
    event.target !== popup &&
    !popup.contains(event.target)
  ) {
    // Clicked away from the photo and popup, hide the popup and links
    popup.classList.remove("show");
    var links = popup.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
      links[i].style.display = "none";
    }
    setTimeout(function () {
      popup.style.display = "none";
    }, 300);
  }
});

function hidePopupOnScroll() {
  var popup = document.getElementById("popup");
  var photo = document.getElementsByClassName("bimon-image")[0];

  var popupVisible = window.getComputedStyle(popup).display === "flex";
  var scrolledAway = window.scrollY > photo.offsetTop + photo.offsetHeight;

  if (popupVisible && scrolledAway) {
    // Scrolled away from the photo, hide the popup and links
    popup.classList.remove("show");
    var links = popup.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
      links[i].style.display = "none";
    }
    setTimeout(function () {
      popup.style.display = "none";
    }, 300);
  }
}

window.addEventListener("scroll", hidePopupOnScroll);
