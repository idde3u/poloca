import React, { useState } from "react";
import VacancyCard from "../../components/VacancyCard/VacancyCard";
import styles from "./MyVacancies.module.css"
import { Link } from "react-router-dom";

const CreateVacancyModal = ({ onClose }) => {
    const date= new Date();
    let Id = date.getFullYear()*10000+(date.getMonth()+1)*100+date.getDate();
    const [formData, setFormData] = useState({
        name: '',
        salary: '',
        grade: '',
        topic: '',
        description: '',
        author: 'Guest',
        city: '',
        applied: 0,
        id: Id
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        localStorage.setItem('myVacancy1', JSON.stringify(formData));
        onClose();
    };

    

    return (
        <div className={styles.modal}>
            <div className={styles.modal__window}>
                <div className={styles.modal__header}>
                    <h2 className={styles.modal__heading}>Создание вакансии</h2>
                    <span className={styles.modal__close} onClick={onClose}></span>
                </div>
                <label htmlFor="title" className={styles.modal__label}>Название</label>
                <input className={styles.modal__input} type="text" name="name" placeholder="Название" onChange={handleInputChange} id="title"/>
                <div className={styles.modal__selectList}>
                    <div className={styles.modal__input_labeled}>
                        <label htmlFor="salary" className={styles.modal__label}>Заработная плата</label>
                        <input className={styles.modal__input} type="text" name="salary" placeholder="Заработная плата" onChange={handleInputChange} id="salary"/>
                    </div>
                    <div className={styles.modal__input_labeled}>
                        <label htmlFor="city" className={styles.modal__label}>Город</label>
                        <input className={styles.modal__input} type="text" name="city" placeholder="Город" onChange={handleInputChange} id="city"/>
                    </div>
                </div>
                <div className={styles.modal__selectList}>
                    <div className={styles.modal__input_labeled}>
                        <label htmlFor="grade" className={styles.modal__label}>Квалификация</label>
                        <select name="grade" onChange={handleInputChange} id="grade">
                        <option value="">Выберите квалификацию</option>
                        <option value="Стажёр">Стажёр</option>
                        <option value="Junior">Junior</option>
                        <option value="Middle">Middle</option>
                        <option value="Senior">Senior</option>
                        <option value="Lead">Lead</option>
                    </select>
                </div>
                    <div className={styles.modal__input_labeled}>
                    <label htmlFor="topic" className={styles.modal__label}>Род деятельности</label>
                        <select name="topic" onChange={handleInputChange} id="topic">
                            <option value="">Выберите род деятельности</option>
                            <option value="UX/UI дизайн">UX/UI дизайн</option>
                            <option value="Product дизайн">Product дизайн</option>
                            <option value="Web-дизайн">Web-дизайн</option>
                            <option value="Front-end разработка">Front-end разработка</option>
                            <option value="Back-end разработка">Back-end разработка</option>
                            <option value="Тестирование">Тестирование</option>
                            <option value="Аналитика">Аналитика</option>
                        </select>
                    </div>
                    
                </div>
                <label htmlFor="textarea" className={styles.modal__label} >Описание</label>
                <textarea name="description" placeholder="Описание" onChange={handleInputChange} id="textarea" className={styles.modal__textarea}></textarea>
                <button className={styles.button__main} onClick={handleSubmit}>Создать</button>
            </div>
        </div>
    );
};

export default function MyVacancies(){

    let dataJS = JSON.parse(window.localStorage.getItem("myVacancy1"));

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto'; 
    };

    const pre = JSON.parse(localStorage.getItem("prevPerson"))
    
    const noregAlert=
        <div className={styles.infobox}>
            <p className={styles.modal__heading}>Пожалуйста, авторизуйтесь в системе для просмотра ваших откликов</p>
        </div>

    function handleAlert(){
        alert("Пожалуйста, авторизуйтесь в системе для создания вакансий")
    }

    const card = 
        <div className={styles.cards_list}>
        <Link to="1">
            <VacancyCard {...dataJS} />
        </Link>
        </div>

    const infobox =
        <div className={styles.infobox}>
        <p className={styles.alert__text}>На данный момент вы не опубликовали вакансии, но вы всегда можете это исправить</p>
        <button className={styles.button__main} onClick={openModal}>Создать вакансию</button>
            {isModalOpen && <CreateVacancyModal onClose={closeModal} />}
        </div>


    if (dataJS===null){
        return(
            <div className={styles.container}>
                    {pre.isHere? infobox : noregAlert}
                <div>
                    <Link to='/poloca/work'><button className={styles.button__secondary}>Все вакансии</button></Link>
                    <Link to='/poloca/my_replies'><button className={styles.button__secondary}>Мои отклики</button></Link>
                    <button className={styles.button__main} onClick={pre.isHere? openModal : handleAlert}>Создать вакансию</button>
                    {isModalOpen && <CreateVacancyModal onClose={closeModal} />}
                </div>
            </div>
        )
    } else {
            return(
                <div className={styles.container}>
                        {pre.isHere? card : noregAlert}
                    <div>
                        <Link to='/poloca/work'><button className={styles.button__secondary}>Все вакансии</button></Link>
                        <Link to='/poloca/my_replies'><button className={styles.button__secondary}>Мои отклики</button></Link>
                        <button className={styles.button__main} onClick={pre.isHere? openModal : handleAlert}>Создать вакансию</button>
                        {isModalOpen && <CreateVacancyModal onClose={closeModal} />}
                    </div>
                </div>
            );
        };
    }