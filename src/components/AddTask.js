import React from "react";
import "./AddTask.css";

export default function AddTask({ handleAddTask }) {
  const [taskTitle, setTaskTitle] = React.useState("");

  const submitForm = (e) => {
    e.preventDefault();
    handleAddTask(taskTitle);
    setTaskTitle("");
  };

  return (
    <form onSubmit={submitForm}>
      <div className="add-task">
        <strong>Add task: </strong>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </div>
    </form>
  );
}
