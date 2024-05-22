import { useEffect } from "react"
import { sendMessage } from "./Api/Api";
import { useState } from "react";
import { getData } from "../data";

 const Home = () => {
  const data =  getData();

    const [message,setMessage] = useState('');
    const [msjList,setMsjList] = useState(data);



const handleChange = (e) => {
    setMessage(e.target.value);
}


const handleClick = async () => {
  try {

    console.log(message);
const msj = {
  role: "user",
  parts: [{ text: message }]
}
console.log(msj);
const response = await sendMessage(message, msjList);
console.log('Response:', response);
setMsjList(prevMsjList => [...prevMsjList, msj]);
setMessage(''); 
const cvp = {
  role: "model",
  parts: [{ text: response}]
}
setMsjList(prevMsjList => [...prevMsjList, cvp]);


  } catch (error) {
    console.error('Error:', error); 
  }
    }
  



















    return (
        < div className="container">

<div className="message-list">
  {
   
      msjList.slice(1).map((message, index) => (
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