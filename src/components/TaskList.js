import React from "react";
import humanize from "humanize";
import _ from "lodash";

import "./TaskList.css";

export default function TaskList({
  tasks,
  handleToggleComplete,
  handleOpenNote,
}) {
  const getTaskDisplay = (tasks) => {
    return tasks.map((task) => (
      <li
        key={task.id}
        className={`task-item ${
          task.completeDate === null ? "" : "is-complete"
        }`}
        onClick={() => handleOpenNote(task.id)}
      >
        <i
          className={`fa-regular ${
            task.completeDate === null ? "fa-square" : "fa-square-check"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handleToggleComplete(task.id);
          }}
        ></i>{" "}
        {task.title}{" "}
        {task.completeDate !== null && (
          <em>({humanize.date("y-M-d G:i", task.completeDate)})</em>
        )}
      </li>
    ));
  };

  const pendingTasks = tasks.filter((t) => t.completeDate === null);
  const completedTasks = _.orderBy(
    tasks.filter((t) => t.completeDate !== null),
    "completeDate",
    "desc"
  );

  return (
    <div className="task-list">
      <h2>Pending</h2>
      {pendingTasks.length > 0 && <ul>{getTaskDisplay(pendingTasks)}</ul>}
      {pendingTasks.length === 0 && (
        <p>
          No pending tasks on <em>this</em> task list. Noice.{" "}
          <i className="fa-solid fa-thumbs-up"></i>
        </p>
      )}

      <h2>Complete</h2>
      <ul>{getTaskDisplay(completedTasks)}</ul>
    </div>
  );
}
