import React, { useTransition } from "react";
import Post from "../../components/Post/Post";
import articlesData from "../../data/articlesData.json";
import styles from './Articles.module.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Articles(){
    const [selectedFilters, setSelectedFilters] = React.useState({
        topic: [],
        date: [],
        search: ""
    });

    const nav = useNavigate();

    const [articles, setArticles] = useState(() => {
        const storedArticles = localStorage.getItem("articlesData");
        return storedArticles ? JSON.parse(storedArticles) : articlesData;
      });
      useEffect(() => {
        localStorage.setItem("articlesData", JSON.stringify(articles));
      }, [articles]);  

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters(prevFilters => {
            if (filterType === "topic"){
                if (prevFilters[filterType].includes(value)) {
                    const updatedFilters = prevFilters[filterType].filter(filter => filter !== value);
                    return {
                        ...prevFilters,
                        [filterType]: updatedFilters
                    }
                 } else {
                    const updatedFilters = [...prevFilters[filterType], value];
                    return {
                        ...prevFilters,
                        [filterType]: updatedFilters
                }
            }
            } else if (filterType === "date"){
                if (prevFilters[filterType].includes(value)) {
                    const updatedFilters = prevFilters[filterType].filter(filter => filter !== value);
                    return {
                        ...prevFilters,
                        [filterType]: updatedFilters
                }
                } else {
                    const updatedFilters = [...prevFilters[filterType], value];
                    return {
                        ...prevFilters,
                        [filterType]: updatedFilters
                    }
                }
            } else if (filterType === "search") { // Фильтр для поиска по имени
                return {
                    ...prevFilters,
                    [filterType]: value.toLowerCase() // Приводим значение к нижнему регистру
                };
            }
        });
    }

    const filteredArticles = articles.filter(article => {
        const currentDate = new Date();
        const articleDate = new Date(article.date);
        const daysDiff = Math.floor((currentDate - articleDate) / (1000 * 60 * 60 * 24));

        return (
            (selectedFilters.topic.length === 0 || selectedFilters.topic.includes(article.topic)) &&
            (selectedFilters.date.length === 0 ||
                selectedFilters.date.some(filterDate => {
                    switch(filterDate){
                        case 'today':
                            return daysDiff === 0;
                        case 'yesterday':
                            return daysDiff === 1;
                        case 'thisWeek':
                            return daysDiff <= 7;
                        case 'thisMonth':
                            return daysDiff <= 31;
                        default:
                            return false;
                    }
                })
            ) &&
            (selectedFilters.search === "" || article.name.toLowerCase().includes(selectedFilters.search)) 
        );
    });

    const articlesList = filteredArticles.map(info=>{
        return (
            <Link to={`/poloca/${info.id}`}>
                <div className={styles.articles__card} key={info.id}>
                    <Post {...info} />
                </div>
            </Link>
        )
    });

    const per = JSON.parse(localStorage.getItem("prevPerson"))

    function handleClick(){
        nav("/poloca/createpost");
    }

    function handleAlert(){
        alert("Пожалуйста, авторизуйтесь в системе для создания статьи")
    }

    return(
        <div className={styles.container}>
            <div className={styles.filters}>
                <h3 className={styles.filters__name}>Фильтры статей</h3>
                <p className={styles.filters__category_name}>Тема</p>
                <div className={styles.checkbox__list}>
                    <div className={styles.checkbox}>
                        <input id="cb1" type="checkbox" onChange={() => handleFilterChange('topic', 'Дизайн')} /><label for="cb1">Дизайн</label>
                    </div>
                    <div className={styles.checkbox}>
                        <input id="cb2" type="checkbox" onChange={() => handleFilterChange('topic', 'Программирование')} /><label for="cb2">Программирование</label>
                    </div>
                    <div className={styles.checkbox}>
                        <input id="cb3" type="checkbox" onChange={() => handleFilterChange('topic', 'Карьера')} /><label for="cb3">Карьера</label>
                    </div>
                    <div className={styles.checkbox}>
                        <input id="cb4" type="checkbox" onChange={() => handleFilterChange('topic', 'Личное')} /><label for="cb4">Личное</label>
                    </div>
                </div>
                <p className={styles.filters__category_name}>Дата</p>
                <div className={styles.checkbox__list}>
                    <div className={styles.checkbox}>
                        <input id="cb5" type="checkbox" onChange={() => handleFilterChange('date', 'today')} /><label for="cb5">Сегодня</label>
                    </div>
                    <div className={styles.checkbox}>
                        <input id="cb6" type="checkbox" onChange={() => handleFilterChange('date', 'yesterday')} /><label for="cb6">Вчера</label>
                    </div>
                    <div className={styles.checkbox}>
                        <input id="cb7" type="checkbox" onChange={() => handleFilterChange('date', 'thisWeek')} /><label for="cb7">На этой неделе</label>
                    </div>
                    <div className={styles.checkbox}>
                        <input id="cb8" type="checkbox" onChange={() => handleFilterChange('date', 'thisMonth')} /><label for="cb8">В этом месяце</label>
                    </div>
                </div>    
            </div>
            <div className={styles.cards_list}>
                <input className={styles.search__input} type="text" placeholder="Поиск статей по имени" value={selectedFilters.search} onChange={(e) => handleFilterChange("search", e.target.value)}/>
                {articlesList}
            </div>
            <div>
                <Link to='/poloca/my_posts'><button className={styles.button__secondary}>Мои статьи</button></Link>
                <button className={styles.button__main} onClick={per.isHere? handleClick : handleAlert}>Создать статью</button>
            </div>
        </div>
    );
}