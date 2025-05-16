document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  
  // Tab switching
  document.getElementById('login-tab').addEventListener('click', () => {
    switchAuthTab('login');
  });

  document.getElementById('register-tab').addEventListener('click', () => {
    switchAuthTab('register');
  });

  function switchAuthTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('form').forEach(f => f.classList.remove('active'));
    
    if (tab === 'login') {
      document.getElementById('login-tab').classList.add('active');
      document.getElementById('login-form').classList.add('active');
    } else {
      document.getElementById('register-tab').classList.add('active');
      document.getElementById('register-form').classList.add('active');
    }
  }

  // Form submission
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    
    const user = await fakeAuthAPI.login(email, password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.location.href = 'index.html';
    } else {
      alert('Invalid credentials');
    }
  });

  document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.elements[0].value;
    const email = e.target.elements[1].value;
    const password = e.target.elements[2].value;
    
    const user = await fakeAuthAPI.register(name, email, password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.location.href = 'index.html';
    } else {
      alert('Registration failed');
    }
  });
});