import React from "react";
import styles from "./VacancyCard.module.css";
import noavatar from "./Ссылка на изображение.png"
import ava1 from "./Мачуговский Александр.png"
import ava2 from "./Смирнов Андрей.png"
import ava3 from "./Иванова Елена.png"
import ava4 from "./Петров Михаил.png"
import ava5 from "./Соколов Денис.png"
import follower from "./follower.svg"

export default function VacancyCard(props){
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
    return(
            <div className={styles.vacancy__container}>
                <div className={styles.vacancy__info}>
                        <div className={styles.vacancy__author}>
                            <img src={avatar} alt="" className={styles.vacancy__avatar} />
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
                        <img src={follower} alt="" className={styles.vacancy__icon} />
                        <p className={styles.vacancy__text}>{props.isApplied ? props.apllied+1 : props.apllied}</p>
                    </div>   
                </div>
            </div>
    )
}