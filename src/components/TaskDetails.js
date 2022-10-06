import React, { useState, useEffect } from "react";

import "./TaskDetails.css";

export default function TaskDetails({ task }) {
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    if (task !== null && task !== undefined) {
      setEditTask({
        ...task,
      });
    } else {
      setEditTask(null);
    }
  }, [task]);

  if (editTask !== null && editTask !== undefined) {
    return (
      <div className="task-details">
        <h2>Task Details</h2>
        <label>
          <span>Title:</span>
          <input
            className="task-title"
            type="text"
            value={editTask.title}
            onChange={(e) =>
              setEditTask({ ...editTask, title: e.target.value })
            }
          />
        </label>
        <label>
          <span>Module:</span>
          <input
            className="task-module"
            type="text"
            value={editTask.module}
            onChange={(e) =>
              setEditTask({ ...editTask, module: e.target.value })
            }
          />
        </label>
        <label>
          <textarea
            className="task-notes"
            value={editTask.notes}
            onChange={(e) =>
              setEditTask({ ...editTask, notes: e.target.value })
            }
          ></textarea>
        </label>
        <button type="button" className="btn save-button">
          save
        </button>
        <button type="button" className="btn cancel-button">
          cancel
        </button>
        <button type="button" className="btn delete-button">
          delete
        </button>
      </div>
    );
  } else {
    return (
      <div className="task-details">
        <p>
          <i className="fa-solid fa-arrow-left"></i> Click on a task to view
          details
        </p>
      </div>
    );
  }
}
