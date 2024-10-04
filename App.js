import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

import './App.css'

export default function App() {
  // const [dark ,isdark] = useState(false)
  const [dark, isdark] = useState(JSON.parse(localStorage.getItem('isdarkmode')))
  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  
    return () => {
      document.body.classList.remove('dark');
    };
  }, [dark]);
 
 
  return (
    <>
     
      <div className={`app-container ${dark ? 'dark' : ''}`}>
      <Header dark={dark} isdark={isdark} />
      <Outlet  context={[dark, isdark] }/>
    </div>
     
    </>
  )
}
