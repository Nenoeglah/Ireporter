


import React, { useState } from "react";

function Email() {
  const handleSendEmail = () => {
    fetch('/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.text())
      .then(data => {
        console.log("Email Backend Response:", data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Email Component</h1>
      <button id="sendEmailButton" onClick={handleSendEmail}>Send Email</button>
    </div>
  );
}

export default Email;
