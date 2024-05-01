import React, { useState, useEffect } from "react";
import ReplyCard from "../../components/ReplyCard/ReplyCard";
import { Link } from "react-router-dom";
import vacanciesData from "../../data/vacanciesData.json";
import styles from '../Vacancies/Vacancies.module.css';

const CreateVacancyModal = ({ onClose }) => {
    const date= new Date();
    let Id = date.getFullYear()*10000+(date.getMonth()+1)*100+date.getDate();
    console.log (Id);
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

export default function Replies(){
    const [vacancies, setVacancies] = useState(() => {
        const storedVacancies = localStorage.getItem("vacanciesData");
        return storedVacancies ? JSON.parse(storedVacancies) : vacanciesData;
      });
      useEffect(() => {
        localStorage.setItem("vacanciesData", JSON.stringify(vacancies));
      }, [vacancies]);   

    const [selectedFilters, setSelectedFilters] = useState({
        grade: [],
        topic: [],
    });

    const pre = JSON.parse(localStorage.getItem("prevPerson"));
    
    const handleFilterChange = (filterType, filterValue) => {
        
            setSelectedFilters(prevFilters => ({
                ...prevFilters,
                [filterType]: prevFilters[filterType].includes(filterValue)
                    ? prevFilters[filterType].filter(filter => filter !== filterValue)
                    : [...prevFilters[filterType], filterValue]
            }));
        
    };
    
    const filteredArticles = vacancies.filter(article => {
        return (
            (selectedFilters.grade.length === 0 || selectedFilters.grade.includes(article.grade)) 
            && (selectedFilters.topic.length === 0 || selectedFilters.topic.includes(article.topic))
        );
    });
    
    const articlesList = filteredArticles.map(info => {
        if (info.isApplied){
            return (
            <div className={styles.vacancy__card} key={info.id}>
                <Link to={`/work/${info.id}`}>
                    <ReplyCard {...info} />
                </Link>
            </div>
        )
        }
        
    });

    const noregAlert=
        <div className={styles.infobox}>
            <p className={styles.modal__heading}>Пожалуйста, авторизуйтесь в системе для просмотра ваших откликов</p>
        </div>

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto'; 
    };

    function openAlert(){
        alert ("Авторизуйтесь в системе перед тем как создать вакансию")
    }

    return(
        <div className={styles.container}>
            <div className={styles.filters}>
                <h3 className={styles.filters__name}>Фильтры откликов</h3>
                <p className={styles.filters__category_name}>Грейд</p>
                <div className={styles.checkbox__list}>
                    <div className={styles.checkbox}>
                        <input id="cb1" type="checkbox" onChange={() => handleFilterChange('grade', 'Стажёр')} /><label for="cb1">Стажёр</label>
                    </div>
                    <div className={styles.checkbox}>
                        <input id="cb2" type="checkbox" onChange={() => handleFilterChange('grade', 'Junior')} /><label for="cb2">Junior</label>
                    </div>
                    <div className={styles.checkbox}>
                        <input id="cb3" type="checkbox" onChange={() => handleFilterChange('grade', 'Middle')} /><label for="cb3">Middle</label>
                    </div>
                    <div className={styles.checkbox}>
                        <input id="cb4" type="checkbox" onChange={() => handleFilterChange('grade', 'Senior')} /><label for="cb4">Senior</label>
                    </div>
                    <div className={styles.checkbox}>
                        <input id="cb5" type="checkbox" onChange={() => handleFilterChange('grade', 'Lead')} /><label for="cb5">Lead</label>
                    </div>
                </div>
                <p className={styles.filters__category_name}>Направление</p>
                <div className={styles.checkbox__list}>
                    <div className={styles.checkbox}>
                        <input id="cb6" type="checkbox" onChange={() => handleFilterChange('topic', 'UX/UI дизайн')} /><label for="cb6">UX/UI дизайн</label>
                    </div>
                    <div className={styles.checkbox}>
                        <input id="cb7" type="checkbox" onChange={() => handleFilterChange('topic', 'Product дизайн')} /><label for="cb7">Product дизайн</label>
                    </div>
                    <div className={styles.checkbox}>
                        <input id="cb8" type="checkbox" onChange={() => handleFilterChange('topic', 'Web-дизайн')} /><label for="cb8">Web-дизайн</label>
                    </div>
                    <div className={styles.checkbox}>
                        <input id="cb9" type="checkbox" onChange={() => handleFilterChange('topic', 'Front-end разработка')} /><label for="cb9">Front-end разработка</label>
                    </div>
                    <div className={styles.checkbox}>
                        <input id="cb10" type="checkbox" onChange={() => handleFilterChange('topic', 'Back-end разработка')} /><label for="cb10">Back-end разработка</label>
                    </div>
                    <div className={styles.checkbox}>
                        <input id="cb11" type="checkbox" onChange={() => handleFilterChange('topic', 'Тестирование')} /><label for="cb11">Тестирование</label>
                    </div>
                    <div className={styles.checkbox}>
                        <input id="cb12" type="checkbox" onChange={() => handleFilterChange('topic', 'Аналитика')} /><label for="cb12">Аналитика</label>
                    </div>
                </div> 
            </div>
            <div className={styles.cards_list}>
                {pre.isHere? articlesList : noregAlert}
            </div>
            <div className={styles.buttonsList}>
                <Link to='/work'><button className={styles.button__secondary}>Все вакансии</button></Link>
                <Link to='/my_vacancies'><button className={styles.button__secondary}>Мои вакансии</button></Link>
                <button className={styles.button__main} onClick={pre.isHere? openModal : openAlert}>Создать вакансию</button>
                {isModalOpen && <CreateVacancyModal onClose={closeModal} />}
            </div>
        </div>
    );
}