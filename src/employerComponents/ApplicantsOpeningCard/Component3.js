import moment from 'moment';
import React from 'react';
import { educationList, educalistEnum } from '../../pages/employerProtected/JobConsts';

function Component3({ selectedApplicantData = {}, showHide }) {
  const { educationTraining = [] } = selectedApplicantData;
  return (
    <>
      {educationTraining.map((item, index) => (
        <div className='border border-[#919191] px-[10px] py-[20px] rounded-[12px] border-[2px] mt-[20px]'>
          <p className='font-[700] text-[17px] text-[#1E1E1E]'>{item?.academicCenter ? item?.academicCenter : "was not provided"}</p>
          <div className='grid grid-cols-2'>
            <div className='pl-[15px]'>
              <p className='text-[#1E1E1E] mt-[5px] text-[14px] font-[500]'>Academic center</p>
              <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{item?.academicCenter ? item?.academicCenter : "Academic center was not provided"}</p>
              <p className='text-[#1E1E1E] mt-[5px] text-[14px] font-[500]'>Academic center</p>
              <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{item?.degree ?educalistEnum[item?.degree] : "Academic center was not provided"}</p>
             {console.log(123,item)}
              <p className='text-[#1E1E1E] mt-[10px] text-[14px] font-[500]'>Field of study</p>
              <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{item?.fieldOfStudy ? item?.fieldOfStudy : " Field of study was not provided"}</p>
              <p className='text-[#1E1E1E] mt-[10px] text-[14px] font-[500]'>From</p>
              <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>
                {item?.ongoing
                  ? `${moment(item?.from).format('MMMM YYYY')} - Present` || 'N/A'
                  : `${moment(item?.from).format('MMMM YYYY')} to ${moment(item?.to).format('MMMM YYYY')}` || 'N/A'}
              </p>
            </div>
            <div className='pl-[15px]'>
              <p className='text-[#1E1E1E] mt-[10px] text-[15px] font-[500]'>Degree</p>
              <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{
                educationList.find(i => i.value === item?.degree)?.label || 'Degree was not provided'}</p>
              <p className='text-[#1E1E1E] mt-[10px] text-[14px] font-[500]'>GPA scale reporting</p>
              <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{item?.gpa ? item?.gpa : "GPA was not provided"}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Component3;
