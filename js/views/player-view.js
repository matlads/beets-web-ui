import BaseView from './base-view.js';
import { template } from 'underscore';

import Item from '../models/item.js';
import { PlayIcon, PauseIcon } from '../icons.js';

const PlayerView = BaseView.extend({
  tagName: 'div',
  className: 'player-container',
  template: template(`
    <div class="player-controls d-flex align-items-center p-2">
      <!-- Hidden audio element -->
      <audio id="audio-element" style="display: none;"></audio>

      <!-- Play/Pause button -->
      <button id="play-pause-btn" class="btn btn-outline-primary me-2" type="button">
        <img id="play-pause-icon" src="${PlayIcon}" alt="Play" style="height: 20px; width: 20px;" />
      </button>

      <!-- Progress bar and time display -->
      <div class="flex-grow-1 me-3">
        <div class="d-flex justify-content-between small mb-1">
          <span id="current-time">0:00</span>
          <span id="duration">0:00</span>
        </div>
        <input type="range" id="progress-bar" class="form-range" min="0" max="100" value="0" step="0.1" style="height: 4px;">
      </div>

      <!-- Volume control -->
      <div class="volume-control d-flex align-items-center">
        <button id="mute-btn" class="btn btn-sm btn-outline-secondary me-2" type="button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 4.5v7a.5.5 0 0 0 .854.354l2.793-2.793A.5.5 0 0 1 10 9.5h2.5A.5.5 0 0 0 13 9V7a.5.5 0 0 0-.5-.5H10a.5.5 0 0 1-.354-.146L6.854 4.146A.5.5 0 0 0 6 4.5z"/>
          </svg>
        </button>
        <input type="range" id="volume-slider" class="form-range" min="0" max="1" value="1" step="0.01" style="width: 80px;">
      </div>
    </div>
  `),

  ui: {
    audioElement: '#audio-element',
    playPauseBtn: '#play-pause-btn',
    playPauseIcon: '#play-pause-icon',
    progressBar: '#progress-bar',
    currentTime: '#current-time',
    duration: '#duration',
    muteBtn: '#mute-btn',
    volumeSlider: '#volume-slider',
  },

  events: {
    'click @ui.playPauseBtn': 'togglePlayPause',
    'input @ui.progressBar': 'seek',
    'input @ui.volumeSlider': 'changeVolume',
    'click @ui.muteBtn': 'toggleMute',
  },

  beetsEvents: {
    'item:play': 'doPlay',
    'item:pause': 'doPause',
  },

  initialize() {
    BaseView.prototype.initialize.apply(this, arguments);
    this.model = new Item();
    this.isPlaying = false;
    this.isMuted = false;
  },

  onRender() {
    this.bindAudioEvents();
    this.ui.audioElement[0].volume = parseFloat(this.ui.volumeSlider[0].value);
  },

  bindAudioEvents() {
    const audio = this.ui.audioElement[0];

    audio.addEventListener('timeupdate', () => {
      this.updateProgress();
    });

    audio.addEventListener('loadedmetadata', () => {
      this.updateDuration();
    });

    audio.addEventListener('ended', () => {
      this.onEnded();
    });

    audio.addEventListener('volumechange', () => {
      this.updateVolumeUI();
    });
  },

  updateProgress() {
    const audio = this.ui.audioElement[0];
    if (audio.duration) {
      const percent = (audio.currentTime / audio.duration) * 100;
      this.ui.progressBar[0].value = percent;
      this.ui.currentTime[0].textContent = this.formatTime(audio.currentTime);
    }
  },

  updateDuration() {
    const audio = this.ui.audioElement[0];
    if (audio.duration) {
      this.ui.duration[0].textContent = this.formatTime(audio.duration);
    }
  },

  updateVolumeUI() {
    const audio = this.ui.audioElement[0];
    this.ui.volumeSlider[0].value = audio.volume;
    this.isMuted = audio.muted;
  },

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  },

  togglePlayPause() {
    const audio = this.ui.audioElement[0];
    if (this.isPlaying) {
      audio.pause();
    } else {
      if (!audio.src) {
        return;
      }
      audio.play();
    }
    this.updatePlayPauseUI();
  },

  updatePlayPauseUI() {
    const audio = this.ui.audioElement[0];
    this.isPlaying = !audio.paused;
    this.ui.playPauseIcon[0].src = this.isPlaying ? PauseIcon : PlayIcon;
    this.ui.playPauseBtn[0].classList.toggle('btn-primary', this.isPlaying);
    this.ui.playPauseBtn[0].classList.toggle('btn-outline-primary', !this.isPlaying);
  },

  seek(event) {
    const audio = this.ui.audioElement[0];
    if (audio.duration) {
      const percent = parseFloat(event.target.value);
      audio.currentTime = (percent / 100) * audio.duration;
    }
  },

  changeVolume(event) {
    const audio = this.ui.audioElement[0];
    audio.volume = parseFloat(event.target.value);
    audio.muted = audio.volume === 0;
  },

  toggleMute() {
    const audio = this.ui.audioElement[0];
    audio.muted = !audio.muted;
    this.ui.volumeSlider[0].value = audio.muted ? 0 : 1;
  },

  // Public methods maintained for compatibility
  doPlay(model) {
    this.model = model;
    this.play();
  },

  doPause(_itemId) {
    this.ui.audioElement[0].pause();
    this.updatePlayPauseUI();
  },

  play() {
    const itemId = this.model.get('id');
    const dataUrl = this.options.settings.dataUrl;
    const url = `${dataUrl}/item/${itemId}/file`;

    const audio = this.ui.audioElement[0];
    audio.src = url;
    audio.play();
    this.updatePlayPauseUI();
  },

  onEnded() {
    this.isPlaying = false;
    this.updatePlayPauseUI();
    this.beetsChannel.trigger('play:ended');
  },
});

export default PlayerView;
