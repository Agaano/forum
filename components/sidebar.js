import React, { useState, useRef } from 'react';
import styles from '@/styles/sidebar.module.css';
import Li from './sidebarLi';
import { themes } from './themes';

export default ({ theme, setTheme }) => {
  const [isVisible, setVisible] = useState(true);
  const sidebar = useRef(null);

  const handleOnClickButton = (e) => {
    const button = e.target;
    setVisible(isVisible ? false : true);
    button.style.transform = isVisible ? 'scale(-1)' : 'scale(1)';
    sidebar.current.style.transform = isVisible ? 'translateX(-100%)' : 'translateX(0)';
  };

  return (
    <div className={styles.sidebar} ref={sidebar}>
      <button onClick={handleOnClickButton}>
        <img src="chevron.png" width={25} height={25} />
      </button>
      <h3> Рубрики </h3>
      <ul>
        {themes.map(({ text, pathname }) => (
          <Li text={text} pathname={pathname} func={setTheme} currentVal={theme} key={pathname} />
        ))}
      </ul>
    </div>
  );
};
