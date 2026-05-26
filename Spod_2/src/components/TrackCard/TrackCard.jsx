import React, { useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import './TrackCard.css';

export default function TrackCard({ track, index }) {
  const { currentTrack, isPlaying, playTrack, setIsPlaying, addToFavorites, removeFromFavorites, favorites } = useContext(PlayerContext);
  const active = currentTrack?.id === track.id;
  const fav    = favorites.some(t => t.id === track.id);

  const handlePlay = () => active ? setIsPlaying(!isPlaying) : playTrack(track);
  const handleFav  = (e) => { e.stopPropagation(); fav ? removeFromFavorites(track.id) : addToFavorites(track); };

  return (
    <div className={`track-card${active ? ' active' : ''}`} onClick={handlePlay}>

      <span className="tc-num">{active && isPlaying ? '♪' : index + 1}</span>

      <div className="tc-cover-wrap">
        <img src={track.cover} alt={track.title} className="tc-cover" />
        <div className="tc-overlay">{active && isPlaying ? '⏸' : '▶'}</div>
      </div>

      <div className="tc-info">
        <span className="tc-title">{track.title}</span>
        <span className="tc-artist">{track.artist}</span>
      </div>

      <span className="tc-album">{track.album}</span>

      <button className={`tc-fav${fav ? ' on' : ''}`} onClick={handleFav}>♥</button>
    </div>
  );
}