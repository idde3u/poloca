import React from "react";
import { useState, useEffect } from "react";
import { useNavigate,useParams} from "react-router";
import { Link } from "react-router-dom";
import styles from "./PersonPage.module.css";
import personData from "../../data/personData.json";
import Post from "../../components/Post/Post";
import CourseCard from "../../components/CourseCard/CourseCard";
import VacancyCard from "../../components/VacancyCard/VacancyCard";
import noavatar from "./Ссылка на изображение.png"
import ava1 from "./Мачуговский Александр.png"
import ava2 from "./Смирнов Андрей.png"
import ava3 from "./Иванова Елена.png"
import ava4 from "./Петров Михаил.png"
import ava5 from "./Соколов Денис.png"

export default function PersonPage(){
    const url = useParams();
    const hist = useNavigate();
    const id = Number(url.id);
    let avatar=noavatar;
    switch(id){
      case 1 :
        avatar=ava1
        break;
      case 2 :
        avatar=ava2
        break;
      case 3 :
        avatar=ava3
        break;
      case 4 :
        avatar=ava4
        break;
      case 5 :
        avatar=ava5
        break;
        default:
        avatar=noavatar
    }
    let name = "";  

    const [candidates, setCandidates] = useState(() => {
        const storedCandidates = localStorage.getItem("personData");
        return storedCandidates ? JSON.parse(storedCandidates) : personData;
    });
    useEffect(() => {
        localStorage.setItem("personData", JSON.stringify(candidates));
    }, [candidates]);

    const vacancies = JSON.parse(localStorage.getItem("vacanciesData"));
    const courses = JSON.parse(localStorage.getItem("coursesData"));
    const posts = JSON.parse(localStorage.getItem("articlesData"));

    const [activeTab, setActiveTab] = useState('posts');
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleSubscribe = (personName) => {
        const updatedCandidates = candidates.map((candidate) => {
          if (candidate.name === personName) {
            return { ...candidate, isSubscribed: !candidate.isSubscribed };
          }
          return candidate;
        });
        setCandidates(updatedCandidates);
      };

    const personCard = candidates.map((per) => {
        if (per.id === id) {
          name = per.name;
          return (
            <div key={per.name} className={styles.person}>
                <div className={styles.person__header}>
                    <img src={avatar} alt="" className={styles.person__avatar} />
                    <div className={styles.person__info}>
                        <h2 className={styles.person__name}>{per.name}</h2>
                        <p className={styles.person__spec}>{per.spec}</p>
                        <div className={styles.subs__list}>
                            <div className={styles.sub__item}>
                                <strong className={styles.sub__title}>{per.isSubscribed? per.subs+1 : per.subs}</strong>
                                <p className={styles.sub__desc}>Подписчиков</p>
                            </div>
                            <div className={styles.sub__item}>
                                <strong className={styles.sub__title}>{per.subbs}</strong>
                                <p className={styles.sub__desc}>Подписок</p>
                            </div>
                        </div>
                        <div className={styles.btn__list}>
                            <button className={per.isSubscribed ? styles.sub__disabled : styles.sub__active} onClick={() => handleSubscribe(per.name)}>
                                {per.isSubscribed ? "Отписаться" : "Подписаться"}
                            </button>
                            <Link to={`/poloca/chat/${per.id}`}>
                                <button className={styles.btn__chat}></button>
                            </Link>
                        </div>
                    </div>
                </div>
                <p className={styles.person__desc}>{per.desc}</p>
            </div>
          );
        }
        return null;
      });
      let counter = 0
      let vacanciesList = vacancies.map((info=>{
        if (info.author===name){
            counter+=1;
            return(
                <Link to={`/poloca/work/${info.id}`}>
                    <div className={styles.card}>
                        <VacancyCard {...info} />
                    </div>
                </Link>
                
            )
        }
      }))
      if (counter===0){
        vacanciesList= <div className={styles.alert}><p className={styles.alert__text}>У пользователя отсутствуют вакансии</p></div>
      }
      counter = 0;
      let coursesList = courses.map((info=>{
        if (info.author===name){
            counter+=1;
            return(
                <Link to={`/poloca/courses/${info.id}`}>
                    <div className={styles.card}>
                        <CourseCard {...info} />
                    </div>
                </Link>
                
            )
        }
      }))
      if (counter===0){
        coursesList= <div className={styles.alert}><p className={styles.alert__text}>У пользователя отсутствуют курсы</p></div>
      }
      counter=0
        let postsList = posts.map((info=>{
            if (info.author===name){
                counter+=1;
                return(
                    <Link to={`/poloca/${info.id}`}>
                        <div className={styles.card}>
                            <Post {...info} />
                        </div>
                    </Link>
                    
                )
            }
          }))
      if (counter===0){
        postsList= <div className={styles.alert}><p className={styles.alert__text}>У пользователя отсутствуют статьи</p></div>
      }

      return(
        <div className={styles.container}>
            <button onClick={() => hist(-1)} className={styles.person__goBack}></button>
            <div className={styles.maincontent}>
                {personCard}
                    <div className={styles.tab__buttons}>
                        <button onClick={() => handleTabChange('vacancies')} className={activeTab === 'vacancies' ? styles.tab_active : styles.tab_inactive}>Вакансии</button>
                        <button onClick={() => handleTabChange('posts')} className={activeTab === 'posts' ? styles.tab_active : styles.tab_inactive}>Статьи</button>
                        <button onClick={() => handleTabChange('courses')} className={activeTab === 'courses' ? styles.tab_active : styles.tab_inactive}>Курсы</button>
                    </div>
                    <div className={styles.tab__content}>
                        {activeTab === 'vacancies' && vacanciesList}
                        {activeTab === 'posts' && postsList}
                        {activeTab === 'courses' && coursesList}
                    </div>
            </div>
        </div>
        
      )
}