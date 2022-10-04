import { useState } from "react";
import _ from "lodash";

import TaskList from "./components/TaskList";

import "./App.css";

function App() {
  const [moduleFilter, setModuleFilter] = useState(null);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "My first task item!",
      completeDate: null,
      module: null,
      notes:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      createDate: new Date(),
    },
    {
      id: 2,
      title: "My second task item!",
      completeDate: null,
      module: "My project",
      notes:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      createDate: new Date(),
    },
    {
      id: 3,
      title: "And my third!",
      completeDate: null,
      module: "My project",
      notes: "",
      createDate: new Date(),
    },
    {
      id: 4,
      title: "Another task item...",
      completeDate: null,
      module: "Another project",
      notes:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      createDate: new Date(),
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

  const openNote = (id) => {
    console.log("open note", id);
  };

  const filterByModule = (task) => {
    setModuleFilter(task === null ? null : task.module);
  };

  const getFilteredTasks = () => {
    return _.sortBy(tasks, (t) => t.createDate).filter((t) => {
      if (moduleFilter === null) return t;
      else return t.module === moduleFilter;
    });
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
        <TaskList
          tasks={getFilteredTasks()}
          handleToggleComplete={toggleComplete}
          handleOpenNote={openNote}
          handleFilterByModule={filterByModule}
          moduleFilter={moduleFilter}
        />
      )}
    </div>
  );
}

export default App;
