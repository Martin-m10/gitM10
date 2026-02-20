document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let username = document.getElementById("newUsername").value;
  let password = document.getElementById("newPassword").value;

  if (username.trim() === "" || password.trim() === "") {
    document.getElementById("message").textContent = "Please fill in both fields.";
    document.getElementById("message").style.color = "red";
    return;
  }

  localStorage.setItem("user_" + username, password);

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", username);

  document.getElementById("message").textContent = "Registration successful!";
  document.getElementById("message").style.color = "green";

  setTimeout(() => {
    window.location.href = "../view/index.html";
  }, 1000);
});