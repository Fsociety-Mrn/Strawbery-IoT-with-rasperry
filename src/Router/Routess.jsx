import React from 'react'
import Login from '../Pages/Login'
import Mainpage from '../Pages/Mainpage'
import { Navigate, Route, Routes } from 'react-router-dom'

const Routess = () => {
  return (
    <div>
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Mainpage" element={<Mainpage/>}/>
        <Route path="*" element={<Navigate to="/Login"/>}/>
      </Routes>
    </div>
  )
}

export default Routess