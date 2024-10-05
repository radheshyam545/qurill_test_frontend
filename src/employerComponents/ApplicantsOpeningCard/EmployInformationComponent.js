
    import React from 'react';
    import Component3Tab from './Component3Tab';
    
    function EmployInformationComponent(props) {
      return (
        <>
        <div className='border border-[#919191] p-[10px] rounded-[12px] border-[2px] mt-[20px]'>
          {/* <p className='font-[600] mb-[5px] text-[14px] text-[#1E1E1E]'>{props.title}</p> */}
      <div className='grid grid-cols-2'>
          <div className='pl-[15px] flex flex-col gap-[8px]'>
          <span className='leading-[20px]'>
            <p className='text-[#1E1E1E] mt-[5px] text-[14px] font-[500]'>Occupation or position held</p>
            <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{props.position}</p>
            </span>
            <span className='leading-[20px]'>
            <p className='text-[#1E1E1E] mt-[5px] text-[14px] font-[500]'>Employer</p>
            <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{props.employer}</p>
            </span>
            <span className='leading-[20px]'>
            <p className='text-[#1E1E1E] mt-[5px] text-[14px] font-[500]'>Experience</p>
            <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{props.experience}</p>
            </span>
            </div>
      <div className='flex flex-col gap-[8px]'>
      <span className='leading-[20px]'>
      <p className='text-[#1E1E1E] mt-[5px] text-[14px] font-[500]'>City</p>
            <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{props.city}</p>
            </span>
            <span className='leading-[20px]'>
            <p className='text-[#1E1E1E] mt-[5px] text-[14px] font-[500]'>Country</p>
            <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{props.country}</p>
            </span>
            <span className='leading-[20px]'>
            <p className='text-[#1E1E1E] mt-[5px] text-[14px] font-[500]'>From</p>
            <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{props.form}</p>
            </span>
      </div>
          </div>
    </div>

        </>
      );
    }
    
    export default EmployInformationComponent;
    