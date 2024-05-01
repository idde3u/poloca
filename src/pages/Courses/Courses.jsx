import React, { useState, useEffect } from "react";
import CourseCard from "../../components/CourseCard/CourseCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import coursesData from "../../data/coursesData.json";
import styles from './Courses.module.css';

export default function Courses() {
    const [courses, setCourses] = useState(() => {
        const storedCourses = localStorage.getItem("coursesData");
        return storedCourses ? JSON.parse(storedCourses) : coursesData;
    });

    useEffect(() => {
        localStorage.setItem("coursesData", JSON.stringify(courses));
    }, [courses]);

    const [selectedFilters, setSelectedFilters] = useState({
        topic: [],
        city: '',
        remote: false,
        search: ''
    });

    const pre = JSON.parse(localStorage.getItem("prevPerson"))
    const nav = useNavigate();

    const handleFilterChange = (filterType, filterValue) => {
        if (filterType === 'search') {
            setSelectedFilters({ ...selectedFilters, [filterType]: filterValue });
        } else if (filterType === 'remote') {
            setSelectedFilters({ ...selectedFilters, [filterType]: !selectedFilters.remote });
        } else {
            setSelectedFilters(prevFilters => ({
                ...prevFilters,
                [filterType]: prevFilters[filterType] === filterValue
                    ? ''
                    : filterValue
            }));
        }
    };

    const filteredArticles = courses.filter(article => {
        return (
            (selectedFilters.topic.length === 0 || selectedFilters.topic.includes(article.topic))
            && (selectedFilters.city === '' || article.city.toLowerCase().includes(selectedFilters.city.toLowerCase()))
            && (!selectedFilters.remote || article.remote)
            && (article.name.toLowerCase().includes(selectedFilters.search.toLowerCase()))
        );
    });

    const articlesList = filteredArticles.map(info => {
        return (
            <div className={styles.course__card} key={info.id}>
                <Link to={`/courses/${info.id}`}>
                    <CourseCard {...info} />
                </Link>
            </div>
        )
    });

    function handleClick(){
        nav("/createcourse");
    }

    function handleAlert(){
        alert("Пожалуйста, авторизуйтесь в системе для создания курса")
    }

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <h3 className={styles.filters__name}>Фильтры курсов</h3>
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
                <p className={styles.filters__category_name}>Город</p>
                <input 
                    className={styles.city__input} 
                    type="text" 
                    placeholder="Введите город" 
                    value={selectedFilters.city} 
                    onChange={(e) => handleFilterChange("city", e.target.value)}
                />
                <div className={styles.checkbox}>
                    <input 
                        id="remoteCheckbox" 
                        type="checkbox" 
                        checked={selectedFilters.remote} 
                        onChange={() => handleFilterChange('remote')} 
                    />
                    <label htmlFor="remoteCheckbox">Дистанционно</label>
                </div>
            </div>
            <div className={styles.cards_list}>
                <input 
                    className={styles.search__input} 
                    type="text" 
                    placeholder="Поиск по названию курса" 
                    value={selectedFilters.search} 
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                />
                {articlesList}
            </div>
            <div className={styles.buttonsList}>
                <Link to='/mycourses'><button className={styles.button__secondary}>Мои курсы</button></Link>
                <Link to='/repcourses'><button className={styles.button__secondary}>Изучаемые курсы</button></Link>
                <button className={styles.button__main} onClick={pre.isHere? handleClick : handleAlert}>Создать курс</button>
            </div>
        </div>
    );
}