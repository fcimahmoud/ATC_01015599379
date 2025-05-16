// Helper functions
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatDateForInput(dateString) {
  const date = new Date(dateString);
  const isoString = date.toISOString();
  return isoString.substring(0, isoString.length - 1);
}

// Check authentication
function checkAuth() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const authPages = ['auth.html'];
  const protectedPages = ['index.html', 'event.html', 'congrats.html', 'admin.html'];
  
  const currentPage = window.location.pathname.split('/').pop();
  
  // Redirect to login if not authenticated and trying to access protected page
  if (!currentUser && protectedPages.includes(currentPage)) {
    window.location.href = 'auth.html';
    return;
  }
  
  // Redirect to home if authenticated and trying to access auth page
  if (currentUser && authPages.includes(currentPage)) {
    window.location.href = 'index.html';
    return;
  }
  
  // Check admin access
  if (currentPage === 'admin.html' && currentUser?.role !== 'admin') {
    window.location.href = 'index.html';
    return;
  }
}

// Fake API implementations
const fakeAuthAPI = {
  login: async (email, password) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          id: 'user123',
          name: email === 'admin@example.com' ? 'Admin User' : 'Test User',
          email: email,
          role: email === 'admin@example.com' ? 'admin' : 'user'
        });
      }, 500);
    });
  },
  
  register: async (name, email, password) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          id: 'user' + Math.floor(Math.random() * 1000),
          name: name,
          email: email,
          role: 'user'
        });
      }, 500);
    });
  }
};

const fakeEventAPI = {
  getEvents: async (category = 'all') => {
    const allEvents = [
      {
        id: 'event1',
        name: 'Summer Music Festival',
        description: 'The biggest music festival of the year featuring top artists from around the world.',
        category: 'music',
        date: new Date(Date.now() + 86400000 * 7).toISOString(),
        venue: 'Central Park',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'event2',
        name: 'Tech Conference 2023',
        description: 'Learn about the latest trends in technology from industry leaders.',
        category: 'business',
        date: new Date(Date.now() + 86400000 * 14).toISOString(),
        venue: 'Convention Center',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'event3',
        name: 'Local Art Exhibition',
        description: 'Showcasing works from talented local artists.',
        category: 'art',
        date: new Date(Date.now() + 86400000 * 3).toISOString(),
        venue: 'City Art Gallery',
        price: 12.50,
        image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ];
    
    return new Promise(resolve => {
      setTimeout(() => {
        if (category === 'all') {
          resolve(allEvents);
        } else {
          resolve(allEvents.filter(event => event.category === category));
        }
      }, 500);
    });
  },
  
  getEventById: async (id) => {
    const events = await fakeEventAPI.getEvents();
    return events.find(event => event.id === id);
  },
  
  createEvent: async (eventData) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ ...eventData, id: 'event' + Math.floor(Math.random() * 1000) });
      }, 500);
    });
  },
  
  updateEvent: async (id, eventData) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ ...eventData, id });
      }, 500);
    });
  },
  
  deleteEvent: async (id) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }
};

const fakeBookingAPI = {
  createBooking: async (bookingData) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ ...bookingData, id: 'booking' + Math.floor(Math.random() * 1000) });
      }, 500);
    });
  },
  
  getUserBookings: async (userId) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const events = [
          { id: 'event1', name: 'Summer Music Festival' },
          { id: 'event3', name: 'Local Art Exhibition' }
        ];
        
        resolve(Math.random() > 0.5 ? [{
          id: 'booking1',
          userId: userId,
          eventId: events[Math.floor(Math.random() * events.length)].id,
          bookingDate: new Date().toISOString()
        }] : []);
      }, 500);
    });
  }
};