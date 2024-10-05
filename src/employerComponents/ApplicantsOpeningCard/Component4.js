import React from 'react';

function Component4({ selectedApplicantData = {} }) {
  const { skills = [] } = selectedApplicantData;

  return (
    <div className='border border-[#919191] px-[20px] py-[20px] rounded-[12px] border-[2px] mt-[20px]'>
          <p className='font-[700] text-[17px] text-[#1E1E1E]'>Skills</p>
      <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-[20px]'>
        {skills.length > 0 ? (
          skills.map((item, index) => (
            <div key={index} className='py-[20px] border-b border-b-[2px]'>
              <p className='text-[#1E1E1E] font-[600] text-[15px]'>{item || 'N/A'}</p>
            </div>
          ))
        ) : (
          <p className='text-[#1E1E1E] font-[600] text-[15px]'>No skills available</p>
        )}
      </div>
    </div>
  );
}

export default Component4;
