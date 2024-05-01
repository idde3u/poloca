import React from 'react';
import styles from "./Registration.module.css"

function ContactsForm({ formData, updateFormData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value } );
  };

  const handleArrayChange = (e) => {
    const { value } = e.target;
    const skillsArray = value.split(',').map(skill => skill.trim());
    updateFormData({ ...formData, skills: skillsArray } );
  };

  return (
    <div>
        <h2 className={styles.form__heading}>Теперь познакомимся ближе. Расскажите о вашей профессиональной стороне</h2>
        <div className={styles.split}>
            <div className={styles.form__container}>
                <label className={styles.label} htmlFor='spec'>Специальность</label>
                <input className={styles.input} type="text" name="spec" value={formData.spec || ''} onChange={handleInputChange} id="spec" />
                <label className={styles.label} htmlFor='desc'>Расскажите о себе</label>
                <textarea className={styles.textarea} name="desc" value={formData.desc || ''} onChange={handleInputChange} id="desc"/>
            </div>
            <div className={styles.form__container}>
                <label className={styles.label} htmlFor='skills'>Навыки (разделены запятыми)</label>
                <textarea className={styles.textarea} value={formData.skills.join(',')} onChange={handleArrayChange} id="skills" />
            </div>
        </div>
    </div>
  );
}

export default ContactsForm;
