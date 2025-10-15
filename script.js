const circular_slider = document.querySelector(".wrapper"),
  slides = document.querySelectorAll(".slides"),
  images = document.querySelectorAll(".slides img"),
  character_name = document.querySelector(".character-name"),
  descriptions_items = document.querySelectorAll(".descriptions_items");

slides.forEach((slide, i) => {
  slide.onclick = () => {
    circular_slider.style.transform = `rotateZ(-${(360 / 5) * (i + 4)}deg)`;
    character_name.classList.remove("active");

    character_name.textContent =
      descriptions_items[i].querySelector("h1").textContent;
    character_name.classList.add("active");

    images.forEach((img, i) => {
      img.style.setProperty("--img-no", 2);
      img.classList.remove("active");
      descriptions_items[i].classList.remove("active");
    });
    descriptions_items[i].classList.add("active");
    slide.querySelector("img").classList.add("active");
  };
});

const cards = Array.from(document.querySelectorAll(".card"));
const slider = document.getElementById("slider");
const pagination = document.getElementById("pagination");
let currentIndex = 3; // start with center card (4th one)
let startX = 0;
let isDragging = false;

// Create pagination dots
cards.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === currentIndex) dot.classList.add("active");
  dot.addEventListener("click", () => {
    currentIndex = i;
    updatePositions();
  });
  pagination.appendChild(dot);
});

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function updatePositions() {
  cards.forEach((card, i) => {
    card.className = "card hidden";
    const offset = (i - currentIndex + cards.length) % cards.length;

    if (offset === 0) card.className = "card center";
    else if (offset === 1) card.className = "card right1";
    else if (offset === 2) card.className = "card right2";
    else if (offset === 3) card.className = "card right3";
    else if (offset === cards.length - 1) card.className = "card left1";
    else if (offset === cards.length - 2) card.className = "card left2";
    else if (offset === cards.length - 3) card.className = "card left3";
  });

  updateDots();
}

function moveNext() {
  currentIndex = (currentIndex + 1) % cards.length;
  updatePositions();
}

function movePrev() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updatePositions();
}

updatePositions();

// Mouse drag
slider.addEventListener("mousedown", (e) => {
  startX = e.clientX;
  isDragging = true;
});

slider.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  const diff = e.clientX - startX;
  if (diff > 50) movePrev();
  else if (diff < -50) moveNext();
  isDragging = false;
});
