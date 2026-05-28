import React, { useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import TrackCard from '../../components/TrackCard/TrackCard';
import './Favorites.css';

export default function Favorites() {
  const { favorites } = useContext(PlayerContext);

  return (
    <div className="fav-page">
      <h1 className="fav-title">УЛЮБЛЕНІ</h1>

      {favorites.length === 0 ? (
        <div className="fav-empty">
          <div className="fav-premium-circle">
            <span className="fav-empty-icon">♥</span>
          </div>
          <p>Тут поки що порожньо</p>
          <p className="fav-empty-sub">Натисніть серце біля будь-якого треку, щоб сформувати власну преміум-колекцію</p>
        </div>
      ) : (
        <div className="fav-content-wrapper">
          <p className="fav-count">Ваша колекція: <span>{favorites.length} {favorites.length === 1 ? 'трек' : 'треків'}</span></p>
          <div className="fav-list">
            {favorites.map((track, i) => (
              <TrackCard key={track.id} track={track} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}