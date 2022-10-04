import { useState } from "react";

import TaskList from "./components/TaskList";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "My first task item!",
      completeDate: null,
      module: null,
    },
    {
      id: 2,
      title: "My second task item!",
      completeDate: null,
      module: "My project",
    },
    {
      id: 3,
      title: "And my third!",
      completeDate: null,
      module: "My project",
    },
    {
      id: 4,
      title: "Another task item...",
      completeDate: null,
      module: "Another project",
    },
  ]);

  const toggleComplete = (id) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completeDate: task.completeDate === null ? new Date() : null,
          };
        } else {
          return { ...task };
        }
      })
    );
  };

  return (
    <div className="App">
      <h1>
        <strong>no</strong>todo <i className="fa-solid fa-badge-check"></i>
      </h1>
      {tasks.length === 0 && (
        <p>
          No tasks on <em>this</em> task list. Nice. 🙌
        </p>
      )}
      {tasks.length > 0 && (
        <TaskList tasks={tasks} handleToggleComplete={toggleComplete} />
      )}
    </div>
  );
}

export default App;
