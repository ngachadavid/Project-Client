import React from "react";

function Task(props) {
  const handleDeleteTask = () => {
    props.onDelete(props.task.id);
  };

  return (
    <li>
      <input type="checkbox" checked={props.task.completed} />
      {props.task.description}
      <button onClick={handleDeleteTask}>Delete Task</button>
    </li>
  );
}

export default Task;
