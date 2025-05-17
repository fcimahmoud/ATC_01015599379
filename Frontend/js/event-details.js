const API_BASE = "https://eventsys.runasp.net/api";
const token = localStorage.getItem("authToken");
const userId = localStorage.getItem("userId");
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("id");

async function fetchEventDetails() {
  const res = await fetch(`${API_BASE}/Events/${eventId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch event details");
  return await res.json();
}

async function bookEvent() {
  try {
    const res = await fetch(`${API_BASE}/Bookings/book?eventId=${eventId}&userId=${userId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    const booked = JSON.parse(localStorage.getItem("bookedEvents") || "[]");
    booked.push(eventId);
    localStorage.setItem("bookedEvents", JSON.stringify(booked));
    window.location.href = "congrats.html";
  } catch (err) {
    alert("Booking failed: " + err.message);
  }
}

async function renderEvent() {
  try {
    const e = await fetchEventDetails();
    document.getElementById("eventDetails").innerHTML = `
      <div class="card shadow-lg">
        <img src="${e.imageUrl}" class="card-img-top" style="height: 400px; object-fit: cover;">
        <div class="card-body">
          <h3 class="card-title">${e.name}</h3>
          <p class="text-muted">${new Date(e.date).toLocaleDateString()} - ${e.venue}</p>
          <p><strong>Category:</strong> ${e.category}</p>
          <p><strong>Price:</strong> $${e.price}</p>
          <p>${e.description}</p>
          <button class="btn btn-success" onclick="bookEvent()">Book Now</button>
        </div>
      </div>
    `;
  } catch (err) {
    document.getElementById("eventDetails").innerHTML = `<p class="text-danger">Error: ${err.message}</p>`;
  }
}

renderEvent();