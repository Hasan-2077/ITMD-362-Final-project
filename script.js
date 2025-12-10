// Smooth scroll from side labels to their sections
document.addEventListener("DOMContentLoaded", () => {
  const newInBtn = document.getElementById("scroll-new-in");
  const categoryBtn = document.getElementById("scroll-category");
  const newInSection = document.getElementById("new-in");
  const categorySection = document.getElementById("category");

  if (newInBtn && newInSection) {
    newInBtn.addEventListener("click", () => {
      newInSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (categoryBtn && categorySection) {
    categoryBtn.addEventListener("click", () => {
      categorySection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Handle contact form submission
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");

  if (form && submitBtn) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent page reload
      submitBtn.textContent = "Message Sent!";
      submitBtn.disabled = true;
    });
  }
});
