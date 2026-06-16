// ---------------------------
// DATA
// ---------------------------
const sections = {
  or: [
    { title: "Pre‑Op", text: "Review imaging, consent, mark limb" },
    { title: "Cases", text: "Execute operative plan with precision" },
    { title: "Turnover", text: "Optimize efficiency between cases" },
    { title: "Post‑Op", text: "Dictations, orders, handoff" }
  ],

  clinic: [
    { title: "Patients", text: "New consults, follow‑ups, wound checks" },
    { title: "Imaging", text: "CTA, duplex, ABI review" },
    { title: "Procedures", text: "In‑clinic interventions" }
  ],

  admin: [
    { title: "Email", text: "Triage inbox, respond to priority items" },
    { title: "Billing", text: "Close encounters, coding review" },
    { title: "Scheduling", text: "OR block planning, clinic optimization" }
  ],

  writing: [
    { title: "Manuscript Work", text: "Draft, revise, or analyze data" },
    { title: "Reading", text: "Literature review for citations" }
  ],

  leadership: [
    { title: "Reading", text: "Leadership books + notes" },
    { title: "Reflection", text: "Daily leadership insights" },
    { title: "Courses", text: "Online modules or CME" }
  ]
};

// ---------------------------
// LOAD TODAY
// ---------------------------
function loadToday() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  document.getElementById("today").innerHTML = today;
}

// ---------------------------
// RENDER CARDS
// ---------------------------
function renderSection(sectionName) {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  const items = sections[sectionName];

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;
    container.appendChild(div);
  });
}

// ---------------------------
// NAVIGATION
// ---------------------------
document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.getAttribute("data-section");
    renderSection(section);
  });
});

// ---------------------------
// INIT
// ---------------------------
loadToday();
renderSection("or"); // default view
