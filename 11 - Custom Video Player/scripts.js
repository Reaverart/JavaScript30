const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');
let isDragging = false;

function togglePlay() {
  return video.paused ? video.play() : video.pause();
}

function updateToggle() {
  const icon = this.paused ? '►' : '❚ ❚';
  return toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip, 10);
}

function handleRangeUpdate(e) {
  video[this.name] = this.value;
  console.log(this.name, this.value);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  return progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullscreen() {
  document.webkitIsFullScreen ? document.webkitExitFullscreen() : player.webkitRequestFullscreen()  
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggle);
video.addEventListener('pause', updateToggle);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => isDragging && scrub(e));
progress.addEventListener('mousedown', () => isDragging = true);
progress.addEventListener('mouseup', () => isDragging = false);
progress.addEventListener('mouseout', () => isDragging = false);
fullscreen.addEventListener('click', toggleFullscreen);
