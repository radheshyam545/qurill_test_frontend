import React, { useEffect, useState } from "react";
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import Work1 from "../../components/Work";
import { useSelector, useDispatch } from 'react-redux'


const dumyObj = {
    "title": "",
    "employer": "",
    "city": "",
    "country": "",
    "fromMonth": "",
    "fromDay": "",
    "fromYear": "",
    "toMonth": "",
    "toDay": "",
    "toYear": "",
    "ongoing": false,
    "roleDescription": ""
}
const Work = () => {
    const [collapse, setCollapse] = useState({});
    const [tabData, setTabData] = useState([dumyObj]);
    const { profilePagesData } = useSelector(state => state.profile)
    const { work } = profilePagesData
    

    
    useEffect(() => {
        if (work?.length === 0) {
            setTabData([dumyObj]); // Set dummy object if no work data is present
        } else {
            setTabData(work); // Otherwise, set work data
        }

        setCollapse(prevState => ({
            ...prevState,
            [work?.length - 1]: true
        }));

    }, [work])



    const toggleCollapse = (index) => {
        setCollapse(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };
    const addNewEducation = () => {
        setTabData([...tabData, dumyObj])
        const newTabData = [...tabData, dumyObj]; 
        const lastIndex = newTabData.length - 2;
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
                tabData.map((item, index) => (
                    <div key={index}>
                        <h4 onClick={() => toggleCollapse(index)} className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[15px] mb-3">
                            {Boolean(item.title) ? item.title : "Work"}
                            <ChevronDownIcon className={` transition-all duration-300 ${collapse[index] ? 'rotate-180' : ''} w-[23px]`} />
                        </h4>

                        <div className={`transition-all duration-300 ${collapse[index] ? 'show' : 'hidden'}`}>
                        </div>
                        <Work1 collapse1={collapse[index]} workIndex={index} workIndexItem={item} tabData={work}  />
                    </div>
                ))
            } 
            {work?.length === tabData?.length && <div className="mt-2" onClick={addNewEducation}>
                <div className="inline-flex gap-1 cursor-pointer hover:text-[#FFCB05]">
                    <PlusCircleIcon className="w-[20px]" />
                    <span className="text-[15px]"> Add</span>
                </div>
            </div>}
        </>
    )
}

export default Work;
