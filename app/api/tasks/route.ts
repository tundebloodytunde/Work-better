import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status" }, 
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('tasks')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      task: data 
    });
  } catch (error: any) {
    console.error("Task update error:", error);
    return NextResponse.json({ 
      error: error.message || "Failed to update task" 
    }, { status: 500 });
  }
}
