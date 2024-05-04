import React from "react";
import styles from "./Post.module.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import commentsData from "../../data/comments.json"

export default function Post(props){
    let topicpic = noavatar;
    switch (props.topic){
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
    switch(props.author){
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

    const [comments, setComments] = useState(() => {
        const storedArticles = localStorage.getItem("comments");
        return storedArticles ? JSON.parse(storedArticles) : commentsData;
      });
      useEffect(() => {
        localStorage.setItem("comments", JSON.stringify(comments));
      }, [comments]); 

    
    const prevDate = new Date(props.date);
    const nowDate = new Date();
    let dateName = '';
    const date = nowDate.getTime()-prevDate.getTime();
    if (date<86400000){
            dateName='сегодня'
    } else if (date<172800000){
        dateName='вчера'
    } else if (date<604800000){
        dateName='на этой неделе'
    } else if (date<2678400000){
        dateName='в этом месяце'
    } else {
        dateName=props.date;
    }

    const [articles, setArticles] = useState(() => {
        const storedComments = localStorage.getItem("articlesData");
        return storedComments ? JSON.parse(storedComments) : [];
    });

    useEffect(() => {
        localStorage.setItem("articlesData", JSON.stringify(articles));
    }, [articles]); 
    
    const [commentsCount, setCommentsCount] = React.useState(0);
    React.useEffect(() => {
        setCommentsCount(()=>{
            let count = 0;
            comments.map(info=>{
            if (info.id===props.id){
                count = count+1;
            }
        })
        return(
            count
        )})
    }, [commentsCount]);
            
    return(
        <div className={styles.post__container}>
            <div className={styles.post__info}>
                <div className={styles.post__links}>
                    <div className={styles.post__topik}>
                        <img src={topicpic} alt="" className={styles.post__icon} />
                        <p className={styles.header__text}>{props.topic}</p>
                    </div>
                    <div className={styles.post__author}>
                        <img src={avatar} alt="" className={styles.post__avatar} />
                        <p className={styles.header__text}>{props.author}</p>
                    </div>
                </div>
                <span className={styles.post__date}>{dateName}</span>

            </div>
            <h2 className={styles.post__heading}>{props.name}</h2>
            <p className={styles.post__text}>{props.text}</p>
            <div className={styles.post__bottom}>               
                <button className={styles.post__like_button}>
                    <img className={styles.post__like_icon} src={props.isLiked? heartact : heartdes} alt="" />
                    <span className={styles.post__like_text}>{props.isLiked? props.likes+1 : props.likes}</span>
                </button>
                <div className={styles.post__comment}>
                    <img className={styles.post__comment_icon} src={comment} alt="" />
                    <span className={styles.post__like_text}>{commentsCount}</span>
                </div>
            </div>
        </div>
    )
}