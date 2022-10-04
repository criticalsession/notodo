import React from "react";
import humanize from "humanize";
import _ from "lodash";

import "./TaskList.css";

export default function TaskList({ tasks, handleToggleComplete }) {
  const getTaskDisplay = (tasks) => {
    return tasks.map((task) => (
      <li
        key={task.id}
        onClick={() => handleToggleComplete(task.id)}
        className={`task-item ${
          task.completeDate === null ? "" : "is-complete"
        }`}
      >
        {task.completeDate !== null && (
          <i className="fa-regular fa-square-check"></i>
        )}
        {task.completeDate === null && <i className="fa-regular fa-square"></i>}{" "}
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

  console.log(completedTasks);

  return (
    <div className="task-list">
      <p>Pending</p>
      {pendingTasks.length > 0 && <ul>{getTaskDisplay(pendingTasks)}</ul>}
      {pendingTasks.length === 0 && (
        <p>
          No pending tasks on <em>this</em> task list. Noice.{" "}
          <i className="fa-solid fa-thumbs-up"></i>
        </p>
      )}

      <p>Complete</p>
      <ul>{getTaskDisplay(completedTasks)}</ul>
    </div>
  );
}
