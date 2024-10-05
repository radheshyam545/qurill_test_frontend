import React from 'react';

function InterviewTypeInperson({ disabled, handleInterviewTypeChange, personErrors, personValues }) {
  console.log("proposals=====>in",personValues)
  return (
    <>
      <div className='mt-[20px]'>
        <div className='flex flex-col'>
          <label className='text-[15px]  font-[500]' htmlFor="">Address :</label>
          <input
            disabled={disabled}
            value={personValues?.address || ''}
            onChange={(e) => { handleInterviewTypeChange("address", e.target.value) }} className=' border outline-none px-[12px] rounded-[5px] h-[42px] w-[400px]' type="text" />
          {personErrors?.address ? (<div className="text-red-500">{personErrors?.address}</div>) : null}

        </div>
        <div className='flex flex-col mt-[5px]'>
          <label className='text-[15px]  font-[500]' htmlFor="">Message :</label>
          <input
            disabled={disabled}
            value={personValues?.message || ''} onChange={(e) => { handleInterviewTypeChange("message", e.target.value) }} className=' border outline-none px-[12px] rounded-[5px] h-[42px] w-[400px]' type="text" />
          {personErrors?.message ? (<div className="text-red-500">{personErrors?.message}</div>) : null}
        </div>
      </div>
    </>
  );
}

export default InterviewTypeInperson;
