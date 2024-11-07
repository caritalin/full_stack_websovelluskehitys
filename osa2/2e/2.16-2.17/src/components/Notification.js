import React from 'react';

const Notification = ({ message, type }) => {
  if (!message) {
    return null;
  }

  const notificationStyle = {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const successStyle = {
    ...notificationStyle,
    backgroundColor: '#4caf50',
    color: 'white',
  };

  const errorStyle = {
    ...notificationStyle,
    backgroundColor: '#f44336',
    color: 'white',
  };

  return (
    <div style={type === 'success' ? successStyle : errorStyle}>
      {message}
    </div>
  );
};

export default Notification;
