import style from '@/styles/index.module.css';

export default () => {
    return (
      <div className={`${style.content_block} ${style.placeholder}`}>
        <div className={style.imageContainer}></div>
        <div className={style.content}>
          <h3 className={style.placeholderTitle}></h3>
          <p className={style.placeholderDescription}></p>
          <div className={style.likesComments}>
            <div className={style.likes}>
              <span className={style.placeholderIcon}></span>
              <span className={style.placeholderCount}></span>
            </div>
            <div className={style.comments}>
              <span className={style.placeholderIcon}></span>
              <span className={style.placeholderCount}></span>
            </div>
            <div className={style.views}>
              <span className={style.placeholderIcon}></span>
              <span className={style.placeholderCount}></span>
            </div>
          </div>
        </div>
      </div>
    );
}