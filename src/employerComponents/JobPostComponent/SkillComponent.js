import React, { useEffect, useState, useRef } from 'react';
import RangeComponent from '../AddSkill/RangeComponent';
import { skillsCategories } from '../../pages/employerProtected/JobConsts';

function SkillComponent({ postJobData, setPostJobData}) {
  const [skillName, setSkillName] = useState('');
  const [skills, setSkills] = useState(postJobData?.skills || []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState(
    skillsCategories.flatMap(category => ({
      category: category.category,
      skills: category.skills
    }))
  );
  
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const handleSkills = (action, name = '', proficiency = 50) => {
    if (action === 'add') {
      if (skillName.trim() === '') return;
      setIsDropdownOpen(false)
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSkillName(e.target.value);
    const filteredCategories = skillsCategories
      .map(category => ({
        category: category.category,
        skills: category.skills.filter(skill => skill.toLowerCase().includes(searchTerm))
      }))
      .filter(category => category.skills.length > 0)
    setFilteredSkills(filteredCategories);
    setIsDropdownOpen(true);
};
  const handleSkillSelect = (skill) => {
    setSkillName(skill);
    setIsDropdownOpen(false);
  };

  return (
    <div className='relative'>
      <div className='add-skill-wrapper'>
        <p className='font-[700] text-[18px] mt-[50px] -switch-text-1000'>Add Skill</p>
        <form className='flex mt-[10px]' onSubmit={(e) => { e.preventDefault(); handleSkills('add'); }}>
          <span className='px-[10px] py-[10px] cursor-pointer bg-[white] border-[2px] border-[#AFAFAF] flex items-center justify-center border-r-[0px]'>
            <img src="/assets/images/employer-images/add-skill-icon.svg" alt="" />
          </span>
          <input
            ref={inputRef}
            className='px-[20px] py-[10px] outline-none add-skill-input w-[500px] border-[2px] border-[#AFAFAF] -text-[18px] border-l-[0px]'
            type="text"
            value={skillName}
            onChange={handleInputChange}
            onClick={() => setIsDropdownOpen(true)}
            placeholder='Add Skills'
          />
          {/* <button className='px-[20px] py-[10px] bg-[#FFCB05] border-[2px] border-[black] -text-[18px] text-[black]' type="submit">Add</button> */}
        </form>
        {/* {postJobData?.status !== 'draft' && (postJobData?.skills[0] === '' || postJobData?.skills[0] === undefined) && submitCheck && <p className='text-[red] text-[13px]'>Skills is required</p>} */}
        {isDropdownOpen && (
          <div ref={dropdownRef}
          className="absolute z-10 mt-1 w-[530px] max-h-[300px] overflow-y-auto bg-white shadow-lg rounded-lg"
          >
            <ul className="py-1">
            {filteredSkills.map((category, index) => (
        <div key={index}>
          {/* Category Title */}
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {category.category}
          </h2>
          {/* Skills List */}
          <ul>
            {category.skills.map((skill, skillIndex) => (
              <li
                key={skillIndex}
                className="cursor-pointer px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                onClick={() => handleSkillSelect(skill)}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
            </ul>
          </div>
        )}

        <div className='flex justify-between w-[70%] flex-wrap'>
          {skills.length === 0 ? (
            <p>No skills added yet.</p>
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
