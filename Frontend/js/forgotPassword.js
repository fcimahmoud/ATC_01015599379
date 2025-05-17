document.getElementById("forgotPasswordForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;

  try {
    const response = await fetch("https://eventsys.runasp.net/api/Authentication/Forgot-Password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (response.ok) {
      alert("OTP sent to your email. Proceed to reset your password.");
      localStorage.setItem("resetEmail", email); // store email for reset step
      window.location.href = "reset-password.html";
    } else {
      alert(data.message || "Failed to send OTP.");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
});
