import anime from "animejs/lib/anime.es.js";

export const calculateHistoryDates = (date)=>{
  // calendar dates
  const calendarDate = new Date(date);
  // current date
  const currDate = new Date();
  const isPastDate = (calendarDate <= currDate) ? false : true;
  const bookedDatesArr = localStorage.getItem("bookedDates");
  const bookedDates = JSON.parse(bookedDatesArr);
  const dateKey = String(padNumber(calendarDate.getMonth()))+String(padNumber(calendarDate.getDate()));
  return isPastDate || bookedDates?.includes(dateKey);
}

export const calMinMonth = ()=>{
  // current date
  const currDate = new Date();
  const currMonth = currDate.getMonth() + 1;
  const currYear = currDate.getFullYear();
  const formattedMonth = padNumber(currMonth);
  const minDate = currYear + "-" + formattedMonth + "-01T00:00:00";
  return minDate;
}

export const calMaxMonth = () => {
  // current date
  const currDate = new Date();
  const currMonth = currDate.getMonth() + 4;
  const currYear = currDate.getFullYear();
  const formattedMonth = padNumber(currMonth);
  const maxDate = currYear + "-" + formattedMonth + "-28T00:00:00";
  return maxDate;
};

function padNumber(number) {
  return (number < 10 ? "0" : "") + number;
}

export function hasDigit(inputString) {
  for (var i = 0; i < inputString.length; i++) {
    if (!isNaN(parseInt(inputString[i]))) {
      return true;
    }
  }
  return false;
}

export function containsOnlyEnglishChars(inputString) {
  for (var i = 0; i < inputString.length; i++) {
    var charCode = inputString.charCodeAt(i);
    if (
      !(
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122)
      )
    ) {
      return false;
    }
  }
  return true;
}

export function isValidIndianPhoneNumber(phoneNumber) {
  if(!phoneNumber)return true;
  // Regular expression to match Indian phone numbers with country code +91
  var regex = /^\+91[1-9][0-9]{9}$/;
  return regex.test(phoneNumber);
}

export function isValidEmail(email) {
  if (!email) return true;
  // Regular expression for validating email addresses
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function fitElementToParent(el, padding = 0) {
  let timeout = null; // Use specific return type

  function resize() {
    if (timeout) {
      clearTimeout(timeout);
    }

    const parentEl = el.parentNode; // Ensure parent is HTMLElement

    if (!parentEl) {
      // Handle case where parent is not found
      console.error("Parent element not found for", el);
      return;
    }

    const pad = padding || 0;
    const elOffsetWidth = el.offsetWidth - pad;
    const parentOffsetWidth = parentEl.offsetWidth;

    // if (elOffsetWidth > parentOffsetWidth) {
      // Calculate scale to fit based on width
      const ratio = parentOffsetWidth / elOffsetWidth;
      timeout = setTimeout(() => anime.set(el, { scale: ratio }), 10);
    // } else {
    //   // Reset scale if wider than parent
    //   anime.set(el, { scale: 1 });
    // }
  }

  resize();
  window.addEventListener("resize", resize);
}

export const advancedStaggeringAnimation = function () {
  const staggerVisualizerEl = document.querySelector(".stagger-visualizer");
  console.log(staggerVisualizerEl);
  const dotsWrapperEl =
    staggerVisualizerEl && staggerVisualizerEl.querySelector(".dots-wrapper");
  const dotsFragment = document.createDocumentFragment();
  const grid = [20, 10];
  const cell = 55;
  const numberOfElements = grid[0] * grid[1];
  let animation;
  let paused = true;
  console.log(dotsFragment, grid, cell, numberOfElements, paused);

  fitElementToParent(staggerVisualizerEl, 0);

  for (let i = 0; i < numberOfElements; i++) {
    const dotEl = document.createElement("div");
    dotEl.classList.add("dot");
    dotsFragment.appendChild(dotEl);
  }

  dotsWrapperEl && dotsWrapperEl.appendChild(dotsFragment);

  let index = anime.random(0, numberOfElements - 1);
  let nextIndex = 0;

  anime.set(".stagger-visualizer .cursor", {
    translateX: anime.stagger(-cell, { grid: grid, from: index, axis: "x" }),
    translateY: anime.stagger(-cell, { grid: grid, from: index, axis: "y" }),
    translateZ: 0,
    scale: 1.5,
  });

  function play() {
    paused = false;
    if (animation) animation.pause();

    nextIndex = anime.random(0, numberOfElements - 1);

    animation = anime
      .timeline({
        easing: "easeInOutQuad",
        complete: play,
      })
      .add({
        targets: ".stagger-visualizer .cursor",
        keyframes: [
          { scale: 0.75, duration: 120 },
          { scale: 2.5, duration: 220 },
          { scale: 1.5, duration: 450 },
        ],
        duration: 300,
      })
      .add(
        {
          targets: ".stagger-visualizer .dot",
          keyframes: [
            {
              translateX: anime.stagger("-2px", {
                grid: grid,
                from: index,
                axis: "x",
              }),
              translateY: anime.stagger("-2px", {
                grid: grid,
                from: index,
                axis: "y",
              }),
              duration: 100,
            },
            {
              translateX: anime.stagger("4px", {
                grid: grid,
                from: index,
                axis: "x",
              }),
              translateY: anime.stagger("4px", {
                grid: grid,
                from: index,
                axis: "y",
              }),
              scale: anime.stagger([2.6, 1], { grid: grid, from: index }),
              duration: 225,
            },
            {
              translateX: 0,
              translateY: 0,
              scale: 1,
              duration: 1200,
            },
          ],
          delay: anime.stagger(80, { grid: grid, from: index }),
        },
        30
      )
      .add(
        {
          targets: ".stagger-visualizer .cursor",
          translateX: {
            value: anime.stagger(-cell, {
              grid: grid,
              from: nextIndex,
              axis: "x",
            }),
          },
          translateY: {
            value: anime.stagger(-cell, {
              grid: grid,
              from: nextIndex,
              axis: "y",
            }),
          },
          scale: 1.5,
          easing: "cubicBezier(.075, .2, .165, 1)",
        },
        "-=800"
      );

    index = nextIndex;
  }

  play();
};
