import Sidebar from '@/components/sidebar'; 
import { useState, useEffect } from 'react';
import style from '@/styles/index.module.css';
import Head from 'next/head';
import NewsCard from '@/components/NewsCard';
import Placeholder from '@/components/newsblockplaceholder';
import { TailSpin } from 'react-loader-spinner';
import Select from 'react-select';

export default function Home({ data }) {
  const [theme, setTheme] = useState('all_themes');
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState('date');
  const [sortDown, setSortDown] = useState(true);
  const [PostsReloadFlag, setPostsReloadFlag] = useState(false);
  

  function sortByTime(a, b) {
    const timestampA = a.date;
    const millisecondsA = new Date(timestampA).getTime();
    const timestampB = b.date;
    const millisecondsB = new Date(timestampB).getTime();
    return sortDown ? millisecondsB - millisecondsA : millisecondsA - millisecondsB;
  }

  function sortByLikes(a, b) {
    return sortDown ? b.likes.length - a.likes.length : a.likes.length - b.likes.length;
  }

  function sortByComments(a, b) {
    return sortDown ? b.comments.length - a.comments.length : a.comments.length - b.comments.length;
  }

  function sortByViews(a, b) {
    return sortDown ? b.views - a.views : a.views - b.views;
  }

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const path = `api/getPosts?theme=${theme}`;
      const response = await fetch(path);

      const postsData = await response.json();
      let sortedData;

      if (sort === 'likes') {
        sortedData = postsData.posts.sort(sortByLikes);
      } else if (sort === 'comments') {
        sortedData = postsData.posts.sort(sortByComments);
      } else if (sort === 'views') {
        sortedData = postsData.posts.sort(sortByViews);
      } else {
        sortedData = postsData.posts.sort(sortByTime);
      }

      setTotalPages(sortedData.length);
      if (currentPage * 10 > sortedData.length) {
        setContent(sortedData.slice(currentPage * 10 - 10, sortedData.length));
      } else {
        setContent(sortedData.slice(currentPage * 10 - 10, currentPage * 10));
      }
      setIsLoading(false);
    };
    getData();
  }, [theme, currentPage, sort, sortDown, PostsReloadFlag]);

  const handleSortChange = (selectedOption) => {
    setSort(selectedOption.value);
  };

  const handleSortDirectionChange = () => {
    setSortDown(!sortDown);
  };

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
      color: '#333',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#aaa',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '16px',
      color: state.isSelected ? '#fff' : '#333',
      backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? '#f4f4f4' : '#fff',
      padding: '12px',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        backgroundColor: state.isSelected ? '#007bff' : '#e0e0e0',
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#777',
      transition: 'transform 0.3s ease',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      width: '1px',
      background: '#ccc',
    }),
  };

  const dropdownAnimatedComponents = Select.AnimatedComponents;

  return (
    <>
      <Head>
        <title>SpeakUp - {theme}</title>
      </Head>
      <Sidebar theme={theme} setTheme={setTheme} />
      <div className={style.body__wrapper}>
        <div className={style.sortWrapper}>
          <label htmlFor="sort">Сортировать по:</label>
          <Select
            id="sort"
            value={{ value: sort, label: 'Сортировка' }}
            onChange={handleSortChange}
            options={[
              { value: 'date', label: 'Дате' },
              { value: 'likes', label: 'Лайкам' },
              { value: 'comments', label: 'Комментариям' },
              { value: 'views', label: 'Просмотрам' },
            ]}
            styles={customSelectStyles}
            components={dropdownAnimatedComponents}
          />
          <button className={style.sortDirectionButton} onClick={handleSortDirectionChange}>
            {sortDown ? '▼' : '▲'}
          </button>
        </div>
        {(isLoading ? (
          <TailSpin color="#8080ff" wrapperClass={style.loader} />
        ) : content.length > 0 ? (
          content.map(({ ID, title, author, theme, date, image, likes, comments, views }) => (
            <NewsCard
              PostsReloadFlag={PostsReloadFlag}
              setPostsReloadFlag={setPostsReloadFlag}
              data={data}
              key={ID}
              id={ID}
              title={title}
              author={author}
              theme={theme}
              date={date}
              image={image}
              likes={likes}
              comments={comments}
              views={views}
            />
          ))
        ): <div>В этой категории нет постов :(</div>)}
      </div>

      <div className={style.page_buttons__wrapper}>
        {currentPage === 1 ? (
          <p></p>
        ) : (
          <button
            className={`${style.continue__button} ${style.continue__button_back}`}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          >
            <img src="chevron.png" width={50} alt="Back" />
          </button>
        )}
        {currentPage * 10 > totalPages ? (
          <p></p>
        ) : (
          <button
            className={`${style.continue__button} ${style.continue__button_forward}`}
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            <img src="chevron.png" width={50} alt="Forward" />
          </button>
        )}
      </div>
    </>
  );
}
