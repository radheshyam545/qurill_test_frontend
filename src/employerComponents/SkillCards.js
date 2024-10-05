import React from 'react';

function SkillCards(props) {
  return (
    <>
        <div className= 'skill-wrapper flex items-center my-[20px]  border-t-[.5px] border-b-[#b9b9b9] border-opacity-[60%] pt-[5px]'>
        {/* <span className='skill-img-container h-[60px] w-[60px] bg-contain bg-no-repeat bg-center' style={{backgroundImage: "url()"}}></span> */}
                <p className='skill-desc font-18px font-semibold text-[20px] ml-[15px]'>{props.name}</p>
            </div>
    </>
      
  );
}

export default SkillCards;
