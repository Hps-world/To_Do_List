import React, { useState } from "react";
import Header from "./components/Header.jsx";
import ToDoList from "./components/ToDoList.jsx";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newText, setNewText] = useState("");

  // Utility to make unique ids
  const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    const text = newText.trim();
    if (!text) return;
    const task = { id: makeId(), text, completed: false };
    setTasks((prev) => [task, ...prev]);
    setNewText("");
  };

  // Toggle complete
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Delete
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Edit/update
  const updateTask = (id, newTaskText) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newTaskText } : t))
    );
  };

  return (
    <div className="app">
      <Header />

      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a new task…"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          aria-label="New task"
        />
        <button type="submit" className="btn primary">Add</button>
      </form>

      <ToDoList
        tasks={tasks}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
        onUpdate={updateTask}
      />

      {tasks.length === 0 && (
        <p className="empty">No tasks yet. Add your first one! 🎯</p>
      )}
    </div>
  );
}
