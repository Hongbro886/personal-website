import { useState, useEffect, useMemo } from 'react';
import quotes from '../../quotes.json';
import './Home.css';

const Home = () => {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [quote, setQuote] = useState('');
  const [displayedQuote, setDisplayedQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selected = quotes[randomIndex];
    setQuote(selected);
    setDisplayedQuote('');
  }, []);

  useEffect(() => {
    if (!quote) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayedQuote(quote.slice(0, i));
      if (i >= quote.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [quote]);

  const grade = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();

    const schoolYear = currentMonth >= 9 ? currentYear : currentYear - 1;
    const yearInSchool = schoolYear - 2018;

    const gradeNames = [
      '小学一年级', '小学二年级', '小学三年级', '小学四年级', '小学五年级', '小学六年级',
      '初一', '初二', '初三',
      '高一', '高二', '高三',
      '大一', '大二', '大三', '大四'
    ];

    const isSummerBreak = (currentMonth === 7 && currentDay >= 1) ||
                          currentMonth === 8 ||
                          (currentMonth === 9 && currentDay === 1);

    if (yearInSchool < 0) return '还没上小学呢';
    if (yearInSchool >= 16) return '毕业了';

    if (isSummerBreak && yearInSchool + 1 < gradeNames.length) {
      const current = gradeNames[yearInSchool].replace('小学', '').replace('大', '');
      const next = gradeNames[yearInSchool + 1].replace('小学', '').replace('大', '');
      return `${current}升${next}，暑假开心捏！`;
    }

    return gradeNames[yearInSchool];
  }, []);

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
      <div className="home-left">
        <span className="home-label">/ About</span>
        <h1 className="home-title">关于我</h1>
        <h2 className="home-name">Hongbro886</h2>
      </div>
      <div className="home-right">
        <p className="home-quote">{displayedQuote}</p>
        <ul className="home-intro">
          <li>一名{grade}的学生</li>
          <li>江苏 苏州</li>
          <li>一只 INFJ</li>
          <li>喜欢捣鼓计算机，编程，OIer</li>
          <li>火车迷，交通爱好者，独自旅行，CTF爱好者</li>
          <li>周杰伦，ChiliChill乐迷</li>
          <li>喜欢地理这门有趣的学科</li>
          <li>常玩的游戏：Minecraft，Palworld</li>
          <li>游戏经历：Outer Wilds，双人成行，黑神话：悟空</li>
          <li>随机现充刷新在各种有趣活动现场</li>
          <li>SECTL 人事组、网站组成员，SECTL Community 群管理员</li>
          <li>Ship It Hackathon ! Go! Go! Go!</li>
          <li>欢迎交流、合作，以及来玩</li>
        </ul>
      </div>
    </section>
  );
};

export default Home;
