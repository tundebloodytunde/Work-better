"use client";

import { useEffect, useState } from "react";

export default function TodayPage() {
  const [schedule, setSchedule] = useState<any>(null);
  const [actions, setActions] = useState<any[]>([]);
  const [currentBlock, setCurrentBlock] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load schedule + next actions
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
  }, []);

  if (loading) {
    return <div className="p-6 text-xl">Loading today’s schedule...</div>;
  }

  const { mode, blocks } = schedule;

  return (
    <main className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Today</h1>

      {/* Mode */}
      <div className="text-xl font-semibold">
        Mode: <span className="text-blue-600">{mode}</span>
      </div>

      {/* Time Blocks */}
      <div className="space-y-4">
        {blocks.map((block: any, idx: number) => (
          <div
            key={idx}
            className={`border rounded-lg p-4 shadow-sm bg-white ${
              currentBlock && block.label === currentBlock.label
                ? "border-blue-600 bg-blue-50"
                : ""
            }`}
          >
            <div className="text-lg font-semibold">{block.label}</div>
            <div className="text-gray-600">
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
            <div className="text-sm text-gray-500">Type: {block.type}</div>
          </div>
        ))}
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
            className="border p-4 rounded-lg bg-white shadow-sm"
          >
            <div className="text-lg font-semibold">{task.title}</div>
            <div className="text-sm text-gray-500">
              {task.category} • P{task.priority} • {task.estimated_minutes} min
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
