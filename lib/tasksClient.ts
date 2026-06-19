export async function updateTaskStatus(id: number, status: string) {
  await fetch("/api/tasks", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, status }),
  });
}
