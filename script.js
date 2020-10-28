"use strict";
const calculator = document.querySelector(".calculator");
let memoryCurrentNumber = 0;
let memoryLastNumber = false;
let memoryOperator = "";


calculator.addEventListener("click", (e) => {
  const currentElement = e.target;

  if (currentElement.classList.contains("calculator-buttons__button")) {
    pressEffect(e);

    if (currentElement.classList.contains("number-button")) {
      
      if (memoryLastNumber) {
        setScreenValue(currentElement.textContent);
        memoryLastNumber = false;
      } else {

        if (getScreenValue() === "0") {

          console.log(+getScreenValue());
          setScreenValue(currentElement.textContent);
        } else {
          outputNumber(currentElement.textContent);
        }
      }
    }

    if (currentElement.classList.contains("point")) {
      checkPoint(currentElement.textContent);
    }

    if (currentElement.classList.contains("ce-button")) {
      clearAllVlaue();
      
    }

    if (currentElement.classList.contains("c-button")) {
      clearLastInputNumber();
    }

    if (currentElement.classList.contains("operation-button")) {
      mathOperation(currentElement.textContent);
    }
  }
});

function pressEffect(e) {
  const lastClickBlock = document.querySelector(".press-effect");

  if (lastClickBlock) {
    lastClickBlock.remove();
  }

  const clickBlock = document.createElement("div");
  const maxValue = Math.max(e.target.clientWidth, e.target.clientHeight);
  const elemSizeOrClient = e.target.getBoundingClientRect();

  clickBlock.classList.add("press-effect");
  e.target.append(clickBlock);
  clickBlock.style.width = clickBlock.style.height = maxValue + "px";
  clickBlock.style.top = e.clientY - elemSizeOrClient.top - maxValue / 2 + "px";
  clickBlock.style.left =
    e.clientX - elemSizeOrClient.left - maxValue / 2 + "px";
}

function outputNumber(number = 0) {
  const screen = document.getElementById("inp-screen");
  screen.value = screen.value + number;
}

function mathOperation(operation) {
  if (memoryLastNumber && memoryOperator !== "=") {
    setScreenValue(memoryCurrentNumber);
  } else {
    memoryLastNumber = true;

    switch (memoryOperator) {
      case "+":
        memoryCurrentNumber += +getScreenValue();
        break;

      case "-":
        memoryCurrentNumber -= +getScreenValue();
        break;

      case "*":
        memoryCurrentNumber *= +getScreenValue();
        break;

      case "/":
        memoryCurrentNumber /= +getScreenValue();
        break;

      default:
        memoryCurrentNumber = +getScreenValue();
        break;
    }
    setScreenValue(memoryCurrentNumber);
    memoryOperator = operation;
  }
}

function clearScreen() {
  const screen = document.getElementById("inp-screen");
  screen.value = "";
}

function getScreenValue() {
  return document.getElementById("inp-screen").value;
}
function setScreenValue(value) {
  document.getElementById("inp-screen").value = value;
 
}
function clearAllVlaue() {
  clearScreen();
  memoryLastNumber = false;
  memoryOperator = "";
  memoryCurrentNumber = 0;
}
function clearLastInputNumber() {
  const string = getScreenValue().toString();
  setScreenValue(string.substring(0, string.length - 1));
}

function checkPoint(elem) {
  const screen = getScreenValue();
  if (screen !== "" && !screen.includes(".")) {
    outputNumber(elem);
  } else {
  }
}
