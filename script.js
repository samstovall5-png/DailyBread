const $ = (selector) => document.querySelector(selector);

const menuButton = $("#menuButton");
const mainNav = $("#mainNav");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  mainNav.classList.toggle("open", !open);
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

let devotionalDate = new Date();

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function renderDailyBread() {
  const index = Math.abs(dayOfYear(devotionalDate)) % DAILY_BREAD_ENTRIES.length;
  const entry = DAILY_BREAD_ENTRIES[index];
  $("#todayDate").textContent = devotionalDate.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric"
  });
  $("#verseText").textContent = `“${entry.verse}”`;
  $("#verseReference").textContent = entry.reference;
  $("#messageTitle").textContent = entry.title;
  $("#messageText").textContent = entry.message;
  $("#closingThought").textContent = entry.closing;
}

$("#previousDay").addEventListener("click", () => {
  devotionalDate.setDate(devotionalDate.getDate() - 1);
  renderDailyBread();
});
$("#nextDay").addEventListener("click", () => {
  devotionalDate.setDate(devotionalDate.getDate() + 1);
  renderDailyBread();
});
$("#todayButton").addEventListener("click", () => {
  devotionalDate = new Date();
  renderDailyBread();
});

let calendarDate = new Date();
calendarDate.setDate(1);

function dateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function renderCalendar() {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  $("#calendarTitle").textContent = calendarDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const days = $("#calendarDays");
  days.innerHTML = "";
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayKey = dateKey(new Date());

  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("span");
    blank.className = "calendar-day blank";
    days.appendChild(blank);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const current = new Date(year, month, day);
    const key = dateKey(current);
    const events = EVENTS.filter(event => event.date === key);
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "calendar-day";
    if (key === todayKey) cell.classList.add("today");
    if (events.length) {
      cell.classList.add("has-event");
      cell.title = events.map(event => event.title).join(", ");
      cell.addEventListener("click", () => {
        document.querySelector(`[data-event-date="${key}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
    cell.innerHTML = `<span>${day}</span>${events.length ? '<i aria-hidden="true"></i>' : ''}`;
    days.appendChild(cell);
  }
}

function renderEvents() {
  const container = $("#upcomingEvents");
  const sorted = [...EVENTS].sort((a, b) => new Date(a.date) - new Date(b.date));
  container.innerHTML = "";
  $("#eventCount").textContent = `${sorted.length} event${sorted.length === 1 ? "" : "s"}`;

  if (!sorted.length) {
    container.innerHTML = '<p class="empty-state">New event dates will be added soon.</p>';
    return;
  }

  sorted.forEach(event => {
    const date = new Date(`${event.date}T12:00:00`);
    const item = document.createElement("article");
    item.className = "event-item";
    item.dataset.eventDate = event.date;
    item.innerHTML = `
      <div class="event-date-box">
        <span>${date.toLocaleDateString("en-US", { month: "short" })}</span>
        <strong>${date.getDate()}</strong>
      </div>
      <div class="event-details">
        <h4>${event.title}</h4>
        <p class="event-meta">${event.time} · ${event.location}</p>
        <p>${event.description}</p>
      </div>`;
    container.appendChild(item);
  });
}

$("#prevMonth").addEventListener("click", () => {
  calendarDate.setMonth(calendarDate.getMonth() - 1);
  renderCalendar();
});
$("#nextMonth").addEventListener("click", () => {
  calendarDate.setMonth(calendarDate.getMonth() + 1);
  renderCalendar();
});

$("#eventForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Event Submission: ${data.get("eventName")}`);
  const body = encodeURIComponent(
`Name: ${data.get("name")}
Email: ${data.get("email")}
Event: ${data.get("eventName")}
Date: ${data.get("date")}
Time: ${data.get("time") || "Not provided"}
Location: ${data.get("location") || "Not provided"}

Details:
${data.get("description")}`
  );

  // Replace the email below with the bakery's preferred contact email.
  window.location.href = `mailto:YOUR_EMAIL_HERE?subject=${subject}&body=${body}`;
  $("#formMessage").textContent = "Your email app should open with the event details ready to send.";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

$("#year").textContent = new Date().getFullYear();
renderDailyBread();
renderCalendar();
renderEvents();
