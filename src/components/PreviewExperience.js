import React from 'react';
import ExperienceCards from './ExperienceCards';
import { formatDate } from '../app/helperFunction';
function PreviewExperience({work}) {
  
  
  return (
    <>
        <div className="wrapper  p-[15px] bg-[#FFFFFF] border border-[#b9b9b9] border-opacity-[60%] m-auto my-2 rounded-xl">
            <p className='font-22px text-[26px] font-semibold text-[#2E2D46]  py-[15px]'>Experience</p>
           {work?.map((item) => {
         const formattedTo = formatDate(item?.to);
         const formattedFrom = formatDate(item?.from);
          return (
            <ExperienceCards
            name={item.occupation}
            name2={item.employeer}
            date={`${formattedFrom} to ${formattedTo}`}
            />
          );
        })}    
        </div>
    </>
  );
}

export default PreviewExperience;