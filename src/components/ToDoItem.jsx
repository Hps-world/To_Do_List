import React, { useState } from "react";

export default function ToDoItem({ task, onToggleComplete, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  const startEdit = () => {
    setDraft(task.text);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(task.text);
    setIsEditing(false);
  };

  const saveEdit = () => {
    const next = draft.trim();
    if (!next) return; // do not save empty
    onUpdate(task.id, next);
    setIsEditing(false);
  };

  return (
    <li className={`item ${task.completed ? "completed" : ""}`}>
      <label className="left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          aria-label={`Mark "${task.text}" ${task.completed ? "incomplete" : "complete"}`}
        />
      </label>

      <div className="content">
        {isEditing ? (
          <input
            className="edit-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") cancelEdit();
            }}
            autoFocus
          />
        ) : (
          <span>{task.text}</span>
        )}
      </div>

      <div className="actions">
        {isEditing ? (
          <>
            <button className="btn small" onClick={saveEdit} title="Save">Save</button>
            <button className="btn small" onClick={cancelEdit} title="Cancel">Cancel</button>
          </>
        ) : (
          <>
            <button className="btn small" onClick={startEdit} title="Edit">Edit</button>
            <button className="btn small danger" onClick={() => onDelete(task.id)} title="Delete">
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
