function parseJwt(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    return null;
  }
}

const token = localStorage.getItem("authToken");
if (!token) {
  alert("Unauthorized. Please log in.");
  window.location.href = "login.html";
}

const decoded = parseJwt(token);
if (!decoded || decoded.role !== "AdminRole") {
  alert("Access Denied. Admins only.");
  window.location.href = "index.html"; // Or another user-facing page
}


const API_BASE = "https://eventsys.runasp.net/api";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
const eventForm = document.getElementById("eventForm");
const modal = new bootstrap.Modal(document.getElementById("eventModal"));
const eventsAdminList = document.getElementById("eventsAdminList");

let editingId = null;

async function fetchEvents() {
  const res = await fetch(`${API_BASE}/Events`, { headers });
  if (!res.ok) throw new Error("Failed to fetch events");
  return await res.json();
}

async function renderEvents() {
  try {
    const events = await fetchEvents();
    eventsAdminList.innerHTML = `
      <table class="table table-bordered table-striped">
        <thead class="table-dark">
          <tr>
            <th>Name</th><th>Category</th><th>Date</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${events.map(e => `
            <tr>
              <td>${e.name}</td>
              <td>${e.category}</td>
              <td>${new Date(e.date).toLocaleDateString()}</td>
              <td>$${e.price}</td>
              <td>
                <button class="btn btn-sm btn-warning" onclick="editEvent('${e.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteEvent('${e.id}')">Delete</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  } catch (err) {
    eventsAdminList.innerHTML = `<p class="text-danger">${err.message}</p>`;
  }
}

function openCreateModal() {
  editingId = null;
  document.getElementById("modalTitle").innerText = "Create Event";
  eventForm.reset();
  modal.show();
}

async function editEvent(id) {
  const res = await fetch(`${API_BASE}/Events/${id}`, { headers });
  const e = await res.json();
  editingId = id;
  document.getElementById("eventId").value = e.id;
  document.getElementById("name").value = e.name;
  document.getElementById("description").value = e.description;
  document.getElementById("category").value = e.category;
  document.getElementById("date").value = e.date.split("T")[0];
  document.getElementById("venue").value = e.venue;
  document.getElementById("price").value = e.price;
  document.getElementById("imageUrl").value = e.imageUrl;
  document.getElementById("modalTitle").innerText = "Edit Event";
  modal.show();
}

async function deleteEvent(id) {
  if (!confirm("Delete this event?")) return;
  await fetch(`${API_BASE}/Events/${id}`, {
    method: "DELETE",
    headers,
  });
  renderEvents();
}

eventForm.onsubmit = async function (e) {
  e.preventDefault();
  const data = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
    venue: document.getElementById("venue").value,
    price: +document.getElementById("price").value,
    imageUrl: document.getElementById("imageUrl").value,
  };

  const method = editingId ? "PUT" : "POST";
  const url = editingId ? `${API_BASE}/Events/${editingId}` : `${API_BASE}/Events`;

  await fetch(url, {
    method,
    headers,
    body: JSON.stringify(data),
  });

  modal.hide();
  renderEvents();
};

renderEvents();