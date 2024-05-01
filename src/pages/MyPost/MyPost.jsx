import React from "react";
import { useState, useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';
import { useParams, useNavigate } from "react-router";
import styles from "../CurrentPost/CurrentPost.module.css";
import { Link } from "react-router-dom";
import commentsData from "../../data/comments.json"


export default function CurrentPost() {
    const nav = useNavigate();
    const par = useParams();
    const id = Number(par.id)

    const myArticle = JSON.parse(localStorage.getItem("myArticle"));
    
    function handleClick() {
        myArticle.isLiked = !myArticle.isLiked;
        localStorage.setItem('myArticle', JSON.stringify(myArticle));
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

      const topikName = '../img/' + myArticle.topic+'.svg'
      const authorName = '../img/' + myArticle.author + '.png'

    const postCard = 
                <div className={styles.post__container}>
                <div className={styles.post__info}>
                    <div className={styles.post__links}>
                        <div className={styles.post__topik}>
                            <img src={topikName} alt="" className={styles.post__icon} />
                            <p className={styles.post__text}>{myArticle.topic}</p>
                        </div>
                        <div className={styles.post__author}>
                            <img src={authorName} alt="" className={styles.post__avatar} />
                            <p className={styles.post__text}>{myArticle.author}</p>
                        </div>
                    </div>
                    <span className={styles.post__date}>{myArticle.date}</span>
                </div>
                <h2 className={styles.post__heading}>{myArticle.name}</h2>
                <MDEditor.Markdown source={myArticle.text}/>
                <div className={styles.post__bottom}>               
                <button className={styles.post__like_button} onClick={handleClick}>
                    <img className={styles.post__like_icon} src={myArticle.isLiked? "../img/heart-active.svg" : "../img/like-inactive.svg"} alt="" />
                    <span className={styles.post__like_text}>{myArticle.isLiked? myArticle.likes+1 : myArticle.likes}</span>
                </button>
                <div className={styles.post__comment}>
                    <img className={styles.post__comment_icon} src="../img/comment.svg" alt="" />
                    <span className={styles.post__like_text}>{commentsCount}</span>
                </div>
            </div>
            </div>

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

    const commentsList = comments.map(info=>{
        const authorName = '../img/' + info.author + '.png'
        if (info.id == myArticle.id){
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
            window.location.reload()
        } else {
            alert('Введите текст комментария.');
        }
        } else{
            alert('Перед тем как оставить комментарий - зарегистрируйтесь');
        }
    };

    const handleDelete = () =>{
        localStorage.removeItem("myArticle");
        nav("/")
    }

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
        <button onClick={handleDelete} className={styles.delete__button}>Удалить статью</button>
    </div>
  );
}