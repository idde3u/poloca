import React, { useState, useEffect } from "react";
import coursesData from "../../data/coursesData.json";
import personData from "../../data/personData.json";
import styles from "./CurrentCourse.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import lessonsData from "../../data/lessonsData.json"

export default function CurrentCourse() {
  const params = useParams();
  const id = Number(params.id);
  let name = "";
  let ava = "";
  const nav = useNavigate();

  // Загрузка данных о вакансиях и кандидатах из localStorage или использование начальных данных
  const [courses, setCourses] = useState(() => {
    const storedCourses = localStorage.getItem("coursesData");
    return storedCourses ? JSON.parse(storedCourses) : coursesData;
  });

  const [candidates, setCandidates] = useState(() => {
    const storedCandidates = localStorage.getItem("personData");
    return storedCandidates ? JSON.parse(storedCandidates) : personData;
  });

  useEffect(() => {
    localStorage.setItem("coursesData", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("personData", JSON.stringify(candidates));
  }, [candidates]);

  const handleSubscribe = (personName) => {
    const updatedCandidates = candidates.map((candidate) => {
      if (candidate.name === personName) {
        return { ...candidate, isSubscribed: !candidate.isSubscribed };
      }
      return candidate;
    });
    setCandidates(updatedCandidates);
  };
  let count = 0;

  const handleApply = () => {
    const updatedCourses = courses.map((course) => {
      if (course.id === id) {
        return { ...course, isApplied: !course.isApplied };
      }
      return course;
    });
    setCourses(updatedCourses);
};

  let lessonsList = lessonsData.map((ls)=>{
    if (ls.id==id){
        count+=1;
        return(
            <Link to={`/courses/${id}/${ls.idd}`}>
                <button className={styles.lessons__link} onClick={handleApply}>{count + ". " + ls.name}</button>
            </Link>
        )
    }
  })

  const coursesCard = courses.map((info) => {
    let lessonsCount = 0;
    const lsCount = lessonsData.map(lesson=>{
        if (lesson.id===info.id){
            lessonsCount+=1;
        }
    })
    if (info.id === id) {
        name = info.author;
        if (!info.isLocked){
            return (
                <>
                <div className={styles.course__container}>
                    <div className={styles.course__header}>
                        <p className={styles.topic__name}>{info.topic}</p>
                        <p className={styles.desc__city}>{info.city}</p>
                    </div>
                    <h2 className={styles.course__name}>{info.name}</h2>
                    <div className={styles.course__footer}>
                            <p className={styles.desc__text}>уроков: {lessonsCount}</p>
                            <p className={styles.desc__text}>часов: ~{info.time}</p>
                    </div>
                </div>
                {/* <p className={styles.comment}>Вы будете записаны на курс автоматически после открытия одного из уроков. Вы всегда можете отключить регистрацию на урок, нажав кнопку справа</p> */}
                </>
                
              );
        } else {
            lessonsList=null;
            return (
                <div className={styles.alert__container}>
                    <p className={styles.comment}>Автор данного курса закрыл доступ для просмотра. Вы можете оставить заявку на получение разрешения, нажав кнопку справа</p>
                </div>
            )
        }
      
    }
    return null;
  });
  

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

  const replyButton = courses.map((info)=>{
    if (info.id===id){
        return(
            <button onClick={handleApply} className={info.isApplied? styles.button__disabled : styles.button__active}>{info.isApplied? "Отписаться от курса" : "Записаться на курс"}</button>
        )
    }
  })

  return (
    <div className={styles.container}>
            <button className={styles.course__goBack} onClick={()=>nav(-1)}></button>
            <div className={styles.course__info}>
                {coursesCard}
                <div className={styles.lessons__container}>
                    <h2 className={styles.course__name}>Список уроков</h2>
                    {lessonsList}
                </div>
            </div>
            <div className={styles.person__info}>
                {personCard}
                {replyButton}
            </div>
        </div>
  );
}