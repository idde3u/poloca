import React, { useState, useEffect } from 'react';
import styles from "../CourseCreator/CourseCreator.module.css";
import { Link } from 'react-router-dom';

function CourseEditor() {
  const [course, setCourse] = useState({
    name: '',
    desc: '',
    author: "Guest",
    city: 'Дистанционно',
    applied: 0,
    time: 0,
    topic: '',
    isLocked: false,
    lessons: []
  });

  useEffect(() => {
    const savedCourse = JSON.parse(localStorage.getItem('course'));
    if (savedCourse) {
      setCourse(savedCourse);
    }
  }, []);

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourse(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLessonChange = (e, index) => {
    const { name, value } = e.target;
    setCourse(prevState => ({
      ...prevState,
      lessons: [
        ...prevState.lessons.slice(0, index),
        { ...prevState.lessons[index], [name]: value },
        ...prevState.lessons.slice(index + 1)
      ]
    }));
  };

  const handleAddLesson = () => {
    setCourse(prevState => ({
      ...prevState,
      lessons: [...prevState.lessons, { name: '', desc: '' }]
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setCourse(prevState => ({
      ...prevState,
      isLocked: checked
    }));
  };

  const handleSave = () => {
    localStorage.setItem('course', JSON.stringify(course));
    // Можно добавить дополнительные действия, например, отправку данных на сервер
  };

  const handleDeleteLesson = (index) => {
    setCourse(prevState => ({
      ...prevState,
      lessons: prevState.lessons.filter((_, lessonIndex) => lessonIndex !== index)
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.two__sides}>
        <div className={styles.one__side}>
          <div className={styles.form__container}>
            <h2 className={styles.form__heading}>Редактирование курса</h2>
            <div className={styles.form__inputarea}>
              <label htmlFor='coursetitle' className={styles.form__inputlabel}>Название</label>
              <input type="text" name="name" value={course.name} onChange={handleCourseChange} id="coursetitle" className={styles.form__input} />
            </div>
            <div className={styles.form__inputarea}>
              <label htmlFor='coursedesc' className={styles.form__inputlabel}>Описание</label>
              <textarea name="desc" value={course.desc} onChange={handleCourseChange} id="coursedesc" className={styles.form__textarea} />
            </div>
            <div className={styles.form__split}>
              <div className={styles.form__inputarea}>
                <label htmlFor='coursecity' className={styles.form__inputlabel}>Город</label>
                <input type="text" name="city" value={course.city} onChange={handleCourseChange} id="coursecity" className={styles.form__input} />
              </div>
              <div className={styles.form__inputarea}>
                <label htmlFor='coursetime' className={styles.form__inputlabel}>Количество часов</label>
                <input type="text" name="time" value={course.time} onChange={handleCourseChange} id="coursetime" className={styles.form__input} />
              </div>
            </div>
            <div className={styles.form__inputarea}>
              <label className={styles.form__inputlabel} htmlFor="coursetopic">Тема</label>
              <select name="topic" value={course.topic} onChange={handleCourseChange} id="coursetopic" className={styles.form__select}>
                <option value="UX/UI дизайн">UX/UI дизайн</option>
                <option value="Web-дизайн">Web-дизайн</option>
                <option value="Product дизайн">Product дизайн</option>
                <option value="Front-end разработка">Front-end разработка</option>
                <option value="Back-end разработка">Back-end разработка</option>
                <option value="Тестирование">Тестирование</option>
                <option value="Аналитика">Аналитика</option>
              </select>
            </div>
            <div className={styles.form__checkboxarea}>
              <input type="checkbox" checked={course.isLocked} onChange={handleCheckboxChange} />
              <label>Доступ по подписке</label>
            </div>
          </div>
          <Link to="/poloca/mycourses">
            <button onClick={handleSave} className={styles.button__main}>Сохранить курс</button>
          </Link>
        </div>

        <div className={styles.one__side}>
          {course.lessons.map((lesson, index) => (
            <div key={index} className={styles.form__container}>
              <div className={styles.form__header}>
                <h2 className={styles.lesson__heading}>Редактирование урока №{index + 1}</h2>
                <button onClick={() => handleDeleteLesson(index)} className={styles.button__third}></button>
              </div>
              <div className={styles.form__inputarea}>
                <label htmlFor='lessontitle' className={styles.form__inputlabel}>Название</label>
                <input type="text" name="name" value={lesson.name} onChange={(e) => handleLessonChange(e, index)} id="lessontitle" className={styles.form__input} />
              </div>
              <div className={styles.form__inputarea}>
                <label htmlFor='lessondesc' className={styles.form__inputlabel}>Описание</label>
                <textarea name="desc" value={lesson.desc} onChange={(e) => handleLessonChange(e, index)} id="lessondesc" className={styles.form__textarea} />
              </div>
            </div>
          ))}
          <button onClick={handleAddLesson} className={styles.button__second}>Добавить урок</button>
        </div>
      </div>
    </div>
  );
}

export default CourseEditor;
