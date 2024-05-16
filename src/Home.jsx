import { useEffect } from "react"
import { sendMessage } from "./Api/Api";
import { useState } from "react";
 const Home = () => {


    const [message,setMessage] = useState('');
    const [msjList,setMsjList] = useState([]);

useEffect(()=>{
const data =localStorage.getItem('history');
const history = JSON.parse(data);
setMsjList(history);
console.log(history);


},[msjList]);



const handleChange = (e) => {
    setMessage(e.target.value);
}




const handleClick = async () => {
    if (message) {
      try {

        const response = await sendMessage(message);
        consol.log(response);
        setMsjList(response);
      } catch (error) {
        console.error(error); // Use console.error for errors
      }
    }
  };



















    return (
        < div className="container">

<div className="message-list">
    
      {
      msjList.map((message, index) => (
        <div key={index} className={`message ${message.role}`}>
          <p className="p">{message.parts[0].text}</p>
        </div>
      ))
      
      }
    
    </div>



        <div >
       <div className="input-container">
       <input className="input"
          type="text"
          placeholder="Bir şeyler yazın..."
          value={message}
          onChange={handleChange}
        />
        <button className="button" onClick={handleClick}></button>
    
       </div>
        
      </div>

        </div>
        
    )
}

export default Home;