import React from "react";
import ReactDom from "react-dom";
import { useState } from "react";

const root = document.getElementById("root");

const Statistic = ({ text, value, p }) => (
  <tr>
    <td>{text}</td>
    <td>
      {value} {p}
    </td>
  </tr>
);

const Statistics = ({ good, neutral, bad, total }) => {
  return (
    <table>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={total} />
      <Statistic text="average" value={good / total} />
      <Statistic text="positive" value={(good / total) * 100} p="%" />
    </table>
  );
};

const Button = ({ Funcion, text }) => <button onClick={Funcion}>{text}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      {/* good */}
      <Button
        Funcion={() => {
          setTotal(total + 1);
          setGood(good + 1);
        }}
        text="good"
      />
      {/* neutral */}
      <Button
        Funcion={() => {
          setTotal(total + 1);
          setNeutral(neutral + 1);
        }}
        text="neutral"
      />
      {/* bad */}
      <Button
        Funcion={() => {
          setTotal(total + 1);
          setBad(bad + 1);
        }}
        text="bad"
      />
      <h1>statistics</h1>
      {total > 0 ? (
        <Statistics good={good} bad={bad} neutral={neutral} total={total} />
      ) : (
        <h2>No feedback given</h2>
      )}
    </div>
  );
};

ReactDom.render(<App />, root);
