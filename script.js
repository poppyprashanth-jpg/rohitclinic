const revealItems = document.querySelectorAll(".section, .hero, .site-footer");

revealItems.forEach((item) => item.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

const modal = document.querySelector("#appointment-modal");
const openButtons = document.querySelectorAll("[data-open-modal]");
const closeButtons = document.querySelectorAll("[data-close-modal]");
const form = document.querySelector("#appointment-form");

const openModal = () => {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
};

openButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "";
    const phone = data.get("phone") || "";
    const message = data.get("message") || "";
    const body = `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`;
    const mailto =
      "mailto:dr.rohitreddy@gmail.com?subject=" +
      encodeURIComponent("Appointment Request - Ashu's DermaCare") +
      "&body=" +
      encodeURIComponent(body);
    window.open(mailto, "_blank");
    closeModal();
    form.reset();
  });
}
