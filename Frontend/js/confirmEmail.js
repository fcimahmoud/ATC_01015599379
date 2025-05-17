document.getElementById("confirmEmailForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;

  try {
    const response = await fetch("https://eventsys.runasp.net/api/Authentication/Confirm-Email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, otp })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Email confirmed successfully!");
      window.location.href = "index.html";
    } else {
      alert(data.message || "Failed to confirm email.");
    }
  } catch (error) {
    alert("An error occurred: " + error.message);
  }
});

document.getElementById("resendOtp").addEventListener("click", async function () {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Please enter your email first.");
    return;
  }

  try {
    const response = await fetch("https://eventsys.runasp.net/api/Authentication/Resend-EmailConfirmation-Otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (response.ok) {
      alert("OTP resent to your email.");
    } else {
      alert(data.message || "Failed to resend OTP.");
    }
  } catch (error) {
    alert("An error occurred: " + error.message);
  }
});
