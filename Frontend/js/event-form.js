// event-form.js
const token = localStorage.getItem("authToken");
if (!token) {
  alert("Unauthorized. Please log in.");
  window.location.href = "login.html";
}

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}
const decoded = parseJwt(token);
if (!decoded || decoded.role !== "AdminRole") {
  alert("Admins only!");
  window.location.href = "index.html";
}

const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("id");

const form = document.getElementById("eventForm");
const title = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");

if (eventId) {
  title.textContent = "Update Event";
  submitBtn.textContent = "Update";

  // Fetch existing event details
  fetch(`https://eventsys.runasp.net/api/Events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(event => {
      document.getElementById("eventName").value = event.name;
      document.getElementById("eventDescription").value = event.description;
      document.getElementById("eventCategory").value = event.category;
      document.getElementById("eventVenue").value = event.venue;
      document.getElementById("eventDate").value = new Date(event.date).toISOString().slice(0, 16);
      document.getElementById("eventPrice").value = event.price;
    });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("Name", document.getElementById("eventName").value);
  formData.append("Description", document.getElementById("eventDescription").value);
  formData.append("Category", document.getElementById("eventCategory").value);
  formData.append("Venue", document.getElementById("eventVenue").value);
  formData.append("Date", document.getElementById("eventDate").value);
  formData.append("Price", document.getElementById("eventPrice").value);

  const imageFile = document.getElementById("eventImage").files[0];
  if (imageFile) {
    formData.append("Image", imageFile);
  }

  const endpoint = eventId
    ? `https://eventsys.runasp.net/api/Events/${eventId}`
    : "https://eventsys.runasp.net/api/Events";
  const method = eventId ? "PUT" : "POST";

  try {
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) throw new Error("Failed to save event");

    alert(`Event ${eventId ? "updated" : "created"} successfully!`);
    window.location.href = "admin-dashboard.html";
  } catch (err) {
    alert("Error: " + err.message);
  }
});
