let calculateResult = () => {
  let primerDigito = operaciones.innerText.slice(
    0,
    operaciones.innerText.search(/\D/)
  );
  let operacion = operaciones.innerText
    .slice(operaciones.innerText.search(/\D/))
    .slice(0, 1);
  let segundoDigito = operaciones.innerText
    .slice(operaciones.innerText.search(/\D/))
    .slice(1);

  switch (operacion) {
    case "+":
      resultado.innerText = parseFloat(
        (Number(primerDigito) + Number(segundoDigito)).toFixed(10)
      );
      break;
    case "-":
      resultado.innerText = parseFloat(
        (Number(primerDigito) - Number(segundoDigito)).toFixed(10)
      );
      break;
    case "*":
      resultado.innerText = parseFloat(
        (Number(primerDigito) * Number(segundoDigito)).toFixed(10)
      );
      break;
    case "/":
      resultado.innerText = parseFloat(
        (Number(primerDigito) / Number(segundoDigito)).toFixed(10)
      );
      break;
  }
  operaciones.innerText = "";
};

document.addEventListener(
  "click",
  (e) => {
    let operaciones = document.getElementById("operaciones");
    let resultado = document.getElementById("resultado");

    if (e.target.className == "num" || e.target.className == "simbolo") {
      // Comprueba si el ultimo caracter es un simbolo
      if (
        e.target.className == "simbolo" &&
        (operaciones.innerText.slice(-1) == "+" ||
          operaciones.innerText.slice(-1) == "-" ||
          operaciones.innerText.slice(-1) == "*" ||
          operaciones.innerText.slice(-1) == "/")
      ) {
        operaciones.innerText = operaciones.innerText.slice(0, -1);
      }
      operaciones.innerText += e.target.textContent;
    }

    // Elimina ultimo caracter de operaciones
    if (e.target.textContent == "DEL") {
      operaciones.innerText = operaciones.innerText.slice(0, -1);
    }

    // Elimina todo de operaciones
    if (e.target.textContent == "AC") {
      operaciones.innerText = "";
      resultado.innerText = "";
    }

    // Calcula el resultado
    if (e.target.id == "igual") {
     calculateResult();
    }

    if (e.target.textContent == "+/-") {
      resultado.innerText = -Number(operaciones.innerText);
      operaciones.innerText = "";
    }

    if (e.target.textContent == "1/x") {
      console.log(1 / Number(operaciones.innerText).toFixed(10));
      resultado.innerText = parseFloat(
        (1 / Number(operaciones.innerText)).toFixed(10)
      );
      operaciones.innerText = "";
    }

    if (e.target.textContent == "√") {
      resultado.innerText = parseFloat(
        Math.sqrt(Number(operaciones.innerText)).toFixed(10)
      );
      operaciones.innerText = "";
    }

    if (e.target.textContent == "^2") {
      resultado.innerText = parseFloat(
        Math.pow(Number(operaciones.innerText), 2).toFixed(10)
      );
      operaciones.innerText = "";
    }
  },
  false
);

document.addEventListener(
  "keydown",
  (ev) => {
    let operaciones = document.getElementById("operaciones");
    let resultado = document.getElementById("resultado");
    let symbols = ["+", "-", "*", "/", "."];

    // Comprueba si es un numero o un simbolo
    if (ev.key >= 0 || ev.key <= 9 || symbols.includes(ev.key)) {
      // Comprueba si el ultimo caracter es un simbolo
      if (
        symbols.includes(ev.key) &&
        (operaciones.innerText.slice(-1) == "+" ||
          operaciones.innerText.slice(-1) == "-" ||
          operaciones.innerText.slice(-1) == "*" ||
          operaciones.innerText.slice(-1) == "/")
      ) {
        operaciones.innerText = operaciones.innerText.slice(0, -1);
      }
      operaciones.innerText += ev.key;
    }

    // Elimina ultimo caracter de operaciones
    if (ev.key == "Backspace" || ev.key == "Delete") {
      operaciones.innerText = operaciones.innerText.slice(0, -1);
    }

    // Calcula el resultado
    if (ev.key == "Enter") {
      calculateResult();
    }
  },
  false
);
