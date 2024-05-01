import React from "react";
import { useState, useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';
import { useParams, useNavigate } from "react-router";
import personData from "../../data/personData.json"
import styles from "./CurrentPost.module.css";
import { Link } from "react-router-dom";
import commentsData from "../../data/comments.json"


export default function CurrentPost() {
    const nav = useNavigate();
    const par = useParams();
    const id = Number(par.id)

    const [candidates, setCandidates] = useState(() => {
        const storedCandidates = localStorage.getItem("personData");
        return storedCandidates ? JSON.parse(storedCandidates) : personData;
      });
      useEffect(() => {
        localStorage.setItem("personData", JSON.stringify(candidates));
      }, [candidates]);
    let name = ""
    
    const [articles, setArticles] = useState(() => {
        const storedComments = localStorage.getItem("articlesData");
        return storedComments ? JSON.parse(storedComments) : [];
    });

    useEffect(() => {
        localStorage.setItem("articlesData", JSON.stringify(articles));
    }, [articles]); 
    
    function handleClick() {
        const updatedComments = articles.map(comment => {
            if (comment.id === id) {
                return {
                    ...comment,
                    isLiked: !comment.isLiked // Переключаем isLiked на противоположное значение
                };
            }
            return comment;
        });
        setArticles(updatedComments); 
        window.location.reload()
    }

    const [commentsCount, setCommentsCount] = React.useState(0);
    React.useEffect(() => {
        setCommentsCount(()=>{
            let count = 0;
            comments.map(info=>{
            if (info.id===id){
                count = count+1;
            }
        })
        return(
            count
        )})
    }, [commentsCount]);

    const postCard = articles.map(info=>{
        const topikName = '../img/' + info.topic+'.svg'
        const authorName = '../img/' + info.author + '.png'
        if (info.id === id){
            name = info.author
            return(
                <div className={styles.post__container}>
                <div className={styles.post__info}>
                    <div className={styles.post__links}>
                        <div className={styles.post__topik}>
                            <img src={topikName} alt="" className={styles.post__icon} />
                            <p className={styles.post__text}>{info.topic}</p>
                        </div>
                        <div className={styles.post__author}>
                            <img src={authorName} alt="" className={styles.post__avatar} />
                            <p className={styles.post__text}>{info.author}</p>
                        </div>
                    </div>
                    <span className={styles.post__date}>{info.date}</span>
                </div>
                <h2 className={styles.post__heading}>{info.name}</h2>
                <MDEditor.Markdown source={info.text}/>
                <div className={styles.post__bottom}>               
                <button className={styles.post__like_button} onClick={handleClick}>
                    <img className={styles.post__like_icon} src={info.isLiked? "../img/heart-active.svg" : "../img/like-inactive.svg"} alt="" />
                    <span className={styles.post__like_text}>{info.isLiked? info.likes+1 : info.likes}</span>
                </button>
                <div className={styles.post__comment}>
                    <img className={styles.post__comment_icon} src="../img/comment.svg" alt="" />
                    <span className={styles.post__like_text}>{commentsCount}</span>
                </div>
            </div>
            </div>
            )
        }
    })

    const handleSubscribe = (personName) => {
        const updatedCandidates = candidates.map((candidate) => {
          if (candidate.name === personName) {
            return { ...candidate, isSubscribed: !candidate.isSubscribed };
          }
          return candidate;
        });
        setCandidates(updatedCandidates);
      };

    const personCard = candidates.map((per) => {
        if (per.name === name) {
          return (
            <div key={per.name} className={styles.person}>
              <Link to={`/person/${per.id}`}>
                <div className={styles.person__header}>
                  <img src={per.avatar} alt="" className={styles.person__avatar} />
                  <div className={styles.person__info}>
                    <h2 className={styles.person__name}>{per.name}</h2>
                    <p className={styles.person__spec}>{per.spec}</p>
                  </div>
                </div>
              </Link>
              <p className={styles.person__desc}>{per.desc}</p>
              <button className={per.isSubscribed ? styles.sub__disabled : styles.sub__active} onClick={() => handleSubscribe(per.name)}>
                {per.isSubscribed ? "Отписаться" : "Подписаться"}
              </button>
            </div>
          );
        }
        return null;
      });

    const [commentText, setCommentText] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [comments, setComments] = useState(() => {
        const storedComments = localStorage.getItem("comments");
        return storedComments ? JSON.parse(storedComments) : commentsData;
      });
    useEffect(() => {
        localStorage.setItem("comments", JSON.stringify(comments));
    }, [comments]);
    const pre = JSON.parse(localStorage.getItem('prevPerson'));
    console.log(pre)

    const commentsList = comments.map(info=>{
        const authorName = '../img/' + info.author + '.png'
        if (info.id == id){
            return(
                <div className={styles.comment__container}>
                    <div className={styles.comment__desc}>
                        <img src={authorName} alt="" className={styles.comment__img} />
                        <h3 className={styles.comment__header}>{info.author}</h3>
                    </div>
                    <p className={styles.comment__text}>{info.text}</p>
                </div>
            )
        }
      })

    const handleSubmit = () => {
        if (pre.isHere){
            if (commentText.trim() !== '') {
            const existingComments = JSON.parse(localStorage.getItem('comments')) || [];
            const newComment = {
                id: id,
                author: pre.name,
                text: commentText.trim()
            };
            const updatedComments = [...existingComments, newComment];
            localStorage.setItem('comments', JSON.stringify(updatedComments));
            setCommentText('');
            alert('Комментарий добавлен успешно!');
        } else {
            alert('Введите текст комментария.');
        }
        } else{
            alert('Перед тем как оставить комментарий - зарегистрируйтесь');
        }
    };

  return (
    <div className={styles.container}>
        <button className={styles.vac__goBack} onClick={()=>nav(-1)}></button>
        <div className={styles.mid__content}>
            {postCard}
            <div className={styles.comments__container}>
                <div className={styles.comments__header}>
                    <h2 className={styles.comments__heading}>Комментарии</h2>
                    <button className={styles.addComment} onClick={() => setShowForm(!showForm)}></button>
                </div>
                {showForm && (
                <div className={styles.form__container}>
                    <textarea
                        value={commentText} 
                        onChange={(e) => setCommentText(e.target.value)} 
                        placeholder="Введите ваш комментарий" 
                        className={styles.form__input}
                    />
                    <button onClick={handleSubmit} className={styles.form__button}>Отправить комментарий</button>
                </div>
                )}
                {commentsList}
            </div>
        </div>
        {personCard}
    </div>
  );
}