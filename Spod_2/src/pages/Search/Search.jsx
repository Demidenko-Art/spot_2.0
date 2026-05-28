import React, { useState, useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import TrackCard from '../../components/TrackCard/TrackCard';
import './Search.css';

export default function Search() {
  const { tracks, isLoading } = useContext(PlayerContext);

  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const filtered = tracks.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.artist.toLowerCase().includes(query.toLowerCase())
  );

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="search-page">
      <h1 className="search-title">ПОШУК</h1>

      <div className={`search-box ${focused ? 'focused' : ''} ${query ? 'has-text' : ''}`}>
        <svg
          className="s-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>

        <input
          className="s-input"
          type="text"
          placeholder="Знайти улюблений трек або артиста..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {query && (
          <button
            className="s-clear"
            onClick={() => setQuery('')}
          >
            ✕
          </button>
        )}
      </div>

      {query ? (
        <div className="search-results-wrapper">
          <p className="s-count">
            Знайдено: <span>{filtered.length}</span>
          </p>

          {filtered.length === 0 ? (
            <div className="search-empty-state">
              <span className="se-icon">🔍</span>
              <p>Нічого не знайдено</p>
              <span className="se-sub">
                Перевірте правильність написання назви
              </span>
            </div>
          ) : (
            <div className="search-list">
              {filtered.map((track, i) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="search-placeholder-state">
          <p>Шукай треки без обмежень</p>

          <span>
            Введіть перші літери назви альбому,
            треку чи імені виконавця.
          </span>
        </div>
      )}
    </div>
  );
}