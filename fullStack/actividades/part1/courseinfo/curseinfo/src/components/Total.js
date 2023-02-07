const Total = ({ course }) => (
  <p>
    Number of exercises{" "}
    {course[0].exercises + course[1].exercises + course[2].exercises}
  </p>
);

export default Total;
