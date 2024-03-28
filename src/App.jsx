
import { useEffect, useState } from 'react'
import './App.css'
import Home from './component/home'
import Login from './component/login'
import { Outlet, useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
useEffect(()=>{
  console.log('calling');
  const arr = []
  let user = JSON.parse( localStorage.getItem("user"));
  console.log(user);
  if(user){
     navigate('/')
  }
  else{
    navigate('/login')
  }
},[])

  return (
    <>
    <Outlet></Outlet>
    </>
  )
}

export default App
