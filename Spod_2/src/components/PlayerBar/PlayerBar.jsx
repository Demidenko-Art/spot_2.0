import React, { useContext, useRef, useEffect, useState } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import { tracks } from '../../data/tracks';
import './PlayerBar.css';

export default function PlayerBar() {
  const { currentTrack, isPlaying, volume, nextTrack, prevTrack, setVolume, setIsPlaying, playTrack } = useContext(PlayerContext);
  const audioRef = useRef(null);
  const [progress, setProgress]       = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration]       = useState('0:00');
  const activeTrack = currentTrack || tracks[0];

  const fmt = s => isNaN(s) ? '0:00' : `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    audioRef.current.src = currentTrack.src;
    if (isPlaying) audioRef.current.play().catch(() => {});
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (currentTrack) {
      isPlaying ? audioRef.current.play().catch(() => {}) : audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => { 
    if (audioRef.current) audioRef.current.volume = volume; 
  }, [volume]);

  const onTimeUpdate = () => {
    const a = audioRef.current;
    if(!a) return;
    const p = (a.currentTime / a.duration) * 100;
    setProgress(isNaN(p) ? 0 : p);
    setCurrentTime(fmt(a.currentTime));
  };

  const onLoadedMetadata = () => {
    if(audioRef.current) setDuration(fmt(audioRef.current.duration));
  };

  const onEnded = () => {
    nextTrack();
  };

  const handleProgressChange = (e) => {
    const pct = parseFloat(e.target.value);
    const a = audioRef.current;
    if (a && a.duration) {
      a.currentTime = (pct / 100) * a.duration;
      setProgress(pct);
    }
  };

  const handlePlayToggle = () => {
    if (!currentTrack) {
      playTrack(activeTrack);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="player-bar">
      {currentTrack && (
        <audio 
          ref={audioRef}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onEnded}
        />
      )}

      <div className="pb-top-header">
        <span className="pb-mode-title">Зараз грає</span>
      </div>

      <div className="pb-cover-container">
        <div className="pb-cover-glow" style={{ backgroundImage: `url(${activeTrack?.cover})` }}></div>
        <img src={activeTrack?.cover} alt={activeTrack?.title} className="pb-cover-art" />
      </div>

      <div className="pb-meta">
        <h2 className="pb-title">{activeTrack?.title}</h2>
        <p className="pb-artist">{activeTrack?.artist}</p>
      </div>

      <div className="pb-timeline-section">
        <input 
          type="range" 
          className="pb-progress-slider"
          min="0" 
          max="100" 
          step="0.1"
          value={progress}
          onChange={handleProgressChange}
        />
        <div className="pb-time-labels">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
      </div>

      <div className="pb-controls">
        <button className="pb-btn pb-secondary" onClick={prevTrack} aria-label="Попередній трек">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
        </button>

        <button className={`pb-btn pb-main-play ${isPlaying && currentTrack ? 'is-playing' : ''}`} onClick={handlePlayToggle} aria-label="Грати/Пауза">
          {isPlaying && currentTrack ? (
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>

        <button className="pb-btn pb-secondary" onClick={nextTrack} aria-label="Наступний трек">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6zm9-12v12h2V6z"/></svg>
        </button>
      </div>

      <div className="pb-volume-section">
        <svg className="pb-volume-icon" viewBox="0 0 24 24" fill="currentColor">
          {volume === 0 ? (
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM4 9v6h4l5 5V4L8 9H4z"/>
          ) : (
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          )}
        </svg>
        <input 
          type="range" 
          className="pb-volume-slider" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={e => setVolume(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}