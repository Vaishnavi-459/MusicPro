/* ================= VARIABLES & DATA TYPES ================= */

// let → variable (value can change)
let websiteName = "Melomaniac"; // string → text

let songName = "Gayatri Mantra.."; // initial value
songName = "Kanchi.. Kamakshi.. Amba.."; // reassigned value

let price = 800; // number → numeric value

// user login state (default false)
let isLoggedIn = false;

/* ================= PLAYLIST (ARRAY OF OBJECTS) ================= */

// Array → collection of items
// Object → key:value pairs

let playlist = [
  { title: "Gayatri Mantra", file: "tibet.mp3" },
  { title: "Om Namah Shivaya", file: "shiva.mp3" },
  { title: "Nature Sound", file: "nature.mp3" },
];

// stores currently selected song index
let currentSong = 0;

/* ================= DOM SELECTION ================= */

// selecting elements from HTML
const audio = document.getElementById("audio-player"); // audio element
const title = document.getElementById("song-title"); // song title text
const playBtn = document.getElementById("play-btn"); // play button
const favBtn = document.getElementById("fav-btn"); // ❤️ button

// select all music cards having data-index
const cards = document.querySelectorAll(".music-card[data-index]");

/* ================= LOAD SONG FUNCTION ================= */

// loads selected song into player
function loadSong(index) {
  currentSong = index; // update current song index

  audio.src = playlist[index].file; // set audio source
  title.innerText = playlist[index].title; // update UI text

  playBtn.innerText = "▶"; // reset play button
  highlightCard(index); // highlight selected card
}

/* ================= PLAY / PAUSE ================= */

function toggleSong() {
  // 🚫 block if user not logged in
  if (!isLoggedIn) {
    showLoginWarning(); // show UI warning
    return;
  }

  // check if paused
  if (audio.paused) {
    audio.play(); // start playing
    playBtn.innerText = "⏸"; // update button
  } else {
    audio.pause(); // stop playing
    playBtn.innerText = "▶"; // update button
  }
}

/* ================= NEXT / PREVIOUS ================= */

// next song
function nextSong() {
  currentSong++;

  // loop back to first
  if (currentSong >= playlist.length) {
    currentSong = 0;
  }

  loadSong(currentSong);
}

// previous song
function prevSong() {
  currentSong--;

  // go to last if below 0
  if (currentSong < 0) {
    currentSong = playlist.length - 1;
  }

  loadSong(currentSong);
}

/* ================= CLICK EVENTS ON CARDS ================= */

cards.forEach((card) => {
  card.addEventListener("click", function () {
    // 🚫 login check before playing
    if (!isLoggedIn) {
      showLoginWarning();
      return;
    }

    // get index from HTML attribute
    const index = Number(card.getAttribute("data-index"));

    loadSong(index); // load clicked song
  });
});

/* ================= ACTIVE CARD UI ================= */

// highlight selected card
function highlightCard(index) {
  cards.forEach((card) => {
    card.classList.remove("active"); // remove old highlight
  });

  cards[index].classList.add("active"); // add new highlight
}

/* ================= PROGRESS BAR ================= */

const progress = document.getElementById("progress");

// update progress while playing
audio.addEventListener("timeupdate", function () {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

// seek song when user drags slider
progress.addEventListener("input", function () {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

/* ================= VOLUME CONTROL ================= */

const volume = document.getElementById("volume");

volume.addEventListener("input", function () {
  audio.volume = volume.value; // set volume (0–1)
});

/* ================= AUTO NEXT SONG ================= */

audio.addEventListener("ended", function () {
  nextSong(); // automatically play next
});

/* ================= FAVORITES (LOCAL STORAGE) ================= */

// load favorites from storage OR empty array
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// favorite button click
favBtn.addEventListener("click", function () {
  const song = playlist[currentSong];

  // check if already exists
  const exists = favorites.find((s) => s.title === song.title);

  if (exists) {
    // remove
    favorites = favorites.filter((s) => s.title !== song.title);
    favBtn.innerText = "🤍";
  } else {
    // add
    favorites.push(song);
    favBtn.innerText = "❤️";
  }

  // save to localStorage
  localStorage.setItem("favorites", JSON.stringify(favorites));
});

/* ================= LOGIN SHOW / HIDE ================= */

const loginSection = document.getElementById("login-section");

// toggle login visibility
function toggleLogin() {
  loginSection.style.display =
    loginSection.style.display === "none" ? "block" : "none";
}

/* ================= LOGIN HANDLER ================= */

function handleLogin(e) {
  e.preventDefault(); // stop page refresh

  const btn = document.getElementById("login-btn");

  // logout case
  if (isLoggedIn) {
    isLoggedIn = false;
    localStorage.removeItem("isLoggedIn");
    btn.innerText = "Login";
    document.getElementById("welcome-msg").innerText = "";
    return;
  }

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // validations
  if (email === "" || password === "") {
    alert("All fields required");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Invalid email");
    return;
  }

  if (password.length < 6) {
    alert("Password must be 6+ chars");
    return;
  }

  // login success
  isLoggedIn = true;
  localStorage.setItem("isLoggedIn", "true");

  btn.innerText = "Logout";
  document.getElementById("welcome-msg").innerText = "Welcome User 👋";
}

/* ================= PAGE LOAD ================= */

window.onload = function () {
  // restore login
  if (localStorage.getItem("isLoggedIn") === "true") {
    isLoggedIn = true;
    document.getElementById("login-btn").innerText = "Logout";
    document.getElementById("welcome-msg").innerText = "Welcome User 👋";
  }

  // restore favorites
  favorites = JSON.parse(localStorage.getItem("favorites")) || [];
};

/* ================= DARK MODE ================= */

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("change", function () {
  document.body.classList.toggle("dark", themeToggle.checked);
});

/* ================= LOGIN WARNING BOX ================= */

function showLoginWarning() {
  const box = document.getElementById("login-warning");

  box.style.display = "block"; // show

  // scroll to login
  document.getElementById("login-section").scrollIntoView({
    behavior: "smooth",
  });

  // hide after 3 sec
  setTimeout(() => {
    box.style.display = "none";
  }, 3000);
}

/* ================= FILE UPLOAD ================= */

function uploadFile() {
  const fileInput = document.getElementById("file-upload");
  const file = fileInput.files[0];

  if (!file) {
    alert("Select file first");
    return;
  }

  // create temporary URL
  const fileURL = URL.createObjectURL(file);

  // add to playlist
  playlist.push({
    title: file.name,
    file: fileURL,
  });

  alert("Uploaded successfully ✅");
}
