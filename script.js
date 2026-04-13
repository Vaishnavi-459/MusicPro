/* ================= VARIABLES & DATA TYPES ================= */

// String → text value
let websiteName = "Melomaniac";

// let → value can change later
let songName = "Gayatri Mantra..";
songName = "Kanchi.. Kamakshi.. Amba.."; // updated value

// Number → numeric value
let price = 800;

// Boolean → true/false
let isUserLoggedIn = false;


/* ================= ARRAY OF OBJECTS (PLAYLIST) ================= */
// Array → collection of items
// Object → key:value pair

let playlist = [
  {
    title: "Gayatri Mantra",   // song name
    file: "tibet.mp3",         // file path
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

// Select audio element using ID
const audio = document.getElementById("audio-player");

// Select title element
const title = document.getElementById("song-title");

// Select FIRST button (play button)
const button = document.querySelector("button");


/* ================= FUNCTION → LOAD SONG ================= */
// Function → reusable block of code

function loadSong(index) {
  // update audio source
  audio.src = playlist[index].file;

  // update title text
  title.innerText = playlist[index].title;
}


/* ================= FUNCTION → PLAY / PAUSE ================= */

function toggleSong() {
  // check if audio is paused
  if (audio.paused) {
    audio.play(); // play song

    // change button text
    button.innerText = "Pause ⏸";
  } else {
    audio.pause(); // pause song

    // change button text
    button.innerText = "Play ▶";
  }
}


/* ================= FUNCTION → NEXT SONG ================= */

function nextSong() {
  currentSong++; // move forward

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


/* ================= EXTRA DOM MANIPULATION ================= */

// Change title dynamically
title.innerText = "Sri Anjaneyam";

// Change style using JS
title.style.color = "red";

// Change audio manually
audio.src = "tibet.mp3";


/* ================= EVENT LISTENER ================= */

// Add click event to button
button.addEventListener("click", toggleSong);


/* ================= CONSOLE (FOR DEBUGGING) ================= */

console.log(websiteName);
console.log(songName);
console.log(price);
console.log(isUserLoggedIn);
console.log(playlist);