import React, { useState } from 'react';
import { tracks } from '../../data/tracks';
import TrackCard from '../../components/TrackCard/TrackCard';
import './Search.css';

export default function Search() {
  const [query, setQuery] = useState('');

  const filtered = tracks.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page">
      <h1 className="search-title">ПОШУК</h1>

      <div className={`search-box${query ? ' focused' : ''}`}>
        <svg className="s-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          className="s-input" type="text"
          placeholder="Назва треку або артист..."
          value={query} onChange={e => setQuery(e.target.value)}
        />
        {query && <button className="s-clear" onClick={() => setQuery('')}>✕</button>}
      </div>

      {query && (
        <p className="s-count">{filtered.length > 0 ? `Знайдено: ${filtered.length}` : 'Нічого не знайдено'}</p>
      )}

      <div className="s-results">
        {(query ? filtered : tracks).map((t, i) => <TrackCard key={t.id} track={t} index={i} />)}
      </div>
    </div>
  );
}