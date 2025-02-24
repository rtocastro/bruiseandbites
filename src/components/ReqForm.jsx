import React, { useState } from 'react';

function ReqForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    favoriteJelly: '',
    suggestion: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields: Name, E-mail, and Phone Number.");
      return;
    }
    
    const mailtoLink = `mailto:ricktorres@live.com?subject=Suggestions/Requests&body=
      Name: ${encodeURIComponent(formData.name)}%0D%0A
      E-mail: ${encodeURIComponent(formData.email)}%0D%0A
      Phone Number: ${encodeURIComponent(formData.phone)}%0D%0A
      Favorite Jelly?: ${encodeURIComponent(formData.favoriteJelly)}%0D%0A
      Suggestion: ${encodeURIComponent(formData.suggestion)}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name*:
        <br />
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <br />
      <br />
      <label>
        E-mail*:
        <br />
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <br />
      <br />
      <label>
        Phone Number*:
        <br />
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </label>
      <br />
      <br />
      <label>
        Favorite Jelly?:
        <br />
        <input type="text" name="favoriteJelly" value={formData.favoriteJelly} onChange={handleChange} />
      </label>
      <br />
      <br />
      <label>
        Suggestion:
        <br />
        <textarea name="suggestion" value={formData.suggestion} onChange={handleChange}></textarea>
      </label>
      <br />
      <br />
      <button type="submit">Submit</button>
      <br />
      <br />
    </form>
  );
}

export default ReqForm;
