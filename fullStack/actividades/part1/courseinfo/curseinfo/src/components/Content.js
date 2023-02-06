import Part from "./Part";

const Content = ({ logs }) => {
  console.log(logs);
  return (
    <div>
      <Part names={logs[0].name} exercises={logs[0].exercises} />
      <Part names={logs[1].name} exercises={logs[1].exercises} />
      <Part names={logs[2].name} exercises={logs[2].exercises} />
    </div>
  );
};

export default Content;
