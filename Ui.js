const display = document.getElementById("display");
let history = [];

function appendValue(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    const expression = display.value;
    const result = eval(expression);
    if (!isFinite(result)) throw new Error("Math Error");

    // Save to history
    history.unshift(`${expression} = ${result}`);
    if (history.length > 5) history.pop();

    display.value = result;
  } catch (e) {
    display.value = "Error";
  }
}

function toggleHistory() {
  const historyList = document.getElementById("history-list");
  historyList.classList.toggle("hidden");

  historyList.innerHTML = history
    .map(step => `<li>${step}</li>`)
    .join("");
}

document.addEventListener("keydown", (e) => {
  const allowed = "0123456789+-*/.=EnterBackspaceEscape";
  if (!allowed.includes(e.key) && e.key !== "Shift") return;

  if (e.key === "Enter") calculate();
  else if (e.key === "Backspace") deleteLast();
  else if (e.key === "Escape") clearDisplay();
  else appendValue(e.key);
});
