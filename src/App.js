import './App.css';
import LoginScreen from './pages/LoginScreen';
import Register from './pages/Register';
import Home from './pages/Home';
import { useState } from 'react';


function App() {
  const [res, setRes] = useState('');
  const [Email, setEmail] = useState('');
  const [sat, setSat] = useState('1');
  const setToUserLogin=()=>{
    setSat('1')
  }
  const setToUserRegister=()=>{
    setSat('2')
  }
  const setToHome=()=>{
    setSat('3')
  }
  const setNewRes=(responseData)=>{
    setRes(responseData.user)
  }
  const getEmail=(email)=>{
    setEmail(email)
  }
  switch (sat) {
    case '1':
      document.title='User Login'
      return (
        <>
          <LoginScreen set={setToUserRegister} sethome={setToHome} setRes={setNewRes} getEmail={getEmail}></LoginScreen>
        </>
      );
    case '2':
      document.title='User Registration'
      return (
        <>
          <Register set={setToUserLogin}></Register>
        </>
      );
      case '3':
      document.title='Home'
      return (
        <>
          <Home Data={res} Email={Email} Role={res.Roll}></Home>
        </>
      );
  
    default:
      break;
  }
}

export default App;
