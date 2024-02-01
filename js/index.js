// || Constants
const UNARY_MINUS = "unary_minus";
const BACKSPACE = "backspace";
const CLEAR = "clear";

// || DOM elements
const outputScreen = document.querySelector(".output");
const keyboard = document.querySelector(".keyboard");

keyboard.addEventListener("click", (e) => {
  //get the key entered
  let userInput = e.target.dataset.key;

  //if the key is not a valid key dont do anythink
  if (!userInput) {
    return;
  }

  // change UI based on user's input
  changeUI(userInput);
});

function changeUI(userInput) {
  switch (userInput) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      inputDigit(userInput);
      break;
    case ".":
      inputDecimal();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
    case "%":
      inputOperator(userInput);
      break;
    case UNARY_MINUS:
      // do something
      inputUnaryMinus();
      break;
    case BACKSPACE:
      // do something
      inputBackSpace();
      break;
    case CLEAR:
      // do something
      inputClear();
      break;
  }
}

function inputDigit(n) {
  // if the entered number is very first number than override the default 0
  if (outputScreen.textContent === "0") {
    outputScreen.textContent = n;
    return;
  }

  // if it's not default 0 , than simply concatinate with the previous screen state
  outputScreen.textContent += n;
}

function inputDecimal() {
  // extracting the last input , note(each individual inputs are seperated by white space) except for sequence of digits
  const individualInput = outputScreen.textContent.split(" ");

  let lastInput = individualInput[individualInput.length - 1];

  //   check the last input , it it's a number and it doesn't have any . points , you can append .
  if (!isNaN(parseFloat(lastInput)) && lastInput.indexOf(".") < 0) {
    outputScreen.textContent += ".";
  }
}

function inputOperator(operator) {
  //note operator is always wrapped with one white spaces from Both sides (very important)
  //operator cannot be written if last input is operator itself, we can find it out , casue operator are wrapped by white space and if last character is white space it's operator
  //removing white space bwteen operator can break the code

  //   operator not allowed if there is already an operator or if there is no operand
  if (
    outputScreen.textContent[outputScreen.textContent.length - 1] === " " ||
    outputScreen.textContent === ""
  ) {
    return;
  }

  //   if input is multiply used cross symbol instead
  if (operator === "*") {
    outputScreen.innerHTML += ` &Cross; `;
    return;
  }

  outputScreen.textContent += ` ${operator} `;
}

function inputBackSpace() {
  // if last charcter is a number or decimal remove it
  if (
    !isNaN(
      parseInt(outputScreen.textContent[outputScreen.textContent.length - 1])
    ) ||
    outputScreen.textContent[outputScreen.textContent.length - 1] === "."
  ) {
    const arrayOfStrings = outputScreen.textContent.split("");
    arrayOfStrings.pop();
    outputScreen.textContent = arrayOfStrings.join("");
  }

  //   if last character is white space it means it is an operator, remove character   utill number of white space removed is 2
  else if (
    outputScreen.textContent[outputScreen.textContent.length - 1] === " "
  ) {
    const arrayOfStrings = outputScreen.textContent.split("");
    let spaceDeletedCount = 0;
    for (let i = arrayOfStrings.length - 1; i >= 0; i--) {
      if (spaceDeletedCount === 2) {
        break;
      }
      let popedString = arrayOfStrings.pop();
      if (popedString === " ") {
        spaceDeletedCount++;
      }
    }

    outputScreen.textContent = arrayOfStrings.join("");
  }
}

function inputClear() {
  outputScreen.textContent = "0";
}

function inputUnaryMinus() {
  //it works only if the last input value is a number
  const individualInput = outputScreen.textContent.split(" ");
  let lastvalue = individualInput[individualInput.length - 1];

  //   if not a number dont do anything
  if (isNaN(parseFloat(lastvalue))) {
    return;
  }

  let number = parseFloat(lastvalue);

  //   if number is negative , it becomes positive and if positive it becomes negative
  number = -number;
  lastvalue = number.toString();

  individualInput[individualInput.length - 1] = lastvalue;

  outputScreen.textContent = individualInput.join(" ");
}
