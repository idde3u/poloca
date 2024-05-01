import React, { useState, useEffect } from "react";
import vacanciesData from "../../data/vacanciesData.json";
import personData from "../../data/personData.json";
import styles from "./Vacancy.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Vacancy() {
  const url = window.location.href.slice(-8);
  const id = Number(url);
  let name = "";
  let spec = "";
  let nname = "";
  let ava = "";
  const nav = useNavigate();

  // Загрузка данных о вакансиях и кандидатах из localStorage или использование начальных данных
  const [vacancies, setVacancies] = useState(() => {
    const storedVacancies = localStorage.getItem("vacanciesData");
    return storedVacancies ? JSON.parse(storedVacancies) : vacanciesData;
  });

  const [candidates, setCandidates] = useState(() => {
    const storedCandidates = localStorage.getItem("personData");
    return storedCandidates ? JSON.parse(storedCandidates) : personData;
  });

  useEffect(() => {
    localStorage.setItem("vacanciesData", JSON.stringify(vacancies));
  }, [vacancies]);

  useEffect(() => {
    localStorage.setItem("personData", JSON.stringify(candidates));
  }, [candidates]);

  const handleApply = () => {
    const updatedVacancies = vacancies.map((vacancy) => {
      if (vacancy.id === id) {
        return { ...vacancy, isApplied: true };
      }
      return vacancy;
    });
    setVacancies(updatedVacancies);
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

  const vacancyCard = vacancies.map((info) => {
    if (info.id === id) {
      name = info.author;
      spec = info.topic;
      nname = info.name;
      return (
        <div key={info.id} className={styles.vac__container}>
          <h1 className={styles.vac__heading}>{info.name}</h1>
          <div className={styles.vac__info}>
            <div className={styles.vac__info_small}>
              <p className={styles.vac__info_text}>{info.city}</p>
              <p className={styles.vac__info_text}>{info.grade}</p>
            </div>
            <p className={styles.vac__salary}>{info.salary} ₽</p>
          </div>
          <p className={styles.vac__info_text}>{info.desc}</p>
        </div>
      );
    }
    return null;
  });

  const personCard = candidates.map((per) => {
    if (per.name === name) {
      return (
        <div key={per.name} className={styles.person}>
          <Link to={`/person/${per.id}`}>
            <div className={styles.person__header}>
              <img src={per.avatar} alt="" className={styles.person__avatar} />
              <div className={styles.person__info}>
                <h2 className={styles.person__name}>{per.name}</h2>
                <p className={styles.person__spec}>{per.spec}</p>
              </div>
            </div>
          </Link>
          <p className={styles.person__desc}>{per.desc}</p>
          <button className={per.isSubscribed ? styles.sub__disabled : styles.sub__active} onClick={() => handleSubscribe(per.name)}>
            {per.isSubscribed ? "Отписаться" : "Подписаться"}
          </button>
        </div>
      );
    }
    return null;
  });

  const replyButton = vacancies.map((info)=>{
    if (info.id===id){
        return(
            <button onClick={handleApply} className={info.isApplied? styles.button__disabled : styles.button__active}>Откликнуться</button>
        )
    }
  })

  return (
    <div className={styles.container}>
        <div className={styles.row}>
            <button className={styles.vac__goBack} onClick={()=>nav(-1)}></button>
            {vacancyCard}
            <div className={styles.person__info}>
                {personCard}
                {replyButton}
            </div>
        </div>
    </div>
  );
}