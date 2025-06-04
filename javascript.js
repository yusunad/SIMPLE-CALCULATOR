const buttons = document.querySelectorAll(".btns");
const clear = document.querySelector(".clear");
const equal = document.querySelector(".equal");
const values = document.querySelector(".cal_values");
const display = document.querySelector(".final_value");
const parenthesis = document.querySelector(".parentheses");

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

equal.addEventListener("click", () => {
  try {
    display.value = eval(values.value);
  } catch (error) {
    values.value = "Error";
  }
});
