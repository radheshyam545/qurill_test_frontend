import React, { useEffect, useState } from "react";
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import EducationAndTraining from "../../components/EducationAndTraining";
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import { useSelector } from 'react-redux'
import { notifySuccess } from "../../app/toaster";
const dumyObj = {
    "academicCenter": "",
    "nameOfCenter": "",
    "degree": "",
    "fieldOfStudy": "",
    "gpa": "",
    "fromMonth": "",
    "fromDay": "",
    "fromYear": "",
    "toMonth": "",
    "toDay": "",
    "toYear": "",
    "ongoing": false
}

const Education = () => {
    const [collapse, setCollapse] = useState({});
    const [tabData, setTabData] = useState([]);
    const toggleCollapse = (index) => {
        setCollapse(prevState => ({
            ...prevState,
            [index]: prevState[index] === undefined ? true : !prevState[index]

        }));
    };
    const { profilePagesData } = useSelector(state => state.profile)
    const { educationTraining } = profilePagesData

    useEffect(() => {
        if(educationTraining?.length === 0) setTabData([dumyObj])
        else setTabData(educationTraining)
        setCollapse(prevState => ({
            ...prevState,
            [educationTraining?.length-1]: true
        }));
    }, [educationTraining])

    const addNewEducation = () => {
        setTabData([...tabData, dumyObj])
        const newTabData = [...tabData, dumyObj]; 
        const lastIndex = newTabData.length -2;
        const newIndex = newTabData.length - 1; 
        setCollapse(prevState => ({
            ...prevState,
            [newIndex]: true,
            [lastIndex]: false
        }));
    };
    return (
        <>      
            {
                tabData && tabData?.length > 0 && tabData?.map((item, index) => (
                    <div key={index}>
                    <div className="section-1 ">
                <h4 onClick={() => toggleCollapse(index)} className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[15px] mb-3">
                    {Boolean(item.academicCenter) ? item.academicCenter :  "Education and training"}
                    <ChevronDownIcon className={` transition-all duration-300 ${collapse[index] ? 'rotate-180' : ''} w-[23px]`} />
                </h4>
            </div>
                        <EducationAndTraining collapse1={collapse[index]} educationAndTrainingIndex={index} educationAndTrainingIndexItem={item} tabData={educationTraining} />
                    </div>
                ))
            }
            {educationTraining?.length === tabData?.length && <div className="mt-2" onClick={addNewEducation}>
                <div className="inline-flex gap-1 cursor-pointer hover:text-[#FFCB05]">
                    <PlusCircleIcon className="w-[20px]" />
                    <span className="text-[15px]"> Add</span>
                </div>
            </div>}
            </>
    );
}
export default Education;
