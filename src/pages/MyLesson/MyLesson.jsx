import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styles from "../LessonPage/LessonPage.module.css";

function MyLesson() {
    const props = JSON.parse(localStorage.getItem("course"));
    const params = useParams();
    console.log(params)

  let title = '';
  let desc = '';
  const id = Number(params.id)
  let lessonsCount = 0;

  const lessonCard=props.lessons.map(info=>{
    lessonsCount+=1;
    if (lessonsCount===id){
        title = info.name;
        desc=info.desc
    }
  })

  return (
    <div className={styles.container}>
        <Link to={`/mycourses/1`}>
            <button className={styles.vac__goBack}></button>
        </Link>
        <div className={styles.lesson__container}>
            <h2 className={styles.lesson__name}>{title}</h2>
            <p className={styles.lesson__desc}>{desc}</p>
        </div>
        
    </div>
  );
}

export default MyLesson;