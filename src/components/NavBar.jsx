import React, { Component } from "react";

class NavBar extends Component {
 
  render() {
    const orders = ["Random", "Worst Case"];
    const algo = [
      "Insertion Sort",
      "Selection Sort",
      "Bubble Sort",
      "Merge Sort",
      "Quick Sort",
    ];
    const sizes = [40, 80, 120, 160];

    const {algoChosen, sortingActivated, generateList, handleSliderMousedown, handleAlgoDropdown, sort, handleArrayOrder, handleArraySize, compareMode, handleCompareMode } = this.props;

    const activateBtnColor =
      !compareMode && (algoChosen === "")
        ? "disabled "
        : sortingActivated
        ? "btn-danger"
        : "btn-success";
    const activateBtnText =
      !compareMode && (algoChosen === "")
        ? "Choose An Algorithm"
        : sortingActivated
        ? "Sorting"
        : compareMode 
        ? "Sort"
        : "Activate " + algoChosen;
    
    const compareBtnColor = !compareMode ? "btn-danger" : "btn-success"
    const isCompareMode = !compareMode ? "Ludicrous Mode OFF" : "Ludicrous Mode ON";

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Sorting Algo Visualizer
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
          <li className="nav-item dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Array Order
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                {orders.map((order, index) => {
                  return(<button className="dropdown-item" key={index} onClick={()=> handleArrayOrder(order)}>
                    {order}
                  </button>);
                })}
              </div>
            </li>

            <li className="nav-item dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Size
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                {sizes.map((size, index) => {
                  return(<button className="dropdown-item" key={index} onClick={()=> handleArraySize(size)}>
                    {size}
                  </button>);
                })}
              </div>
            </li>

            <li className="nav-item">
              <button className="btn btn-dark" onClick={() => generateList()}>
                Generate Array
              </button>
            </li>
            
            <li className="nav-item dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Algorithms
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                {algo.map((algo, index) => (
                  <button className="dropdown-item" key={index} onClick={() => handleAlgoDropdown(algo)}>
                    {algo}
                  </button>
                ))}
              </div>
            </li>
            <li>
              <span className="speed-label" style={{color: "white"}}>Speed</span>
              <input className= "speed-slider" type="range" id="customRange1" min="1" max="100" onMouseDown={() => handleSliderMousedown()}/>             
            </li>

            <li className="nav-item">
              <button
                className={`btn ${compareBtnColor}`}
                type="button"
                onClick={() => handleCompareMode()}
              >
                <strong>{isCompareMode}</strong>
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`btn ${activateBtnColor}`}
                type="button"
                onClick={() => sort()}
              >
                <strong>{activateBtnText}</strong>
              </button>
            </li>
            
                      
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
