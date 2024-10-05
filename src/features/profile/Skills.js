import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import { postProfileData } from "../../features/profile/profileSlice";
import { useSelector, useDispatch } from 'react-redux'
import { notifySuccess } from "../../app/toaster";
import { skillsCategories } from "../../pages/employerProtected/JobConsts";

const Skills = () => {

    const dispatch = useDispatch()
    const [collapse1, setCollapse1] = useState(true);
    const [loading, setLoading] = useState(false)
    const [tabData, setTabData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const { profilePagesData } = useSelector(state => state.profile)
    const { skills } = profilePagesData

    useEffect(() => {
        if (skills?.length === 0) setTabData([])
        else setTabData(skills)
    }, [skills])

    const toggleCollapse = (collapseNumber) => {
        switch (collapseNumber) {
            case 1:
                setCollapse1(!collapse1);
                break;
            default:
                break;
        }
    };

    const initialValues = { digitalSkill: "" };
    const validationSchema = Yup.object({ digitalSkill: Yup.string().required("Please enter a skill") });

    const handleSubmit = async (values, { resetForm }) => {

        if (tabData.includes(values.digitalSkill)) {
            setErrorMessage("Skill already exists");
        } else {
            setTabData([...tabData, values.digitalSkill]);
            resetForm();
            setErrorMessage("");
        }
    };

    const handleCancel = (index) => {
        const updatedSkills = [...tabData];
        updatedSkills.splice(index, 1);
        setTabData(updatedSkills);
    };

    const handleSave = async () => {
        if (tabData.length === 0) {
            setErrorMessage("Please add at least one digital skill");
        } else {
            setLoading(true)
            try {
                dispatch(postProfileData({ skills: tabData })).unwrap().then(() => {
                    setLoading(false)
                    notifySuccess('Skill Update Successfully')
                })
            } catch (e) {
                console.log('error profile', e)
                setLoading(false)
            }

        }
    };
    //////////////////////////////////
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  const dropdownRef = useRef(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [filteredSkills, setFilteredSkills] = useState(
        skillsCategories.flatMap(category => ({
            category: category.category,
            skills: category.skills
        }))
    );
    const [skillName, setSkillName] = useState('');

    const inputRef = useRef(null);
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
        setErrorMessage("");
    };

    // const handleSkillSelect = (skill) => {
    //     setSkillName(skill);
    //     setIsDropdownOpen(false);
    //   };
    const handleSkillSelect = (skill) => {
        if (tabData.includes(skill)) {
            setErrorMessage("Skill already exists");
        } else {
            setTabData([...tabData, skill]);
            setErrorMessage(""); // Clear error message when a new skill is added
        }
        setSkillName('');
        setIsDropdownOpen(false);
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="section-1 mb-10">
                        <h4 onClick={() => toggleCollapse(1)} className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[15px] mb-3">
                            Digital skills
                            <ChevronDownIcon className={` transition-all duration-300 ${collapse1 ? 'rotate-180' : ''} w-[23px]`} />
                        </h4>
                        <div className={`transition-all duration-300 ${collapse1 ? 'show' : 'hidden'}`}>
                            <p className="text-[15px]">List your digital skills here and group them.</p>
                            <div className="w-full h-[1px] bg-[#D4D4D4] my-5"></div>
                            <div className="grid lg:grid-cols-2 lg:gap-20 gap-5">
                                <div className="">
                                    <label className="mb-2 block text-[15px]">Digital Skills</label>
                                    <div className="flex lg:w-8/12">
                                        <input
                                            ref={inputRef}
                                            // className='px-[20px] py-[10px] outline-none add-skill-input w-[500px] border-[2px] border-[#AFAFAF] text-[18px] border-l-[2px] border-l-[#AFAFAF]'
                                            className='px-[20px] py-[10px] outline-none add-skill-input w-[500px] border-[2px] border-[#AFAFAF] text-[15px] border-l-[2px]'
                                            type="text"
                                            value={skillName}
                                            onChange={handleInputChange}
                                            onClick={() => setIsDropdownOpen(true)}
                                            placeholder='Add Skills'
                                        />
                                        {/* <Field type="text" name="digitalSkill" placeholder="Please Type Skills" className="w-full text-[15px] text-[#000] px-[20px] py-[10px] outline-none border border-[#FFCB05]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]" /> */}
                                        {/* <button type="submit" className="bg-[#1E1E1E] h-[44.5px] px-3 text-white flex items-center">Add</button> */}
                                    </div>
                                    {isDropdownOpen && (
                                    <div ref={dropdownRef}
                                        className="absolute z-10 mt-1 w-[380px] max-h-[300px] overflow-y-auto bg-white shadow-lg rounded-lg"
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
                                    {errorMessage && <div className="text-red-500 mt-2 ml-2">{errorMessage}</div>}
                                </div>
                                
                                <div className="">
                                    <label className="mb-2 block text-[15px]">Added Digital Skills</label>
                                    <div className="flex flex-wrap gap-3">
                                        {tabData?.map((skill, index) => (
                                            <div key={index} className="flex items-center">
                                                <p className="relative py-[8px] text-[15px] px-[15px] border-l-[5px] bg-[#1E1E1E] text-white border-[#FFCB05]">{skill}
                                                </p>
                                                <button type="button" onClick={() => handleCancel(index)} className=" relative right-[0px] text-[15px] top-0 bottom-0 px-2 font-semibold py-[8px] px-[15px] bg-[#FFCB05] border-l-[5px] -border-[#FFCB05] text-[black]">X</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                            </div>
                            <div 
                             
                            className="w-full h-[1px] bg-[#D4D4D4] my-5">
                                
                            </div>
                            
                        </div>
                    </div>
                    <div className="text-end">
                        <button type="button" onClick={handleSave} className="font-medium bg-[#FFCB05] px-[40px] text-[15px] rounded-[0px] py-[12px] border-0">{loading ? <span className="loading"></span> : skills?.length == 0 ? 'Save' : 'Update'}</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default Skills;
