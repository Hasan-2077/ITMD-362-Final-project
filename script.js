// Smooth scroll + contact form + product filtering + FAQ + lookbook + validation
document.addEventListener("DOMContentLoaded", () => {

  /* -------------------- Smooth Scroll Buttons (Home Page) -------------------- */
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

  /* -------------------- INLINE VALIDATION (Contact Page) -------------------- */
  /* -------------------- CONTACT FORM VALIDATION -------------------- */
const contactForm = document.getElementById("contact-form");
const contactSubmitBtn = document.getElementById("submit-btn");

if (contactForm) {
  const contactInputs = contactForm.querySelectorAll(".contact-input");

  const showContactError = (input, message) => {
    const errorSpan = input.parentElement.querySelector(".contact-error-msg");
    if (errorSpan) {
      errorSpan.textContent = message;
      errorSpan.style.display = "block";
    }
  };

  const clearContactError = (input) => {
    const errorSpan = input.parentElement.querySelector(".contact-error-msg");
    if (errorSpan) {
      errorSpan.textContent = "";
      errorSpan.style.display = "none";
    }
  };

  const validateContactField = (input) => {
    const value = input.value.trim();
    let valid = true;

    if (input.id === "name") {
      if (value.length === 0) {
        showContactError(input, "Name is required.");
        valid = false;
      } else {
        clearContactError(input);
      }
    }

    if (input.id === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.length === 0) {
        showContactError(input, "Email is required.");
        valid = false;
      } else if (!emailPattern.test(value)) {
        showContactError(input, "Please enter a valid email.");
        valid = false;
      } else {
        clearContactError(input);
      }
    }

    if (input.id === "subject") {
      if (value.length === 0) {
        showContactError(input, "Subject is required.");
        valid = false;
      } else {
        clearContactError(input);
      }
    }

    if (input.id === "message") {
      if (value.length === 0) {
        showContactError(input, "Message is required.");
        valid = false;
      } else {
        clearContactError(input);
      }
    }

    return valid;
  };

  contactInputs.forEach((input) => {
    input.addEventListener("input", () => validateContactField(input));
    input.addEventListener("blur", () => validateContactField(input));
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let formIsValid = true;
    contactInputs.forEach((input) => {
      if (!validateContactField(input)) {
        formIsValid = false;
      }
    });

    if (!formIsValid) return;

    contactSubmitBtn.textContent = "Message Sent!";
    contactSubmitBtn.disabled = true;
    contactForm.reset();
  });
}


  /* -------------------- PRODUCT PAGE FILTERING -------------------- */
  const productCards = document.querySelectorAll(".product-card");
  const checkboxes = document.querySelectorAll(".filter-panel input[type='checkbox']");
  const priceSlider = document.getElementById("price-slider");

  if (productCards.length > 0) {

    const applyFilters = () => {
      const selectedCategories = [...document.querySelectorAll("input[name='category']:checked")].map(cb => cb.value);
      const selectedSizes = [...document.querySelectorAll("input[name='size']:checked")].map(cb => cb.value);
      const selectedColors = [...document.querySelectorAll("input[name='color']:checked")].map(cb => cb.value);
      const maxPrice = parseInt(priceSlider.value, 10);

      productCards.forEach(card => {
        const category = card.dataset.category;
        const sizes = card.dataset.size.split(",");
        const color = card.dataset.color;
        const price = parseInt(card.dataset.price);

        const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
        const matchSize = selectedSizes.length === 0 || selectedSizes.some(size => sizes.includes(size));
        const matchColor = selectedColors.length === 0 || selectedColors.includes(color);
        const matchPrice = price <= maxPrice;

        card.style.display = matchCategory && matchSize && matchColor && matchPrice ? "" : "none";
      });
    };

    checkboxes.forEach(cb => cb.addEventListener("change", applyFilters));
    priceSlider?.addEventListener("input", applyFilters);
  }

  /* -------------------- FAQ Accordions -------------------- */
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;

      faqQuestions.forEach(q => {
        if (q !== btn) q.nextElementSibling.classList.remove("active");
      });

      answer.classList.toggle("active");
    });
  });

  /* -------------------- LOOKBOOK CLICK BEHAVIOR -------------------- */
  const seasonCards = document.querySelectorAll(".season-card, .value-card img");

  seasonCards.forEach(card => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      alert("Seasonal lookbook coming soon!");
    });
  });

});
