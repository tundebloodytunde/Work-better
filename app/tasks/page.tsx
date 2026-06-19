"use client";

import { useEffect, useState } from "react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("scholarly");
  const [priority, setPriority] = useState(2);
  const [estimatedMinutes, setEstimatedMinutes] = useState(15);

  // Load tasks
  async function loadTasks() {
    const res = await fetch("/api/tasks");
    const json = await res.json();
    setTasks(json);
    setLoading(false);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  // Create task
  async function createTask(e: any) {
    e.preventDefault();

    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        title,
        category,
        priority,
        estimated_minutes: estimatedMinutes,
      }),
    });

    setTitle("");
    loadTasks();
  }

  // Mark complete
  async function toggleComplete(task: any) {
    await fetch("/api/tasks", {
      method: "PATCH",
      body: JSON.stringify({
        id: task.id,
        status: task.status === "done" ? "todo" : "done",
      }),
    });

    loadTasks();
  }

  // Delete task
  async function deleteTask(id: number) {
    await fetch(`/api/tasks?id=${id}`, {
      method: "DELETE",
    });

    loadTasks();
  }

  if (loading) {
    return <div className="p-6 text-xl">Loading tasks...</div>;
  }

  return (
    <main className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Tasks</h1>

      {/* Add Task Form */}
      <form
        onSubmit={createTask}
        className="space-y-4 border p-4 rounded-lg bg-white shadow-sm"
      >
        <h2 className="text-xl font-semibold">Add Task</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="flex gap-4">
          <select
            className="border p-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="scholarly">Scholarly</option>
            <option value="practice">Practice</option>
            <option value="clinical">Clinical</option>
            <option value="admin">Admin</option>
          </select>

          <select
            className="border p-2 rounded"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
          >
            <option value={1}>Priority 1</option>
            <option value={2}>Priority 2</option>
            <option value={3}>Priority 3</option>
          </select>

          <input
            type="number"
            className="border p-2 rounded w-32"
            value={estimatedMinutes}
            onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
            placeholder="Minutes"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map
