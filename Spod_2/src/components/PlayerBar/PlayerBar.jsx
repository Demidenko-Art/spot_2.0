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

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);

  const onTimeUpdate = () => {
    const a = audioRef.current;
    setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
    setCurrentTime(fmt(a.currentTime));
    setDuration(fmt(a.duration));
  };

  const seek = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    audioRef.current.currentTime = ((e.clientX - r.left) / r.width) * audioRef.current.duration;
  };

  return (
    <div className="player-bar">
      <audio ref={audioRef} onTimeUpdate={onTimeUpdate} onEnded={nextTrack} />

      <div className="pb-info">
        {currentTrack ? (
          <>
            <img src={currentTrack.cover} alt="" />
            <div>
              <span className="pb-title">{currentTrack.title}</span>
              <span className="pb-artist">{currentTrack.artist}</span>
            </div>
          </>
        ) : <span className="pb-empty">Оберіть трек 🎧</span>}
      </div>

      <div className="pb-center">
        <div className="pb-buttons">
          <button onClick={prevTrack} className="pb-btn">⏮</button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="pb-btn pb-play">
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button onClick={nextTrack} className="pb-btn">⏭</button>
        </div>
        <div className="pb-progress-row">
          <span>{currentTime}</span>
          <div className="pb-track" onClick={seek}>
            <div className="pb-fill" style={{ width: `${progress}%` }} />
          </div>
          <span>{duration}</span>
        </div>
      </div>

      <div className="pb-volume">
        <span>🔊</span>
        <input type="range" min="0" max="1" step="0.01" value={volume}
          onChange={e => setVolume(Number(e.target.value))} />
      </div>
    </div>
  );
}