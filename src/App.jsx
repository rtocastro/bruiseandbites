import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

//Main pic
import mainlogo from './assets/mainweblogopb.png'

function App() {

  return (
    <>
    {/* adding image to for link later */}
<img src={mainlogo} />
<h1>THIS IS THE APP PAGE</h1>
<Outlet />
    </>
  )
}

export default App
