import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ChatBot from "../../components/ChatBot/ChatBot";
import styles from "../../components/ChatBot/ChatBot.module.css"

export default function Chat(){
    const chat1 = JSON.parse(localStorage.getItem("Мачуговский Александр messages"))
    const chat2 = JSON.parse(localStorage.getItem("Мачуговский Василий messages"))
    const persons = JSON.parse(localStorage.getItem("personData"))
    const params = useParams();

    let button1 = <></>
    let button2 = <></>
    if (chat1!==null){
        button1 = 
            <div className={styles.button__block}>
                <Link to={`/chat/${1}`}>
                    <button  className={styles.button__container}>
                    <img src={persons[0].avatar} alt="" className={styles.button__img}/>
                    <p className={styles.button__name}>{persons[0].name}</p>
                </button>
                </Link>
                <hr className={styles.linee}/>
            </div>
            
    }
    if (chat2!==null){
        button2 = 
        <div className={styles.button__block}>
            <Link to={`/chat/${2}`}>
                <button  className={styles.button__container}>
                <img src={persons[1].avatar} alt="" className={styles.button__img}/>
                <p className={styles.button__name}>{persons[1].name}</p>
            </button>
            </Link>
            <hr className={styles.linee}/>
        </div>
            
        
    }

    const helpWindow=
        <div className={styles.chat__container}>
            <p className={styles.message__user__text}>Выберите чат из списка доступных</p>
            <p className={styles.message__user__text}>В случае если ни одного чата нет, начните общение с пользователем через соответствующую кнопку в его профиле (вы можете найти его профиль через его публикации)</p>
        </div>

    const chat = 
        <ChatBot></ChatBot>

    return(
        <div className={styles.container}>
            <div className={styles.buttons__container}>
                {button1}
                {button2}
            </div>
            {Number(params.id)===0? helpWindow : chat}
        </div>
    )
}