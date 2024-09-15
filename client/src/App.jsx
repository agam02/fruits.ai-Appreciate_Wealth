import LoginForm from './Components/LoginForm/LoginForm'
import Home from './Components/Home/Home'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import About from './Components/About/About'
import Translator from './Components/Translator/Translator'
import ChatBot from './Components/Chat/Chat'
import WelcomeScreen from './Components/Chat/Welcome'
import Faq from './Components/Faqs/Faq'
import Profile from './Components/user/profile'
import FaqForm from './Components/Faqs/FaqForm'


function App() {

  return (
    <>
     <Routes>
      <Route path='/'  element={<LoginForm/>} />
      <Route path='/Home' element={<Home/>}/>
      <Route path='/About' element={<About/>}/>
      <Route path='/Translator' element={<Translator/>}/>
      <Route path='/Chat' element={<ChatBot/>}/>
      <Route path='/Welcome' element={<WelcomeScreen/>}/>
      <Route path='/Faq' element={<Faq/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path="/faq/:id" element={<FaqForm/>} />
      <Route path="/faq/new" element={<FaqForm />} />

     </Routes>
    </>
  )
}

export default App
