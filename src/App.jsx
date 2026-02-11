import { useState } from 'react'
import './App.css'
import { Link, Route, Router, Routes} from 'react-router-dom'
import Landingpage from './pages/Landingpage'

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </>
  )
}

export default App
