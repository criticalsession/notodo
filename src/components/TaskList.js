import React from "react";
import humanize from "humanize";
import _ from "lodash";

import "./TaskList.css";

export default function TaskList({
  tasks,
  handleToggleComplete,
  handleOpenNote,
  handleFilterByModule,
  moduleFilter,
  handleClearCompleted,
}) {
  const toggleComplete = (event, taskId) => {
    event.stopPropagation();
    handleToggleComplete(taskId);
  };

  const filterByModule = (event, task) => {
    event.stopPropagation();
    handleFilterByModule(task);
  };

  const getCompletedDate = (task) => {
    return (
      <>
        {task.completeDate !== null && (
          <em>({humanize.date("y-M-d G:i", task.completeDate)})</em>
        )}
      </>
    );
  };

  const getCheckMark = (task) => {
    return (
      <>
        <i
          className={`fa-regular ${
            task.completeDate === null ? "fa-square" : "fa-square-check"
          }`}
          onClick={(e) => toggleComplete(e, task.id)}
        ></i>{" "}
      </>
    );
  };

  const getTaskDisplay = (tasks) => {
    return tasks.map((task) => (
      <li
        key={task.id}
        className={`task-item ${
          task.completeDate === null ? "" : "is-complete"
        }`}
        onClick={() => handleOpenNote(task.id)}
      >
        {getCheckMark(task)}
        {task.module !== null && (
          <>
            <span
              className="task-module"
              onClick={(e) => filterByModule(e, task)}
            >
              {task.module}
            </span>{" "}
          </>
        )}
        {task.module === null && " "}
        <span className={`task-title ${task.isOpen ? "task-open" : ""}`}>
          {task.title}{" "}
        </span>
        {getCompletedDate(task)}
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
      <h2>
        Pending{" "}
        {moduleFilter !== null && (
          <span
            className="clear-filter"
            onClick={() => handleFilterByModule(null)}
          >
            <i className="fa-solid fa-xmark"></i> Clear project filter
          </span>
        )}
      </h2>
      {pendingTasks.length > 0 && <ul>{getTaskDisplay(pendingTasks)}</ul>}
      {pendingTasks.length === 0 && (
        <p>
          No pending tasks on <em>this</em> task list. Noice.{" "}
          <i className="fa-solid fa-thumbs-up"></i>
        </p>
      )}

      <h2>
        Completed{" "}
        {completedTasks.length > 0 && (
          <span className="clear-filter" onClick={handleClearCompleted}>
            <i className="fa-solid fa-trash"></i> Clear completed
          </span>
        )}
      </h2>
      <ul>{getTaskDisplay(completedTasks)}</ul>
    </div>
  );
}
