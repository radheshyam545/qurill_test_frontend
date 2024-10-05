import React from 'react';

function JobNewscards(props) {
  return (
    <>
        <div className="job-cards w-[100%] flex justify-between items-center border-[#e3e3e3] border-t-[1px] py-3.5">
            <p className="job-cards-heading w-[90%] font-semibold leading-5 text-[15px]">{props.heading}</p>
            <span className='w-[10%] text-[20px]'><i class="fa-solid fa-angle-right"></i></span>
        </div>
    </>
  );
}

export default JobNewscards;
