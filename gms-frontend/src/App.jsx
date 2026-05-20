import './App.css'
import Home from './components/pages/home/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import DashBoard from './components/pages/DashBoard/DashBoard';
import Sidebar from './components/Sidebar/Sidebar';
import { useState, useEffect } from 'react';
import AuthRedirect from './components/pages/home/AuthRedirect';
import Member from './components/Member/Member';
import GeneralUser from './components/pages/GeneralUser/GeneralUser';
import MemberDetail from './components/pages/home/MemberDetail/MemberDetail';
import StartNow from './components/StartNow';

function App() {
const [isLogin, setIsLogin] = useState(false);



  return (
    <div className='flex'>
      <AuthRedirect setIsLogin={setIsLogin}/>
      {isLogin && <Sidebar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='member' element={<Member/>}/>
        <Route path='specific/:page' element={<GeneralUser/>}/>
        <Route path='member/:id' element={<MemberDetail/>}/>
        <Route path="/start-now" element={<StartNow />} />

      

      </Routes>
      
      
    </div>
  );
}

export default App;
