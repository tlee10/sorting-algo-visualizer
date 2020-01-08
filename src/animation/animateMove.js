export const animateMove = (positions, bar1, bar2, speed) => { 
  const transitionSpeed = 7 * speed/100;
  bar1.style.transform = "translateX(" + positions[1] + "px)";
  bar1.style.transition = "transform " + transitionSpeed + "ms";
  if (bar2 !== null){
    bar2.style.transform = "translateX(" + positions[0] + "px)";
    bar2.style.transition = "transform " + transitionSpeed + "ms";
  }
}

