// frontend/src/components/EmailForm.jsx
import React, { useState } from 'react';

function EmailForm({ onSubmit }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button type="submit">Send Verification Code</button>
    </form>
  );
}

export default EmailForm;
