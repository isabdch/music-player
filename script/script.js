// get HTML elements and assign them to variables

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
let current_Time = document.getElementById("current-time");
let songSlider = document.getElementById("song-slider");
let totalDuration = document.getElementById("total-duration");

// volume-slider
let volumeSlider = document.getElementById("volume-slider");

// specify global variables values
let isPlaying = false;
let trackIndex = 0;
let updateTimer;

// create the audio element for the player
let currTrack = document.createElement("audio");

// define the list of tracks that have to be played
let trackList = [
  {
    name: "FKJ (Slowed)",
    artist: "Ylang Ylang",
    image: "./images/fkj.png",
    path: "./songs/Ylang Ylang - FKJ (Slowed-Reverb).mp3",
  },
  {
    name: "Let Go (Slowed)",
    artist: "Ark Patrol ft. Veronika Redd",
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
    name: "Gravity",
    artist: "EDEN",
    image: "./images/gravity.png",
    path: "./songs/EDEN - Gravity.mp3",
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
];
//

// add events to the elements
previousSong.addEventListener("click", prevTrack);
playPause.addEventListener("click", playPauseTrack);
nextSong.addEventListener("click", nextTrack);
songSlider.addEventListener("change", seekTo);
volumeSlider.addEventListener("change", setVolume);

// functions

// function to load new track from the tracklist
function loadTrack(trackIndex) {
  //clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();

  // load a new track
  currTrack.src = trackList[trackIndex].path;
  currTrack.load();

  //update details of the track
  songImg.src = trackList[trackIndex].image;
  songName.textContent = trackList[trackIndex].name;
  artistName.textContent = trackList[trackIndex].artist;
  nowPlaying.textContent =
    "Now playing " + (trackIndex + 1) + " of " + trackList.length;

  // set an interval of 1000 milliseconds (1 second) for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);

  // move to the next track if the current finishes playing using ended event
  currTrack.addEventListener("ended", nextTrack);
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
