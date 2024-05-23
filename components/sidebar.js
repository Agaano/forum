import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/sidebar.module.css';
import Li from './sidebarLi';
import { themes } from './themes';
import { useRouter } from 'next/router';

export default ({ theme, setTheme, isAdmin }) => {
  const [isVisible, setVisible] = useState(true);
  const sidebar = useRef(null);
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("api/getCategories")
      const data = await response.json()
      if (response.status >= 400) return;
      setCategories(data.categories);
    })()
  }, [])

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
        {categories.map(({ name, id }) => (
          <Li text={name} pathname={name} func={setTheme} isAdmin={isAdmin} currentVal={theme} key={id} id = {id} />
        ))}
        {isAdmin && 
          <li onClick={async () => {
            const name = prompt('Name of new category');
            const response = await fetch('api/addCategory', {
              method: "POST",
              body: JSON.stringify({name})
            })
            if (response.status >= 400) {
              alert("SOMETHING GO WRONG!!! TRY AGAIN")
              return;
            }
            alert("NEW CATEGORY HAS BEEN ADDED");
            router.reload();
          }}>+</li>
        }
      </ul>
    </div>
  );
};
