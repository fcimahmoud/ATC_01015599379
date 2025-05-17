document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch("https://eventsys.runasp.net/api/Authentication/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phoneNumber
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration successful! Please check your email to confirm.");
      window.location.href = "confirm-email.html";
    } else {
      alert(data.message || "Registration failed.");
    }
  } catch (error) {
    alert("An error occurred: " + error.message);
  }
});
