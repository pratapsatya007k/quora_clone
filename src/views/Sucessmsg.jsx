import React, { useState } from 'react';
import './Notification.css'; // Import CSS file

const Sucessmsg = () => {
    const [showNotification, setShowNotification] = useState(false);
  return (
    <>
      {showNotification && (
        <div className="notification">
          <p>Question added successfully!</p>
          <button onClick={handleCloseNotification}>Close</button>
          <button onClick={handleShowQuestion}>Show Question</button>
        </div>
      )}
    </>
  )
}

export default Sucessmsg
