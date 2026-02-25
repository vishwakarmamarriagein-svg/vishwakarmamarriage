fetch("profiles.json")
  .then(response => response.json())
  .then(data => {

    const container = document.getElementById("profiles-container");
    const pageType = container.getAttribute("data-type");

    const filteredProfiles = data.filter(profile => profile.type === pageType);

    filteredProfiles.forEach(profile => {

      const card = document.createElement("div");
      card.className = "profile-card";

      card.innerHTML = `
        <h3>${profile.name}</h3>
        <p><strong>Category:</strong> ${profile.category}</p>
        <p><strong>Age:</strong> ${profile.age}</p>
        <p><strong>Height:</strong> ${profile.height}</p>
        <p><strong>Education:</strong> ${profile.education}</p>
        <p><strong>Occupation:</strong> ${profile.occupation}</p>
        <p><strong>City:</strong> ${profile.city}</p>
        <button onclick="showContact(this, '${profile.contact}')">View Contact</button>
        <p class="contact-number"></p>
      `;

      container.appendChild(card);
    });

  });

function showContact(button, contact) {
  const contactPara = button.nextElementSibling;
  contactPara.innerText = contact;
  button.style.display = "none";
}
