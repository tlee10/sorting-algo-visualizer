export const animateComparisons = (algo, bar1, bar2) => {
  let color1 = "red";
  let color2 = "red";

  if (algo === "Selection Sort" || algo === "Quick Sort") color1 = "yellow";
  if (bar1 !== null) bar1.style.backgroundColor = color1;
  bar2.style.backgroundColor = color2; 
    
    // setTimeout(()=>{
    //   bars[i].style.backgroundColor = "aqua";
    //   bars[j].style.backgroundColor = "aqua";        
    // }, 350);
}




