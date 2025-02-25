import React from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <>
      <h1>Contact Us</h1>

      <div>
        <p>
          We’d love to hear from you! Whether you have a question, want to provide feedback, or are interested in our catering services, feel free to reach out. Our team is always here to help.
        </p>
      </div>

      <div>
        <strong>Visit Us</strong>
        <br />
        Lake Balboa, CA
        <br />
        Phone: (818) 555-5555
        <br />
        Email: pbsbrewsandbites@gmail.com
      </div>

      <br />
      <strong>Opening Hours</strong>
      <br />
      Monday - Friday: 4:20 AM - 8:00 AM
      <br />
      Saturday - Sunday: 4:20 AM - 7:00 AM
      <br />
      <br />
      <br />

      {/* Buttons at the bottom */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <a href="tel:+18186507462" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Call</a>
        <Link to="/Request" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Requests</Link>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default Contact;