import React from "react";
import styles from "./CourseCard.module.css"
import lessonsData from "../../data/lessonsData"

export default function CourseCard(props){
    const per = JSON.parse(localStorage.getItem("prevPerson"));
    let lessonsCount = 0;
    let lsCount = lessonsData.map(info=>{
        if (props.id===info.id){
            lessonsCount+=1;
        }
    })
    const mycourse=JSON.parse(localStorage.getItem("course"));
    if (lessonsCount==0 && mycourse!==null){
        lsCount = mycourse.lessons.map(info=>{
            lessonsCount+=1;
        })
    }
    const authorImg = per.name===props.author? per.img :  '../img/' + props.author + '.png'
    const authorName = per.name===props.author? per.name :  props.author
            
    return(
        <div className={styles.course__container}>
            <div className={styles.course__header}>
                <div className={styles.course__author}>
                    <img src={authorImg} alt="" className={styles.author__img}/>
                    <p className={styles.author__name}>{authorName}</p>
                </div>
                    <p className={styles.topic__name}>{props.topic}</p>
            </div>
            <h2 className={styles.course__name}>{props.name}</h2>
            <div className={styles.course__footer}>
                <div className={styles.footer__desc}>
                    <p className={styles.desc__text}>уроков: {lessonsCount}</p>
                    <p className={styles.desc__text}>часов: ~{props.time}</p>
                    <p className={styles.desc__text}>{props.city}</p>
                </div>
                <div className={styles.course__followers}>
                    <img src="../img/follower.svg" alt="" className={styles.course__icon} />
                    <p className={styles.followers__text}>{props.isApplied ? props.applied+1 : props.applied}</p>
                </div> 
            </div>
        </div>
    )
}