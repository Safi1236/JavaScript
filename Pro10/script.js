const musicContainer = document.getElementById('music-container');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// List to Songs
const songList = ['song1', 'song2', 'song3'];

// Track which song is currently playing
let currentSong = 1;

// Update the song to the DOM
function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `image/${song}.jpg`;
}

// Function to play the song
function playSong(){
    musicContainer.classList.add('play');
    playButton.querySelector('i.fas').classList.remove('fa-play');
    playButton.querySelector('i.fas').classList.add('fa-pause');

    audio.play();

}

// Fuction to Pause the song
function pauseSong(){
    musicContainer.classList.remove('play');
    playButton.querySelector('i.fas').classList.remove('fa-pause');
    playButton.querySelector('i.fas').classList.add('fa-play');

    audio.pause();

}

// Function to switch to Previous Song
function prevSong(){
    currentSong--;

    if(currentSong < 0){
        currentSong = songList.length - 1;
    }
    
    loadSong(songList[currentSong]);

    playSong();

}

// Function to switch to Next Song
function nextSong(){
    currentSong++;

    if(currentSong  > songList.length - 1){
        currentSong = 0;
    }
    
    loadSong(songList[currentSong]);

    playSong();

}

// Update the progress bar
function updateProgress(e){
   const { currentTime, duration } =  e.srcElement;
   const progressPrecentage = (currentTime / duration) * 100;

   progressBar.style.width = `${progressPrecentage}%`;

}

// Set the progress Bar
function setProgress(e){
    const width = this.clientWidth;
    const offSetX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = ( offSetX / width) * duration;
}


// Initial Song Load
loadSong(songList[currentSong]);

// Event Listner 
// 1. Play Button Event Listner
playButton.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying ){
        pauseSong();
    }else{
        playSong();
    }
})

// 2. Previous Button Event Listner
prevButton.addEventListener('click', prevSong);

// 3. Next Button Evnet Listner
nextButton.addEventListener('click', nextSong);

// 4. Update the time for song play
audio.addEventListener('timeupdate', updateProgress);

// 5. Update the time for song play on clicked on progress container
progressContainer.addEventListener('click', setProgress);

// 6. Automatically play Next song
audio.addEventListener('ended', nextSong);