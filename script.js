const track = document.getElementById("carouselTrack");
const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.querySelector(".carousel-control.prev");
const nextBtn = document.querySelector(".carousel-control.next");
const dotsContainer = document.getElementById("carouselDots");
const pageSections = Array.from(document.querySelectorAll("main > section"));
let sectionObserver = null;

let activeSectionIndex = 0;

let index = 0;
let autoplayId = null;

function scrollToSection(sectionIndex) {
  const nextIndex = Math.max(0, Math.min(sectionIndex, pageSections.length - 1));
  const targetSection = pageSections[nextIndex];

  if (!targetSection) {
    return;
  }

  activeSectionIndex = nextIndex;
  targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateActiveSectionFromObserver(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    const nextIndex = pageSections.indexOf(entry.target);
    if (nextIndex >= 0) {
      activeSectionIndex = nextIndex;
    }
  });
}

function setupSectionObserver() {
  sectionObserver = new IntersectionObserver(updateActiveSectionFromObserver, {
    root: null,
    threshold: 0.65,
  });

  pageSections.forEach((section) => sectionObserver.observe(section));
}

function handleNavigationLinkClick(event) {
  const anchor = event.target.closest('a[href^="#"]');

  if (!anchor) {
    return;
  }

  const targetId = anchor.getAttribute("href");
  const targetSection = targetId ? document.querySelector(targetId) : null;

  if (!targetSection) {
    return;
  }

  event.preventDefault();
  const relatedSection = targetSection.closest("main > section") || targetSection;
  const nextIndex = pageSections.indexOf(relatedSection);

  if (nextIndex >= 0) {
    scrollToSection(nextIndex);
    return;
  }

  // Fallback for in-section anchors that are not direct section elements.
  targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
}
window.addEventListener("load", () => {
  setupSectionObserver();
});

function buildDots() {
  slides.forEach((_, dotIndex) => {
    const button = document.createElement("button");
    button.className = `dot${dotIndex === 0 ? " active" : ""}`;
    button.type = "button";
    button.setAttribute("aria-label", `Ir a imagen ${dotIndex + 1}`);
    button.addEventListener("click", () => {
      goToSlide(dotIndex);
      resetAutoplay();
    });
    dotsContainer.appendChild(button);
  });
}

function updateSlideVisibility() {
  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === index;
    slide.classList.toggle("active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll(".dot");
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === index);
  });
}

function goToSlide(nextIndex) {
  index = (nextIndex + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
  updateSlideVisibility();
  updateDots();
}

function startAutoplay() {
  autoplayId = window.setInterval(() => {
    goToSlide(index + 1);
  }, 5000);
}

function resetAutoplay() {
  if (autoplayId) {
    window.clearInterval(autoplayId);
  }
  startAutoplay();
}

prevBtn.addEventListener("click", () => {
  goToSlide(index - 1);
  resetAutoplay();
});

nextBtn.addEventListener("click", () => {
  goToSlide(index + 1);
  resetAutoplay();
});

document.addEventListener("click", handleNavigationLinkClick);

buildDots();
startAutoplay();
updateSlideVisibility();

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function normalizeValue(value) {
  return value.replace(/\s+/g, " ").trim();
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const name = normalizeValue(String(data.get("name") || ""));
  const email = normalizeValue(String(data.get("email") || ""));
  const phone = normalizeValue(String(data.get("phone") || ""));
  const message = normalizeValue(String(data.get("message") || ""));
  const website = normalizeValue(String(data.get("website") || ""));

  formStatus.className = "form-status";

  // Hidden field used as a basic anti-bot trap.
  if (website.length > 0) {
    formStatus.textContent = "No se pudo enviar la consulta.";
    formStatus.classList.add("error");
    return;
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneOk = /^[0-9+\-()\s]{8,20}$/.test(phone);

  if (!name || name.length < 2 || !emailOk || !phoneOk || message.length < 10) {
    formStatus.textContent = "Revisa los datos: completa todos los campos correctamente.";
    formStatus.classList.add("error");
    return;
  }

  formStatus.textContent = "Gracias. Tu consulta fue recibida y te contactaremos pronto.";
  formStatus.classList.add("success");
  contactForm.reset();
});
