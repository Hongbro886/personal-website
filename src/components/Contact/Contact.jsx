import { useState } from 'react';
import callMeData from '../../CallMe.json';
import './Contact.css';

const Contact = () => {
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
    <section id="contact" className="contact-section">
      <div className="grid-background">
        {cells}
      </div>
      <div className="contact-left">
        <span className="contact-label">/ Contact</span>
        <h2 className="contact-title">联系我</h2>
      </div>
      <div className="contact-cards">
        {Object.entries(callMeData).map(([type, info]) => (
          <a
            key={type}
            href={info.where}
            target="_blank"
            rel="noopener noreferrer"
            className={`contact-card ${hoveredCard === type ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredCard(type)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <span className="card-type">{type}</span>
            <span className="card-name">@{info.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
