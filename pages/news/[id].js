import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/news.module.css';
import { LineWave } from 'react-loader-spinner';
import getCorrectDate from '@/components/getCorrectDate';

export default function NewsDetail({data}) {
  const router = useRouter();
  const { id } = router.query;
  const [newsData, setNewsData] = useState(null);
  const [text, setText] = useState('');
  const [commentsFlag, setCommentsFlag] = useState(false);
  const [commnetIsSending, setCommentsIsSending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/news/${id}`);
        const data = await response.json();
        setNewsData(data);
        setCommentsIsSending(false);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, commentsFlag]);

  if (!newsData) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><LineWave /></div>;
  }

  
  const { title, author, theme, date, image, description, comments } = newsData;
  const img = 'data:image/png;base64, ' + Buffer.from(image).toString('base64');

  async function handleSubmit(e) {
    e.preventDefault();
    if(text.trim() === ''){
      return;
    }
    if(commnetIsSending) return;
    setCommentsIsSending(true);
    const response = await fetch('../api/leaveComment', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        postID: id,
        author: data.name,
        text: text, 
      })
    })
    console.group('1');
    console.log('status: ' + response.status);
    const responseData = await response.json()
    console.log('message: ' + responseData.message);
    setCommentsFlag(!commentsFlag);
    setText('');
    console.groupEnd('1');
  }

  async function handleDeleteComment(e, commentId) {
    e.preventDefault();
    const response = await fetch('../api/deleteComment', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: commentId,
        postID: id,
      })
    })
    console.group('1');
    console.log('status: ' + response.status);
    const responseData = await response.json()
    console.log('message: ' + responseData.message);
    setCommentsFlag(!commentsFlag);
    console.groupEnd('1');
  }


  return (
    <>
      <Head>
        <title>SpeakUp - {title}</title>
      </Head>

      <div className={styles.newsDetail}>
        <h1 className={styles.title}>{title}</h1> 
        <p className={styles.author}>{author}</p>
        <p className={styles.theme}>{theme}</p>
        <p className={styles.date}>{new Date(date).toLocaleDateString()}</p>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={img} 
            alt={title}
          />
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.comments_block}>
          <h1>Комментарии:</h1>

          {data.isLogged ?
            <div className = {styles.input__wrapper}>
            <textarea
            value = {text} 
            onChange = {(e) => {
              setText(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}/>
            {text.trim() !== '' ? <button onClick = {handleSubmit}><img src = '../chevron.png' width = {30} height = {30}/></button>: ''}
            </div> : ''}
          
          
          <ul>
            {[...comments].reverse().map(({id, text, author, date},index) => (
              <li key = {index} style = {{'--delay' : index.toString()}}>
                <h2>{author}</h2>
                <h3>{getCorrectDate(date)}</h3>
                <span>{text}</span> <br/>
                {data.name === 'admin' || data.name === author ? <button onClick = {(e) => {handleDeleteComment(e, id)}}>Удалить комментарий</button>: ''}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
