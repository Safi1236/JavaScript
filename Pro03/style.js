const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Functions
// 1 - toggle video
// if video is plaing, then pause
// if video is pause, then play
function toggleVideo(){

    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
    
}

// 2 - UpdateIcon - toggle between play and pause icon
// if video is playing, then show pause icon
// if video is pause, then show play icon
function updateIcon(){

    if(video.paused){
        play.innerHTML = '<i class="fas fa-play fa-2x"></i>';
    }
    else{
        play.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
    }
}

// 3 - updateProgress - update the position of the progress bar and timestamp
function updateProgress(){
    
    // Update slider
    progress.value = video.currentTime/video.duration * 100;

    // Update timestamp
    // Round down the minutes
    let minutes = Math.floor(video.currentTime / 60);
    if(minutes < 10){
        minutes = `0${minutes}`;
    }
    
    // Rounding down the second
    let second = Math.floor(video.currentTime % 60);
    if(second < 10){
        second = `0${second}`;
    }
    // Display timestamp
    timestamp.innerHTML = `${minutes}:${second}`;
}

// 4 - Stopvideo - stop video playback and reset time to 0
function stopVideo(){

    video.pause();
   video.currentTime = 0;
}

// 5 - setProgress - update video playback time based on manual change in progress bar
function setProgress(){

    video.currentTime = progress.value * video.duration / 100;
}
// Event Listeners
// 1 - Video Element - click to play or puse video
video.addEventListener('click', toggleVideo);

// 2 - video Element - puse to toggle play icon to puse icon
video.addEventListener('pause', updateIcon);

// 3 - video Element - play to toggle pause icon back to play icon
video.addEventListener('play', updateIcon);

// 4 - video Element - update progress bar and timestamp
video.addEventListener('timeupdate', updateProgress);

// 5 - Play Button - click to play or puse video
play.addEventListener('click', toggleVideo);

// 6 - Stop button - click to reset video and pause video
stop.addEventListener('click', stopVideo);

// 7 - Progress Bar - change position to change time of playback
progress.addEventListener('change', setProgress);