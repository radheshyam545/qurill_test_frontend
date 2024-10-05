
import React from 'react';
import Component3Tab from './Component3Tab';

function EmployEducationComponent(props) {
  return (
    <>
    <div className='border border-[#919191] px-[10px] py-[20px] rounded-[12px] border-[2px] mt-[20px]'>
      <p className='font-[700] text-[17px] text-[#1E1E1E]'>{props.programName}</p>
  <div className='grid grid-cols-2'>
      <div className='pl-[15px]'>
        <p className='text-[#1E1E1E] mt-[5px] text-[14px] font-[500]'>Academic Center</p>
        <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{props.center}</p>
        <p className='text-[#1E1E1E] mt-[10px] text-[14px] font-[500]'>Field of study</p>
        <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{props.field}</p>
        <p className='text-[#1E1E1E] mt-[10px] text-[14px] font-[500]'>From</p>
        <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{props.form}</p>
        </div>
  <div>
  <p className='text-[#1E1E1E] mt-[10px] text-[14px] font-[500]'>Degree</p>
        <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{props.degree}</p>
        <p className='text-[#1E1E1E] mt-[10px] text-[14px] font-[500]'>GPA Scale reporting</p>
        <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{props.gpa}</p>
  </div>
      </div>
</div>

    </>
  );
}

export default EmployEducationComponent
;
