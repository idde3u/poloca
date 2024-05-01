import React from "react";
import styles from "../VacancyCard/VacancyCard.module.css";

export default function ReplyCard(props){
    const authorName = './img/' + props.author + '.png'

    return(
            <div className={styles.vacancy__container}>
                <div className={styles.vacancy__info}>
                        <div className={styles.vacancy__author}>
                            <img src={authorName} alt="" className={styles.vacancy__avatar} />
                            <p className={styles.vacancy__text}>{props.author}</p>
                        </div>
                    <span className={styles.vacancy__salary}>{props.salary} ₽</span>
                </div>
                <h2 className={styles.vacancy__heading}>{props.name}</h2>
                <div className={styles.vacancy__bottom}>
                    <div className={styles.vacancy__info2}>
                        <p className={styles.vacancy__city}>{props.city}</p>
                        <p className={styles.vacancy__text}>{props.grade}</p>
                    </div>
                    <div className={styles.vacancy__followers}>
                        <p className={styles.reply__badge}>На рассмотрении</p>
                    </div>   
                </div>
            </div>
    )
}