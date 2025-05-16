document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  loadEvents();
  
  // Admin link visibility
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser && currentUser.role === 'admin') {
    document.getElementById('admin-link').style.display = 'block';
    document.getElementById('admin-link').addEventListener('click', () => {
      window.location.href = 'admin.html';
    });
  }
  
  // Logout
  document.getElementById('logout-link').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'auth.html';
  });
  
  // Category filter
  document.getElementById('category-filter').addEventListener('change', (e) => {
    loadEvents(e.target.value);
  });
});

async function loadEvents(category = 'all') {
  const eventsContainer = document.getElementById('events-container');
  eventsContainer.innerHTML = '<div class="loading">Loading events...</div>';
  
  try {
    // Simulate API call
    const events = await fakeEventAPI.getEvents(category);
    
    if (events.length === 0) {
      eventsContainer.innerHTML = '<div class="no-events">No events found</div>';
      return;
    }
    
    eventsContainer.innerHTML = '';
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userBookings = currentUser ? await fakeBookingAPI.getUserBookings(currentUser.id) : [];
    
    events.forEach(event => {
      const isBooked = userBookings.some(booking => booking.eventId === event.id);
      
      const eventCard = document.createElement('div');
      eventCard.className = 'event-card';
      eventCard.innerHTML = `
        <img src="${event.image || 'default-event.jpg'}" alt="${event.name}">
        <div class="event-info">
          <h3>${event.name}</h3>
          <p class="event-date">${formatDate(event.date)}</p>
          <p class="event-venue">${event.venue}</p>
          <p class="event-price">$${event.price}</p>
          ${isBooked ? 
            '<div class="booked-label">Booked</div>' : 
            `<button class="book-now" data-id="${event.id}">Book Now</button>`
          }
        </div>
      `;
      
      if (!isBooked) {
        eventCard.querySelector('.book-now').addEventListener('click', () => {
          bookEvent(event.id);
        });
      }
      
      eventsContainer.appendChild(eventCard);
    });
  } catch (error) {
    eventsContainer.innerHTML = '<div class="error">Failed to load events</div>';
  }
}

async function bookEvent(eventId) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    window.location.href = 'auth.html';
    return;
  }
  
  try {
    // Simulate API call
    await fakeBookingAPI.createBooking({
      userId: currentUser.id,
      eventId: eventId,
      bookingDate: new Date().toISOString()
    });
    
    window.location.href = `congrats.html?eventId=${eventId}`;
  } catch (error) {
    alert('Failed to book event');
  }
}