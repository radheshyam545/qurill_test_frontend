import React from 'react';

function ProgressBar() {
  return (
   <>
   <div className='relative bg-[black]'>
    <input className='range-slider' type="range" />
    <div className='h-[30px] bg-[yellow] w-[100%]'></div>

   </div>
   </>
  );
}

export default ProgressBar;
