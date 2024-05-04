import React, { useTransition } from "react";
import Post from "../../components/Post/Post";
import styles from "./MyArticles.module.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function MyArticles(){
    const [selectedFilters, setSelectedFilters] = React.useState({
        topic: [],
        date: [],
    });
    const dataJS = JSON.parse(localStorage.getItem("myArticle"));
    const nav = useNavigate();

    const per = JSON.parse(localStorage.getItem("prevPerson"))

    function handleClick(){
        nav("/poloca/createpost");
    }

    function handleAlert(){
        alert("Пожалуйста, авторизуйтесь в системе для создания статьи")
    }

    const card =
        <div className={styles.cards_list}>
            <Link to='/poloca/mypost'>
                <Post {...dataJS}/>
            </Link>
        </div>

    const nocard = 
        <div className={styles.infobox}>
            <p className={styles.alert__text}>На данный момент вы не опубликовали статьи, но вы всегда можете это исправить</p>
            <button className={styles.button__main} onClick={per.isHere? handleClick : handleAlert}>Создать статью</button>
        </div>

    const noregAlert=
        <div className={styles.infobox}>
            <p className={styles.modal__heading}>Пожалуйста, авторизуйтесь в системе для просмотра ваших откликов</p>
        </div>

    if (dataJS===null){
        
        return(
            <div className={styles.container}>
                {per.isHere? nocard : noregAlert}
                <div>
                    <Link to='/poloca'><button className={styles.button__secondary}>Все статьи</button></Link>
                    <button className={styles.button__main} onClick={per.isHere? handleClick : handleAlert}>Создать статью</button>
                </div>
            </div>
        )
    } else {
        return(
            <div className={styles.container}>
                {per.isHere? card: noregAlert}
                <div>
                    <Link to='/poloca'><button className={styles.button__secondary}>Все статьи</button></Link>
                    <button className={styles.button__main} onClick={per.isHere? handleClick : handleAlert}>Создать статью</button>
                </div>
            </div>
        )
    }
}