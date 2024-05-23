import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import style from '@/styles/index.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import getCorrectDate from '@/components/getCorrectDate';
import Placeholder from './newsblockplaceholder';

export default function NewsCard({ id, title, author, description, theme, date, image, likes, comments, views, data, setPostsReloadFlag, PostsReloadFlag, isAdmin }) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(likes.some(({userId}) => {return userId === data.id}));
  const [loading, setLoading] = useState(true); 
  const [curLikes, setCurLikes] = useState(likes);
  const [likeIsSending, setLikeIsSending] = useState(false);

  const router = useRouter();

  useEffect(() => {

    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  const handleDeletePostClick = async (e) => {
    e.preventDefault(); 
    setLoading(true)
    const response = await fetch('api/deletePost', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: id})
    })
    if (response.ok) {
      setPostsReloadFlag(!PostsReloadFlag);
    } else {
      const message = await response.json()
      alert( message.message ); 
    }
  }

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const img = Buffer.from(image).toString('base64');

  const handleLike = async () => {
    if (likeIsSending) return;
    setLikeIsSending(true);
    const likeExist = curLikes.find(({userId}) => {return userId === data.id});
    const likeId = likeExist ? likeExist.id : 0;

    if (liked === false) {
      const response = await fetch('api/leaveLike', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          authorID: data.id,
          postID: id,
        })
      })
      const resData = await response.json();
      if (response.ok) setCurLikes(resData.likes);
    }
    else if (liked === true) {
      const response = await fetch('api/deleteLike', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          postID: id,
          id: likeId,
        })
      })
      const resData = await response.json();
      if (response.ok) setCurLikes(resData.likes); 
    }

    setLiked(!liked);
    setLikeIsSending(false);
  };

  if (loading) {
    return <Placeholder/>
  } 

  return (
    <div className={`${style.content_block} ${expanded ? style.expanded : ''}`} onClick={toggleExpanded}>
      <div className={style.imageContainer}>
        <img src={`data:image/png;base64, ${img}`} className={`${style.image} ${expanded ? style.blur : ''}`} />
        <div className={style.overlay}>
          <h1>{theme}</h1>
          <h2>{author}</h2>
          <h4>{getCorrectDate(date)}</h4>
        </div>
      </div>
      <div className={style.content}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={style.likesComments}>
          <div className={style.likes}>
            <img
              src="like.png"
              className={classNames(style.likeIcon, { [style.liked]: liked })}
              onClick={handleLike}
            />
            <span>{curLikes.length}</span>
          </div>
          <div className={style.comments}>
            <img src="comment.png" className={style.commentIcon} />
            <span>{comments.length}</span>
          </div>
          <div className={style.views}>
            <img src="eye.png" className={style.viewIcon} />
            <span>{views}</span>
          </div>
          {data.isLogged && (data.name === author || isAdmin) ?
           <div className={style.trashcan}>
            <a onClick = {handleDeletePostClick} href = '#?'>
            <img src="trashcan.svg" width = {25} height = {25} className={style.viewIcon} />
            </a>
          </div> : '' }
        </div>
      </div>
      <Link className={style.expandButton} href={`/news/${id}`}>
        <span>Подробнее</span>
      </Link>
    </div>
  );
}
