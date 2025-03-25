import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgetPassword'
import SignUp from './pages/Signup'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='signup' element={<SignUp/>}/>
      <Route path='home' element={<Home/>}/>
      <Route path='forgotpassword' element={<ForgotPassword/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
