import anime from "animejs/lib/anime.es.js";

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
