import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// Map task categories → block types
function mapCategoryToBlockType(category: string) {
  switch (category) {
    case "scholarly":
      return ["scholarly"];
    case "practice":
      return ["practice"];
    case "clinical":
      return ["clinical", "or"];
    case "admin":
      return ["admin", "buffer", "wrapup"];
    default:
      return ["admin"];
  }
}

// Determine current block
function getCurrentBlock(blocks: any[], now: Date) {
  return blocks.find(
    (b) =>
      now >= new Date(b.start) &&
      now < new Date(b.end)
  );
}

export async function GET() {
  const now = new Date();

  // 1. Get today's schedule
  const scheduleRes = await fetch("http://localhost:3000/api/day");
  const schedule = await scheduleRes.json();
  const blocks = schedule.blocks;

  // 2. Determine current block
  const currentBlock = getCurrentBlock(blocks, now);

  if (!currentBlock) {
    return NextResponse.json({
      currentBlock: null,
      actions: [],
      message: "No active block right now",
    });
  }

  // 3. Load tasks
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("status", "todo");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 4. Filter tasks by block type
  const allowedTypes = mapCategoryToBlockType(currentBlock.type);

  const matchingTasks = tasks.filter((t) =>
    allowedTypes.includes(t.category)
  );

  // 5. Filter tasks by remaining time
  const remainingMinutes =
    (new Date(currentBlock.end).getTime() - now.getTime()) / 60000;

  const timeFiltered = matchingTasks.filter(
    (t) => t.estimated_minutes <= remainingMinutes
  );

  // 6. Sort by priority → due date
  const sorted = timeFiltered.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    if (a.due_date && b.due_date) {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    }
    return 0;
  });

  // 7. Return top 3
  return NextResponse.json({
    currentBlock,
    actions: sorted.slice(0, 3),
  });
}
