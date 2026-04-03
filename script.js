//Varibales,Datatypes
let websiteName = "Melomaniac"; //String
let songName = "Gayatri Mantra.."; // let example(value can change)
songName = "Kanchi.. Kamakshi.. Amba..";
let price = 800;
// const price = 800;// const example (fixed value) //Number
// price = 1000; // ❌ ERROR
// var userName = "Guest";// var (not recommended)
let isUserLoggedIn = false;
// ================= PLAYLIST ARRAY =================
// Array of objects (REAL PROJECT STRUCTURE)

const songs = [
  {
    title: "Gayatri Mantra",
    src: "tibet.mp3",
  },
  {
    title: "Om Namah Shiva",
    src: "shiva.mp3",
  },
  {
    title: "Nature Sound",
    src: "nature.mp3",
  },
];

let user = {
  name: "Guest",
  email: "guest@gmail.com",
};

console.log(songs);

//Functions
const audio = document.getElementById("audio-player");

// function playSong(){
//   audio.play();
//   console.log("song is playing");
// }
// function pauseSong(){
//   audio.pause();
//   console.log("song is paused");
// }
// =====================OR=================//
// function toggleSong() {
//   if (audio.paused) audio.play();
//   console.log("playing");
//   if (audio.play) audio.pause();
//   console.log("paused");
// }
// =====================OR=================//
function toggleSong() {
  const btn = document.querySelector("button");
  if (audio.paused) {
    audio.play();
    btn.innerText = "Pause ⏸";
  } else {
    audio.pause();
    btn.innerText = "play ▶";
  }
}

let playlist = [
  {
    title: "Gayatri Mantra",
    file: "tibet.mp3",
  },
  {
    title: "om namah shivaya",
    file: "shiva.mp3",
  },
  {
    title: "nature sound",
    file: "nature.mp3",
  },
];
let currentSong = 0;

function loadSong(index) {
  const audio = document.getElementById("audio-player");
  const title = document.getElementById("song-title");

  audio.src = playlist[index].file;
  title.innerText = playlist[index].title;
}

function nextSong() {
  currentSong++;
  if (currentSong >= playlist.length) {
    currentSong = 0;
  }
  loadSong(currentSong);
}

function prevSong() {
  currentSong--;
  if (currentSong < 0) {
    currentSong = playlist.length - 1;
  }
  loadSong(currentSong);
}
