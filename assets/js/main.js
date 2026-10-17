const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

// Add the address that should receive portfolio inquiries.
const contactEmail = "";

const setTheme = (theme) => {
  root.dataset.theme = theme;
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
  );
};

const savedTheme = window.localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
setTheme(savedTheme || preferredTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  window.localStorage.setItem("portfolio-theme", nextTheme);
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }
});

const sections = [...document.querySelectorAll("main section[id]")];
const updateActiveLink = () => {
  const marker = window.scrollY + window.innerHeight * 0.4;
  const currentSection = sections.reduce(
    (current, section) => (section.offsetTop <= marker ? section : current),
    sections[0],
  );

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle(
      "is-active",
      link.getAttribute("href") === `#${currentSection.id}`,
    );
  });
};

let activeLinkUpdateScheduled = false;
window.addEventListener(
  "scroll",
  () => {
    if (activeLinkUpdateScheduled) return;
    activeLinkUpdateScheduled = true;
    window.requestAnimationFrame(() => {
      updateActiveLink();
      activeLinkUpdateScheduled = false;
    });
  },
  { passive: true },
);
updateActiveLink();

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  if (!contactEmail) {
    formStatus.textContent =
      "Add your email address in assets/js/main.js to receive messages.";
    return;
  }

  const formData = new FormData(contactForm);
  const subject = `Portfolio inquiry from ${formData.get("name")}`;
  const body = [
    `Name: ${formData.get("name")}`,
    `Email: ${formData.get("email")}`,
    "",
    formData.get("message"),
  ].join("\n");

  window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formStatus.textContent = "Your email app is opening with your message.";
});

document.querySelector("#year").textContent = new Date().getFullYear();
