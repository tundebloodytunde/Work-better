export async function updateTaskStatus(id: number, status: string) {
  await fetch("/api/tasks", {
    method: "PATCH",
    body: JSON.stringify({ id, status }),
  });
}
