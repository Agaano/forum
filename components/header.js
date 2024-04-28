import { useState, useEffect } from 'react';
import style from '@/styles/header.module.css';
import Link from 'next/link';
import getCorrectDate from '@/components/getCorrectDate';

export default function Header({ data }) {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchToggle = () => {
    setSearchInputVisible(!searchInputVisible);
    setSearchValue('');
    setSearchResults
    setTimeout(() => {
      setSearchVisible(!isSearchVisible);
    }, 0);
  };

  useEffect(() => {
    const search = async () => {
      if (searchValue.trim() !== '') {
        const response = await fetch(`/api/search?query=${searchValue}`);
        const data = await response.json();
        setSearchResults(data.posts);
        console.log(data.posts)
      } else {
        setSearchResults([]);
      }
    };

    search();
  }, [searchValue]);

  return (
    <>
      <header>
        <div className={style.header__wrapper}>
          <Link href="/" className={style.logo}>
            <img src="logo.png" width={50} height={50} />
            SpeakUp
          </Link>

          <nav>
            <ul className={style.nav__list}>
              <li>
                <Link href="/createpost">Написать статью</Link>
              </li>
              <li>
                <a href="#?">
                  <img src="featured.svg" />
                  <span>Избранное</span>
                </a>
              </li>
              <li>
                <a href="#?">
                  <img src="subscribes_icon.svg" />
                  <span>Мои подписки</span>
                </a>
              </li>
            </ul>
          </nav>
          
          
          {searchInputVisible ?
            <div className = {style.search__wrapper} >
              <input
                type="text"
                className={`${style.search_input} ${isSearchVisible ? style.slide_in : ''}`}
                placeholder="Введите запрос"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                 
              />
              <button className={style.close_button} onClick={handleSearchToggle}></button>
              {searchResults.length > 0 && (
                <div className={style.search_results}>
                <ul>
                  {searchResults.map((result) => (
                    <li key={result.ID} className={style.search_item}>
                      <Link href={`/news/${result.ID}`} className={style.search_link}>
                        <div className={style.search_title}>{result.title}</div>
                        <div className={style.search_info}>
                          <span className={style.search_author}>{result.author}</span>
                          <span className={style.search_separator}>•</span>
                          <span className={style.search_theme}>{result.theme}</span>
                          <span className={style.search_separator}>•</span>
                          <span className={style.search_date}>{getCorrectDate(result.date)}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              )}
            </div>
           : <img
          className={`${style.search_button}`}
          src="search-icon.svg"
          onClick={handleSearchToggle}
          />}

          <Link href={data.isLogged ? '/profile' : '/login'}>
            <img className={style.profile_button} src="profile-icon.svg" />
          </Link>
        </div>
      </header>

      
    </>
  );
}
