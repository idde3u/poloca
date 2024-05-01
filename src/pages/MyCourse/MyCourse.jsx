import React, { useState, useEffect } from "react";
import styles from "./MyCourse.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function MyCourse() {
  const props = JSON.parse(localStorage.getItem("course"));
  let name = "";
  let ava = "";
  let lessonsCount = 0;
  const nav = useNavigate();

  let lessonsList = props.lessons.map((ls)=>{
    lessonsCount+=1;
    return(
        <Link to={`/mycourses/1/${lessonsCount}`}>
            <button className={styles.lessons__link}>{lessonsCount + ". " + ls.name}</button>
        </Link>
    )
  })

  const handleDelete = () =>{
    localStorage.removeItem("course");
    nav("/")
    }
    
  return (
    <div className={styles.container}>
                <button className={styles.course__goBack} onClick={()=>nav(-1)}></button>
            <div className={styles.course__info}>
                    <div className={styles.course__container}>
                        <div className={styles.course__header}>
                            <div className={styles.course__author}>
                                <img src="../img/CheckUser.jpg" alt="" className={styles.author__img}/>
                                <p className={styles.author__name}>{props.author}</p>
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
                    <div className={styles.lessons__container}>
                        <h2 className={styles.course__name}>Список уроков</h2>
                        {lessonsList}
                    </div>
            </div>
            <div className={styles.buttons__list}>
                <Link to="/editcourse"><button className={styles.button__main}>Редактировать курс</button></Link>
                <button onClick={handleDelete} className={styles.delete__button}>Удалить курс</button>
            </div>
        </div>
  );
}