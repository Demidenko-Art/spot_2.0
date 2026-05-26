import React, { useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import './TrackCard.css';

export default function TrackCard({ track, index }) {
  const { currentTrack, isPlaying, playTrack, setIsPlaying, addToFavorites, removeFromFavorites, favorites } = useContext(PlayerContext);
  const active = currentTrack?.id === track.id;
  const fav    = favorites.some(t => t.id === track.id);

  const handlePlay = () => active ? setIsPlaying(!isPlaying) : playTrack(track);
  
  const handleFav  = (e) => { 
    e.stopPropagation(); 
    fav ? removeFromFavorites(track.id) : addToFavorites(track); 
  };

  return (
    <div className={`track-card${active ? ' active' : ''}`} onClick={handlePlay}>
      
      <div className="tc-num-col">
        {active && isPlaying ? (
          <div className="premium-equalizer">
            <span className="eq-bar"></span>
            <span className="eq-bar"></span>
            <span className="eq-bar"></span>
          </div>
        ) : (
          <span className="tc-num">{index + 1}</span>
        )}
      </div>

      <div className="tc-cover-wrap">
        <img src={track.cover} alt={track.title} className="tc-cover" loading="lazy" />
        <div className="tc-overlay">
          {active && isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="tc-svg-icon"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="tc-svg-icon"><path d="M8 5v14l11-7z"/></svg>
          )}
        </div>
      </div>

      <div className="tc-info">
        <span className="tc-title">{track.title}</span>
        <span className="tc-artist">{track.artist}</span>
      </div>

      <span className="tc-album hide-sm">{track.album}</span>

      <button 
        className={`tc-fav ${fav ? 'on' : ''}`} 
        onClick={handleFav}
        aria-label={fav ? "Видалити з улюблених" : "Додати в улюблені"}
      >
        <svg viewBox="0 0 24 24" fill={fav ? "var(--accent)" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>

    </div>
  );
}