import React from 'react';

function InterviewTypeVideo({disabled,handleInterviewTypeChange,videoErrors, videoValues}) {
  return (
    <>
         <div className='mt-[20px]'>
        <div className='flex flex-col video-inputs'>
            <label className='text-[15px]  font-[500]' htmlFor="">Video conference link :</label>
            <input 
            disabled={disabled}
            value={videoValues?.meetingLink || ''} onChange={(e)=>{handleInterviewTypeChange("meetingLink",e.target.value)}} className=' border outline-none px-[12px] rounded-[5px] h-[42px] w-[400px]' type="text" />
            {videoErrors?.meetingLink ? (<div className="text-red-500">{videoErrors?.meetingLink}</div>) : null}
            </div>
        <div className='flex flex-col mt-[5px]'>
            <label className='text-[15px]  font-[500]' htmlFor="">Message :</label>
            <input
            disabled={disabled}
            value={videoValues?.message || ''} onChange={(e)=>{handleInterviewTypeChange("message",e.target.value)}} className=' border outline-none px-[12px] rounded-[5px] h-[42px] w-[400px]' type="text" />
            {videoErrors?.message ? (<div className="text-red-500">{videoErrors?.message}</div>) : null}
            </div>
        </div>
    </>
  );
}

export default InterviewTypeVideo;
