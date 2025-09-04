// CF Claims Website JavaScript
// This file handles interactive elements such as the FAQ toggles,
// cookie consent banner, contact form messages and dynamic year display.

document.addEventListener('DOMContentLoaded', function () {
  // Update copyright years
  const now = new Date();
  const yearElements = document.querySelectorAll('#year, #year-privacy');
  yearElements.forEach(function (el) {
    el.textContent = now.getFullYear();
  });

  // FAQ toggle functionality
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      const expanded = this.getAttribute('aria-expanded') === 'true';
      // Toggle state
      this.setAttribute('aria-expanded', !expanded);
      answer.style.display = expanded ? 'none' : 'block';
      answer.setAttribute('aria-hidden', expanded);
    });
  });

  // Cookie consent banner
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptButton = document.getElementById('accept-cookies');
  // Show banner if consent not yet given
  if (cookieBanner && !localStorage.getItem('cfclaims_cookie_consent')) {
    // Using a slight timeout to avoid showing the banner before CSS has loaded
    setTimeout(function () {
      cookieBanner.style.transform = 'translateY(0)';
    }, 100);
  }
  if (acceptButton) {
    acceptButton.addEventListener('click', function () {
      localStorage.setItem('cfclaims_cookie_consent', 'true');
      cookieBanner.style.transform = 'translateY(100%)';
    });
  }

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Simple form validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !message) {
        alert('Please complete all required fields.');
        return;
      }
      // Show confirmation message
      const confirmation = document.createElement('p');
      confirmation.className = 'form-confirmation';
      confirmation.setAttribute('role', 'status');
      confirmation.textContent = 'Thank you for contacting us! We will review your enquiry and get back to you soon.';
      contactForm.parentNode.insertBefore(confirmation, contactForm.nextSibling);
      // Reset form fields
      contactForm.reset();
    });
  }
});