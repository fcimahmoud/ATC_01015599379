document.getElementById("resetPasswordForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = localStorage.getItem("resetEmail");
  const otp = document.getElementById("otp").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!email) {
    alert("Email not found. Please start from Forgot Password page.");
    window.location.href = "forgot-password.html";
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch("https://eventsys.runasp.net/api/Authentication/Reset-Password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        otp,
        newPassword
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Password reset successful. Please login.");
      localStorage.removeItem("resetEmail");
      window.location.href = "index.html";
    } else {
      alert(data.message || "Failed to reset password.");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
});

document.getElementById("resendOtp").addEventListener("click", async function () {
  const email = localStorage.getItem("resetEmail");

  if (!email) {
    alert("Please return to Forgot Password to re-enter your email.");
    return;
  }

  try {
    const response = await fetch("https://eventsys.runasp.net/api/Authentication/Resend-PasswordReset-Otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (response.ok) {
      alert("OTP resent to your email.");
    } else {
      alert(data.message || "Failed to resend OTP.");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
});
