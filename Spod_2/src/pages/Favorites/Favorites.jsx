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
          <span className="fav-empty-icon">♥</span>
          <p>Тут поки що порожньо</p>
          <p className="fav-empty-sub">Натисни ♥ біля треку щоб додати</p>
        </div>
      ) : (
        <>
          <p className="fav-count">{favorites.length} {favorites.length === 1 ? 'трек' : 'треки'}</p>
          <div className="fav-list">
            {favorites.map((t, i) => <TrackCard key={t.id} track={t} index={i} />)}
          </div>
        </>
      )}
    </div>
  );
}