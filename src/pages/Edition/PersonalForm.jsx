import React from 'react';
import styles from "./Edition.module.css"

function PersonalForm({ formData, updateFormData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };
  console.log(formData)
  return (
    <div>
        <h2 className={styles.form__heading}>Изменения в жизни — это всегда к лучшему, также и у нас</h2>
        <div className={styles.split}>
            <div className={styles.form__container}>
                <label className={styles.label} htmlFor='img'>Ссылка на изображение для аватарки</label>
                <input className={styles.input} type="text" name="img" value={formData.img} onChange={handleInputChange} id="img"/>
                <label className={styles.label} htmlFor='email'>Почта</label>
                <input className={styles.input} type="text" name="email" value={formData.email} onChange={handleInputChange} id="email"/>
                <label className={styles.label} htmlFor='password'>Пароль</label>
                <input className={styles.input} type="text" name="password" value={formData.password} onChange={handleInputChange} id="password"/>
            </div>
            <div className={styles.form__container}>
                <label className={styles.label} htmlFor='name'>Имя и Фамилия</label>
                <input className={styles.input} type="text" name="name" value={formData.name} onChange={handleInputChange} id="name"/>
                <label className={styles.label} htmlFor='city'>Город</label>
                <input className={styles.input} type="text" name="city" value={formData.city} onChange={handleInputChange} id="city"/>
                <label className={styles.label} htmlFor='phone'>Телефон</label>
                <input className={styles.input} type="text" name="phone" value={formData.phone} onChange={handleInputChange} id="phone"/>
                <label className={styles.label} htmlFor='brth'>Дата рождения</label>
                <input className={styles.input} type="text" name="brth" value={formData.brth} onChange={handleInputChange} id="brth"/>
            </div>
        </div>
    </div>
  );
}

export default PersonalForm;