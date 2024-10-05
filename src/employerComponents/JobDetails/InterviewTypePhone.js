import React from 'react';

function InterviewTypePhone({disabled, handleInterviewTypeChange,phoneErrors, phoneValues}) {
  return (
    <>
        <div className='mt-[20px]'>
        <div className='flex flex-col phone-inputs'>
            <label className='text-[15px]  font-[500]' htmlFor="">Phone :</label>
            <input
            disabled={disabled}
            value={phoneValues?.phone || ''} onChange={(e)=>{handleInterviewTypeChange("phone",e.target.value)}} className=' border outline-none px-[12px] rounded-[5px] h-[42px] w-[400px]' type="text" />
            {phoneErrors?.phone ? (<div className="text-red-500">{phoneErrors?.phone}</div>) : null}
            </div>
        <div className='flex flex-col mt-[5px] phone-inputs'>
            <label className='text-[15px]  font-[500]' htmlFor="">Access code or Pin</label>
            <input
            disabled={disabled}
            value={phoneValues?.pin || ''} onChange={(e)=>{handleInterviewTypeChange("pin",e.target.value)}} className=' border outline-none px-[12px] rounded-[5px] h-[42px] w-[400px]' type="text" />
            {phoneErrors?.pin ? (<div className="text-red-500">{phoneErrors?.pin}</div>) : null}
            </div>
        <div className='flex flex-col mt-[5px] phone-inputs'>
            <label className='text-[15px]  font-[500]' htmlFor="">Messsage :</label>
            <input 
            disabled={disabled}
            value={phoneValues?.message || ''} onChange={(e)=>{handleInterviewTypeChange("message",e.target.value)}} className=' border outline-none px-[12px] rounded-[5px] h-[42px] w-[400px]' type="text" />
            {phoneErrors?.message ? (<div className="text-red-500">{phoneErrors?.message}</div>) : null}
            </div>
        </div>
    </>
  );
}

export default InterviewTypePhone;
