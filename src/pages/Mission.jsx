import React from 'react'

import commimg from '../assets/communityimg.png';
// import aboutpb from '../assets/aboutpb.png'


function Mission() {

  return (
<div className="menu-container">
      <div className="text-section">
        <h2>Welcome to PB's Brews & Bites.
          <br />
          Where Bold Brews and Epic PB&Js Collide!</h2>
          <br />
        <p>
          Nestled in the heart of Van Nuys, PB’s Brews & Bites was born from a love of top-notch coffee and the timeless perfection of a peanut butter and jelly sandwich. We’re all about crafting the kind of cozy, feel-good experience that makes you want to kick back, sip, and savor every bite.
          <br /><br />
          We take coffee seriously—like, really seriously. Our locally sourced beans are brewed with care, ensuring every sip is smooth, rich, and satisfying. Whether you like your drinks sweet or bold and unsweetened, we’ve got something made just for you. And if you haven’t tried one of our signature cold brews yet, trust us—you’re missing out!
          <br /><br />
          Of course, no great coffee is complete without a bite to match. Our PB&Js are next-level, made with minimal, organic, vegan ingredients that let the flavors shine. Low sugar? No sugar? No problem. Every sandwich is crafted to be as delicious as it is wholesome.
          <br /><br />
          At PB’s, our crew is all about making you feel at home. Whether you’re a first-time visitor or a daily regular, expect friendly faces, quick service, and a little extra love in every order. Our customers often tell us it feels like being part of a family—probably because, well, you are!
          <br /><br />
          As a proud member of the Van Nuys community, we’re committed to sustainability and supporting local vendors whenever possible. Great coffee, amazing sandwiches, and a little love for the planet—what’s not to love?
          <br /><br />
          Come see us and taste the difference. We can’t wait to serve you!
        </p>
      </div>
      <div className="image-section">
        <img src={commimg} alt="Community" className="community-image" />
      </div>
      <div>
        {/* <img src={aboutpb} /> */}
      </div>
    </div>
  )
}

export default Mission