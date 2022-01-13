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
    {}
]