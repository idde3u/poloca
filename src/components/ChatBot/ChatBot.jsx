import React, { useState } from 'react';
import styles from "./ChatBot.module.css";
import { useParams } from 'react-router';

function ChatBot() {
    const person = JSON.parse(localStorage.getItem("personData"))
    const user = JSON.parse(localStorage.getItem("prevPerson"))
    const params = useParams();
    const id = Number(params.id)
    let avatar= ""
    let name = ""

    const personInfo = person.map(info =>{
        if (info.id === Number(params.id)){
            avatar = info.avatar
            name = info.name
        }
    })
  const [messages, setMessages] = useState([]);
  console.log(personInfo)

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const message = event.target.elements.message.value;
    addMessage('user', message);

    // Проверяем, содержит ли сообщение слово "привет" (без учета регистра)
    if (message.toLowerCase().includes('привет')) {
      addMessage('bot', 'Привет');
    } else if (message.toLowerCase().includes('как дела?')){
      addMessage('bot', 'У меня все хорошо, а у вас?');
    } else if (message.toLowerCase().includes('у меня хорошо')){
        addMessage('bot', 'Рад слышать!');
    } else{
        addMessage('bot', `Извините, я не понимаю. Я умею только: 
        - отвечать на слово "привет" 
        - отвечать на вопрос "как дела?" 
        - радоваться, если у вас все хорошо`);
    }

    event.target.reset();
  };

  const addMessage = (sender, text) => {
    setMessages(prevMessages => {
      const newMessages = [...prevMessages, { sender, text }];
      localStorage.setItem(`${name} messages`, JSON.stringify(newMessages));
      return newMessages;
    });
  };

  // При загрузке страницы пытаемся загрузить сообщения из локального хранилища
  React.useEffect(() => {
    const savedMessages = localStorage.getItem(`${name} messages`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  return (
    <div className={styles.chat__container}>
        <div className={styles.chat__header}>
            <div className={styles.chat__speaker}>
                <img src={avatar} alt="" className={styles.speaker__photo}/>
                <p className={styles.speaker__name}>{name}</p>
            </div>
            <p className={styles.offline__text}>онлайн</p>
        </div>
        <hr className={styles.line}/>
      <div className={styles.chatbox}>
        {messages.map((message, index) => {
            if (message.sender == "user"){
                return(
                    <div className={styles.message__user}>
                        <p className={styles.message__user__text}>{message.text}</p>
                        <img src={user.img === "Ссылка на изображение"? `../img/${user.img}.png` : user.img} alt="" className={styles.message__user__ava}/>
                    </div>
                )
            } else if (message.sender == "bot"){
                return(
                    <div className={styles.message__bot}>
                        <img src={avatar} alt="" className={styles.message__bot__ava}/>
                        <p className={styles.message__bot__text}>{message.text}</p>
                    </div>
                )
            }
        } ) }
      </div>
      <form onSubmit={handleMessageSubmit} className={styles.form}>
        <input type="text" name="message" placeholder="Введите сообщение" className={styles.form__input}/>
        <button type="submit" className={styles.form__button}>Отправить</button>
      </form>
    </div>
  );
}

export default ChatBot;
