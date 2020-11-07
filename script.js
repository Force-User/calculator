"use strict";
const calculatorButtons = document.querySelector(".calculator-buttons");
const screen = document.getElementById("inp-screen");
let memoryCurrentNumber = 0;
let memoryLastNumber = false;
let memoryOperator = "";

calculatorButtons.addEventListener("click", (e) => {
  const selectedElement = e.target.closest("button");

  selectedElement.classList.add("press-effect");

  if (selectedElement.classList.contains("calculator-buttons__button")) {
    pressEffect(e);

    if (selectedElement.classList.contains("number-button")) {
      if (memoryLastNumber) {
        setScreenValue(selectedElement.textContent);
        memoryLastNumber = false;
      } else if (getScreenValue() === "0") {
        setScreenValue(selectedElement.textContent);
      } else {
        outputNumber(selectedElement.textContent);
      }
      return;
    }

    if (selectedElement.classList.contains("point")) {
      checkPoint(selectedElement.textContent);
      return;
    }

    if (selectedElement.classList.contains("ce-button")) {
      clearAllVlaue();
      return;
    }

    if (selectedElement.classList.contains("c-button")) {
      clearLastInputNumber();
      return;
    }

    if (selectedElement.classList.contains("operation-button")) {
      mathOperation(selectedElement.textContent);
    }
  }
});

function outputNumber(number = 0) {
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
  screen.value = "";
}

function getScreenValue() {
  return screen.value;
}
function setScreenValue(value) {
  screen.value = value;
}
function clearAllVlaue() {
  clearScreen();
  memoryLastNumber = false;
  memoryOperator = "";
  memoryCurrentNumber = 0;
}
function clearLastInputNumber() {
  const screenValue = getScreenValue().toString();
  setScreenValue(screenValue.substring(0, screenValue.length - 1));
}

function checkPoint(elem) {
  const screenValue = getScreenValue();
  if (screenValue !== "" && !screenValue.includes(".")) {
    outputNumber(elem);
  }
}

function pressEffect(e) {
  const lastClickBlock = calculatorButtons.querySelector(".click-effect");

  if (lastClickBlock) {
    lastClickBlock.remove();
  }

  const clickBlock = document.createElement("div");
  const maxValue = Math.max(e.target.clientWidth, e.target.clientHeight);
  const elemSizeOrClient = e.target.getBoundingClientRect();

  clickBlock.classList.add("click-effect");
  e.target.append(clickBlock);
  clickBlock.style.width = clickBlock.style.height = maxValue + "px";
  clickBlock.style.top = e.clientY - elemSizeOrClient.top - maxValue / 2 + "px";
  clickBlock.style.left =
    e.clientX - elemSizeOrClient.left - maxValue / 2 + "px";
  clickEffect(e.target);
}

function clickEffect(button) {
  button.classList.add("press-effect");
  setTimeout(() => {
    button.classList.remove("press-effect");
  }, 300);
}
