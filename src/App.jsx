
import { useEffect } from 'react';
import { getData } from '../data';
import './App.css'
import Home from './Home'
function App() {


  useEffect(()=>{
    const fonk= async()=>{
      const data = await localStorage.getItem('history');
      const history = JSON.parse(data);
      if(!history){
        const helloWord = await getData();
        console.log(helloWord);
        localStorage.setItem('history',JSON.stringify(helloWord));
      }
       
      
    }
    fonk();

      
  },[])


  return (
    <>
   
      <Home />

    </>
  )
}

export default App
