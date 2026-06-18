import { useState } from 'react';
import friendsData from '../../friends.json';
import './Friends.css';

const Friends = () => {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const gridCols = 24;
  const gridRows = 20;

  const cells = [];
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const id = `${row}-${col}`;
      cells.push(
        <div
          key={id}
          className={`grid-cell ${hoveredCell === id ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredCell(id)}
          onMouseLeave={() => setHoveredCell(null)}
        />
      );
    }
  }

  return (
    <section id="friends" className="friends-section">
      <div className="grid-background">
        {cells}
      </div>
      <div className="friends-left">
        <span className="friends-label">/ Friends</span>
        <h2 className="friends-title">友情链接</h2>
      </div>
      <div className="friends-cards">
        {Object.entries(friendsData).map(([key, info]) => (
          <a
            key={key}
            href={info.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`friend-card ${hoveredCard === key ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredCard(key)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <span className="friend-name">{info.name}</span>
            <span className="friend-desc">{info.desc}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Friends;
