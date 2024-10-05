import React from 'react';

function NewConnectionscards(props) {
  return (
    <>
        <div className="new-connections border-[#e3e3e3] border-t-[1px] px-[10px] flex items-center justify-between cursor-pointer " style={{width:"100%", height:"90px"}}> 
        <div className="profileSection flex items-center w-[40%]  ">
            <div className="profile  bg-center bg-no-repeat bg-cover min-w-[60px] [w-[60px] h-[60px] rounded-full bg-[#E5EBFE]" ><img src="/assets/images/connection-profile.svg" alt="" className='w-[100%] h-[100%] rounded-full'/> </div>
            <div className='profile-content ml-[14px] w-[100%]'>
                <p className='font-semibold text-[]'>{props.name}</p>
                <p className=' text-[15px] text-ellipsis overflow-hidden whitespace-nowrap'>{props.desc}</p>
                <p className='text-[12px]'>{props.date}</p>
            </div>
        </div>
        <div className='flex gap-[5px]'>
        <span className='flex justify-center items-center w-[23px] h-[23px] rounded-[50%]  border border-[2px] border-[red]'>
            <img className='w-[12px] h-[12px] ' src="/assets/images/connection-cross.svg" alt="" />
        </span>
        <span className='flex justify-center items-center w-[23px] h-[23px] rounded-[50%]  border border-[2px] border-[green] pr-[5px] '>
            <img className='ml-[5px] w-[12px] h-[12px]' src="/assets/images/connection-tick.svg" alt="" />
        </span>
        </div>
        </div>
    </>
  );
}

export default NewConnectionscards;
