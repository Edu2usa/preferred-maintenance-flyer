const menuToggle = document.querySelector("#menuToggle");
const siteNav = document.querySelector("#siteNav");
const navLinks = document.querySelectorAll("#siteNav a");
const revealEls = document.querySelectorAll(".reveal");
const yearEl = document.querySelector("#year");
const contactForm = document.querySelector("#contactForm");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const firstName = (data.get("firstName") || "").toString().trim();
    const lastName = (data.get("lastName") || "").toString().trim();
    const company = (data.get("company") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const subject = (data.get("subject") || "Quote Request").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    const body = [
      `Name: ${firstName} ${lastName}`.trim(),
      `Company: ${company || "N/A"}`,
      `Phone: ${phone || "N/A"}`,
      `Email: ${email || "N/A"}`,
      "",
      "Message:",
      message || "N/A"
    ].join("\n");

    const mailto = `mailto:john@prefmaint.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}
