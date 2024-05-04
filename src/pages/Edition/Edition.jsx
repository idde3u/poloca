import React, { useState } from 'react';
import PersonalForm from './PersonalForm';
import ContactsForm from './ContactsForm';
import WorkEduForm from './WorkEduForm';
import { useNavigate } from 'react-router';
import styles from "./Edition.module.css"

function Edition() {
    const nav = useNavigate();
    const stored = JSON.parse(window.localStorage.getItem("prevPerson"));
    console.log(stored)
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    img: stored.img,
    email: stored.email,
    password: stored.password,
    name: stored.name,
    isHere: stored.isHere,
    spec: stored.spec,
    desc: stored.desc,
    subs: stored.subs,
    subbs: stored.subbs,
    phone: stored.phone,
    brth: stored.brth,
    city: stored.city,
    skills: stored.skills,
    works: stored.works,
    edu: stored.edu
  });
  

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleFormSubmit = () => {
    localStorage.setItem('prevPerson', JSON.stringify(formData));
    // Здесь можно добавить дополнительные действия, например, отправку данных на сервер
    // После сохранения данных можно перенаправить пользователя на другую страницу
    nav("/poloca/myperson")
    window.location.reload()
  };

  const updateFormData = (data) => {
    setFormData({ ...formData, ...data });
  };

  return (
    <div className={styles.container}>
      {step === 1 && (
        <PersonalForm formData={formData} updateFormData={updateFormData} />
      )}
      {step === 2 && (
        <ContactsForm formData={formData} updateFormData={updateFormData} />
      )}
      {step === 3 && (
        <WorkEduForm formData={formData} updateFormData={updateFormData} />
      )}
      <div className={styles.split}>
        <button disabled={step === 1} onClick={handlePreviousStep} className={styles.btn__active}>Назад</button>
      {step < 3 ? <button onClick={handleNextStep} className={styles.btn__active}>Далее</button> : <button onClick={handleFormSubmit} className={styles.btn__active}>Завершить</button>}
      </div>
    </div>
  );
}

export default Edition;
