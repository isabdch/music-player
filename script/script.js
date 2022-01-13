// get HTML elements
// info
let nowPlaying = document.getElementById("now-playing");
let songImg = document.getElementById("img-song");
let songName = document.getElementById("song-name");
let artistName = document.getElementById("artist-name");
// buttons
let previousSong = document.getElementById("song-previous");
let playPause = document.getElementById("pause-play");
let nextSong = document.getElementById("song-next");
// song-slider
let currentTime = document.getElementsByClassName("current-time")[0];
let songSlider = document.getElementsByClassName("song-slider")[0];
let totalDuration = document.getElementsByClassName("total-duration")[0];
// volume-slider
let volumeSlider = document.getElementsByClassName("volume-slider")[0];
// variables
let isPlaying = false;
let trackIndex = 0;
let updateTimer;
let audio = document.createElement("audio");
let trackList = [
  {
    name: "Let Go",
    artist: "Ark Patrol",
    image: "./images/let-go.png",
    path: "./songs/Ark Patrol - Let Go.mp3",
  },
  {
    name: "Love Unlimited",
    artist: "Blackbird Blackbird",
    image: "./images/love-unlimited.png",
    path: "./songs/Blackbird Blackbird - Love Unlimited.mp3",
  },
  {
    name: "Gravity",
    artist: "EDEN",
    image: "./images/gravity.png",
    path: "./songs/EDEN - Gravity.mp3",
  },
  {
    name: "love, death, distraction",
    artist: "EDEN",
    image: "./images/love-death-distraction.png",
    path: "./songs/EDEN - love, death, distraction.mp3",
  },
  {
    name: "Poison Tree",
    artist: "Grouper",
    image: "./images/poison-tree.png",
    path: "./songs/Grouper - Poison Tree.mp3",
  },
  {
    name: "Comfort Chain",
    artist: "Instupendo",
    image: "./images/comfort-chain.png",
    path: "./songs/Instupendo - Comfort Chain.mp3",
  },
  {
    name: "Forever",
    artist: "Labirinth",
    image: "./images/forever.png",
    path: "./songs/Labrinth – Forever.mp3",
  },
  {
    name: "Goodbye",
    artist: "Ramsey",
    image: "./images/goodbye.png",
    path: "./songs/Ramsey - Goodbye.mp3",
  },
  {
    name: "Yellow Box",
    artist: "The Neighbourhood",
    image: "./images/yellow-box.png",
    path: "./songs/The Neighbourhood - Yellow Box.mp3",
  },
  {
    name: "FKJ (Slowed)",
    artist: "Ylang Ylang",
    image: "./images/fkj.png",
    path: "./songs/Ylang Ylang - FKJ (Slowed-Reverb).mp3",
  },
];
