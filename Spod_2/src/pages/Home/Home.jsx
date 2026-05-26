import React, { useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import TrackCard from '../../components/TrackCard/TrackCard';
import { tracks } from '../../data/tracks';
import './Home.css';

export default function Home() {
  const { currentTrack } = useContext(PlayerContext);

  return (
    <div className="home-page">

      <div className="home-header">
        <h1 className="home-logo">MELODY<span>.</span></h1>
        <p className="home-sub">Твоя музика, твій настрій</p>
      </div>

      {currentTrack && (
        <div className="now-playing-banner">
          <img src={currentTrack.cover} alt="" />
          <div>
            <span className="np-label">Зараз грає</span>
            <span className="np-title">{currentTrack.title} — {currentTrack.artist}</span>
          </div>
          <span className="np-dot">▶</span>
        </div>
      )}

      <div className="tracks-section">
        <div className="tracks-header">
          <span>#</span><span></span><span>Назва</span>
          <span className="hide-sm">Альбом</span><span>♥</span>
        </div>
        <div className="tracks-list">
          {tracks.map((track, i) => <TrackCard key={track.id} track={track} index={i} />)}
        </div>
      </div>

    </div>
  );
}