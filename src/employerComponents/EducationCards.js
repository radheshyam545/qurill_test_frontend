import React from 'react';

function EducationCards(props) {
  return (
    <>
        <div className="education-wrapper flex my-[20px] border-t-[.5px] border-b-[#b9b9b9] border-opacity-[60%] pt-[5px]">
        <span className='education-img-container h-[50px] w-[50px] bg-contain bg-no-repeat bg-center' style={{backgroundImage: "url(./assets/images/education-card.svg)"}}></span>
            <div className='education-desc ml-[15px]'> 
                <p className='font-18px font-semibold text-[24px]  mb-[5px]'>{props.name}</p>
                <p className='font-15px text-[14px]'>{props.desc}</p>
                <p className='font-15px text-[#B5B5B5] text-[14px]'> {props.date}</p>
            </div>
        </div>
        
    </>
  );
}

export default EducationCards;
