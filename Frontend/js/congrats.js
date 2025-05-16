document.addEventListener('DOMContentLoaded', async () => {
  checkAuth();
  
  const eventId = new URLSearchParams(window.location.search).get('eventId');
  if (!eventId) {
    window.location.href = 'index.html';
    return;
  }
  
  try {
    const event = await fakeEventAPI.getEventById(eventId);
    if (event) {
      document.getElementById('event-confirmation').textContent = 
        `You've successfully booked ${event.name} on ${formatDate(event.date)} at ${event.venue}.`;
    }
  } catch (error) {
    console.error('Failed to load event details', error);
  }
  
  // My bookings link
  document.getElementById('my-bookings-link').addEventListener('click', (e) => {
    e.preventDefault();
    alert('My bookings feature coming soon!');
  });
  
  // Admin link visibility
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
});