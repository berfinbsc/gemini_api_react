
import { useEffect } from 'react';
import { getData } from '../data';
import './App.css'
import Home from './Home'
function App() {


  useEffect(()=>{

    const fonk= async()=>{
      
        const history = await getData();
        console.log(history);
        localStorage.setItem('history',JSON.stringify(history));
      
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
