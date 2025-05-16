document.addEventListener('DOMContentLoaded', async () => {
  checkAuth();
  
  const eventId = new URLSearchParams(window.location.search).get('id');
  if (!eventId) {
    window.location.href = 'index.html';
    return;
  }
  
  try {
    const event = await fakeEventAPI.getEventById(eventId);
    if (!event) {
      window.location.href = 'index.html';
      return;
    }
    
    document.getElementById('event-name').textContent = event.name;
    document.getElementById('event-date').textContent = formatDate(event.date);
    document.getElementById('event-venue').textContent = event.venue;
    document.getElementById('event-price').textContent = `$${event.price}`;
    document.getElementById('event-category').textContent = event.category;
    document.getElementById('event-description').textContent = event.description;
    document.getElementById('event-image').src = event.image || 'default-event.jpg';
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      const userBookings = await fakeBookingAPI.getUserBookings(currentUser.id);
      const isBooked = userBookings.some(b => b.eventId === event.id);
      
      if (isBooked) {
        document.getElementById('book-button').style.display = 'none';
        document.getElementById('booked-label').style.display = 'block';
      }
    }
    
    document.getElementById('book-button').addEventListener('click', async () => {
      if (!currentUser) {
        window.location.href = 'auth.html';
        return;
      }
      
      try {
        await fakeBookingAPI.createBooking({
          userId: currentUser.id,
          eventId: event.id,
          bookingDate: new Date().toISOString()
        });
        
        window.location.href = `congrats.html?eventId=${event.id}`;
      } catch (error) {
        alert('Failed to book event');
      }
    });
    
    // Admin link visibility
    if (currentUser && currentUser.role === 'admin') {
      document.getElementById('admin-link').style.display = 'block';
      document.getElementById('admin-link').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'admin.html';
      });
    }
    
    // Logout
    document.getElementById('logout-link').addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      window.location.href = 'auth.html';
    });
    
  } catch (error) {
    window.location.href = 'index.html';
  }
});