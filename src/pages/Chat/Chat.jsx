import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ChatBot from "../../components/ChatBot/ChatBot";
import styles from "../../components/ChatBot/ChatBot.module.css"
import ava1 from "./Мачуговский Александр.png"
import ava2 from "./Смирнов Андрей.png"
import ava3 from "./Иванова Елена.png"
import ava4 from "./Петров Михаил.png"
import ava5 from "./Соколов Денис.png"

export default function Chat(){
    const chat1 = JSON.parse(localStorage.getItem("Мачуговский Александр messages"))
    const chat2 = JSON.parse(localStorage.getItem("Смирнов Андрей messages"))
    const chat3 = JSON.parse(localStorage.getItem("Иванова Елена messages"))
    const chat4 = JSON.parse(localStorage.getItem("Петров Михаил messages"))
    const chat5 = JSON.parse(localStorage.getItem("Соколов Денис messages"))
    const persons = JSON.parse(localStorage.getItem("personData"))
    const params = useParams();

    let button1 = <></>
    let button2 = <></>
    let button3 = <></>
    let button4 = <></>
    let button5 = <></>
    if (chat1!==null){
        button1 = 
            <div className={styles.button__block}>
                <Link to={`/poloca/chat/${1}`}>
                    <button  className={styles.button__container}>
                    <img src={ava1} alt="" className={styles.button__img}/>
                    <p className={styles.button__name}>{persons[0].name}</p>
                </button>
                </Link>
                <hr className={styles.linee}/>
            </div>
            
    }
    if (chat2!==null){
        button2 = 
        <div className={styles.button__block}>
            <Link to={`/poloca/chat/${2}`}>
                <button  className={styles.button__container}>
                <img src={ava2} alt="" className={styles.button__img}/>
                <p className={styles.button__name}>{persons[1].name}</p>
            </button>
            </Link>
            <hr className={styles.linee}/>
        </div>
    }
    if (chat3!==null){
        button3 = 
        <div className={styles.button__block}>
            <Link to={`/poloca/chat/${3}`}>
                <button  className={styles.button__container}>
                <img src={ava3} alt="" className={styles.button__img}/>
                <p className={styles.button__name}>{persons[2].name}</p>
            </button>
            </Link>
            <hr className={styles.linee}/>
        </div>
    }
    if (chat4!==null){
        button4 = 
        <div className={styles.button__block}>
            <Link to={`/poloca/chat/${4}`}>
                <button  className={styles.button__container}>
                <img src={ava4} alt="" className={styles.button__img}/>
                <p className={styles.button__name}>{persons[3].name}</p>
            </button>
            </Link>
            <hr className={styles.linee}/>
        </div>
    }
    if (chat5!==null){
        button3 = 
        <div className={styles.button__block}>
            <Link to={`/poloca/chat/${5}`}>
                <button  className={styles.button__container}>
                <img src={ava5} alt="" className={styles.button__img}/>
                <p className={styles.button__name}>{persons[4].name}</p>
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
                {button3}
                {button4}
                {button5}
            </div>
            {Number(params.id)===0? helpWindow : chat}
        </div>
    )
}