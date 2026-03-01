let selectedCategory = "All";
let selectedState = "All";
let allProfiles = [];

fetch("profiles.json")
  .then(response => response.json())
  .then(data => {
    allProfiles = data;

    // Make "All" button active on load
    const buttons = document.querySelectorAll(".category-buttons button");
    buttons.forEach(btn => {
      if (btn.innerText === "All") {
        btn.classList.add("active");
      }
    });

    renderProfiles();
  });

function renderProfiles() {
  const container = document.getElementById("profiles-container");
  const pageType = container.getAttribute("data-type");

  container.innerHTML = "";

  const filteredProfiles = allProfiles.filter(profile =>
    profile.type === pageType &&
    (selectedCategory === "All" || profile.category === selectedCategory)
  );

  filteredProfiles.forEach(profile => {

    const card = document.createElement("div");
    card.className = "profile-card";

    card.innerHTML = `
      <img src="${profile.photo}" class="profile-photo">
      <h3>${profile.name}</h3>
      <p><strong>Category:</strong> ${profile.category}</p>
      <p><strong>Age:</strong> ${profile.age}</p>
      <p><strong>Height:</strong> ${profile.height}</p>
      <p><strong>Education:</strong> ${profile.education}</p>
      <p><strong>Occupation:</strong> ${profile.occupation}</p>
      <p><strong>Location:</strong> ${profile.district}, ${profile.state}</p>
      <button onclick="showContact(this, '${profile.contact}')">View Contact</button>
      <p class="contact-number"></p>
    `;

    container.appendChild(card);
  });
}

function showContact(button, contact) {
  const contactPara = button.nextElementSibling;
  contactPara.innerText = contact;
  button.style.display = "none";
}
function searchProfiles() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".profile-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    if (text.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
function filterCategory(category) {
  selectedCategory = category;

  // Remove active class from all buttons
  const buttons = document.querySelectorAll(".category-buttons button");
  buttons.forEach(btn => btn.classList.remove("active"));

  // Add active class to clicked button
  buttons.forEach(btn => {
    if (btn.innerText === category) {
      btn.classList.add("active");
    }
  });

  renderProfiles();
}
