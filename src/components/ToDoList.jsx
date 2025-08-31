import React from "react";
import ToDoItem from "./ToDoItem.jsx";

export default function ToDoList({ tasks, onToggleComplete, onDelete, onUpdate }) {
  return (
    <ul className="list">
      {tasks.map((task) => (
        <ToDoItem
          key={task.id}          // unique key ✅
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
