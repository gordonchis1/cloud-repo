const Total = ({ sumar }) => (
  <p>
    Number of exercises{" "}
    {sumar[0].exercises + sumar[1].exercises + sumar[2].exercises}
  </p>
);
export default Total;
