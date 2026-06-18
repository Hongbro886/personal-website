import { useState } from 'react';
import './Home.css';

const Home = () => {
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
    <section id="home" className="home-section">
      <div className="grid-background">
        {cells}
      </div>
      <div className="home-container">
        <div className="home-left">
          <span className="home-label">/ About</span>
          <h2 className="home-title">关于</h2>
        </div>
        <div className="home-right"></div>
      </div>
    </section>
  );
};

export default Home;
