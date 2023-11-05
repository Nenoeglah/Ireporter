// import React, { useState } from "react";

// function Email() {
//   const [status, setStatus] = useState("Under Investigation");

//   const handleSendEmail = () => {
//     fetch('/email', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(response => response.text())
//       .then(data => {
//         console.log("Email Backend Response:", data);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   };

//   const handleStatusChange = (newStatus) => {
//     // Simulate a status change by updating the local state
//     setStatus(newStatus);

//     // Simulate sending an email notification to the user here
//     sendEmailNotification(newStatus);
//   };

//   const sendEmailNotification = (newStatus) => {
//     // Simulate sending an email notification.
//     // In a real application, you should use an email service or library to send notifications.
//     console.log(`Email notification sent: Record status changed to "${newStatus}"`);
//   };

//   return (
//     <div>
//       <h1>Status: {status}</h1>
//       <button id="sendEmailButton" onClick={handleSendEmail}>Send Email</button>
//       <button onClick={() => handleStatusChange("Under Investigation")}>Change Status to Under Investigation</button>
//       <button onClick={() => handleStatusChange("Rejected")}>Change Status to Rejected</button>
//       <button onClick={() => handleStatusChange("Resolved")}>Change Status to Resolved</button>
//     </div>
//   );
// }

// export default Email;


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
