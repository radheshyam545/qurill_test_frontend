import moment from 'moment';
import React from 'react';
import { CountryDATAEnum, usaCitiesEnum, USStatesEnum } from '../../pages/employerProtected/JobConsts';

function Component2({ selectedApplicantData = {} ,showHide}) {
  const { work = [] } = selectedApplicantData;
  return (
    <div>
      {work.map((item, index) => (
        <div key={index} className='border border-[#919191] p-[10px] rounded-[12px] border-[2px] mt-[20px]'>
          <p className='font-[700] text-[16px] text-[#1E1E1E]'>{item?.title}</p>

          <div className='grid lg:grid-cols-2 md:grid-cols-1'>
            <div className='pl-[15px] flex flex-col gap-[8px]'>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Occupation or position held</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{item?.title || 'Occupation or position held was not provided.'}</p>
              </span>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Employer</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{item?.employer || 'Employer was not provided.'}</p>
              </span>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>From</p>
                <p className='text-[#9c9292] mt-[5px]  text-[15px] font-[500]'>
                  {item?.ongoing
                    ? `${moment(item?.from).format('MMMM YYYY')} - Present` || 'N/A'
                    : `${moment(item?.from).format('MMMM YYYY')} to ${moment(item?.to).format('MMMM YYYY')}` || 'N/A'}
                </p>
              </span>
            </div>
            <div className='flex flex-col gap-[8px] pl-[15px]'>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>City</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'> {item?.city || 'City was not provided.'}</p>
              </span>
               <span className='leading-[20px]'>
              <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>State</p>
              <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'> {item?.state || 'State was not provided.'}</p>
            </span>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[14px] font-[500]'>Country</p>
                <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{CountryDATAEnum[item?.country] || 'Country was not provided.'}</p>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Component2;
