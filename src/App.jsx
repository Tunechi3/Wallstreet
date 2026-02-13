import { useState } from 'react'
import './App.css'
import { Link, Route, Router, Routes} from 'react-router-dom'
import Landingpage from './pages/Landingpage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ScrollManager from './components/ScrollManager'

function App() {
  

  return (
    <>
      <ScrollManager>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
      </ScrollManager>
    </>
  )
}

export default App
