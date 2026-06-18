import { useState } from 'react';
import './Stack.css';

const stackData = [
  { category: 'Languages', items: ['C++', 'Python', 'Dart', 'Swift', 'JavaScript'] },
  { category: 'Framework', items: ['React', 'Flutter', 'Vite'] },
  { category: 'Tools', items: ['Git', 'Linux', 'VS Code', 'Neovim'] },
  { category: 'Interest', items: ['Algorithm', 'OI', 'Open Source', 'Railway', 'Geography'] },
];

const Stack = () => {
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
    <section id="stack" className="stack-section">
      <div className="grid-background">
        {cells}
      </div>
      <div className="stack-left">
        <span className="stack-label">/ Stack</span>
        <h2 className="stack-title">技术栈</h2>
      </div>
      <div className="stack-right">
        <div className="stack-grid">
          {stackData.map((group) => (
            <div key={group.category} className="stack-group">
              <h3 className="stack-category">{group.category}</h3>
              <ul className="stack-list">
                {group.items.map((item) => (
                  <li key={item} className="stack-item">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stack;
