import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from '../Courses/Courses.module.css';
import CourseCard from "../../components/CourseCard/CourseCard";

export default function MyCourses() {
    const props = JSON.parse(localStorage.getItem("course"));
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
        nav("/poloca/createcourse")
    }

    const nocard = 
        <div className={styles.mycards_list}>
            <div className={styles.alert}>
                <h2 className={styles.alert__text}>На данный момент у вас нет активных курсов, но вы всегда можете это исправить</h2>
                <button className={styles.button__main} onClick={per.isHere? handleClick : handleAlert}>Создать курс</button>
            </div>
        </div>

    const card=
                <div className={styles.mycards_list}>
                    <Link to="/poloca/mycourses/1">
                        <CourseCard {...props}/>
                    </Link>
                </div>

    if (props===null){
        return(
            <div className={styles.container}>
                {per.isHere? nocard : noregAlert}
            <div className={styles.buttonsList}>
                <Link to='/poloca/courses'><button className={styles.button__secondary}>Все курсы</button></Link>
                <Link to='/poloca/repcourses'><button className={styles.button__secondary}>Изучаемые курсы</button></Link>
                <button className={styles.button__main} onClick={per.isHere? handleClick : handleAlert}>Создать курс</button>
            </div>
            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                {per.isHere? card : noregAlert}
                <div className={styles.buttonsList}>
                <Link to='/poloca/courses'><button className={styles.button__secondary}>Все курсы</button></Link>
                <Link to='/poloca/repcourses'><button className={styles.button__secondary}>Изучаемые курсы</button></Link>
                <button className={styles.button__main} onClick={per.isHere? handleClick : handleAlert}>Создать курс</button>
            </div>
            </div>
        );
    }
}

        