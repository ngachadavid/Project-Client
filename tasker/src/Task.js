import React, { useState } from "react";

function Task(props) {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(props.task.description);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
    props.onEdit(props.task.id, description);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setDescription(props.task.description);
  };

  const handleDeleteClick = () => {
    props.onDelete(props.task.id);
  };

  return (
    <li>
      {editing ? (
        <>
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          <input type="checkbox" checked={props.task.completed} />
          {props.task.description}
          <button onClick={handleDeleteClick}>Delete Task</button>
          <button onClick={handleEditClick}>Edit Task</button>
        </>
      )}
    </li>
  );
}

export default Task;


