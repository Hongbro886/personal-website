import { useState } from 'react';
import './About.css';

const About = () => {
  const [hoveredCell, setHoveredCell] = useState(null);

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
    <section id="about" className="about-section">
      <div className="grid-background">
        {cells}
      </div>
      <div className="about-container">
        <div className="about-left">
          <span className="about-label">/ About</span>
          <h2 className="about-title">关于</h2>
        </div>
        <div className="about-right">
          <p>在这里添加关于你的内容</p>
        </div>
      </div>
    </section>
  );
};

export default About;