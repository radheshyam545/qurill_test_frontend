import React from 'react';

function JobDetailsListBtn(props) {
  return (
    <>
        <button className='px-[15px] py-[5px] rounded-[5px] border-[#868686] border' style={{color:`${props.text}`}}>{props.title}</button>
    </>
  );
}

export default JobDetailsListBtn;
