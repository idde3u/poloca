import React, { useState, useEffect } from "react";
import styles from "../Vacancy/Vacancy.module.css";
import { Link } from "react-router-dom";

export default function MyVacancy() {
    const [dataJS, setDataJS] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(window.localStorage.getItem("myVacancy1"));
        setDataJS(storedData);
    }, []);

    const handleDeleteVacancy = () => {
        localStorage.removeItem("myVacancy1");
        setDataJS(null);
    };

    if (!dataJS) {
        return (
            <div className={styles.container}>
                <Link to="/work">
                    <button className={styles.vac__goBack}></button>
                </Link>
                <div className={styles.vac__container}>
                    <h2 className={styles.vac__info_text}>Вакансия удалена</h2></div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Link to="/work">
                <button className={styles.vac__goBack}></button>
            </Link>
            <div key={dataJS.id} className={styles.vac__container}>
                <div className={styles.vac__info}>
                    <h1 className={styles.myvac__heading}>{dataJS.name}</h1>
                    <button className={styles.deleteButton} onClick={handleDeleteVacancy}>
                        Удалить вакансию
                    </button>
                </div>

                <div className={styles.vac__info}>
                    <div className={styles.vac__info_small}>
                        <p className={styles.vac__info_text}>{dataJS.city}</p>
                        <p className={styles.vac__info_text}>{dataJS.grade}</p>
                    </div>
                    <p className={styles.vac__salary}>{dataJS.salary} ₽</p>
                </div>
                <p className={styles.vac__info_text}>{dataJS.description}</p>
            </div>
        </div>
    );
}