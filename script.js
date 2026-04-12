let events = [];
let currentTab = "upcoming";

const iconMap = {
  Concert:  { emoji: "🎵", cls: "concert" },
  Festival: { emoji: "🎉", cls: "festival" },
  Workshop: { emoji: "📚", cls: "workshop" },
  Sports:   { emoji: "⚽", cls: "sports" },
  Seminar:  { emoji: "🎤", cls: "seminar" },
  Other:    { emoji: "📌", cls: "default" },
};

// FETCH
async function fetchEvents() {

  try {
    const res = await fetch('api/get_events.php');
    events = await res.json();
    renderEvents();
  } catch (err) {
    console.error('Error fetching events:', err);
  }

  const res = await fetch('fetch_event.php');
  events = await res.json();
  renderEvents();
}

// RENDER
function renderEvents() {
  const list = document.getElementById("eventList");
  const search = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;

  const filtered = events.filter(e => {
    const matchTab = e.status === currentTab;
    const matchSearch =
      e.event_name.toLowerCase().includes(search) ||
      e.event_type.toLowerCase().includes(search);
    const matchCat = category ? e.event_type === category : true;

    return matchTab && matchSearch && matchCat;
  });

  list.innerHTML = "";

  if (!filtered.length) {
    list.innerHTML = `<div class="no-events">🎈 No events found.</div>`;
    return;
  }

  filtered.forEach(ev => {
    const icon = iconMap[ev.event_type] || iconMap.Other;

    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <div class="event-icon ${icon.cls}">${icon.emoji}</div>
      <div class="event-info">
        <div class="event-name">${ev.event_name}</div>
        <div class="event-type">${ev.event_type}</div>
        <div class="event-datetime">📅 ${ev.event_date} · ⏰ ${ev.event_time}</div>
        <div class="event-venue">📍 ${ev.venue}</div>
      </div>
      <div class="event-meta">
        <button class="btn-delete" onclick="deleteEvent(${ev.event_id})">🗑️</button>
      </div>
    `;
    list.appendChild(card);
  });
}

// TABS
function switchTab(btn) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const map = {
    "Upcoming": "upcoming",
    "Ongoing": "ongoing",
    "Completed": "completed"
  };

  currentTab = map[btn.textContent.trim()];
  renderEvents();
}

// MODAL
function openModal() {
  document.getElementById("modalOverlay").classList.add("open");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  clearForm();
}

function handleOverlayClick(e) {
  if (e.target.id === "modalOverlay") closeModal();
}

function clearForm() {
  ["eventName", "eventDate", "eventTime", "eventVenue"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("eventType").selectedIndex = 0;
  document.getElementById("eventStatus").selectedIndex = 0;
}

// ADD EVENT
async function addEvent() {
  const name = document.getElementById("eventName").value.trim();
  const type = document.getElementById("eventType").value;
  const date = document.getElementById("eventDate").value;
  const time = document.getElementById("eventTime").value;
  const venue = document.getElementById("eventVenue").value.trim();
  const status = document.getElementById("eventStatus").value;

  if (!name || !type || !date || !time) {
    showToast("Fill all fields!");
    return;
  }


  try {
    const res = await fetch('api/add_event.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, type, date, time, status, venue })
    });
    const newEvent = await res.json();
    events.push(newEvent);
    closeModal();
    renderEvents();
    showToast("🎉 Event added successfully!");
  } catch (err) {
    showToast("❌ Failed to add event!");
    console.error(err);
  }

  await fetch('add_event.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, type, date, time, venue, status })
  });

  fetchEvents();
  closeModal();
  showToast("Event added!");
}

// DELETE
async function deleteEvent(id) {

  if (!confirm("Are you sure you want to delete this event?")) return;
  try {
    await fetch(`api/delete_event.php?id=${id}`);
    events = events.filter(e => e.id !== id);
    renderEvents();
    showToast("🗑️ Event deleted!");
  } catch (err) {
    showToast("❌ Failed to delete event!");
    console.error(err);
  }
  if (!confirm("Delete event?")) return;

  await fetch(`delete_event.php?id=${id}`);
  fetchEvents();
  showToast("Deleted!");
}

// TOAST
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}


// ─── INIT ───
fetchEvents();
// INIT
fetchEvents();
