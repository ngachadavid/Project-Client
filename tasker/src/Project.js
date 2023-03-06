import React, { useState, useEffect } from "react";
import Task from "./Task";

function Project(props) {
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingProject, setEditingProject] = useState(false);
  const [editingProjectName, setEditingProjectName] = useState("");
  const [editingProjectDescription, setEditingProjectDescription] = useState("");

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

  const handleEditProject = () => {
    setEditingProject(true);
    setEditingProjectName(project.name);
    setEditingProjectDescription(project.description);
  };

  const handleSaveProject = () => {
    fetch(`/projects/${props.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editingProjectName,
        description: editingProjectDescription
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setProject(data);
        setEditingProject(false);
      });
  };

  const handleCancelEditProject = () => {
    setEditingProject(false);
  };

  const handleEditTask = (taskId, description) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, description };
      } else {
        return task;
      }
    });

    setTasks(updatedTasks);

    fetch(`/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description })
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
      {editingProject ? (
        <div>
          <input
            type="text"
            value={editingProjectName}
            onChange={(event) => setEditingProjectName(event.target.value)}
          />
          <textarea
            value={editingProjectDescription}
            onChange={(event) => setEditingProjectDescription(event.target.value)}
          />
          <button onClick={handleSaveProject}>Save</button>
          <button onClick={handleCancelEditProject}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <button onClick={handleDeleteProject}>Delete Project</button>
          <button onClick={handleEditProject}>Edit Project</button>
        </div>
      )}
      <h3>Tasks:</h3>
      <ul>
        {tasks.map((task) => (
          <Task
          key={task.id}
          id={task.id}
          description={task.description}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          />
          ))}
          </ul>
          <div>
          <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          />
          <button
          onClick={() => {
          fetch(`/projects/${props.id}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: newTask })
          })
          .then((response) => response.json())
          .then((data) => {
          setTasks([...tasks, data]);
          setNewTask("");
          });
          }}
          >
          Add Task
          </button>
          </div>
          </div>
          );
          }

          export default Project;

