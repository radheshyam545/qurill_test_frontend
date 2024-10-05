import React from 'react';
import EducationCards from './EducationCards';
import moment from 'moment';
import { formatDate } from '../app/helperFunction';

function PreviewEducation({ educationTraining }) {
  
  return (
    
    <>
        <div className="wrapper p-[15px] border border-[#b9b9b9] m-auto my-2 rounded-xl bg-[#FFFFFF] border-opacity-[60%]">
        <p className='font-22px text-[26px] font-semibold text-[#2E2D46] py-[15px]'>Education</p>
        {educationTraining?.map((item) => {
         const formattedTo = formatDate(item?.to);
         const formattedFrom = formatDate(item?.from);
          return (
            <EducationCards
              name={item.nameOfCenter}
              desc={item.fieldOfStudy}
              date={`${formattedFrom} to ${formattedTo}`}
            />
          );
        })}
      </div>
    </>
  );
}

export default PreviewEducation;
