import { useState } from "react";
import _ from "lodash";
import { titleCase } from "title-case";

import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

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
      isOpen: false,
    },
    {
      id: 2,
      title: "My second task item!",
      completeDate: null,
      module: titleCase("My module"),
      notes:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      createDate: new Date(),
      isOpen: false,
    },
    {
      id: 3,
      title: "And my third!",
      completeDate: null,
      module: titleCase("My module"),
      notes: "",
      createDate: new Date(),
      isOpen: false,
    },
    {
      id: 4,
      title: "Another task item...",
      completeDate: null,
      module: titleCase("this is another module"),
      notes:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      createDate: new Date(),
      isOpen: false,
    },
  ]);

  const toggleComplete = (id) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completeDate: task.completeDate === null ? new Date() : null,
            isOpen: false,
          };
        } else {
          return { ...task };
        }
      })
    );
  };

  const openNote = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === id) return { ...t, isOpen: !t.isOpen };
        else return { ...t, isOpen: false };
      })
    );
  };

  const getOpenedTask = () => {
    return tasks.find((t) => t.isOpen);
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

  const clearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.completeDate === null));
  };

  const addTask = (taskTitle, taskModule) => {
    const newTask = {
      id: Math.floor(Math.random() * 1000),
      title: taskTitle,
      createDate: new Date(),
      module: titleCase(taskModule),
      notes: "",
      completeDate: null,
      isOpen: true,
    };

    setTasks((prevTasks) => [
      ...prevTasks.map((task) => {
        return { ...task, isOpen: false };
      }),
      newTask,
    ]);
  };

  return (
    <div className="App">
      <h1>
        <strong>no</strong>todo <i className="fa-solid fa-badge-check"></i>
      </h1>
      <AddTask handleAddTask={addTask} />
      {tasks.length === 0 && (
        <p>
          Enter a task title and press "Enter" to get started!{" "}
          <i className="fa-solid fa-arrow-up"></i>
        </p>
      )}
      {tasks.length > 0 && (
        <TaskList
          tasks={getFilteredTasks()}
          moduleFilter={moduleFilter}
          handleToggleComplete={toggleComplete}
          handleOpenNote={openNote}
          handleFilterByModule={filterByModule}
          handleClearCompleted={clearCompleted}
        />
      )}
    </div>
  );
}

export default App;
