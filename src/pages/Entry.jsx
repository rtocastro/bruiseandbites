import React from 'react';
import { Link } from 'react-router-dom'

//import main logo for entry
import mainlogo from '../assets/mainweblogopb.png'

export default function Entry() {
  return (
    <>
     <Link to='./Home'><img src={mainlogo} /></Link>
      <h5>ENTRY PAGE</h5>
     
 
    </>
  )
}