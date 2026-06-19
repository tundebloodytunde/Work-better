import { NextResponse } from "next/server";

// Helper: get week of month (1–5)
function getWeekOfMonth(date: Date) {
  return Math.ceil(date.getDate() / 7);
}

// Determine the mode for a given date
function getMode(date: Date) {
  const dow = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const wom = getWeekOfMonth(date);

  // ---- OR RULES ----
  if (dow === 1 && [1, 2, 4].includes(wom)) return "Endovascular OR"; // 1st, 2nd, 4th Monday
  if (dow === 2 && wom === 2) return "Endovascular OR"; // 2nd Tuesday
  if (dow === 4 && [1, 3, 5].includes(wom)) return "Open OR"; // 1st, 3rd, 5th Thursday

  // ---- CLINIC RULES ----
  if (dow === 3) return "Clinic"; // Every Wednesday
  if (dow === 5 && wom % 2 === 1) return "Clinic"; // Alternating Fridays (1st, 3rd, 5th)

  // ---- DEFAULT ----
  return "Admin";
}

// Generate time blocks for each mode
function generateBlocks(mode: string, date: Date) {
  const d = (h: number, m: number = 0) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m);

  if (mode === "Endovascular OR" || mode === "Open OR") {
    return [
      { label: "OR Block 1", start: d(7), end: d(11), type: "or" },
      { label: "Micro-Scholarly", start: d(11), end: d(11, 20), type: "scholarly" },
      { label: "Buffer", start: d(11, 20), end: d(11, 30), type: "buffer" },
      { label: "OR Block 2", start: d(11, 30), end: d(15), type: "or" },
      { label: "Practice-Building", start: d(15), end: d(16), type: "practice" },
      { label: "Wrap-Up", start: d(16), end: d(17), type: "wrapup" },
    ];
  }

  if (mode === "Clinic") {
    return [
      { label: "Deep Scholarly", start: d(7), end: d(8, 30), type: "scholarly" },
      { label: "Clinic Block 1", start: d(8, 30), end: d(12), type: "clinical" },
      { label: "Lunch", start: d(12), end: d(13),
