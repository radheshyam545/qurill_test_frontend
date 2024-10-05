import React, { useEffect, useState  } from 'react';
import { benefits } from '../../pages/employerProtected/JobConsts';

function BenefitsComponent({tab, setTab, postJobData, setPostJobData }) {
    const [selectedBenefits, setSelectedBenefits] = useState(postJobData?.benefits);

    useEffect(() => {
        setSelectedBenefits(postJobData?.benefits);
    }, [postJobData]);

    const handleBenefitChange = (value) => {
        if (selectedBenefits.includes(value)) {
            setSelectedBenefits(prevSelected => prevSelected.filter(item => item !== value));
        } else {
            setSelectedBenefits(prevSelected => [...prevSelected, value]);
        }
    };

    const handleSubmit = () => {
        setPostJobData(prevData => ({
            ...prevData,
            benefits: selectedBenefits
        }));
        setTab('0');
    };

   

  return (
      <>
          <div className="h-[100vh] z-[10] z-[999] flex items-center justify-center w-[100%] fixed top-[0px] left-[0px] overlay-color">
              <div className="h-[300px] w-[700px] bg-[white] flex flex-col justify-between">
                  <div className="flex items-center justify-between h-[40px] px-[30px] py-[30px] border-b">
                      <p className="font-bold">Edit the job post</p>
                      <img
                          onClick={() => setTab('0')}
                          className="cursor-pointer h-[15px]"
                          src="/assets/images/employer-images/jobpostoverlaytabcross.svg"
                          alt=""
                      />
                  </div>
                  <div className="px-[20px] overflow-y-auto">
                        <p className="font-bold">Benefits</p>
                        <div className="flex gap-[10px] flex-wrap mt-[5px] mb-[50px]">
                            {benefits.map(benefit => (
                                <button
                                    key={benefit}
                                    onClick={() => handleBenefitChange(benefit)}
                                    className={`px-4 py-2 rounded-[18px] font-semibold bg-[#F2F2F2] border border-[#B3B3B3] text-[18px] ${selectedBenefits.includes(benefit) ? 'jobtypeActive' : ''}`}
                                >
                                    + {benefit}
                                </button>
                            ))}
                        </div>
                    </div>
                  <div className="h-[60px] -w-[100%] border-t px-[30px] py-[10px]">
                      <button className="px-[10px] py-[5px] rounded-[5px] bg-[#FFCB05] font-bold float-right" onClick={handleSubmit}>Done</button>
                  </div>
              </div>
          </div>
      </>
  );
}

export default BenefitsComponent;
