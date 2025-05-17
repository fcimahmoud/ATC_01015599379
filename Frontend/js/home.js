const API_BASE = "https://eventsys.runasp.net/api";
const token = localStorage.getItem("authToken");
const userId = localStorage.getItem("userId");
const eventsGrid = document.getElementById("eventsGrid");

async function fetchAllEvents() {
  const res = await fetch(`${API_BASE}/Events`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch events");
  return await res.json();
}

function goToDetails(eventId) {
  window.location.href = `event-details.html?id=${eventId}`;
}

function cancelBooking(eventId) {
  if (!confirm("Cancel this booking?")) return;
  fetch(`${API_BASE}/Bookings/unbook?eventId=${eventId}&userId=${userId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => {
      if (!res.ok) return res.text().then(text => { throw new Error(text); });
      alert("Booking canceled successfully!");
      const booked = JSON.parse(localStorage.getItem("bookedEvents") || "[]");
      localStorage.setItem("bookedEvents", JSON.stringify(booked.filter(id => id !== eventId)));
      renderEvents();
    })
    .catch(err => alert("Error: " + err.message));
}

async function renderEvents() {
  try {
    const events = await fetchAllEvents();
    const booked = JSON.parse(localStorage.getItem("bookedEvents") || "[]");
    eventsGrid.innerHTML = events.map(e => {
      const isBooked = booked.includes(e.id);
      return `
        <div class="col-md-4">
          <div class="card h-100 shadow">
            <img src="${e.imageUrl}" class="card-img-top" style="height:200px; object-fit:cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${e.name}</h5>
              <p class="card-text text-muted">${new Date(e.date).toLocaleDateString()} - ${e.venue}</p>
              ${isBooked
                ? `<button class="btn btn-danger mt-auto" onclick="cancelBooking('${e.id}')">Cancel Booking</button>`
                : `<button class="btn btn-primary mt-auto" onclick="goToDetails('${e.id}')">Book Now</button>`}
            </div>
          </div>
        </div>
      `;
    }).join("");
  } catch (err) {
    eventsGrid.innerHTML = `<p class="text-danger">Error loading events: ${err.message}</p>`;
  }
}

renderEvents();