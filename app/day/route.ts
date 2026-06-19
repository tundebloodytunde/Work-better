import { NextResponse } from 'next/server';

export async function GET() {
  // Mock daily schedule (replace with real logic / Supabase query later)
  const schedule = {
    mode: "Deep Work",
    blocks: [
      {
        label: "Morning Block",
        start: "2026-06-19T08:00:00",
        end: "2026-06-19T10:00:00",
        type: "clinical"
      },
      {
        label: "OR Time",
        start: "2026-06-19T10:30:00",
        end: "2026-06-19T12:30:00",
        type: "or"
      },
      {
        label: "Admin / Buffer",
        start: "2026-06-19T13:00:00",
        end: "2026-06-19T14:00:00",
        type: "admin"
      },
    ]
  };

  return NextResponse.json(schedule);
}
