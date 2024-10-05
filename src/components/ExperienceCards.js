import React from 'react';

function ExperienceCards(props) {
  return (
    <>
        <div className='experience-wrapper flex items-start my-[20px]  border-t-[.5px] border-b-[#b9b9b9] border-opacity-[60%] pt-[5px]'>
        <span className='experience-img-container h-[50px] w-[50px] bg-contain bg-no-repeat bg-center' style={{backgroundImage: "url(/assets/images/experience-cards.svg)"}}></span>
        
                <div className='experience-desc ml-[15px] flex flex-col'>
                <p className='font-18px font-semibold text-[24px] mb-[5px]'>{props.name}</p>
                <p className='font-15px text-[18px]'>{props.name2}</p>
                <p className='font-15px text-[#B5B5B5] text-[14px]'> {props.date}</p>
                <p className='font-15px text-[#B5B5B5] text-[14px]'> {props.city}</p>
                <p className='font-15px text-[14px]'>{props.desc}</p>
                </div>



            </div>
    </>
  );
}

export default ExperienceCards;
