/* ================= VARIABLES & DATA TYPES ================= */
// let → variable (value can change)
let websiteName = "Melomaniac";//string

let songName = "Gayatri Mantra..";
songName = "Kanchi.. Kamakshi.. Amba.."; // reassigned

let price = 800;// Number → numeric value

let isUserLoggedIn = false;// Boolean → true/false

/* ================= ARRAY OF OBJECTS (PLAYLIST) ================= */
// Array → collection of items
// Object → key:value pair
let playlist = [
  {
    title: "Gayatri Mantra", // song name
    file: "tibet.mp3", // file path
  },
  {
    title: "Om Namah Shivaya",
    file: "shiva.mp3",
  },
  {
    title: "Nature Sound",
    file: "nature.mp3",
  },
];

// Track current song index
let currentSong = 0;

/* ================= DOM SELECTION ================= */
// document → whole HTML page
// getElementById → selects element by id
const audio = document.getElementById("audio-player");
const title = document.getElementById("song-title");
// Select FIRST button (play button) ID selector needs #
const playBtn = document.querySelector("#play-btn");

// querySelectorAll → selects multiple elements
const cards = document.querySelectorAll(".music-card[data-index]");

/* ================= FUNCTION → LOAD SONG ================= */
// Function → reusable block of code
function loadSong(index) {
  currentSong = index;// update current song
  // update audio source
  audio.src = playlist[index].file;
  // update title text
  title.innerText = playlist[index].title;

  // audio.play(); //auto play
  playBtn.innerText = "▶";//update button
  highlightCard(index);
}

/* ================= FUNCTION → PLAY / PAUSE ================= */
function toggleSong() {
  //audio.paused → true if paused(check if audio is paused)
  if (audio.paused) {
    audio.play(); // start playing
    // change button text
    playBtn.innerText = "⏸";
  } else {
    audio.pause(); // stop playing
    // change button text
    playBtn.innerText = "▶";
  }
}

/* ================= FUNCTION → NEXT SONG ================= */
function nextSong() {
  currentSong++; // increase index

  // if reached end → go to first song
  if (currentSong >= playlist.length) {
    currentSong = 0;
  }
  loadSong(currentSong); // load new song
}

/* ================= FUNCTION → PREVIOUS SONG ================= */
function prevSong() {
  currentSong--; // move backward

  // if below 0 → go to last song
  if (currentSong < 0) {
    currentSong = playlist.length - 1;
  }
  loadSong(currentSong); // load new song
}

cards.forEach((card) => {
   // add click event
  card.addEventListener("click", () => {
     // get data-index value
    const index = card.getAttribute("data-index");
    loadSong(index);// load that song
  });
});

/* ================= ACTIVE CARD UI ================= */
function highlightCard(index) {
   // remove active class from all
  cards.forEach((card) => {
    card.classList.remove("active");
  });
    // add active class to clicked
  cards[index].classList.add("active");
}

// /* ================= EXTRA DOM MANIPULATION ================= */
// title.innerText = "Sri Anjaneyam";// Change title dynamically
// title.style.color = "red";// Change style using JS
// audio.src = "tibet.mp3";// Change audio manually
// button.addEventListener("click", toggleSong);//EVENT LISTENER----Add click event to button
// /* ================= CONSOLE (FOR DEBUGGING) ================= */
// console.log(websiteName);
