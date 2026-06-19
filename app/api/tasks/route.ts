import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET /api/tasks  → list tasks
export async function GET() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("priority", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/tasks  → create a task
export async function POST(req: Request) {
  const body = await req.json();

  const { title, category, priority, estimated_minutes, due_date } = body;

  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        title,
        category,
        priority,
        estimated_minutes,
        due_date,
        status: "todo",
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// PATCH /api/tasks  → update a task
export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, ...updates } = body;

  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("
