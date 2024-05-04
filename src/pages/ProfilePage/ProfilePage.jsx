import React from "react";
import { useState, useEffect } from "react";
import { useNavigate,useParams} from "react-router";
import { Link } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import Post from "../../components/Post/Post";
import CourseCard from "../../components/CourseCard/CourseCard";
import VacancyCard from "../../components/VacancyCard/VacancyCard";
import noavatar from "./Ссылка на изображение.png"
import calendar from "./calendar.svg"
import email from "./email.svg"
import phone from "./phone.svg"
import pin from "./pin.svg"

export default function ProfilePage(){
    const url = useParams();
    const hist = useNavigate();
    const id = Number(url.id);
    const vacancies = JSON.parse(localStorage.getItem("myVacancy1"));
    const courses = JSON.parse(localStorage.getItem("course"));
    const posts = JSON.parse(localStorage.getItem("myArticle"));
    const per = JSON.parse(localStorage.getItem("prevPerson"))
    const persons = JSON.parse(localStorage.getItem("personData"))

    let subCount = 0;
    const perr = persons.map(info=>{
        if(info.isSubscribed){
            subCount+=1
        }
    })

    const [activeTab, setActiveTab] = useState('posts');
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }; 

    const skillsList = per.skills.map(info=>{
        return(
            <p className={styles.skills__text}>{info}</p>
        )
    })

    const goout = () => {
        per.isHere = false;
        localStorage.setItem("prevPerson", JSON.stringify(per));
        hist("/poloca")
        window.location.reload()
      };

    const worksList = 
            <div className={styles.work}>
                <div className={styles.work__header}>
                    <h3 className={styles.work__heading}>{per.works.company}</h3>
                    <p className={styles.work__subtitle}>(работа)</p>
                </div>
                <p className={styles.work__date}>{per.works.date}</p>
                <p className={styles.work__desc}>{per.works.desc}</p>
            </div>

    const eduList = 
            <div className={styles.work}>
                <div className={styles.work__header}>
                    <h3 className={styles.work__heading}>{per.edu.company}</h3>
                    <p className={styles.work__subtitle}>(образование)</p>
                </div>
                <p className={styles.work__date}>{per.edu.date}</p>
                <p className={styles.work__desc}>{per.edu.desc}</p>
            </div>

    const personCard = 
            <div className={styles.person}>
                <div className={styles.person__header}>
                    <img src={per.img!=="Ссылка на изображение"? per.img : noavatar} alt="" className={styles.person__avatar} />
                    <div className={styles.person__info}>
                        <h2 className={styles.person__name}>{per.name}</h2>
                        <p className={styles.person__spec}>{per.spec}</p>
                        <div className={styles.subs__list}>
                            <div className={styles.sub__item}>
                                <strong className={styles.sub__title}>{per.subs}</strong>
                                <p className={styles.sub__desc}>Подписчиков</p>
                            </div>
                            <div className={styles.sub__item}>
                                <strong className={styles.sub__title}>{subCount}</strong>
                                <p className={styles.sub__desc}>Подписок</p>
                            </div>
                        </div>
                        <div className={styles.btn__list}>
                            <Link to="/poloca/edition">
                                <button className={styles.sub__active}>
                                    Редактировать профиль
                                </button>
                            </Link>
                            <button className={styles.form__button} onClick={goout}>Выйти</button>
                        </div>
                    </div>
                </div>
                <p className={styles.person__desc}>{per.desc}</p>
            </div>

      let vacanciesList = vacancies!=null?
                <Link to="/poloca/my_vacancies/1">
                    <div className={styles.card}>
                        <VacancyCard {...vacancies} />
                    </div>
                </Link> :
                null
      if (vacanciesList===null){
        vacanciesList= <div className={styles.alert}><p className={styles.alert__text}>У вас отсутствуют вакансии</p></div>
      }
      let coursesList = courses!=null?
                <Link to="/poloca/mycourses/1">
                    <div className={styles.card}>
                        <CourseCard {...courses} />
                    </div>
                </Link> :
                null
      if (coursesList===null){
        coursesList= <div className={styles.alert}><p className={styles.alert__text}>У вас отсутствуют курсы</p></div>
      }
        let postsList = posts!=null?
                    <Link to="/poloca/mypost">
                        <div className={styles.card}>
                            <Post {...posts} />
                        </div>
                    </Link> :
                    null

      if (postsList===null){
        postsList= <div className={styles.alert}><p className={styles.alert__text}>У вас отсутствуют статьи</p></div>
      }
      console.log(postsList)

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
            <div className={styles.prof__container}>
                <div className={styles.contacts}>
                    <div className={styles.contacts__row}>
                        <img src={email} alt="" className={styles.contacts__icon}/>
                        <p className={styles.contacts__desc}>{per.email}</p>
                    </div>
                    <div className={styles.contacts__row}>
                        <img src={phone} alt="" className={styles.contacts__icon}/>
                        <p className={styles.contacts__desc}>{per.phone}</p>
                    </div>
                    <div className={styles.contacts__row}>
                        <img src={calendar} alt="" className={styles.contacts__icon}/>
                        <p className={styles.contacts__desc}>{per.brth}</p>
                    </div>
                    <div className={styles.contacts__row}>
                        <img src={pin} alt="" className={styles.contacts__icon}/>
                        <p className={styles.contacts__desc}>{per.city}</p>
                    </div>
                </div>
                <div className={styles.skills}>
                    {skillsList}
                </div>
                <div className={styles.worklist}>
                    {worksList}
                </div>
                <div className={styles.worklist}>
                    {eduList}
                </div>
            </div>
        </div>
        
      )
}