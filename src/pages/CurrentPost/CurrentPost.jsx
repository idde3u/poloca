import React from "react";
import { useState, useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';
import { useParams, useNavigate } from "react-router";
import personData from "../../data/personData.json"
import styles from "./CurrentPost.module.css";
import { Link } from "react-router-dom";
import commentsData from "../../data/comments.json"
import noavatar from "./Ссылка на изображение.png"
import ava1 from "./Мачуговский Александр.png"
import ava2 from "./Смирнов Андрей.png"
import ava3 from "./Иванова Елена.png"
import ava4 from "./Петров Михаил.png"
import ava5 from "./Соколов Денис.png"
import follower from "./follower.svg"
import prog from "./Программирование.svg"
import des from "./Дизайн.svg"
import car from "./Карьера.svg"
import ls from "./Личное.svg"
import heartact from "./heart-active.svg"
import heartdes from "./like-inactive.svg"
import comment from "./comment.svg"


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

    const pre = JSON.parse(localStorage.getItem("prevPerson"))

    function handleAlert(){
        alert("Перед совершением действия авторизуйтесь в системе")
    }

    const postCard = articles.map(info=>{
        let topicpic = noavatar;
        switch (info.topic){
            case "Программирование":
                topicpic=prog;
                break;
                case "Дизайн":
                topicpic=des;
                break;
                case "Карьера":
                topicpic=car;
                break;
                case "Личное":
                topicpic=ls;
                break;
                default:
                    topicpic=noavatar;
        }
        let avatar=noavatar;
        switch(info.author){
        case "Мачуговский Александр" :
            avatar=ava1
            break;
        case "Смирнов Андрей" :
            avatar=ava2
            break;
        case "Иванова Елена" :
            avatar=ava3
            break;
        case "Петров Михаил" :
            avatar=ava4
            break;
        case "Соколов Денис" :
            avatar=ava5
            break;
            default:
            avatar=noavatar
        }
        if (info.id === id){
            name = info.author
            return(
                <div className={styles.post__container}>
                <div className={styles.post__info}>
                    <div className={styles.post__links}>
                        <div className={styles.post__topik}>
                            <img src={topicpic} alt="" className={styles.post__icon} />
                            <p className={styles.post__text}>{info.topic}</p>
                        </div>
                        <div className={styles.post__author}>
                            <img src={avatar} alt="" className={styles.post__avatar} />
                            <p className={styles.post__text}>{info.author}</p>
                        </div>
                    </div>
                    <span className={styles.post__date}>{info.date}</span>
                </div>
                <h2 className={styles.post__heading}>{info.name}</h2>
                <MDEditor.Markdown source={info.text}/>
                <div className={styles.post__bottom}>               
                <button className={styles.post__like_button} onClick={pre.isHere? handleClick : handleAlert}>
                    <img className={styles.post__like_icon} src={info.isLiked? heartact : heartdes} alt="" />
                    <span className={styles.post__like_text}>{info.isLiked? info.likes+1 : info.likes}</span>
                </button>
                <div className={styles.post__comment}>
                    <img className={styles.post__comment_icon} src={comment} alt="" />
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
        let avatar=noavatar;
        switch(per.name){
        case "Мачуговский Александр" :
            avatar=ava1
            break;
        case "Смирнов Андрей" :
            avatar=ava2
            break;
        case "Иванова Елена" :
            avatar=ava3
            break;
        case "Петров Михаил" :
            avatar=ava4
            break;
        case "Соколов Денис" :
            avatar=ava5
            break;
            default:
            avatar=noavatar
        }
        if (per.name === name) {
          return (
            <div key={per.name} className={styles.person}>
              <Link to={`/poloca/person/${per.id}`}>
                <div className={styles.person__header}>
                  <img src={avatar} alt="" className={styles.person__avatar} />
                  <div className={styles.person__info}>
                    <h2 className={styles.person__name}>{per.name}</h2>
                    <p className={styles.person__spec}>{per.spec}</p>
                  </div>
                </div>
              </Link>
              <p className={styles.person__desc}>{per.desc}</p>
              <button className={per.isSubscribed ? styles.sub__disabled : styles.sub__active} onClick={pre.isHere? () => handleSubscribe(per.name) : handleAlert}>
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

    const commentsList = comments.map(info=>{
        let avatar=noavatar;
        switch(info.author){
        case "Мачуговский Александр" :
            avatar=ava1
            break;
        case "Смирнов Андрей" :
            avatar=ava2
            break;
        case "Иванова Елена" :
            avatar=ava3
            break;
        case "Петров Михаил" :
            avatar=ava4
            break;
        case "Соколов Денис" :
            avatar=ava5
            break;
            default:
            avatar=noavatar
        }
        if (info.id == id){
            return(
                <div className={styles.comment__container}>
                    <div className={styles.comment__desc}>
                        <img src={avatar} alt="" className={styles.comment__img} />
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