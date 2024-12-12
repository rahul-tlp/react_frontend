import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider,createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
import Github, { githubInfoLoader } from './components/Github/Github.jsx'
import Login from './components/Login/login.jsx'
import Signup from './components/Signup/signup.jsx'
import Notes from './components/Notes/notes.jsx'

// const router = createBrowserRouter([
//   {
//     path:'/',
//     element : <Layout/>,
//     children : [
//       {
//         path : '',
//         element : <Home/>
//       }, {
//         path : 'about',
//         element : <About/>
//       }, 
//       {
//         path : 'contact',
//         element : <Contact/>
//       }
//     ]
//   }
// ])

const router = createBrowserRouter (
  createRoutesFromElements (
    <Route path='' element={<Layout/>}>
      <Route path='' element={<Home/>}></Route>
      <Route path='about' element={<About/>}></Route>
      <Route path='contact' element={<Contact/>}></Route>
      <Route path='user/:userId' element={<User/>}></Route>
      <Route path='update_user/:userId' element={<Signup/>}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='signup' element={<Signup/>}></Route>
      <Route path='add_notes' element={<Notes/>}></Route>
      <Route path='add_notes/:id' element={<Notes/>}></Route>
      <Route
      loader={githubInfoLoader}
      path='github'
      element={<Github/>}
      />
    </Route>
    
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
