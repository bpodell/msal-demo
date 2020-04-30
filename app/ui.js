// Select DOM elements to work with
const welcomeDiv = document.getElementById("welcomeMessage");
const signInButton = document.getElementById("signIn");
const signOutButton = document.getElementById('signOut');
const cardDiv = document.getElementById("card-div");
const mailButton = document.getElementById("readMail");
const profileButton = document.getElementById("seeProfile");
const profileDiv = document.getElementById("profile-div");

function showWelcomeMessage(account) {
  // Reconfiguring DOM elements
  cardDiv.classList.remove('d-none');
  welcomeDiv.innerHTML = `Welcome ${account.name}`;
  signInButton.classList.add('d-none');
  signOutButton.classList.remove('d-none');
}