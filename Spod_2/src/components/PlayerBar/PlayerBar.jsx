import React, { useContext, useRef, useEffect, useState } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import "./PlayerBar.css"
const PlayerBar = () => {
  const { currentTrack, isPlaying, volume, nextTrack, prevTrack, setVolume, setIsPlaying } = useContext(PlayerContext);
  const audioRef = useRef(null);
  
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [durationTime, setDurationTime] = useState('0:00');

  useEffect(() => {
    if (!currentTrack) return;
    audioRef.current.src = currentTrack.src;
    if (isPlaying) {
      audioRef.current.play().catch(e => console.warn("Autoplay blocked", e));
    }
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(e => console.warn(e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const onTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 0;
    setProgress(duration ? (current / duration) * 100 : 0);
    setCurrentTime(formatTime(current));
    setDurationTime(formatTime(duration));
  };

  const handleProgressBarClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  if (!currentTrack) return (
    <div className="player-bar empty">
      <p>Оберіть трек для відтворення 🎧</p>
    </div>
  );

  return (
    <div className="player-bar">
      <audio ref={audioRef} onTimeUpdate={onTimeUpdate} onEnded={nextTrack} />
      
      <div className="pb-info">
        <img src={currentTrack.cover} alt="" />
        <div>
          <h4>{currentTrack.title}</h4>
          <p>{currentTrack.artist}</p>
        </div>
      </div>

      <div className="pb-controls">
        <div className="pb-buttons">
          <button onClick={prevTrack}>⏮</button>
          <button className="main-play" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button onClick={nextTrack}>⏭</button>
        </div>
        
        <div className="pb-progress-container">
          <span>{currentTime}</span>
          <div className="pb-progress-bg" onClick={handleProgressBarClick}>
            <div className="pb-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span>{durationTime}</span>
        </div>
      </div>

      <div className="pb-volume">
        <span>🔊</span>
        <input 
          type="range" min="0" max="1" step="0.01" 
          value={volume} onChange={(e) => setVolume(Number(e.target.value))} 
        />
      </div>
    </div>
  );
};

export default PlayerBar;