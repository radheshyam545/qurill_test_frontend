import React from 'react';

function RoundedProgressBar() {
  return (
    <>
      <label htmlFor="file">Downloading progress:</label>
      <progress className='rounded-full' id="file" value="32" max="100"> 32% </progress>
    </>
  );
}

export default RoundedProgressBar;