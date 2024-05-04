import React from "react";
import styles from "./CourseCard.module.css"
import lessonsData from "../../data/lessonsData"
import noavatar from "./Ссылка на изображение.png"
import ava1 from "./Мачуговский Александр.png"
import ava2 from "./Смирнов Андрей.png"
import ava3 from "./Иванова Елена.png"
import ava4 from "./Петров Михаил.png"
import ava5 from "./Соколов Денис.png"
import follower from "./follower.svg"

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
    const authorName = per.name===props.author? per.name :  props.author
            
    return(
        <div className={styles.course__container}>
            <div className={styles.course__header}>
                <div className={styles.course__author}>
                    <img src={avatar} alt="" className={styles.author__img}/>
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
                    <img src={follower} alt="" className={styles.course__icon} />
                    <p className={styles.followers__text}>{props.isApplied ? props.applied+1 : props.applied}</p>
                </div> 
            </div>
        </div>
    )
}