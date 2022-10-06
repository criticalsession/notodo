import React from "react";
import "./AddTask.css";

export default function AddTask({ handleAddTask }) {
  const [taskTitle, setTaskTitle] = React.useState("");

  const submitForm = (e) => {
    e.preventDefault();
    let title = taskTitle.trim();
    let titles = [];

    if (title !== "") {
      let module = "";
      if (title.includes("::")) {
        let split = title.indexOf("::");

        module = title.substring(0, split).trim();
        title = title.substring(split + 2).trim();
      }

      if (title.includes(";")) {
        titles = [...title.split(";")];
      } else titles = [title];

      titles.forEach((t) => {
        t = t.trim();
        if (t !== "") {
          t = t[0].toUpperCase() + t.substring(1);

          handleAddTask(t, module);
        }
      });

      setTaskTitle("");
    }
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
