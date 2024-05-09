const audio = document.getElementById('audio');
const audioSource = document.getElementById('audioSource');
const playPauseBtn = document.getElementById('playPauseBtn');
const backwardBtn = document.getElementById('backwardBtn');
const forwardBtn = document.getElementById('forwardBtn');
const songNameDisplay = document.getElementById('songName');
const timelineDisplay = document.getElementById('timeline');
const volumeSlider = document.getElementById('volumeSlider');
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const searchBtn = document.getElementById('searchBtn');

let currentSongIndex = 0;
let songs = [
  'Dekhte Dekhte ( Female Version Cover)(PaglaSongs).mp3',
  'Shikayat.mp3',
  'Kahani Meri Kaifi Khalil 128 Kbps.mp3'
];

function loadSong() {
  audioSource.src = songs[currentSongIndex];
  audio.load();
  updateSongName();
}

function playSong() {
  audio.play();
  playPauseBtn.src = 'pause.png';
}

function pauseSong() {
  audio.pause();
  playPauseBtn.src = 'play.png';
}

function togglePlayPause() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong();
  playSong();
}

function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong();
  playSong();
}

function updateSongName() {
  const songName = songs[currentSongIndex].split('/').pop(); // Extract song name from the file path
  songNameDisplay.textContent = `Now Playing: ${songName}`;
}

function updateTimeline() {
  const currentTime = audio.currentTime;
  const hours = Math.floor(currentTime / 3600);
  const minutes = Math.floor((currentTime % 3600) / 60);
  const seconds = Math.floor(currentTime % 60);
  timelineDisplay.textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function updateVolume() {
  audio.volume = volumeSlider.value / 100;
}

function searchSong() {
  const searchTerm = searchInput.value.toLowerCase();
  const suggestions = songs.filter(song => song.toLowerCase().includes(searchTerm));
  displaySearchSuggestions(suggestions);
}

function displaySearchSuggestions(suggestions) {
  const html = suggestions.map((song, index) => `<div class="search-suggestion" data-index="${index}">${song}</div>`).join('');
  searchSuggestions.innerHTML = html;
  searchSuggestions.style.display = suggestions.length > 0 ? 'block' : 'none'; // Show suggestions only if there are any
}

function playSuggestion(index) {
  currentSongIndex = index;
  loadSong();
  playSong();
  hideSuggestions();
}

function hideSuggestions() {
  searchSuggestions.innerHTML = '';
  searchSuggestions.style.display = 'none';
}

searchInput.addEventListener('input', searchSong);

searchSuggestions.addEventListener('click', function(event) {
  if (event.target.classList.contains('search-suggestion')) {
    const index = parseInt(event.target.dataset.index);
    playSuggestion(index);
  }
});

searchBtn.addEventListener('click', function() {
  searchSong();
  hideSuggestions();
});

backwardBtn.addEventListener('click', playPreviousSong);
forwardBtn.addEventListener('click', playNextSong);
playPauseBtn.addEventListener('click', togglePlayPause);
volumeSlider.addEventListener('input', updateVolume); // Add event listener for volume change

loadSong();