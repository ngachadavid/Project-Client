import React, { useState } from "react";
import Project from "./Project";

function App() {
  const [projectId, setProjectId] = useState(null);
  const [projects, setProjects] = useState([]);

  const handleCreateProject = () => {
    fetch("http://localhost:9292/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "New Project" }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProjects([...projects, data]);
      });
  };

  const handleDeleteProject = (projectId) => {
    fetch(`/projects/${projectId}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setProjects(projects.filter((project) => project.id !== projectId));
          setProjectId(null);
        }
      });
  };

  return (
    <div>
      <h1>My Projects</h1>
      <button onClick={handleCreateProject}>Create Project</button>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <button onClick={() => setProjectId(project.id)}>
              {project.name}
            </button>
            {projectId === project.id && (
              <Project
                id={projectId}
                onDelete={handleDeleteProject}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
