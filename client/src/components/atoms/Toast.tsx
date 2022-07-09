import React from 'react';
import { ToastContainer } from 'react-toastify';

function Toast() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={10000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

export default Toast;
