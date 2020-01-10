import React, { Component } from "react";
import NavBar from "./components/NavBar";
import Bar from "./components/Bar";
import {
  insertionSort,
  mergeSort,
  selectionSort,
  bubbleSort,
  quickSort
} from "./algorithms/index";
import {
  animateSelectionSort,
  animateBubbleSort,
  animateInsertionSort,
  animateMergeSort,
  animateQuickSort
} from "./animation/index";

import _ from "lodash";

const DEFAULT_COLOR = "aqua";

class SortingAlgoVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      size: 40,
      speed: 50,
      algoChosen: "",
      sortingActivated: false,
      arrayOrder: "Random",
      barsOffset: 0,
      compareMode: false
    };
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.generateList);
    this.generateList();
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.generateList);
  }

  generateList = () => {
  
    if (!this.state.sortingActivated) {
      this.setState(prevStates => {
        const lists = [];
        const newList = [...Array(prevStates.size).keys()].map(() =>
          Math.floor(Math.random() * 95 + 5)
        );
        if (prevStates.arrayOrder === "Worst Case")
          newList.sort((a, b) => b - a);

        newList.forEach((x, index, arr) => (arr[index] = [x, index]));
        lists.push(newList);

        if (prevStates.compareMode) {
          for (let i = 0; i < 4; i++) {
            const tmp = _.cloneDeep(newList);
            lists.push(tmp);
          }
        }
        return { lists };
      });
    }
  };

  handleArrayOrder = order => {
    if (!this.state.sortingActivated) {
      this.setState({ arrayOrder: order });
      this.generateList();
    }
  };

  handleArraySize = size => {
    if (!this.state.sortingActivated) {
      this.setState({ size });
      this.generateList();
    }
  };

  handleSliderMousedown = () => {
    document.addEventListener("mouseup", this.handleSliderMouseup);
    document.addEventListener("onTouchStart", this.handleSliderMouseup);
  };

  handleSliderMouseup = () => {
    const slider = document.getElementById("customRange1");
    this.setTransitionSpeed(slider.value);
    document.removeEventListener("mouseup", this.handleSliderMouseup);
    document.removeEventListener("onTouchEnd", this.handleSliderMouseup);
  };

  handleAlgoDropdown = algo => {
    this.setState({ algoChosen: algo });
  };

  handleCompareMode = () => {
    if (!this.state.sortingActivated) {
      const compareMode = !this.state.compareMode;
      this.setState({ compareMode });
      this.generateList();
    }
  };

  resetBars = (bars) => {
    const size = this.state.size;
    const vwWidth = size === 40 ? 1 : size === 80 ? 0.5 : size === 120 ? 0.3 : size === 160 ? 0.25 : 2;
    const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const barWidth = this.state.compareMode ? vwWidth/2 : vwWidth
    const pxWidth = Math.floor((barWidth/100) * windowWidth + 3);
    const barsOffset = this.state.compareMode ? Math.floor(((windowWidth/2) - (size*pxWidth)) / 2) : Math.floor((windowWidth - (size*pxWidth)) / 2);

    Array.from(bars).forEach((bar, index) => {
      bar.style.transition = "";
      bar.style.transform =
        "translateX(" + (barsOffset + index * pxWidth) + "px)";
    });

    Array.from(bars).forEach(bar => {
      bar.style.backgroundColor = DEFAULT_COLOR;
    });
  };

  setList = (list) => {
    this.setState(prevStates => {
      
      list.forEach((item, index) => {
        item[1] = index;
      });

      const lists = _.cloneDeep(prevStates.lists);
      lists.forEach((oldList, index) => {
        const newList = _.cloneDeep(list);
        lists[index] = newList;
        const bars = document.getElementsByClassName("bar" + index);
        this.resetBars(bars);
      })

      return {lists};
    });
  };

  setTransitionSpeed = sliderValue => {
    const transitionTime = sliderValue > 50 ? 800 : 1200 
    const result = Math.floor(transitionTime / (sliderValue/1.5));
    this.setState({ speed: result });
  };

  sort = () => {
    if (!this.state.sortingActivated && (this.state.algoChosen !== "" || this.state.compareMode)) {
      const sortingActivated = !this.state.sortingActivated;
      this.setState({ sortingActivated });

      if (!this.state.compareMode) {
        const algo = this.state.algoChosen;
        const bars = document.getElementsByClassName("bar");
        const action =
          algo === "Selection Sort"
            ? selectionSort
            : algo === "Insertion Sort"
            ? insertionSort
            : algo === "Bubble Sort"
            ? bubbleSort
            : algo === "Merge Sort"
            ? mergeSort
            : algo === "Quick Sort"
            ? quickSort
            : null;

        const result = action(this.state.lists[0]);

        if (algo === "Quick Sort") {
          this.animateSort(
            result[0],
            bars,
            algo,
            this.state.compareMode,
            0,
            [],
            result[1],
            result[2],
            [],
            result[3],
            result[4],
            result[5],
            result[6]
          );
        } else if (algo === "Merge Sort") {
          this.animateSort(
            result[0],
            bars,
            algo,
            this.state.compareMode,
            0,
            result[1],
            result[2],
            result[3],
            result[4]
          );
        } else {
          this.animateSort(
            result[0],
            bars,
            algo,
            this.state.compareMode,
            0,
            result[1],
            result[2],
            result[3]
          );
        }
      } else {
        const algo = [
          insertionSort,
          selectionSort,
          bubbleSort,
          mergeSort,
          quickSort
        ];
        const algoName = [
          "Insertion Sort",
          "Selection Sort",
          "Bubble Sort",
          "Merge Sort",
          "Quick Sort"
        ];
        algo.forEach((action, index) => {
          const bars = document.getElementsByClassName("bar" + index);
          const result = action(this.state.lists[index]);

          if (index === 4) {
            this.animateSort(
              result[0],
              bars,
              algoName[index],
              this.state.compareMode,
              index,
              [],
              result[1],
              result[2],
              [],
              result[3],
              result[4],
              result[5],
              result[6]
            );
          } else if (index === 3) {
            this.animateSort(
              result[0],
              bars,
              algoName[index],
              this.state.compareMode,
              index,
              result[1],
              result[2],
              result[3],
              result[4]
            );
          } else {
            this.animateSort(
              result[0],
              bars,
              algoName[index],
              this.state.compareMode,
              index,
              result[1],
              result[2],
              result[3]
            );
          }
        });
      }
    }
  };

  animateSort = (
    list,
    bars,
    algo,
    compareMode,
    index,
    comparisons,
    swaps,
    sorted,
    divisions,
    small,
    large,
    normal,
    pivots
  ) => {
    let iteration;
    const speed = this.state.speed;
    const size = this.state.size;
    const action =
      algo === "Selection Sort"
        ? animateSelectionSort
        : algo === "Bubble Sort"
        ? animateBubbleSort
        : algo === "Insertion Sort"
        ? animateInsertionSort
        : algo === "Merge Sort"
        ? animateMergeSort
        : algo === "Quick Sort"
        ? animateQuickSort
        : null;
   
    if (algo === "Quick Sort")
      iteration = action(
        bars,
        algo,
        compareMode,
        swaps,
        sorted,
        small,
        large,
        normal,
        pivots,
        speed,
        size
      );
    else if (algo === "Merge Sort")
      iteration = action(
        bars,
        algo,
        compareMode,
        comparisons,
        swaps,
        sorted,
        divisions,
        speed,
        size
      );
    else
      iteration = action(
        bars,
        algo,
        compareMode,
        comparisons,
        swaps,
        sorted,
        speed,
        size
      );
    
    setTimeout(() => {
      if (!compareMode || algo === "Bubble Sort"){
        const sortingActivated = !this.state.sortingActivated;
        this.setState({ sortingActivated });
        this.setList(list);
      }
    }, (iteration * speed) + 10);
  
  };

  render() {
    const { lists, algoChosen, sortingActivated, compareMode } = this.state;
    return (
      <React.Fragment>
        <NavBar
          algoChosen={algoChosen}
          sortingActivated={sortingActivated}
          generateList={this.generateList}
          handleSliderMousedown={this.handleSliderMousedown}
          handleAlgoDropdown={this.handleAlgoDropdown}
          sort={this.sort}
          handleArrayOrder={this.handleArrayOrder}
          handleArraySize={this.handleArraySize}
          compareMode={compareMode}
          handleCompareMode={this.handleCompareMode}
        ></NavBar>
        <div className={`outermost-container ${compareMode ? "compare" : ""}`} onResize>
          {lists.map((list, row) => (
            <div className="bar-container" style={{border: compareMode ? "1px solid black" : ""}}>
              {list.map((item, index) => (
                <Bar
                  key={index}
                  value={item[0]}
                  id={index}
                  size={this.state.size}
                  row={row}
                  compareMode={compareMode}
                />
              ))}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default SortingAlgoVisualizer;
