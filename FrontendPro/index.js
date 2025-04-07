const feedbackButton = document.getElementById("feedbackButton");
const modal = document.getElementById("modal");
const cancelBtn = document.getElementById("cancelBtn");
const submitBtn = document.getElementById("submitBtn");
const closeBtn = document.getElementById("closeBtn");
const ratingContainer = document.getElementById("ratingContainer");

let selectedRating = null;

// Generate rating numbers with labels
for (let i = 1; i <= 10; i++) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("rating-item");

  const span = document.createElement("span");
  span.textContent = i;
  span.addEventListener("click", () => {
    selectedRating = i;
    document.querySelectorAll("#ratingContainer span").forEach(el => el.classList.remove("selected"));
    span.classList.add("selected");
  });

  wrapper.appendChild(span);

  if (i === 1) {
    const label = document.createElement("p1");
    label.textContent = "Not likely at all";
    wrapper.appendChild(label);
  } else if (i === 10) {
    const label = document.createElement("p2");
    label.textContent = "Extremely Likely";
    wrapper.appendChild(label);
  }

  ratingContainer.appendChild(wrapper);
}

// Open modal
feedbackButton.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Close modal with close button
closeBtn.addEventListener("click", () => {
    console.log("The cancel button is being clicked");
  modal.classList.remove("hidden");
  resetModal();
});

// Cancel modal
cancelBtn.addEventListener("click", () => {
    console.log("The cancel button is being clicked");

  modal.classList.add("hidden");
  resetModal();
});

// Submit modal
submitBtn.addEventListener("click", () => {
  if (selectedRating) {
    alert(`Thanks for rating us ${selectedRating}/10!`);
    console.log("The Submit button is being clicked");

    modal.classList.add("hidden");
    resetModal();
  } else {
    console.log("The Submit button is being clicked");

    alert("Please select a rating before submitting.");
  }
});

// Close modal by clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    resetModal();
  }
});

function resetModal() {
  selectedRating = null;
  document.querySelectorAll("#ratingContainer span").forEach(el => el.classList.remove("selected"));
}