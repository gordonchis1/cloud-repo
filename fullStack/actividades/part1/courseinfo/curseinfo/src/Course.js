export const Header = ({ course }) => <h1>{course.name}</h1>;

const Part = ({ course, exercises }) => {
  return (
    <p>
      {course}
      {` `}
      {exercises}
    </p>
  );
};

const Content = ({ course }) => {
  //console.log(course);
  return (
    <div>
      {course.map((e) => (
        <Part course={e.name} exercises={e.exercises} key={e.id} />
      ))}
    </div>
  );
};

const Total = ({ course }) => {
  //console.log(arr);
  return (
    <strong>
      <p>
        Total of {course.reduce((a, b) => a + b.exercises, 0)}
        {" exercises"}
      </p>
    </strong>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course.parts} />
      <Total course={course.parts} />
    </div>
  );
};
export default Course;
