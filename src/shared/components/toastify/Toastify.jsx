import React from "react";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toastify = () => {
  const containerId = "main-toastify";
  const position = "top-right";
  const autoCloseDelay = 1500;

  return (
    <ToastContainer
      containerId={containerId}
      position={position}
      autoClose={autoCloseDelay}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      transition={Zoom}
    />
  );
};

export default Toastify;
