import { NextResponse } from "next/server";

// Helper to create Date objects for today
function d(hour: number, minute: number = 0) {
  const now = new Date();
  now.setHours(hour, minute, 0, 0);
  return now.toISOString();
}

export async function GET() {
  const schedule = [
    { label: "Deep Scholarly", start: d(7), end: d(8) },
    { label: "Clinic Block 1", start: d(8, 30), end: d(9, 30) },
    { label: "Lunch", start: d(12), end: d(13) },
  ];

  return NextResponse.json(schedule);
}
