import { useState } from 'react';
import './Stack.css';

const stackData = [
  { category: '语言', items: ['C++', 'Python', 'Swift' ] },
  { category: '框架', items: ['Fluent','Flet'] },
  { category: '工具', items: ['Git', 'Linux', 'VS Code','OpenCode','macOS'] },
  { category: '感兴趣/正在学习中的', items: ['Dart'] },
  { category: '设备',items:['MacBook Air M4']},
  { category: '沟通交流/团队协作',items:['飞书','QQ']}
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
