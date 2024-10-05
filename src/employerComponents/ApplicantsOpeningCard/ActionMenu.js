import React from 'react';

function ActionMenu() {
  return (
    <>
        <div className='-h-[50px] w-[150px] bg-[white] rounded-b-[20px] border overflow-y-scroll'>
                  <div className='min-h-[40px] text-[13px] bg-[white] px-[10px] border-b cursor-pointer flex items-center -rounded-t-[20px]' >New</div>
                  <div className='min-h-[40px] text-[13px] bg-[white] px-[10px] border-b cursor-pointer flex items-center' >Shortlisted</div>
                  <div className='min-h-[40px] text-[13px] bg-[white] px-[10px] border-b cursor-pointer flex items-center' >Interview</div>
                  <div className='min-h-[40px] text-[13px] bg-[white] px-[10px] border-b cursor-pointer flex items-center' >Hired</div>
                  <div className='min-h-[40px] text-[13px] bg-[white] px-[10px] border-b cursor-pointer flex items-center rounded-b-[20px]' >Rejected</div>
                </div>
    </>
  );
}

export default ActionMenu;
