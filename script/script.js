// get HTML elements and assign them to variables
let body = document.getElementsByTagName("body")[0];
let gb = document.getElementById("github");

// info
let nowPlaying = document.getElementById("now-playing");
let songImg = document.getElementById("img-song");
let songName = document.getElementById("song-name");
let artistName = document.getElementById("artist-name");

// buttons
let randomSong = document.getElementById("random-song");
let previousSong = document.getElementById("song-previous");
let playPause = document.getElementById("pause-play");
let nextSong = document.getElementById("song-next");
let repeatSong = document.getElementById("repeat-song");

// song-slider
let current_Time = document.getElementById("current-time");
let songSlider = document.getElementById("song-slider");
let totalDuration = document.getElementById("total-duration");

// volume-slider
let volumeSlider = document.getElementById("volume-slider");

// specify global variables values
let isPlaying = false;
let randomSg = false;
let trackIndex = 0;
let updateTimer;

// create the audio element for the player
let currTrack = document.createElement("audio");

// define the list of tracks that have to be played
let trackList = [
  {
    name: "Ylang Ylang (Slowed)",
    artist: "FKJ",
    image: "./images/ylang-ylang.png",
    link: "https://open.spotify.com/artist/2FwDTncULUnmANIh7qKa5z",
    path: "./songs/FKJ - Ylang Ylang (Slowed-Reverb).mp3",
    artistnamecolor: "#65c995",
    darkcolor: "#7EDAAA",
    backgroundColorGradient: "linear-gradient(to right, #FAFFD1, #A1FFCE)",
    github: "./images/github.png",
  },
  {
    name: "Let Go (Slowed)",
    artist: "Ark Patrol ft. Veronika Redd",
    image: "./images/let-go.png",
    link: "https://open.spotify.com/artist/3zaxUd86U92CdZkNa6NUo9",
    path: "./songs/Ark Patrol - Let Go.mp3",
    artistnamecolor: "#c95038",
    darkcolor: "#dd664e",
    backgroundColorGradient: "linear-gradient(to right, #faeae2, #dd664e)",
    github: "./images/github1.png",
  },
  {
    name: "Love Unlimited",
    artist: "Blackbird Blackbird",
    image: "./images/love-unlimited.png",
    link: "https://open.spotify.com/artist/2TWKl87Jnmd5MApKEpVCxA",
    path: "./songs/Blackbird Blackbird - Love Unlimited.mp3",
    artistnamecolor: "#1b86bf",
    darkcolor: "#389bd1",
    backgroundColorGradient: "linear-gradient(to right, #dce8f2, #4bb5ed)",
    github: "./images/github2.png",
  },
  {
    name: "love, death, distraction",
    artist: "EDEN",
    image: "./images/love-death-distraction.png",
    link: "https://open.spotify.com/artist/1t20wYnTiAT0Bs7H1hv9Wt",
    path: "./songs/EDEN - love, death, distraction.mp3",
    artistnamecolor: "#7db3ae",
    darkcolor: "#8fc7c2",
    backgroundColorGradient: "linear-gradient(to right, #fff0dd, #97d4ee)",
    github: "./images/github3.png",
  },
  {
    name: "Poison Tree",
    artist: "Grouper",
    image: "./images/poison-tree.png",
    link: "https://open.spotify.com/artist/31uyAcnY0kjjKKIQZMKX4i",
    path: "./songs/Grouper - Poison Tree.mp3",
    artistnamecolor: "#000000",
    darkcolor: "#363832",
    backgroundColorGradient: "linear-gradient(to left, #6d6027, #d3cbb8)",
    github: "./images/github4.png",
  },
  {
    name: "Comfort Chain",
    artist: "Instupendo",
    image: "./images/comfort-chain.png",
    link: "https://open.spotify.com/artist/3ctnkEZGtVBTxS7IMin8nC",
    path: "./songs/Instupendo - Comfort Chain.mp3",
    artistnamecolor: "#966bb0",
    darkcolor: "#ab6fd1",
    backgroundColorGradient:
      "linear-gradient(to left, #a770ef, #cf8bf3, #fdb99b)",
    github: "./images/github5.png",
  },
  {
    name: "Gravity",
    artist: "EDEN",
    image: "./images/gravity.png",
    link: "https://open.spotify.com/artist/1t20wYnTiAT0Bs7H1hv9Wt",
    path: "./songs/EDEN - Gravity.mp3",
    artistnamecolor: "#313157",
    darkcolor: "#4b4b6b",
    backgroundColorGradient: "linear-gradient(to right, #eee5de, #25425b)",
    github: "./images/github6.png",
  },
  {
    name: "Forever",
    artist: "Labirinth",
    image: "./images/forever.png",
    link: "https://open.spotify.com/artist/2feDdbD5araYcm6JhFHHw7",
    path: "./songs/Labrinth – Forever.mp3",
    artistnamecolor: "#779aa3",
    darkcolor: "#97b5bd",
    backgroundColorGradient:
      "linear-gradient(to left, #cc95c0, #dbd4b4, #7aa1d2)",
    github: "./images/github7.png",
  },
  {
    name: "Goodbye",
    artist: "Ramsey",
    image: "./images/goodbye.png",
    link: "https://open.spotify.com/artist/1se3w7gpZkwcJYgHSPDoQ8",
    path: "./songs/Ramsey - Goodbye.mp3",
    artistnamecolor: "#45352b",
    darkcolor: "#59473c",
    backgroundColorGradient: "linear-gradient(to left, #394a92, #fdbb2d)",
    github: "./images/github8.png",
  },
  {
    name: "Yellow Box",
    artist: "The Neighbourhood",
    image: "./images/yellow-box.png",
    link: "https://open.spotify.com/artist/77SW9BnxLY8rJ0RciFqkHh",
    path: "./songs/The Neighbourhood - Yellow Box.mp3",
    artistnamecolor: "#000000",
    darkcolor: "#595959",
    backgroundColorGradient: "linear-gradient(to left, #d0d1c5, #f2f2f2)",
    github: "./images/github4.png",
  },
];
//

