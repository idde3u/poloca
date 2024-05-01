import React from "react";
import { useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import styles from "./CreatePost.module.css";
import { useNavigate } from "react-router";

export default function CreatePost() {
    const per = JSON.parse(localStorage.getItem("prevPerson"));
    const [value, setValue] = React.useState("Вы можете написать сюда свою статью");
    const nav = useNavigate();
    const nowDate = new Date();
    const id = Number(nowDate.getFullYear()*10000+(nowDate.getMonth()+1)*100+nowDate.getDate())
    let datee = id.toString()
    datee = datee.slice(0,4)+"-"+datee.slice(4,6)+"-"+datee.slice(6,8)

    const [formData, setFormData] = useState({
        id: id,
        author: per.name,
        topic: "",
        date: datee,
        name: "",
        text: value,
        likes: 0,
        isLiked: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTextChange = (value) => {
        setFormData({ ...formData, text: value });
      };

    const handleClick = () => {
        localStorage.setItem('myArticle', JSON.stringify(formData))
        nav("/");
    }
    return (
        <div className={styles.container}>
            <button className={styles.vac__goBack} onClick={()=>nav(-1)}></button>
            <div className={styles.maincontent}>
                <div className={styles.textblock}>
                    <h2 className={styles.textblock__header}>Рады приветствовать вас в редакторе статьи!</h2>
                    <p className={styles.textblock__text}>Вы можете написать свою статью ниже и отредактировать ее с помощью простых инструментов в верхней панели. В панели справа представлена версия, которая будет отображаться у пользователей при просмотре статьи, чтобы вы могли проверить качество верстки</p>
                </div>
                <div className={styles.inputblock}>
                    <label htmlFor="title" className={styles.modal__label}>Название статьи</label>
                    <input className={styles.modal__input} type="text" name="name" placeholder="Название" onChange={handleInputChange} id="title"/>
                    <div className={styles.modal__selectList}>
                    <div className={styles.modal__input_labeled}>
                        <label htmlFor="grade" className={styles.modal__label}>Тема</label>
                        <select name="topic" onChange={handleInputChange} id="grade">
                        <option value="">Выберите тему статьи</option>
                        <option value="Дизайн">Дизайн</option>
                        <option value="Программирование">Программирование</option>
                        <option value="Карьера">Карьера</option>
                        <option value="Личное">Личное</option>
                        </select>
                    </div>
                    </div>
                </div>
                <MDEditor
                    value={formData.text}
                    onChange={handleTextChange}
                />
                <button onClick={handleClick} className={styles.button__main}>Завершить создание статьи</button>
            </div>
            
        </div>
  );
}