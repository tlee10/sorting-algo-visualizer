import React from 'react';

const Bar = (props) => {
  const {value, id, size, compareMode, row} = props;
  const vwWidth = size === 40 ? 1 : size === 80 ? 0.5 : size === 120 ? 0.3 : size === 160 ? 0.25 : 2;
  const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const barHeight = compareMode ? value/5 : value/1.5
  const barWidth = compareMode ? vwWidth/2 : vwWidth
  const pxWidth = Math.floor((barWidth/100) * windowWidth + 3);
  const barsOffset = compareMode ? Math.floor(((windowWidth/2) - (size*pxWidth)) / 2) : Math.floor((windowWidth - (size*pxWidth)) / 2);
  const transform = "translateX(" + (barsOffset + id*pxWidth) + "px)";

  return(
    <div className={`bar bar${row}`}  id = {id} style={{height: `${barHeight}vh`, width: `${barWidth}vw`, transform: `${transform}`, backgroundColor: "aqua"}}></div>
  );
}

export default Bar;