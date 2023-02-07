import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

const root = document.getElementById("root");

const App = () => {
  const [contadorValue, updateContador] = useState(0);

  const handleClick = ({ target }) => {
    let filtro = contadorValue > 0;

    if (target.id === "decrementar") {
      filtro
        ? updateContador(contadorValue - 1)
        : updateContador(contadorValue);
    } else {
      updateContador(contadorValue + 1);
    }
  };

  const reset = () => {
    updateContador(0);
  };
  const filtro = contadorValue % 2 === 0;

  return (
    <div>
      <button onClick={handleClick}>incrementar</button>
      <button onClick={reset}>resetiar</button>
      <button onClick={handleClick} id="decrementar">
        decrementar
      </button>
      <p>{filtro ? "es par" : "es impar"}</p>
      <h1>{contadorValue}</h1>
    </div>
  );
};

ReactDOM.render(<App />, root);
