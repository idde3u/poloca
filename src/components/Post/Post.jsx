import React from "react";
import styles from "./Post.module.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Post(props){
    const topikName = '../img/' + props.topic+'.svg'
    const authorName = '../img/' + props.author + '.png'
    const comments = JSON.parse(localStorage.getItem("comments"));
    
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
                        <img src={topikName} alt="" className={styles.post__icon} />
                        <p className={styles.header__text}>{props.topic}</p>
                    </div>
                    <div className={styles.post__author}>
                        <img src={authorName} alt="" className={styles.post__avatar} />
                        <p className={styles.header__text}>{props.author}</p>
                    </div>
                </div>
                <span className={styles.post__date}>{dateName}</span>

            </div>
            <h2 className={styles.post__heading}>{props.name}</h2>
            <p className={styles.post__text}>{props.text}</p>
            <div className={styles.post__bottom}>               
                <button className={styles.post__like_button}>
                    <img className={styles.post__like_icon} src={props.isLiked? "../img/heart-active.svg" : "../img/like-inactive.svg"} alt="" />
                    <span className={styles.post__like_text}>{props.isLiked? props.likes+1 : props.likes}</span>
                </button>
                <div className={styles.post__comment}>
                    <img className={styles.post__comment_icon} src="../img/comment.svg" alt="" />
                    <span className={styles.post__like_text}>{commentsCount}</span>
                </div>
            </div>
        </div>
    )
}