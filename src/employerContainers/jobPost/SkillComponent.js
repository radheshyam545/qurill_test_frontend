import React, { useEffect, useState } from 'react';
import RangeComponent from '../../employerComponents/AddSkill/RangeComponent';

function SkillComponent({ postJobData, setPostJobData, submitCheck }) {
  const [skillName, setSkillName] = useState('');
  const [skills, setSkills] = useState(postJobData?.skills || []);

  const handleSkills = (action, name = '', proficiency = 50) => {
    if (action === 'add') {
      if (skillName.trim() === '') return;

      const newSkill = {
        name: skillName,
        proficiency: 50,
      };
      setSkills([...skills, newSkill]);
      setSkillName('');
    } else if (action === 'update') {
      const updatedSkills = skills.map((skill) =>
        skill.name === name ? { ...skill, proficiency } : skill
      );
      setSkills(updatedSkills);
    } else if (action === 'remove') {
      setSkills(skills.filter(skill => skill.name !== name));
    }
  };

  useEffect(() => {
    setSkills(postJobData?.skills || []);
  }, [postJobData]);

  useEffect(() => {
    setPostJobData(prevPostJobData => ({
      ...prevPostJobData,
      skills: skills,
    }));
  }, [skills, setPostJobData]);

  return (
    <div>
      <div className='add-skill-wrapper'>
        <p className='font-[700] text-[16px] mt-[50px] -switch-text-1000'>Add Skill</p>
        <form className='flex mt-[10px]' onSubmit={(e) => { e.preventDefault(); handleSkills('add'); }}>
          <span className='px-[10px] py-[10px] cursor-pointer bg-[white] border-[2px] border-[#AFAFAF] flex items-center justify-center border-r-[0px]'>
            <img src="/assets/images/employer-images/add-skill-icon.svg" alt="" />
          </span>
          <input
            className='px-[20px] py-[10px] outline-none add-skill-input w-[500px] border-[2px] border-[#AFAFAF] text-[15px] border-l-[0px]'
            type="text"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            placeholder='Add Skills'
          />
          <button className='px-[20px] py-[10px] bg-[#FFCB05] text-[15px] border-[2px] border-[black] -text-[18px] text-[black]' type="submit">Add</button>
        </form>
        {postJobData?.status !== 'draft' && (postJobData?.skills[0] === '' || postJobData?.skills[0] === undefined) && submitCheck && <p className='text-[red] text-[13px]'>Skills is required</p>}

        <div className='flex justify-between w-[70%] flex-wrap'>
          {skills.length === 0 ? (
            <p className='text-[15px] mt-[5px]'>No skills added yet.</p>
          ) : (
            skills.map((skill) => (
              <div key={skill.name} className="-flex items-center mt-2">
                <RangeComponent
                  range={skill.proficiency}
                  setRange={(value) => handleSkills('update', skill.name, value)}
                  title={skill.name}
                  removeSkill={() => handleSkills('remove', skill.name)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SkillComponent;
