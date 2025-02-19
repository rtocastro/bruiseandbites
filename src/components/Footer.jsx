import React from 'react'
import { Link } from 'react-router-dom'

import iglogo from '../assets/igfootlogo.png'

function Footer() {

  return (
    <>
    <Link >
    
    <img src={iglogo} className='footer-btn'/>
    </Link>
    <p>follow us on IG!</p>
    </>
  )
}

export default Footer