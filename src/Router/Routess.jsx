import React from 'react'
import Login from '../Pages/Login'
import Mainpage from '../Pages/Mainpage'
import { 
  Navigate, 
  Route, 
  Routes 
} from 'react-router-dom'

const Routess = () => {

  let authToken = sessionStorage.getItem('TOKEN')

  return (
    <div>
      { authToken ? <MainRoutess/> : <LoginRoutes/> }
    </div>
  )
}

const LoginRoutes = () => {
  return (
    <div>
      <Routes>
    
        <Route path="/Login" element={<Login/>}/>
        <Route path="*" element={<Navigate to="/Login"/>}/>
    
      </Routes>    
    </div>
  )
}

const MainRoutess = () => {
  return (
    <div>
      <Routes>
    
        <Route path="/Mainpage" element={<Mainpage/>}/>
        <Route path="*" element={<Navigate to="/Mainpage"/>}/>
    
      </Routes>    
    </div>
  )
}

export default Routess