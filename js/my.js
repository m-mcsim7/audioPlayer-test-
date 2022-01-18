const player = document.querySelector(".wrapper");
const playBtn = document.querySelector(".box__play");
const prevBtn = document.querySelector(".box__previous");
const nextBtn = document.querySelector(".box__next");
const audio = document.querySelector(".audio");
const progressContainer = document.querySelector(".box__progress-container");
const progress = document.querySelector(".box__progress");
const cover = document.querySelector(".cover");
const background = document.querySelector(".background");
const artist = document.querySelector(".box__artist");
const title = document.querySelector(".box__song");
const currentTime = document.querySelector(".box__current-time");
const durationTime = document.querySelector(".box__duration-time");

// Название песен
const songs = ["assets/audio/beyonce.mp3", "assets/audio/dontstartnow.mp3"]; // object storing paths for audio objects
const coverImg = ["assets/img/lemonade.png", "assets/img/dontstartnow.png"]; // object storing paths for album covers and backgrounds
const songArtists = ["Beyonce", "Dua Lipa"]; // object storing track artists
const songTitles = ["Don't Hurt Yourself", "Don't Start Now"];

// Песня по умолчанию
let songIndex = 1;

// Init
function loadSong(song) {
  artist.innerHTML = songArtists[songIndex];
  title.innerHTML = songTitles[songIndex];
  audio.src = songs[songIndex];
  cover.src = coverImg[songIndex];
  background.src = coverImg[songIndex];
}
loadSong(songs[songIndex]);

// Play

function playSong() {
  player.classList.add("play");
  cover.classList.add("active");
  playBtn.src = "assets/svg/pause.png";
  audio.play();
}
// Pause

function pauseSong() {
  player.classList.remove("play");
  cover.classList.remove("active");
  playBtn.src = "assets/svg/play.png";
  audio.pause();
}
playBtn.addEventListener("click", () => {
  let isPlaying = player.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
nextBtn.addEventListener("click", nextSong);

// Previos Song
function previosSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
prevBtn.addEventListener("click", previosSong);

//Progress Bar
function updateProgress(event) {
  const { duration, currentTime } = event.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}
audio.addEventListener("timeupdate", updateProgress);

// Set Progress

function setProgress(event) {
  const width = this.clientWidth;
  let clickX = event.offsetX;
  duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener("click", setProgress);

// Auto Play

audio.addEventListener("ended", nextSong);

//Время трека
function updateProgressValue() {
  durationTime.innerHTML = time(Math.floor(audio.duration));
  currentTime.innerHTML = time(Math.floor(audio.currentTime))
}

function time(event) {
  let min = Math.floor(event / 60);
  let sec = Math.floor((event % 60));
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

setInterval(() => updateProgressValue(), 1000)


