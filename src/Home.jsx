import React, { useState, useEffect, useRef } from 'react';
import { sendMessage } from "./Api/Api";
import { getData } from "../data";
import './index.css';

const Home = () => {
  const data = getData();
  const [message, setMessage] = useState('');
  const [msjList, setMsjList] = useState(data);
  const [loading, setLoading] = useState(false);
  const chatHistoryRef = useRef(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const msj = { role: "user", parts: [{ text: message }] };
      setMsjList(prevMsjList => [...prevMsjList, msj]);
      setMessage('');
      setLoading(true);
      const response = await sendMessage(message, msjList);

      const cvp = { role: "model", parts: [{ text: response }] };
      setLoading(false);
      setMsjList(prevMsjList => [...prevMsjList, cvp]);
    } catch (error) {
      console.error('Error:', error);
    } 
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [msjList]);

  return (
    <div id="chat-container">
      <div className='customerTitle'>
      <img  src="https://t4.ftcdn.net/jpg/03/02/16/77/360_F_302167753_zO96cQJziw0BYKOSw0plniVSlkxdGTC5.jpg" alt="customer-service" width={100} height={100}  />
      <h3 >Müşteri Hizmetleri</h3>
     
      </div>
      
      <div id="chat-history" ref={chatHistoryRef}>
        {msjList.slice(1).map((message, index) => (
          <div key={index} className={`message ${message.role }`}>
            <p>{message.parts[0].text}</p>
          </div>
        ))}
      </div>
      <div>
      {loading ? (
        <img src="https://media.tenor.com/NqKNFHSmbssAAAAi/discord-loading-dots-discord-loading.gif" alt="yazıyor..." width={28} height={14}/>
      ) : (
        " "
      )}
    </div>
      <form id="chat-form" onSubmit={(e) => { e.preventDefault(); handleClick(); }}>
        <input
          type="text"
          id="user-input"
          placeholder="Mesajınızı yazınız..."
          value={message}
          onChange={handleChange}
        />
        <button type="submit">Gönder</button>
      </form>
      
    </div>
  );
};

export default Home;


