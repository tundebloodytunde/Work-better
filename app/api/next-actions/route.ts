export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  // Load tasks
  const { data: tasks, error } = await supabase.from("tasks").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Simple next-action logic
  const next = tasks
    .filter((t) => t.status !== "done")
    .sort((a, b) => a.priority - b.priority)[0];

  return NextResponse.json(next || null);
}
