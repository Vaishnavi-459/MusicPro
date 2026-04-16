/* ================= VARIABLES & DATA TYPES ================= */
// let → variable (value can change)
let websiteName = "Melomaniac"; //string

let songName = "Gayatri Mantra..";
songName = "Kanchi.. Kamakshi.. Amba.."; // reassigned

let price = 800; // Number → numeric value
let isUserLoggedIn = false; // Boolean → true/false (user login state)

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

//currentSong → stores index of current playing song(Track current song index)
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
  currentSong = index; // update current song
  // update audio source
  audio.src = playlist[index].file;
  // update UI text
  title.innerText = playlist[index].title;

  // audio.play(); //auto play
  playBtn.innerText = "▶"; //update button
  highlightCard(index);// highlight selected card
}

/* ================= FUNCTION → PLAY / PAUSE ================= */
function toggleSong() {
  if (!isLoggedIn) {
    alert("Please login first ❌");
    return; // stop function
  }
  //audio.paused → true if paused(check if audio is paused)
  if (audio.paused) {
    audio.play(); // start playing
    // change button text
    playBtn.innerText = "⏸";// update button
  } else {
    audio.pause(); // stop playing
    // change button text
    playBtn.innerText = "▶";// update button
  }
}

/* ================= FUNCTION → NEXT SONG ================= */
function nextSong() {
  currentSong++; // increase index

  // if reached end → go to first song
  if (currentSong >= playlist.length) {
    currentSong = 0;// loop to first
  }
  loadSong(currentSong); // load new song
}

/* ================= FUNCTION → PREVIOUS SONG ================= */
function prevSong() {
  currentSong--; // move backward

  // if below 0 → go to last song
  if (currentSong < 0) {
    currentSong = playlist.length - 1;// go to last
  }
  loadSong(currentSong); // load new song
}

cards.forEach((card) => {
  // add click event
  card.addEventListener("click", function () {
    //getAttribute() returns STRING, but array needs NUMBER
    const index = Number(card.getAttribute("data-index")); // convert string → number
    loadSong(index);  // load clicked song
  });
});

/* ================= ACTIVE CARD UI ================= */
function highlightCard(index) {
  // remove active class from all
  cards.forEach((card) => {
    card.classList.remove("active");// remove highlight
  });
  // add active class to clicked
  cards[index].classList.add("active");// add highlight
}
// /* ================= EXTRA DOM MANIPULATION ================= */
// title.innerText = "Sri Anjaneyam";// Change title dynamically
// title.style.color = "red";// Change style using JS
// audio.src = "tibet.mp3";// Change audio manually
// button.addEventListener("click", toggleSong);//EVENT LISTENER----Add click event to button
// /* ================= CONSOLE (FOR DEBUGGING) ================= */
// console.log(websiteName);

/* ================= EXTRA DOM ELEMENTS ================= */
// progress bar
const progress = document.getElementById("progress");
// event → when song ends
// update progress while song plays
audio.addEventListener("timeupdate", function () {
  // current time / total duration
  progress.value = (audio.currentTime / audio.duration) * 100;
});

// when user drags progress → change song time
progress.addEventListener("input", function () {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// volume control
const volume = document.getElementById("volume");
// change volume when slider moves
volume.addEventListener("input", function () {
  audio.volume = volume.value;//set volume
});

/* ================= AUTO NEXT SONG ================= */
audio.addEventListener("ended", function () {
  nextSong(); // go to next automatically
});


/* ================= FAVORITE SONG ================= */
// store favorite songs
let favorites = [];
// favorite button
const favBtn = document.getElementById("fav-btn");

favBtn.addEventListener("click", function () {
  const song = playlist[currentSong];//current song
  // check if already added
  const exists = favorites.find((s) => s.title === song.title);
  // check if already exists
  if (exists) {
    // remove from favorites
    favorites = favorites.filter((s) => s.title !== song.title);
    favBtn.innerText = "🤍"; // empty heart
  } else {
    // add to favorites
    favorites.push(song);
    favBtn.innerText = "❤️"; // filled heart
  }
  console.log("Favorites:", favorites);
});

/* ================= SHOW / HIDE LOGIN ================= */
const loginSection = document.getElementById("login-section");
function toggleLogin() {
  if (loginSection.style.display === "none") {
    loginSection.style.display = "block"; // show
  } else {
    loginSection.style.display = "none"; // hide
  }
}

let isLoggedIn = false; // user state
function handleLogin(e) {
   e.preventDefault(); // 🚀 stops page reload
 const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // condition checks
  if (email === "" || password === "") {
    alert("All fields are required ❌");
    return;
  }

  if (!email.includes("@")) {
    alert("Invalid email ❌");
    return;
  }

  if (password.length < 6) {
    alert("Password must be 6+ characters ❌");
    return;
  }
  isLoggedIn = true; // ✅ user logged in
  document.getElementById("login-btn").innerText = "Logout";

  alert("Login successful ✅");
}
/* ================= DARK / LIGHT THEME (JS) ================= */

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("change", function () {

  if (themeToggle.checked) {
    document.body.classList.add("dark"); // apply dark
  } else {
    document.body.classList.remove("dark"); // remove dark
  }
});
