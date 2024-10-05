import React from 'react';
import SkillCards from './SkillCards';

        function PreviewSkill({skills}) {
  return (
    <>
        <div className="wrapper  p-[15px] border border-[#b9b9b9] m-auto my-2 rounded-xl bg-[#FFFFFF] border-opacity-[60%]">
            <p className='font-22px text-[26px] font-semibold text-[#2E2D46]  py-[15px]'>Skill</p>
            {skills?.map((item)=>{return <SkillCards name={item}/>})}
           
        </div>
    </>
  );
}

export default PreviewSkill;