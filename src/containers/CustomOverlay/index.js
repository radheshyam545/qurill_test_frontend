import React from 'react';
import './Overlay.css'; // You can define overlay styles in this file
import { Circles } from 'react-loader-spinner'

const CustomOverlay = ({ isLoading }) => {
  if (!isLoading) {
    return null; // Render nothing if the overlay is not open
  }

  return (

    <div className="overlay">
      <Circles
        height="80"
        width="80"
        color="#FFCB05"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>

  );
};

export default CustomOverlay;
