"use client";

import { useEffect, useState } from "react";
import { updateTaskStatus } from "@/lib/tasksClient";

function blockColor(type: string) {
  switch (type) {
    case "scholarly":
      return "border-blue-500 bg-blue-50";
    case "practice":
      return "border-green-500 bg-green-50";
    case "clinical":
    case "or":
      return "border-purple-500 bg-purple-50";
    case "admin":
      return "border-gray-500 bg-gray-50";
    case "buffer":
      return "border-yellow-400 bg-yellow-50";
    case "wrapup":
      return "border-slate-500 bg-slate-50";
    default:
      return "border-gray-200 bg-white";
  }
}

export default function TodayPage() {
  const [schedule, setSchedule] = useState<any>(null);
  const [actions, setActions] = useState<any[]>([]);
  const [currentBlock, setCurrentBlock] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    const dayRes = await fetch("/api/day");
    const dayJson = await dayRes.json();

    const actionsRes = await fetch("/api/next-actions");
    const actionsJson = await actionsRes.json();

    setSchedule(dayJson);
    setActions(actionsJson.actions);
    setCurrentBlock(actionsJson.currentBlock);
    setLoading(false);
  }

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  async function handleComplete(taskId: number) {
    await updateTaskStatus(taskId, "done");
    await loadData();
  }

  if (loading) {
    return <div className="p-6 text-xl">Loading today’s schedule...</div>;
  }

  const { mode, blocks } = schedule;

  return (
    <main className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Today</h1>

      <div className="text-xl font-semibold">
        Mode: <span className="text-blue-600">{mode}</span>
      </div>

      {/* Time Blocks */}
      <div className="space-y-4">
        {blocks.map((block: any, idx: number) => {
          const isCurrent =
            currentBlock && block.label === currentBlock.label;

          return (
            <div
              key={idx}
              className={`border rounded-lg p-4 shadow-sm ${
                blockColor(block.type)
              } ${isCurrent ? "ring-2 ring-blue-600" : ""}`}
            >
              <div className="text-lg font-semibold">{block.label}</div>
              <div className="text-gray-700">
                {new Date(block.start).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
                {" — "}
                {new Date(block.end).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </div>
              <div className="text-sm text-gray-600">Type: {block.type}</div>
            </div>
          );
        })}
      </div>

      {/* Next Best Actions */}
      <div className="mt-10 space-y-4">
        <h2 className="text-2xl font-bold">Next Best Actions</h2>

        {currentBlock ? (
          <div className="text-gray-600">
            Current block:{" "}
            <span className="font-semibold text-blue-600">
              {currentBlock.label}
            </span>
          </div>
        ) : (
          <div className="text-gray-500">No active block right now</div>
        )}

        {actions.length === 0 && (
          <div className="text-gray-500">No recommended tasks right now.</div>
        )}

        {actions.map((task) => (
          <div
            key={task.id}
            className="border p-4 rounded-lg bg-white shadow-sm flex justify-between items-center"
          >
            <div>
              <div className="text-lg font-semibold">{task.title}</div>
              <div className="text-sm text-gray-500">
                {task.category} • P{task.priority} •{" "}
                {task.estimated_minutes} min
              </div>
            </div>
            <button
              onClick={() => handleComplete(task.id)}
              className="px-3 py-1 rounded bg-green-600 text-white"
            >
              Done
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
