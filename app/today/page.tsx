"use client";

import { useEffect, useState } from "react";

export default function TodayPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/day");
      const json = await res.json();
      setData(json);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-xl">
        Loading today’s schedule...
      </div>
    );
  }

  const { mode, blocks } = data;

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Today</h1>

      <div className="text-xl font-semibold">
        Mode: <span className="text-blue-600">{mode}</span>
      </div>

      <div className="space-y-4">
        {blocks.map((block: any, idx: number) => (
          <div
            key={idx}
            className="border rounded-lg p-4 shadow-sm bg-white"
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
            <div className="text-sm text-gray-500">
              Type: {block.type}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold">Next Best Actions</h2>
        <p className="text-gray-500">
          (We will wire this up after we build the tasks API.)
        </p>
      </div>
    </main>
  );
}
