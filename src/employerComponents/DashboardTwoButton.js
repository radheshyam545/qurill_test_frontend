import React from 'react';

function DashboardTwoButton(props) {
  return (
    <>
        <button className='text-[14px] text-[#1E1E1E] px-6 rounded-2xl mt-1.5' style={{backgroundColor: `${props.bg}` }}> <a href="#">{props.text}</a> </button>
    </>
  );
}

export default DashboardTwoButton;
