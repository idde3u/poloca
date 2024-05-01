import React from 'react';
import styles from "./Registration.module.css"

function WorkEduForm({ formData, updateFormData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [fieldName, subFieldName] = name.split('.'); // Разбиваем имя поля на основе точки

    if (subFieldName) { // Если есть вложенное поле
      updateFormData({
        ...formData,
        [fieldName]: {
          ...formData[fieldName], // Копируем текущий объект
          [subFieldName]: value // Обновляем соответствующее вложенное поле
        }
      });
    } else { // Если нет вложенного поля
      updateFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div>
      <h2 className={styles.form__heading}>Почти закончили! Для окончания регистрации расскажите об образовании и месте работы</h2>
      <div className={styles.split}>
        <div className={styles.form__container}>
            <label className={styles.label} htmlFor='company'>Название компании, где вы последний раз работали</label>
            <input className={styles.input} type="text" name="works.company" value={formData.works.company || ''} onChange={handleInputChange} id="company" />
            <label className={styles.label} htmlFor='date'>Период вашей работы</label>
            <input className={styles.input} type="text" name="works.date" value={formData.works.date || ''} onChange={handleInputChange} id="date" />
            <label className={styles.label} htmlFor='desc'>Что вы сделали за время работы?</label>
            <textarea className={styles.textarea} name="works.desc" value={formData.works.desc || ''} onChange={handleInputChange} id="desc" />
        </div>
        <div className={styles.form__container}>
            <label className={styles.label} htmlFor='school'>Где вы учились?</label>
            <input className={styles.input} type="text" name="edu.company" value={formData.edu.company || ''} onChange={handleInputChange} id="school" />
            <label className={styles.label} htmlFor='eduDate'>Период вашего обучения</label>
            <input className={styles.input} type="text" name="edu.date" value={formData.edu.date || ''} onChange={handleInputChange} id="eduDate" />
            <label className={styles.label} htmlFor='eduDesc'>Чем вы занимались во время обучения?</label>
            <textarea className={styles.textarea} name="edu.desc" value={formData.edu.desc || ''} onChange={handleInputChange} id="eduDesc" />
        </div>
      </div>      
    </div>
  );
}

export default WorkEduForm;