// add events to the elements
randomSong.addEventListener("click", randomS);
previousSong.addEventListener("click", prevTrack);
playPause.addEventListener("click", playPauseTrack);
nextSong.addEventListener("click", nextTrack);
repeatSong.addEventListener("click", songLoop);
songSlider.addEventListener("change", seekTo);
volumeSlider.addEventListener("change", setVolume);

// functions
function randomS() {
  if (randomSg == false) {
    randomSg = true;
    randomSong.classList.replace("fad", "fas");
  } else {
    randomSg = false;
    randomSong.classList.replace("fas", "fad");
  }
}
//

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function songLoop() {
  if (currTrack.loop == false) {
    currTrack.setAttribute("loop", true);
    repeatSong.classList.replace("fad", "fas");
    repeatSong.classList.replace("fa-repeat", "fa-repeat-1");
  } else {
    currTrack.removeAttribute("loop");
    repeatSong.classList.replace("fas", "fad");
    repeatSong.classList.replace("fa-repeat-1", "fa-repeat");
  }
}

// function to load new track from the tracklist
function loadTrack(trackIndex) {
  //clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();

  let rN = randomNumber(0, 9);

  if (randomSg == false) {
    // load a new track
    currTrack.src = trackList[trackIndex].path;
    currTrack.load();

    //update details of the track and page appearance
    body.style.background = trackList[trackIndex].backgroundColorGradient;
    songImg.style.boxShadow =
      "10px 8px 0px" + trackList[trackIndex].artistnamecolor;
    songImg.style.border = "3px solid" + trackList[trackIndex].darkcolor;
    songImg.src = trackList[trackIndex].image;
    gb.src = trackList[trackIndex].github;
    songSlider.style.setProperty(
      "--track-background",
      trackList[trackIndex].darkcolor
    );
    volumeSlider.style.setProperty(
      "--track-background",
      trackList[trackIndex].darkcolor
    );
    songName.textContent = trackList[trackIndex].name;
    artistName.textContent = trackList[trackIndex].artist;
    artistName.addEventListener("mouseover", function () {
      artistName.style.color = trackList[trackIndex].artistnamecolor;
    });
    artistName.addEventListener("mouseout", function () {
      artistName.style.color = "#000000c0";
    });
    nowPlaying.textContent =
      "Now playing " + (trackIndex + 1) + " of " + trackList.length;
    artistName.setAttribute("href", trackList[trackIndex].link);

    // set an interval of 1000 milliseconds (1 second) for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // move to the next track if the current finishes playing using ended event
    currTrack.addEventListener("ended", nextTrack);
  } else {
    // load a new track
    currTrack.src = trackList[rN].path;
    currTrack.load();

    //update details of the track and page appearance
    body.style.background =
      trackList[rN].backgroundColorGradient;
    songImg.style.boxShadow =
      "10px 8px 0px" + trackList[rN].artistnamecolor;
    songImg.style.border =
      "3px solid" + trackList[rN].darkcolor;
    songImg.src = trackList[rN].image;
    gb.src = trackList[rN].github;
    songSlider.style.setProperty(
      "--track-background",
      trackList[rN].darkcolor
    );
    volumeSlider.style.setProperty(
      "--track-background",
      trackList[rN].darkcolor
    );
    songName.textContent = trackList[rN].name;
    artistName.textContent = trackList[rN].artist;
    artistName.addEventListener("mouseover", function () {
      artistName.style.color = trackList[rN].artistnamecolor;
    });
    artistName.addEventListener("mouseout", function () {
      artistName.style.color = "#000000c0";
    });
    nowPlaying.textContent =
      "Now playing " + (rN + 1) + " of " + trackList.length;
    artistName.setAttribute("href", trackList[rN].link);

    // set an interval of 1000 milliseconds (1 second) for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // move to the next track if the current finishes playing using ended event
    currTrack.addEventListener("ended", nextTrack);
  }
}
//

