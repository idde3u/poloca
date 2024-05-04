import React from "react";
import styles from "./Header.module.css"
import { Link } from 'react-router-dom';
import data from '../../data/yourProfile.json'
import prevData from "../../data/prevData.json"
import { useState, useEffect } from "react";
import logo from "./logo.png";
import noavatar from "./Ссылка на изображение.png";
import login from "./login.png"

const MyForm = ({onClose}) => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const dataFromLocalStorage = JSON.parse(localStorage.getItem('prevPerson'));

        if (!dataFromLocalStorage) {
            setMessage('Данные в локальном хранилище отсутствуют');
            return;
        }

        if (input1 !== dataFromLocalStorage.email || input2 !== dataFromLocalStorage.password) {
            setMessage('Такого аккаунта не существует. Проверьте корректность ввода данных');
            return;
        }

        setMessage('Данные введены верно, происходит вход');

        dataFromLocalStorage.isHere=true;
        localStorage.setItem("prevPerson", JSON.stringify(dataFromLocalStorage));
        window.location.reload()
    }

    const HandleClose = ()=> {
        onClose();
    }

    return (
        <div className={styles.modal}>
            <form onSubmit={handleSubmit} className={styles.modal__window}>
                <div className={styles.modal__header}>
                    <h2 className={styles.modal__heading}>Добро пожаловать в систему Полоса</h2>
                    <span className={styles.modal__close} onClick={onClose}></span>
                </div>
                <label htmlFor="input1" className={styles.modal__label}>Почта</label>
                <input 
                    type="text" 
                    id="input1" 
                    value={input1} 
                    onChange={(e) => setInput1(e.target.value)} 
                    required
                    className={styles.modal__input}
                />
                <label htmlFor="input2" className={styles.modal__label}>Пароль</label>
                <input 
                    type="text" 
                    id="input2" 
                    value={input2} 
                    onChange={(e) => setInput2(e.target.value)} 
                    required 
                    className={styles.modal__input}
                />
                <div className={styles.split}>
                    <p className={styles.message}>{message}</p>
                    <button type="submit" className={styles.button__main}>Войти</button>
                    <Link to="/poloca/registration">
                        <button className={styles.button__text} onClick={HandleClose}>Или зарегистрироваться</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default function Header(){
    const name = data.map(info=>{
        return(
            info.name
        )
    })

    const [prevPerson, setPrevPerson] = useState(() => {
        const storedPerson = localStorage.getItem("prevPerson");
        return storedPerson ? JSON.parse(storedPerson) : prevData;
      });

    useEffect(() => {
        localStorage.setItem("prevPerson", JSON.stringify(prevPerson));
    }, [prevPerson]);  

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto'; 
    };

    return(
        <div className={styles.header__container}>
            <div className={styles.header__content}>
                <div className={styles.header__left}>
                    <div className={styles.header__container_logo}>
                        <Link to='/poloca'>
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                    <ul className={styles.header__nav}>
                        <Link to='/poloca' className={styles.header__link}>Статьи</Link>
                        <Link to='/poloca/work' className={styles.header__link}>Работа</Link>
                        <Link to='/poloca/courses' className={styles.header__link}>Курсы</Link>
                        <Link to={`/poloca/chat/${0}`} className={styles.header__link}>Чат</Link>
                    </ul>
                </div>
                {prevPerson.isHere?
                    (
                    <Link to="/poloca/myperson">
                        <div className={styles.header__profile}>
                            <img className={styles.header__avatar} src={prevPerson.img!=="Ссылка на изображение"? prevPerson.img : noavatar} alt=""/>
                            <p className={styles.header__name}>{prevPerson.name}</p>
                        </div>
                        
                    </Link>
                    ) :
                    (
                    <button className={styles.header__profile} onClick={openModal}>
                        <img className={styles.header__avatar} src={login} alt=""/>
                        <p className={styles.header__name}>Регистрация</p>
                    </button>
                    )
                }
                {isModalOpen && <MyForm onClose={closeModal} />}
            </div>
        </div>
    )
}