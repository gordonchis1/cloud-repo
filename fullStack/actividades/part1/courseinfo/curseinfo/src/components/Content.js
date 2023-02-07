import Part from "./Part";

const Content = ({ course }) => {
  return (
    <div>
      <Part course={course.parts[0]} />
      <Part course={course.parts[1]} />
      <Part course={course.parts[2]} />
    </div>
  );
};

export default Content;
