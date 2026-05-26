import React, { useContext, useRef, useEffect, useState } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import './PlayerBar.css';

export default function PlayerBar() {
  const { currentTrack, isPlaying, volume, nextTrack, prevTrack, setVolume, setIsPlaying } = useContext(PlayerContext);
  const audioRef = useRef(null);
  const [progress, setProgress]       = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration]       = useState('0:00');

  const fmt = s => isNaN(s) ? '0:00' : `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;

  useEffect(() => {
    if (!currentTrack || !audioRef.current) return;
    audioRef.current.src = currentTrack.src;
    if (isPlaying) audioRef.current.play().catch(() => {});
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.play().catch(() => {}) : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => { 
    if (audioRef.current) audioRef.current.volume = volume; 
  }, [volume]);

  const onTimeUpdate = () => {
    const a = audioRef.current;
    if(!a) return;
    setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
    setCurrentTime(fmt(a.currentTime));
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) setDuration(fmt(audioRef.current.duration));
  };

  const seek = (e) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    const newTime = ((e.clientX - r.left) / r.width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <div className={`player-bar ${currentTrack ? 'has-track' : ''}`}>
      <audio 
        ref={audioRef} 
        onTimeUpdate={onTimeUpdate} 
        onLoadedMetadata={onLoadedMetadata}
        onEnded={nextTrack} 
      />

      <div className="pb-info">
        {currentTrack ? (
          <>
            <img src={currentTrack.cover} alt="" className="pb-cover-art" />
            <div className="pb-meta">
              <span className="pb-title">{currentTrack.title}</span>
              <span className="pb-artist">{currentTrack.artist}</span>
            </div>
          </>
        ) : (
          <div className="pb-empty-state">
            <span className="pb-pulse-icon">🎵</span>
            <span className="pb-empty">Оберіть шедевр</span>
          </div>
        )}
      </div>

      <div className="pb-center">
        <div className="pb-buttons">
          <button onClick={prevTrack} className="pb-btn" aria-label="Попередній трек">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="pb-btn pb-play" aria-label={isPlaying ? 'Пауза' : 'Грати'}>
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" style={{width: 16, height: 16}}><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" style={{width: 18, height: 18, transform: 'translateX(1px)'}}><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
          <button onClick={nextTrack} className="pb-btn" aria-label="Наступний трек">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6z"/></svg>
          </button>
        </div>
        
        <div className="pb-progress-row">
          <span className="pb-time">{currentTime}</span>
          <div className="pb-track-wrapper" onClick={seek}>
            <div className="pb-track">
              <div className="pb-fill" style={{ width: `${progress}%` }} />
              <div className="pb-thumb" style={{ left: `${progress}%` }} />
            </div>
          </div>
          <span className="pb-time">{duration}</span>
        </div>
      </div>

      <div className="pb-right hide-md">
        <div className="pb-volume-wrapper">
          <svg className="volume-icon" viewBox="0 0 24 24" fill="currentColor">
            {volume === 0 ? (
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM4 9v6h4l5 5V4L8 9H4zM12 4L9.91 6.09 12 8.18V4z"/>
            ) : volume < 0.5 ? (
              <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
            ) : (
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            )}
          </svg>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={e => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
}