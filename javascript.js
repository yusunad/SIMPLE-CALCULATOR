const buttons = document.querySelectorAll(".btns");
const clear = document.querySelector(".clear");
const equal = document.querySelector(".equal");
const values = document.querySelector(".cal_values");
const display = document.querySelector(".final_value");
let parenthesis = document.querySelector(".parentheses");

buttons.forEach((btns) => {
  btns.addEventListener("click", () => {
    const holdValue = btns.getAttribute("data-set");
    values.value += holdValue;

    values.focus();
    values.setSelectionRange(values.value.length, values.value.length);
  });
});

clear.addEventListener("click", () => {
  values.value = "";
  display.value = "";
});

let openBracket = true;

parenthesis.addEventListener("click", () => {
  if (openBracket) {
    values.value += "(";
  } else {
    values.value += ")";
  }
  openBracket = !openBracket;
});

function insertImplicitMultiplication(expr) {
  return (
    expr
      // Insert * between number and (
      .replace(/(\d)(\()/g, "$1*$2")
      // Insert * between ) and number
      .replace(/(\))(\d)/g, "$1*$2")
      // Insert * between ) and (
      .replace(/(\))(\()/g, "$1*$2")
  );
}

equal.addEventListener("click", () => {
  try {
    let expr = values.value;

    // Replace percentages first
    expr = expr.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

    // Insert implicit multiplication operators
    expr = insertImplicitMultiplication(expr);

    display.value = eval(expr);
  } catch (error) {
    values.value = "Error";
  }
});
