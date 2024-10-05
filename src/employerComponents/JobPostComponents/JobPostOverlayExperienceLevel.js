import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getCountryList } from '../../app/commonFunction';
import { customStylesSelect } from '../../components/ReactSelectStyle';
import { CountryDATA, Experience, USStates } from '../../pages/employerProtected/JobConsts';

function JobPostOverlayExperienceLevel({ heading, tab, setTab, postJobData, setPostJobData, name = "", countryDataForWorkPage, setCountryDataForWorkPage }) {
     // Initialize the form state with postJobData
  const [formData, setFormData] = useState(postJobData);

  useEffect(() => {
    setFormData(postJobData);
  }, [postJobData]);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setPostJobData(formData);
    setTab('0'); // Close the overlay
  };

  return (
    <div>
     <div className={`h-[100vh] z-[999] flex items-center justify-center w-[100%] fixed top-0 left-0 overlay-color`}>
        <div className='h-[300px] z-[50] w-[700px] bg-white flex flex-col justify-between'>
          <div className='flex items-center justify-between h-[40px] px-[30px] py-[30px] border-b'>
            <p className='font-bold'>Edit the job post</p>
            <img onClick={() => setTab('0')} className='cursor-pointer h-[15px]' src="/assets/images/employer-images/jobpostoverlaytabcross.svg" alt="Close" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 -mt-[35px] mx-[20px] mb-[65px]'>
              <label className='font-bold' htmlFor={name}>{heading}</label>
              <Select
                name="Experience"
                styles={customStylesSelect}
                className="react-select"
                classNamePrefix="select"
                options={Experience}
                isSearchable
                placeholder="Select"
                value={Experience.find((item) => item?.value === formData?.experienceLevel) || null}
                onChange={(selectedOption) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    experienceLevel: selectedOption.value
                  }));
                }}
              />
            </div>
            <div className='h-[60px] w-[100%] border-t px-[30px] py-[10px]'>
              <button
                className='px-[10px] py-[5px] rounded-[5px] bg-[#FFCB05] font-bold float-right'
                type="submit"
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
  )
}

export default JobPostOverlayExperienceLevel