// function to reset all values to their default
function resetValues() {
  current_Time.textContent = "00:00";
  totalDuration.textContent = "00:00";
  songSlider.value = 0;
}
//

// load the first track in the tracklist
loadTrack(trackIndex);

function playPauseTrack() {
  // switch between playing and pausing depending on the current state
  if (!isPlaying) {
    playTrack();
  } else {
    pauseTrack();
  }
}
//

function playTrack() {
  // play the loaded track
  currTrack.play();
  isPlaying = true;

  // replace icon with the pause icon
  playPause.classList.remove("fa-play-circle");
  playPause.classList.add("fa-pause-circle");
}
//

function pauseTrack() {
  // pause the loaded track
  currTrack.pause();
  isPlaying = false;

  // replace icon with the play icon
  playPause.classList.remove("fa-pause-circle");
  playPause.classList.add("fa-play-circle");
}

function nextTrack() {
  // go back to the first track if the current one is the last in the track list
  if (trackIndex < trackList.length - 1) {
    trackIndex += 1;
  } else {
    trackIndex = 0;
  }

  // load and play the new track
  loadTrack(trackIndex);
  playTrack();
}

function prevTrack() {
  // go back to the last track if the current one is the first in the track list
  if (trackIndex > 0) {
    trackIndex -= 1;
  } else {
    trackIndex = trackList.length - 1;
  }

  // load and play the new track
  loadTrack(trackIndex);
  playTrack();
}

function seekTo() {
  // calculate the seek position by the percentage of the seek slider and get the relative duration to the track
  let seekto = currTrack.duration * (songSlider.value / 100);

  // set the current track position to the calculated seek position;
  currTrack.currentTime = seekto;
}

function setVolume() {
  // set volume acording to the percentage of the volume slider set
  currTrack.volume = volumeSlider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  // check if the current track duration is a legible number
  if (!isNaN(currTrack.duration)) {
    seekPosition = currTrack.currentTime * (100 / currTrack.duration);
    songSlider.value = seekPosition;

    // calculate the time left and the total duration
    let currentMinutes = Math.floor(currTrack.currentTime / 60);
    let currentSeconds = Math.floor(
      currTrack.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(currTrack.duration / 60);
    let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);

    // add a zero to the single digit time values
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    // display the updated duration
    current_Time.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
//
