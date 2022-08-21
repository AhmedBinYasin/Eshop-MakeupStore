import "./App.css";
import "./CSS/Home.css";
import "./CSS/Login.css";
import "./CSS/Nevbar.css";
import "./CSS/Catalog.css";
import "./CSS/form-validation.css";
import LoginScreen from "./Links/LoginScreen";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./Links/Register";
import Main from './Links/Main';
import Catalogue from './Pages/Catalogue';
import Cart from './Pages/Cart';
import Nevbar from './Components/Nevbar';
import { useState } from 'react';
import AdminCalalogeControl from './Pages/AdminCalalogeControl';
import AdminOrderControl from './Pages/AdminOrderControl';
function App() {
  const [nevBarProps,setNevBarProps]=useState({
    Name: "ahmed",
    Role: "admin",
    Email:"ahmed116046@gmail.com"
  })
  return (
    <div className="App">
      <Router>
      <Nevbar title={'Makeup Store'} nevBarProps={nevBarProps}></Nevbar>

        <Routes>
         
          <Route path="/Links/LoginScreen" element={<LoginScreen setNevBarProps={setNevBarProps}/>}/>
          <Route path="/Links/Register" element={<Register setNevBarProps={setNevBarProps}/>}/>
          <Route path="/Pages/Cart" element={<Cart dataProps={nevBarProps}/>}/>
          <Route path="/Pages/Catalogue" element={<Catalogue dataProps={nevBarProps}/>}/>
          <Route path="/" element={<Main dataProps={nevBarProps}/>}/>
          <Route path="/AdminCalalogeControl" element={<AdminCalalogeControl dataProps={nevBarProps}/>}/>
          <Route path="/AdminOrderControl" element={<AdminOrderControl dataProps={nevBarProps}/>}/>
            
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
