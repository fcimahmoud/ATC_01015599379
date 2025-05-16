document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  loadAdminEvents();
  
  // Modal handling
  const modal = document.getElementById('event-modal');
  const addEventBtn = document.getElementById('add-event-btn');
  const closeBtn = document.querySelector('.close');
  const cancelBtn = document.querySelector('.cancel-btn');
  
  addEventBtn.addEventListener('click', () => openModal('add'));
  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  cancelBtn.addEventListener('click', () => modal.style.display = 'none');
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Form submission
  document.getElementById('event-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const eventData = {
      name: document.getElementById('event-name').value,
      description: document.getElementById('event-description').value,
      category: document.getElementById('event-category').value,
      date: document.getElementById('event-date').value,
      venue: document.getElementById('event-venue').value,
      price: parseFloat(document.getElementById('event-price').value),
      image: document.getElementById('event-image').value || null
    };
    
    const eventId = document.getElementById('event-id').value;
    
    try {
      if (eventId) {
        await fakeEventAPI.updateEvent(eventId, eventData);
      } else {
        await fakeEventAPI.createEvent(eventData);
      }
      
      modal.style.display = 'none';
      loadAdminEvents();
    } catch (error) {
      alert('Failed to save event');
    }
  });
  
  // Logout
  document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = 'auth.html';
  });
});

async function loadAdminEvents() {
  const tbody = document.querySelector('#events-table tbody');
  tbody.innerHTML = '<tr><td colspan="5">Loading events...</td></tr>';
  
  try {
    const events = await fakeEventAPI.getEvents();
    
    if (events.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5">No events found</td></tr>';
      return;
    }
    
    tbody.innerHTML = '';
    events.forEach(event => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${event.name}</td>
        <td>${formatDate(event.date)}</td>
        <td>${event.category}</td>
        <td>$${event.price}</td>
        <td class="actions">
          <button class="edit-btn" data-id="${event.id}">Edit</button>
          <button class="delete-btn" data-id="${event.id}">Delete</button>
        </td>
      `;
      
      tr.querySelector('.edit-btn').addEventListener('click', () => openModal('edit', event.id));
      tr.querySelector('.delete-btn').addEventListener('click', () => deleteEvent(event.id));
      
      tbody.appendChild(tr);
    });
  } catch (error) {
    tbody.innerHTML = '<tr><td colspan="5">Failed to load events</td></tr>';
  }
}

async function openModal(mode, eventId = null) {
  const modal = document.getElementById('event-modal');
  const form = document.getElementById('event-form');
  const title = document.getElementById('modal-title');
  
  form.reset();
  document.getElementById('event-id').value = '';
  
  if (mode === 'add') {
    title.textContent = 'Add New Event';
  } else {
    title.textContent = 'Edit Event';
    
    try {
      const event = await fakeEventAPI.getEventById(eventId);
      if (event) {
        document.getElementById('event-id').value = event.id;
        document.getElementById('event-name').value = event.name;
        document.getElementById('event-description').value = event.description;
        document.getElementById('event-category').value = event.category;
        document.getElementById('event-date').value = formatDateForInput(event.date);
        document.getElementById('event-venue').value = event.venue;
        document.getElementById('event-price').value = event.price;
        document.getElementById('event-image').value = event.image || '';
      }
    } catch (error) {
      alert('Failed to load event details');
      return;
    }
  }
  
  modal.style.display = 'block';
}

async function deleteEvent(eventId) {
  if (!confirm('Are you sure you want to delete this event?')) return;
  
  try {
    await fakeEventAPI.deleteEvent(eventId);
    loadAdminEvents();
  } catch (error) {
    alert('Failed to delete event');
  }
}