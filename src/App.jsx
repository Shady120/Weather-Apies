import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './Commponte/Not-found-page/Not-found-page'
import Home from './Commponte/Home/Home'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {

let router = createBrowserRouter([
    {index:true ,element:<Home/>},
    {path:"*",element:<NotFoundPage/>}
])


  return (
    <>
      <RouterProvider router={router}>

      </RouterProvider>
    </>
  )
}

export default App
