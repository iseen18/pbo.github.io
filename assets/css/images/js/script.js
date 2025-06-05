
'use strict';

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

const navbar = document.querySelector("[data-navbar]");
const navbarTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overelay]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElements(navbarTogglers, "click", toggleNav);

const closeNav = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElements(navbarLinks, "click", closeNav);

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
  backTopBtn.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});

const prices = document.querySelectorAll('.price');
const timerElement = document.createElement('div');
timerElement.style.cssText = 'text-align: center; margin: 20px auto; font-weight: bold; font-size: 1.2rem; color: #d9441d;';

// Вставляем таймер перед секцией .menu
const menuSection = document.querySelector('.section.menu');
if (menuSection && menuSection.parentNode) {
  menuSection.parentNode.insertBefore(timerElement, menuSection);
}

function generateRandomPrice(base, range = 100) {
  const randomOffset = Math.floor(Math.random() * (range * 2 + 1)) - range;
  return (base + randomOffset).toFixed(0) + "₽";
}

function updatePricesLive() {
  prices.forEach((priceEl) => {
    const base = parseFloat(priceEl.dataset.base);
    const range = parseFloat(priceEl.dataset.range) || 100;
    if (!isNaN(base)) {
      priceEl.textContent = generateRandomPrice(base, range);
    }
  });
  resetTimer();
}

// Таймер обратного отсчета
let interval = 10;
let countdown = interval;

function updateTimerDisplay() {
  timerElement.textContent = `Цены обновятся через ${countdown} сек.`;
  countdown--;
  if (countdown < 0) {
    updatePricesLive();
  }
}

function resetTimer() {
  countdown = interval;
}

setInterval(updateTimerDisplay, 1000);
updatePricesLive();

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});
