document.addEventListener("DOMContentLoaded", () => {
  const currentDisplay = document.querySelector(".current");
  const buttons = document.querySelectorAll(".btn");

  let firstNum = "";
  let operator = "";
  let waitingForSecondNum = false;

  const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    x: (a, b) => a * b,
    "/": (a, b) => (b !== 0 ? a / b : "Error"),
  };

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const val = this.innerText;

      if (
        this.classList.contains("number") ||
        this.classList.contains("decimal")
      ) {
        if (waitingForSecondNum) {
          currentDisplay.innerText = val;
          waitingForSecondNum = false;
        } else {
          currentDisplay.innerText += val;
        }
      }

      if (val === "C") {
        currentDisplay.innerText = "";
        firstNum = "";
        operator = "";
      }

      if (this.classList.contains("operand") && val !== "=") {
        firstNum = currentDisplay.innerText;
        operator = val;
        waitingForSecondNum = true;
      }

      if (val === "=") {
        const secondNum = currentDisplay.innerText;

        const mathFunction = operations[operator];

        if (mathFunction) {
          const result = mathFunction(
            parseFloat(firstNum),
            parseFloat(secondNum),
          );
          currentDisplay.innerText = result;
          firstNum = result;
        }
      }
    });
  });
});
