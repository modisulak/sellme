import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import LoginConfirmation from './components/LoginConfirmation';
import ItemForm from './components/ItemForm';
import ChatPage from './components/ChatPage/ChatPage';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/createlisting' element={<ItemForm />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signupconfirm' element={<LoginConfirmation />} />
      </Routes>
    </div>
  );
}

export default App;
