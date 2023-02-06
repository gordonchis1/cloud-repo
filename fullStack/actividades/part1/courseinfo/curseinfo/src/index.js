import React from "react";
import ReactDOM from "react-dom";
import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

const App = () => {
  const course = "Half Stack application development";

  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  /*   const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14; */

  return (
    <div>
      {/* header */}
      <Header course={course} />
      {/*content*/}
      <Content logs={parts} />
      {/* total */}
      <Total sumar={parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
