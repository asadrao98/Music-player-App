// -------------Music Notes--------------

var audio1 = new Audio("Music/Everyday-Life-Coldplay.mp3");
var audio2 = new Audio("Music/Babel-gustavo.mp3");
var audio3 = new Audio("Music/Excuse-AP-Dhillon.mp3");
var audio4 = new Audio("Music/Ma-Belle-AP-Dhillon.mp3");
var audio5 = new Audio("Music/GTA-SA-Japanese-ringtone.mp3");

// get html element

var mainContainer = document.getElementById("main-Container");
var title = document.getElementById("song-title");
var bgImg = document.getElementById("background-img");
var playPauseBtn = document.getElementById("play-pause");
var prevPlay = document.getElementById("backward");
var nextPlay = document.getElementById("forward");
var seekSlider = document.getElementById("seek-slider");
var startTime = document.getElementById("start-time");
var seekTime = document.getElementById("seek-time");

var i = 0; // for indexing
var flag = false; // for play pause
var flag2 = false; // for song duration update
var flag3 = false;
var seek; // for assigning song length
var seekto; // for playing song on seeking point
var songDuration; // for getting song length

var musicList = [
  {
    name: "Everyday Life - Coldplay",
    music: audio1,
    bgColor: "rgb(218, 93, 47)",
  },
  {
    name: "Babel - Gustavo",
    music: audio2,
    bgColor: "rgb(97, 161, 186)",
  },
  {
    name: "Excuses - AP Dhillon",
    music: audio3,
    bgColor: "rgb(218, 93, 47)",
  },
  {
    name: "Ma Belle - AP Dhillon",
    music: audio4,
    bgColor: "rgb(97, 161, 186)",
  },
  {
    name: "GTA SA japanese ",
    music: audio5,
    bgColor: "rgb(229, 181, 36)",
  },
];

var playPause = function () {
  var timer;
  var newTitle = document.createTextNode(musicList[i].name);
  title.innerHTML = "";
  title.appendChild(newTitle);

  if (flag === false) {
    timer = setInterval(currentTime, 500);
    musicList[i].music.play();
    flag = true;
    playPauseBtn.style.background =
      "aliceblue url('https://img.icons8.com/ios-glyphs/30/000000/pause--v1.png') no-repeat center";
  } else {
    clearInterval(timer);
    musicList[i].music.pause();
    flag = false;
    playPauseBtn.style.background =
      "aliceblue url('https://img.icons8.com/android/24/000000/play.png') no-repeat center";
  }
  updateTime();
};

var prevSongPlay = function () {
  if (flag === true) {
    if (i === 0) {
      i = musicList.length - 1;
      flag3 = true;
    }
    if (i === musicList.length - 1) {
      musicList[0].music.pause();
    }

    if (i >= 0) {
      if (flag3 !== true) {
        i--;
        musicList[i + 1].music.pause();
        musicList[i + 1].music.currentTime = 0;
      }
      flag2 = false;
      document.getElementById("seek-time").remove();
      updateTime();
      var newTitle = document.createTextNode(musicList[i].name);
      title.innerHTML = "";
      title.appendChild(newTitle);
      musicList[i].music.play();
      flag3 = false;
    }
  }
};

var nextSongPlay = function () {
  if (flag === true) {
    let lengthOfList = musicList.length;

    if (i < musicList.length) {
      if (flag3 !== true) {
        i++;
        musicList[i - 1].music.pause();
        musicList[i - 1].music.currentTime = 0;
      }
      flag2 = false;
      document.getElementById("seek-time").remove();
      updateTime();
      currentTime();
      var newTitle = document.createTextNode(musicList[i].name);
      title.innerHTML = "";
      title.appendChild(newTitle);
      musicList[i].music.play();
      flag3 = false;
    }
    if (i === 0) {
      musicList[lengthOfList - 1].music.pause();
    }
    if (i === musicList.length - 1) {
      i = 0;
      flag3 = true;
    }
  }
};

function currentTime() {
  document.getElementById("start-time").remove();
  var currentMinute = Math.floor(musicList[i].music.currentTime / 60);
  var currentSecond = musicList[i].music.currentTime % 60;
  var currentSeek = currentMinute + ":" + currentSecond.toFixed(0);
  var newTime = document.createElement("span");
  newTime.setAttribute("id", "start-time");
  newTime.append(currentSeek);
  document.getElementById("current-time-container").append(newTime);

  document.getElementById("seek-slider").value = (
    (musicList[i].music.currentTime / musicList[i].music.duration) *
    100
  ).toFixed(0);
  setInterval(() => {
    newTime.remove();
  }, 500);
}

var seek = () => {
  seekto = musicList[i].music.duration * (seekSlider.value / 100);
  musicList[i].music.currentTime = seekto;
};

function updateTime() {
  if (flag2 === false) {
    mainContainer.style.backgroundColor = musicList[i].bgColor;
    console.log(musicList[i].music.bgColor);
    seekTime.remove();
    var currentMinute = Math.floor(musicList[i].music.duration / 60);
    var currentSecond = musicList[i].music.duration % 60;
    var currentSeek = currentMinute + ":" + currentSecond.toFixed(0);
    var newTime = document.createElement("span");
    newTime.setAttribute("id", "seek-time");
    newTime.append(currentSeek);
    document.getElementById("seek-time-container").append(newTime);
    flag2 = true;
    document.getElementById("seek-slider").value = 0;
    // seek();
  }
}

playPauseBtn.addEventListener("click", playPause);
prevPlay.addEventListener("click", prevSongPlay);
nextPlay.addEventListener("click", nextSongPlay);
seekSlider.addEventListener("click", seek);
