import React, { useEffect, useState } from 'react';
import Component1 from './Component1';
import Component2 from './Component2';
import Component3 from './Component3';
import Component4 from './Component4';
import Component5 from './Component5';
import Select from "react-select";
import Component6 from './Component6';
import MiniDoughnutForEmployer from '../../employerComponents/EChart/MiniDoughnutForEmployer'
import { CountryDATAEnum, educationList, Experience } from '../../pages/employerProtected/JobConsts';
import { applicantStatus } from '../../app/selectData';
import { postCall } from '../../app/axiosConfig';
import { notifySuccess } from '../../app/toaster';
import zIndex from '@mui/material/styles/zIndex';
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#fff',
    border: '1px solid #e3d8d8',
    borderRadius: '5px',
    boxShadow: 'none',
    fontSize: '15px',
    paddingTop: '0px',
    paddingBottom: '0px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#fff'
    }
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: '#33C264;',


  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: '#33C264',
    fontWeight: '500',
    fontSize: '15px',

  }),
  dropdownIndicator: (provided, state) => ({
    display: 'none'
  }),
  indicatorSeparator: (provided, state) => ({
    display: 'none'
  }),
  menu: (provided, state) => ({
    ...provided,
    width: '80%',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
    // zIndex:'9999',

  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: 0,
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
    // zIndex:'9999',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#fff' : 'white',
    color: state.isSelected ? '#000' : '#000',
    fontSize: '13px',
    fontWeight: '400',
    // zIndex:'9999',
    '&:hover': {
      backgroundColor: '#E2E2E2',
      color: '#000'
    },
    width: '100%',
    // boxSizing: 'border-box'
  })
};
function ApplicantsOpeningCard({ _ID, checkShowHideQuestion, handleSelectChange, checkShowHide, setshowApplicantsOpeningCard, selectedApplicantData, selectedApplicantIndex }) {
  const ShowContact=selectedApplicantData?.contactRequest?.status
  const ButtonAbleOrNot=selectedApplicantData?.contactRequest?.isRequested
  const user_ID = selectedApplicantData?.user?._id
  const [selectedComponent, setSelectedComponent] = useState();
  const [tab, setTab] = useState('1');
  useEffect(() => { if (selectedApplicantData) { setSelectedComponent(<Component1 selectedApplicantData={selectedApplicantData?.profile} showHide={checkShowHide?.profile} />) } }, [selectedApplicantData])
  const handleButtonClick = (a, b) => { if (selectedApplicantData) { setSelectedComponent(a); setTab(b) } };
  useEffect(() => {
    if (Object.values(checkShowHide?.profile || {}).some(value => value === true)) {
      setTab("1")
      setSelectedComponent(<Component1 selectedApplicantData={selectedApplicantData?.profile} showHide={checkShowHide?.profile} showContact={ShowContact} />)
    } else if (checkShowHide?.work) {
      setTab("2")
      setSelectedComponent(<Component2 selectedApplicantData={selectedApplicantData?.profile} showHide={checkShowHide?.work} />)
    } else if (checkShowHide?.educationAndTraining) {
      setTab("3")
      setSelectedComponent(<Component3 selectedApplicantData={selectedApplicantData?.profile} showHide={checkShowHide?.educationAndTraining} />)
    } else if (checkShowHide?.skills) {
      setTab("4")
      setSelectedComponent(<Component4 selectedApplicantData={selectedApplicantData?.profile} />)
    } else if (Object.values(checkShowHide?.portfolio || {}).some(value => value === true)) {
      setTab("5")
      setSelectedComponent(<Component5 selectedApplicantData={selectedApplicantData?.profile} showHide={checkShowHide?.portfolio} />)
    } else if (checkShowHideQuestion?.length > 0) {
      setTab("6")
      setSelectedComponent(<Component6 selectedApplicantData={selectedApplicantData?.profile} checkShowHideQuestion={checkShowHideQuestion} />)
    }
  }, [])
  const checkshowDetailOfApllincant = () => {
    if (Object.values(checkShowHide?.profile || {}).some(value => value)) {

      return true;
    } else if (checkShowHide?.work) {

      return true;
    } else if (checkShowHide?.educationAndTraining) {

      return true;
    } else if (checkShowHide?.skills) {

      return true;
    } else if (Object.values(checkShowHide?.portfolio || {}).some(value => value)) {

      return true;
    } else if (checkShowHide?.Question?.length > 0) {

      return true;
    }
    else if(checkShowHideQuestion.length> 0){
      return true;
    }
    return false;
  };

  const [contactButtonLoader, setContactButtonLoader] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [contactPayload, setContactPayload] = useState({
    jobId: _ID,
    userId: user_ID
  })
  const contactRequest = async () => {
    setContactButtonLoader(true)
    try {
      const res = await postCall("/jobs/request-contact-info", contactPayload)
      if (res.status === 200) {
        notifySuccess("Contact Request sent successfully")
        setIsButtonDisabled(true)
        setShowContact(res?.data?.status)
      }
    } catch (error) {
      console.error('Error during contact request:', error)
    } finally {
      setContactButtonLoader(false)
    }
  };
  return (
    <>
      <div className='w-[100%] flex  items-center justify-center fixed -max-w-[1600px] top-0 left-0 w-full h-full z-50 '>
        <div className="bg-gray-900 bg-opacity-50 fixed inset-0  "></div>
        <div className=' w-[90%] h-[90%] -scrollnone p-5 max-w-[1500px] bg-white rounded-xl  relative shadow-2xl   overflow-y-auto overflow-x-hidden '>
          <div className='h-[35px] w-[35px] rounded-[50%] bg-[#ebebeb] flex justify-center items-center font-bold text-[22px] absolute top-[20px] cursor-pointer right-[20px] ' onClick={() => setshowApplicantsOpeningCard(false)}>X</div>
          <div className=' -pplicant-opening-card-scroll  '>
            <div className='  h-[250px] w-[100%] applicant-opening-card-scroll -bg-[red] scroll scrollnone mt-[40px]   -bg-[green] -pt-[40px] flex gap-[30px]'>
              <div className='min-h-[200px] max-h-[200px] min-w-[200px] max-w-[200px] bg-[#EBEBEB] object-contain flex items-center justify-center'>
                <img
                  src={selectedApplicantData?.profile?.photo || "/assets/images/applicant-tab-profile.svg"}
                  alt="Profile"
                  className='min-h-[200px] max-h-[200px] min-w-[200px] max-w-[200px] object-contain'
                />
              </div>
              <div className=' scrollnone  min-h-[210px] '>
                <div className='flex gap-[40px]  justify-between'>
                  <p className='font-[700] text-[24px] whitespace-nowrap'>{`${selectedApplicantData?.profile?.personalInformation?.personalInformation?.firstName} ${selectedApplicantData?.profile?.personalInformation?.personalInformation?.lastName}`}</p>
                  <div>
                    <div className='flex gap-[25px]'>
                      <div className='px-[20px] under-shadow py-[8px] bg-[white] rounded-[7px] flex gap-[8px]'>
                        <img className='h-[18px]' src="/assets/images/employer-images/job-detail-model-msg-icon.svg" alt="" />
                        <p className='font-[600] text-[15px] whitespace-nowrap'>Message</p>
                      </div>
                      <div className='px-[20px] under-shadow py-[8px] bg-[white] rounded-[7px] flex gap-[8px]'>
                        <img className='h-[18px]' src="/assets/images/employer-images/job-detail-model-contact-icon.svg" alt="" />
                        <button
                          className='font-[600] text-[15px] whitespace-nowrap'
                          disabled={ButtonAbleOrNot } 
                          onClick={contactRequest}
                        >
                          {contactButtonLoader ? "Loading..." : "Request Contact"}
                        </button>
                      </div>
                      <div className='px-[20px] under-shadow py-[8px] bg-[white] rounded-[7px] flex gap-[8px]'>
                        <img className='h-[18px]' src="/assets/images/employer-images/job-detail-model-note-icon.svg" alt="" />
                        <p className='font-[600] text-[15px] whitespace-nowrap'>Note</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex gap-[8px] mt-[10px]'>
                  <img src="/assets/images/employer-images/job-detail-model-location-icon.svg" alt="" />
                  <p className='text-[14px]'>
                    {selectedApplicantData?.profile?.personalInformation?.address?.city && selectedApplicantData?.profile?.personalInformation?.address?.country
                      ? `${selectedApplicantData?.profile?.personalInformation?.address?.city || "---"}, ${selectedApplicantData?.profile?.personalInformation?.address?.state || "---"}, ${CountryDATAEnum[selectedApplicantData?.profile?.personalInformation?.address?.country] || "---"}`
                      : '---'}
                  </p>
                </div>
                <div className=''>
                  <div className='  min-h-[20px] scrollnone'>
                    <table className=" -table rounded-[6px]   w-[1000px] employer-job-detail-opening-tab-shadow -rounded-[0px] -text-[12px] -border -rounded-[0px] -border-dotted mt-[20px]">
                      <thead className='m-[20px] border-b-0 -rounded-[0px]'>
                        <tr className='-bg-[red] border-b-0 ' >
                          <th className=" min-w-[100px] max-w-[100px] text-center m-[20px] text-[#000] pt-[5px] font-[500] text-[15px] -bg-[red] rounded-tl-[50px]">Education</th>
                          <th className=" min-w-[100px] max-w-[100px] text-center m-[20px] text-[#000] pt-[5px] font-[500] text-[15px]">Skills</th>
                          <th className=" min-w-[100px] max-w-[100px] text-center m-[20px] text-[#000] pt-[5px] font-[500] text-[15px]">Experience</th>
                          <th className=" min-w-[100px] max-w-[100px] text-center m-[20px] text-[#000] pt-[5px] font-[500] text-[15px]">Rating</th>
                          <th className=" min-w-[100px] max-w-[100px] text-center m-[20px] text-[#000] pt-[5px] font-[500] text-[15px] -bg-[red] -rounded-tr-xl">Status</th>
                        </tr>
                        <tr className="-dotted-line -border-t-[3px] -border-[#CECECE] -border-dotted "></tr>
                      </thead>
                      <tbody className='mt-[20px] max-h-[50px] '>
                        <tr className=" border-0 cursor-pointer  -under-shadow w-full max-h-[50px] " >

                          <td className="min-w-[80px] max-w-[80px] text-[15px] bg-white  max-h-[50px] text-center -bg-[pink] rounded-bl-[6px]">
                            {educationList.map((item) => {
                              if (item.value == selectedApplicantData?.profile?.educationTraining?.[0]?.degree) {
                                return (
                                  <button className='text-center px-[20px] py-[8px] text-[white] bg-[#4BA5FF] rounded-[8px]'>{item.label === 'High School diploma (GED or equivalent)' ? 'HS Diploma' : item.label}</button>
                                )
                              }
                            })}
                          </td>
                          <td className="min-w-[100px] max-w-[100px] py-[5px] text-[15px] bg-[white] text-center items-center h-[90px] justify-center ] -bg-[red] gap-[5px]">

                            <div className='flex justify-center items-center flex-wrap gap-[5px]'>
                              {selectedApplicantData?.profile?.skills?.slice(0, 5).map((skill, index) => (<button key={index} className='border border-[#E3D8D8] px-[10px] py-[2px] rounded-[10px] text-[10px] font-[500] border-[2px]'>{skill}</button>))}
                            </div>
                          </td>
                          <td className="min-w-[100px] max-w-[100px] text-[15px] bg-white text-center max-h-[50px]">
                            {Experience.map((item) => {
                              if (item.value == selectedApplicantData?.profile?.personalInformation?.experienceLevel) {
                                return (
                                  <p className='font-[500] text-[15px]'>{item.label}</p>
                                )
                              }
                            })}
                            {/* <p className='font-[500]'>{selectedApplicantData?.profile?.personalInformation?.experienceLevel}</p> */}
                          </td>
                          <td className="min-w-[100px] max-w-[100px] text-[15px]  h-[50px] text-center bg-white -bg-[red] -max-h-[50px]">
                            <div className='text-center text -bg-[blue] inline-block'>
                              <MiniDoughnutForEmployer value={selectedApplicantData?.skillsMatchingPercentage ? `${selectedApplicantData?.skillsMatchingPercentage}%` : "0%"} />
                            </div>
                          </td>
                          <td className=" min-w-[100px] max-w-[100px]  text-[15px] bg-white max-h-[50px] text-center -bg-[yellow] rounded-br-[6px]">
                            {/* <JobDetailsListBtn title={'Interviewed'} text={'#33C264'}/> */}
                            <Select
                              // styles={customStyles}
                              styles={{...customStyles,menuPortal: (base) => ({ ...base, zIndex: 50 }),}}
                              className="  py-[5px]  px-4 rounded-xl min-w-[150px] text-center font-semibold duration-100"
                              classNamePrefix="All"
                              value={applicantStatus.filter((i) => i.value === selectedApplicantData?.applicantStatus)}
                              options={applicantStatus}
                              isSearchable={false}
                              placeholder={'Applied'}
                              onChange={(e) => handleSelectChange(e, selectedApplicantData?.user._id, selectedApplicantData, selectedApplicantIndex)}
                              menuPortalTarget={document.body}

                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=' z-[1] '>
          {checkshowDetailOfApllincant() ? <>
            <div className='-border-b pt-[20px] pb-[0px] flex flex-wrap gap-[10px] '>
              {Object.values(checkShowHide?.profile || {}).some(value => value === true) ? (<button className={`-ad text-[14px] border px-[40px] py-[12px] rounded-[6px] font-[700] ${tab === '1' ? 'textbg' : ''} `} onClick={() => handleButtonClick(<Component1 selectedApplicantData={selectedApplicantData?.profile} showHide={checkShowHide?.profile} showContact={ShowContact} />, "1")} >Profile</button>) : ""}
              {checkShowHide?.work ? <button className={`-ad text-[14px] border px-[40px] py-[12px] rounded-[6px] font-[700]  ${tab === '2' ? 'textbg' : ''} `} onClick={() => handleButtonClick(<Component2 selectedApplicantData={selectedApplicantData?.profile} showHide={checkShowHide?.work} />, "2")} >Work</button> : ""}
              {checkShowHide?.educationAndTraining ? <button className={`-ad text-[14px] border px-[40px] py-[12px] rounded-[6px] font-[700]  ${tab === '3' ? 'textbg' : ''} `} onClick={() => handleButtonClick(<Component3 selectedApplicantData={selectedApplicantData?.profile} showHide={checkShowHide?.educationAndTraining} />, "3")} >Education and training</button> : ""}
              {checkShowHide?.skills ? <button className={`-ad text-[14px] border px-[40px] py-[12px] rounded-[6px] font-[700]  ${tab === '4' ? 'textbg' : ''} `} onClick={() => handleButtonClick(<Component4 selectedApplicantData={selectedApplicantData?.profile} />, "4")} >Skills</button> : ""}
              {Object.values(checkShowHide?.portfolio || {}).some(value => value === true) ? (<button className={`-ad text-[14px] border px-[40px] py-[12px] rounded-[6px] font-[700]  ${tab === '5' ? 'textbg' : ''} `} onClick={() => handleButtonClick(<Component5 selectedApplicantData={selectedApplicantData?.profile} showHide={checkShowHide?.portfolio} />, "5")} >Portfolio</button>) : ""}
              {checkShowHideQuestion?.length > 0 ? (<button className={`-ad text-[14px] border px-[40px] py-[12px] rounded-[6px] font-[700]  ${tab === '6' ? 'textbg' : ''} `} onClick={() => handleButtonClick(<Component6 selectedApplicantData={selectedApplicantData?.profile} checkShowHideQuestion={checkShowHideQuestion} />, "6")} >Application question</button>) : ""}
            </div>
            <div className='mt-[10px] '>
              {selectedComponent}
            </div>
          </> : ""}
</div>
        </div>
      </div>
    </>
  );
}

export default ApplicantsOpeningCard;
