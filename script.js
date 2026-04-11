// ─── DATA ───
let events = [];
let currentTab = "all";

const iconMap = {
  Concert:  { emoji: "🎵", cls: "concert" },
  Festival: { emoji: "🎉", cls: "festival" },
  Workshop: { emoji: "📚", cls: "workshop" },
  Sports:   { emoji: "⚽", cls: "sports" },
  Seminar:  { emoji: "🎤", cls: "seminar" },
  Other:    { emoji: "📌", cls: "default" },
};

// ─── RENDER EVENTS ───
function renderEvents() {
  const list = document.getElementById("eventList");
  const search = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;

  const filtered = events.filter(e => {
    const matchTab =
      currentTab === "all"       ? e.status === "upcoming"  :
      currentTab === "ongoing"   ? e.status === "ongoing"   :
                                   e.status === "completed";
    const matchSearch = e.name.toLowerCase().includes(search) || e.type.toLowerCase().includes(search);
    const matchCat = category ? e.type === category : true;
    return matchTab && matchSearch && matchCat;
  });

  list.innerHTML = "";

  if (!filtered.length) {
    list.innerHTML = `<div class="no-events">🎈 No events found.</div>`;
    return;
  }

  filtered.forEach((ev, i) => {
    const icon = iconMap[ev.type] || iconMap.Other;
    const badgeCls =
      ev.status === "upcoming"  ? "badge-upcoming"  :
      ev.status === "ongoing"   ? "badge-ongoing"   : "badge-completed";
    const badgeLabel = ev.status.charAt(0).toUpperCase() + ev.status.slice(1);

    const card = document.createElement("div");
    card.className = "event-card";
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <div class="event-icon ${icon.cls}">${icon.emoji}</div>
      <div class="event-info">
        <div class="event-name">${ev.name}</div>
        <div class="event-type">${ev.type}</div>
        <div class="event-datetime">📅 ${ev.date} · ⏰ ${ev.time}</div>
      </div>
      <div class="event-meta">
        <span class="badge ${badgeCls}">${badgeLabel}</span>
        ${ev.status === "upcoming"
          ? `<button class="btn-register" onclick="showToast('Registered for ${ev.name}!')">Register</button>`
          : ""}
      </div>
    `;
    list.appendChild(card);
  });
}

// ─── TABS ───
function switchTab(btn) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const map = { "Upcoming": "all", "Ongoing": "ongoing", "Completed": "completed" };
  currentTab = map[btn.textContent.trim()] || "all";
  renderEvents();
}

// ─── MODAL ───
function openModal() {
  document.getElementById("modalOverlay").classList.add("open");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  clearForm();
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById("modalOverlay")) closeModal();
}

function clearForm() {
  ["eventName", "eventDate", "eventTime"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("eventType").selectedIndex = 0;
  document.getElementById("eventStatus").selectedIndex = 0;
}

// ─── ADD EVENT ───
function addEvent() {
  const name   = document.getElementById("eventName").value.trim();
  const type   = document.getElementById("eventType").value;
  const date   = document.getElementById("eventDate").value;
  const time   = document.getElementById("eventTime").value;
  const status = document.getElementById("eventStatus").value;

  if (!name || !type || !date || !time) {
    showToast("⚠️ Please fill all fields!");
    return;
  }

  events.push({ id: Date.now(), name, type, date, time, status });
  closeModal();
  renderEvents();
  showToast("🎉 Event added successfully!");
}

// ─── TOAST ───
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2800);
}

// Init
renderEvents();