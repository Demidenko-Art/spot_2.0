import React, { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import TrackCard from '../../components/TrackCard/TrackCard';
import { tracks as fetchTracks } from '../../data/tracks';
import './Home.css';

export default function Home() {
  const { currentTrack } = useContext(PlayerContext);

  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTracks = async () => {
      const data = await fetchTracks();
      setTracks(data);
      setLoading(false);
    };

    loadTracks();
  }, []);

  return (
    <div className="home-page">
      <div className="home-header">
        <h1 className="home-logo">
          MELODY<span className="premium-dot">.</span>
        </h1>

        <p className="home-sub">
          Твоя музика, твій вишуканий настрій
        </p>
      </div>

      {currentTrack && (
        <div className="now-playing-banner">
          <div
            className="banner-glow"
            style={{ backgroundImage: `url(${currentTrack.cover})` }}
          ></div>

          <img
            src={currentTrack.cover}
            alt=""
            className="banner-img"
          />

          <div className="banner-meta">
            <span className="np-label">Зараз звучить</span>
            <span className="np-title">{currentTrack.title}</span>
            <span className="np-artist">{currentTrack.artist}</span>
          </div>

          <div className="premium-wave">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

      <div className="tracks-section">
        <div className="tracks-header">
          <span className="th-num">#</span>
          <span className="th-title">Назва треку</span>
          <span className="th-album hide-sm">Альбом</span>
          <span className="th-fav">♥</span>
        </div>

        <div className="tracks-list">
          {loading ? (
            <p>Загрузка...</p>
          ) : (
            tracks.slice(10).map((track, i) => (
              <TrackCard
                key={track.id}
                track={track}
                index={i}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}