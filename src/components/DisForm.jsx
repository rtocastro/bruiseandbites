import React, { useState } from 'react';
import disfive from '../assets/disfive.png';
import disten from '../assets/disten.png';
import disdub from '../assets/disdub.png';
import disquart from '../assets/disquart.png';
import disfitty from '../assets/disfitty.png';
import dishunny from '../assets/dishunny.png';

function DisForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    unit: '',
    city: '',
    zip: '',
    feedback: ''
  });

  const eligibleZipCodes = [
    "91304", "91306", "91307", "91311", "91316", "91324", "91325", "91326", "91330", 
    "91335", "91340", "91342", "91343", "91344", "91345", "91352", "91356", "91364", 
    "91367", "91401", "91402", "91403", "91405", "91406", "91411", "91423", "91436"
  ];

  const specialZipCodes = ["91406", "91405", "91331"];
  const vipNames = ["Steven Guerra", "Jason Kaufman", "Martin Sanchez"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let emailBody = "Greetings, please process my card :)\n\n";
    let imageToAttach = null;

    if (formData.address.includes("7540 Haskell Ave") && formData.zip === "91406" && formData.unit.includes("35")) {
      imageToAttach = dishunny;
    } else if (formData.address.includes("7540 Haskell Ave") && formData.zip === "91406") {
      imageToAttach = disquart;
    } else if (vipNames.includes(formData.name)) {
      imageToAttach = disfitty;
    } else if (specialZipCodes.includes(formData.zip)) {
      imageToAttach = disdub;
    } else if (eligibleZipCodes.includes(formData.zip)) {
      imageToAttach = disten;
    } else {
      imageToAttach = disfive;
    }

    emailBody += `Name: ${formData.name}\nAddress: ${formData.address}\nUnit: ${formData.unit}\nCity: ${formData.city}\nZip: ${formData.zip}\nFeedback: ${formData.feedback}\n\n`;
    if (imageToAttach) {
      emailBody += `Attached Image: ${imageToAttach}`;
    }

    window.location.href = `mailto:ricktorres@live.com?subject=My Discount Card&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-lg max-w-lg mx-auto">
      <label className="block mb-2">Name:
        <input type="text" name="name" required onChange={handleChange} className="w-full p-2 border rounded" />
      </label>
      <label className="block mb-2">Address:
        <input type="text" name="address" required onChange={handleChange} className="w-full p-2 border rounded" />
      </label>
      <label className="block mb-2">Unit/Apt:
        <input type="text" name="unit" onChange={handleChange} className="w-full p-2 border rounded" />
      </label>
      <label className="block mb-2">City:
        <input type="text" name="city" required onChange={handleChange} className="w-full p-2 border rounded" />
      </label>
      <label className="block mb-2">Zip Code:
        <input type="text" name="zip" required onChange={handleChange} className="w-full p-2 border rounded" />
      </label>
      <label className="block mb-4">Feedback:
        <textarea name="feedback" onChange={handleChange} className="w-full p-2 border rounded" />
      </label>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Get Discount</button>
    </form>
  );
}

export default DisForm;
