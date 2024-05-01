import React, { useState, useEffect } from "react";
import CourseCard from "../../components/CourseCard/CourseCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import coursesData from "../../data/coursesData.json";
import styles from '../Courses/Courses.module.css';

export default function RepCourses() {
    const [courses, setCourses] = useState(() => {
        const storedCourses = localStorage.getItem("coursesData");
        return storedCourses ? JSON.parse(storedCourses) : coursesData;
    });

    useEffect(() => {
        localStorage.setItem("coursesData", JSON.stringify(courses));
    }, [courses]);

    let cardsCount=0;

    const per = JSON.parse(localStorage.getItem("prevPerson"));
    const nav = useNavigate();

    const noregAlert=
        <div className={styles.infobox}>
            <p className={styles.modal__heading}>Пожалуйста, авторизуйтесь в системе для просмотра ваших откликов</p>
        </div>

    function handleAlert(){
        alert("Пожалуйста, авторизуйтесь в системе для создания вакансий")
    }

    function handleClick(){
        nav("/createcourse")
    }

    const coursesList = courses.map(info => {
        if(info.isApplied){
            cardsCount+=1;
            return (
                <div className={styles.course__card} key={info.id}>
                    <Link to={`/courses/${info.id}`}>
                        <CourseCard {...info} />
                    </Link>
                </div>
            )
        }
    });

    const nocard = 
            <div className={styles.mycards_list}>
                <div className={styles.alert}>
                    <h2 className={styles.alert__text}>На данный момент вы не изучаете никаких курсов</h2>
                </div>
            </div>

    const card = 
                <div className={styles.mycards_list}>
                    {coursesList}
                </div>

    if (cardsCount===0){
        return(
            <div className={styles.container}>
                {per.isHere? nocard : noregAlert}
            <div className={styles.buttonsList}>
                <Link to='/mycourses'><button className={styles.button__secondary}>Мои курсы</button></Link>
                <Link to='/courses'><button className={styles.button__secondary}>Все курсы</button></Link>
                <button className={styles.button__main} onClick={per.isHere? handleClick : handleAlert}>Создать курс</button>
            </div>
            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                {per.isHere? card : noregAlert}
                <div className={styles.buttonsList}>
                    <Link to='/mycourses'><button className={styles.button__secondary}>Мои курсы</button></Link>
                    <Link to='/courses'><button className={styles.button__secondary}>Все курсы</button></Link>
                    <button className={styles.button__main} onClick={per.isHere? handleClick : handleAlert}>Создать курс</button>
                </div>
            </div>
        );
    }
}