import React from 'react';

function DashboardTwoUnderlineButton(props) {
  return (
    <button onClick={props.onCickEditButton} className='font-semibold text-[#1E1E1E] bg-[] rounded-[10px] text-[14px] px-[25px] py-[6px]' style={{ textDecorationLine: props.underline, backgroundColor: props.bg }}>
      {props.text}
    </button>
  );
}


export default DashboardTwoUnderlineButton;

