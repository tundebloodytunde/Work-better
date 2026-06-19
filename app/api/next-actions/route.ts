import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    actions: [
      {
        id: 1,
        title: "Review patient charts",
        category: "clinical",
        priority: 1,
        estimated_minutes: 45
      },
      {
        id: 2,
        title: "Follow up on labs",
        category: "practice",
        priority: 2,
        estimated_minutes: 30
      }
    ],
    currentBlock: {
      label: "Morning Block",
      type: "clinical"
    }
  });
}
