import React, { useState, useEffect } from 'react';
import lessonsData from "../../data/lessonsData.json";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styles from "./LessonPage.module.css";

function LessonPage() {
    const params = useParams();
  const courseId=Number(params.id);
  const lessonId = Number(params.idd);

  let title = '';
  let desc = '';

  const lessonCard=lessonsData.map(info=>{
    if (info.id===courseId && info.idd===lessonId){
        title = info.name;
        desc=info.desc
    }
  })

  return (
    <div className={styles.container}>
        <Link to={`/courses/${courseId}`}>
            <button className={styles.vac__goBack}></button>
        </Link>
        <div className={styles.lesson__container}>
            <h2 className={styles.lesson__name}>{title}</h2>
            <p className={styles.lesson__desc}>{desc}</p>
        </div>
        
    </div>
  );
}

export default LessonPage;