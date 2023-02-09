import ReactDOM from "react-dom";
import { useState } from "react";

const root = document.getElementById(`root`);

const EstadoDeClick = ({ clicksTotales }) => {
  return <h2>has echo {clicksTotales.length} de clicks totales</h2>;
};

const App = () => {
  const [counters, setCounters] = useState({
    left: 0,
    right: 0,
  });

  const [clicks, setClicks] = useState([]);

  const sumaLeft = () => {
    setCounters({
      ...counters,
      left: counters.left + 1,
      totalClicks: counters.totalClicks + 1,
    });
    setClicks((prevClicks) => {
      return [...prevClicks, `L`];
    });
  };

  const sumaRight = () => {
    setCounters({
      ...counters,
      right: counters.right + 1,
      totalClicks: counters.totalClicks + 1,
    });
    setClicks((prevClicks) => {
      return [...prevClicks, `R`];
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {counters.left}
      <button onClick={sumaLeft}>left</button>
      <h1>{clicks.length}</h1>
      <button onClick={sumaRight}>right</button>
      {counters.right}
      {clicks.length === 0 ? (
        clicks.join(`. `)
      ) : (
        <EstadoDeClick clicksTotales={clicks} />
      )}
    </div>
  );
};

ReactDOM.render(<App />, root);
