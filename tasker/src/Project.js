import React, { useState, useEffect } from "react";
import Task from "./Task";

function Project(props) {
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch(`/projects/${props.id}`)
      .then((response) => response.json())
      .then((data) => setProject(data));
  }, [props.id]);

  useEffect(() => {
    fetch(`/projects/${props.id}/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, [props.id]);

  const handleDeleteProject = () => {
    fetch(`/projects/${props.id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          props.onDelete(props.id);
        }
      });
  };

  const handleAddTask = () => {
    fetch(`/projects/${props.id}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: newTask }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data]);
        setNewTask("");
      });
  };

  const handleDeleteTask = (taskId) => {
    fetch(`/tasks/${taskId}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setTasks(tasks.filter((task) => task.id !== taskId));
        }
      });
  };

  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <button onClick={handleDeleteProject}>Delete Project</button>
      <h3>Tasks:</h3>
      <ul>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={handleDeleteTask} />
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
}

export default Project;
