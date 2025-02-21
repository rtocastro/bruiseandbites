import React from 'react';

import brewspic from '../assets/brewspic.png'
import sandwichpic from '../assets/sandwichpic.png'


function Menu() {
  return (
    <><h1>this is the menu page</h1>
    
    <img src={brewspic} />
    <br />
    <img src={sandwichpic} />
    </>
  );
}

export default Menu;