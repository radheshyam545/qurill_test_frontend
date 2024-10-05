import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardtwoCards from '../../employerComponents/DashboardtwoCards';
import DashboardtwoApplicants from '../../employerComponents/DashboardtwoApplicants';
import { getCall } from '../../app/axiosConfig';
import CustomOverlay from '../../containers/CustomOverlay';
import { applicatnStatusEnum } from '../../features/jobSearch/jobConst';
import Select from 'react-select'; // Ensure the correct Select component is used
import { customStylesSelect } from '../../components/ReactSelectStyle';
import CloneTheJobComp from '../../employerComponents/CloneTheJobComponent/CloneTheJobComp';



function Dashboardtwo() {
  const navigate = useNavigate()
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [data, setData] = useState()
  const [selectedOption, setSelectedOption] = useState(null);
  const ApiCall = async () => {
    try {
      const res = await getCall("/employers/dashboard");
      setData(res?.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingData(false)
    }
  };
  useEffect(() => {
    ApiCall();
  }, []);

  const [tab, setTab] = useState(true)

  const handleLinkClick = () => {
    setIsDropdownVisible(prevState => !prevState);
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption.value === "Create_a_new_job") {
      navigate("/employer/JobPost?");
    } else {
      setTab('1');
    }
  };

  const onTabChange = (route) =>{
    navigate(route);
  }

  return (
    <>
      <div className="dashboardTwo-wrapper w-full ">
        <CustomOverlay isLoading={isLoadingData} />
        <div className={`${tab === '1' ? '' : 'employer-overlay-none'}`}>
          <CloneTheJobComp heading={'Job title'} tab={tab} setTab={setTab} handleSelectChange={handleSelectChange} />
        </div>
        <div className='dashboard-2-2nd-wrapper px-10 '>
          <div className="dashboardTwo-left w-12/12 ">
            <div className="dashboard-two-upper-section-cards dashboardleftCards flex flex-wrap   py-3">
              <DashboardtwoCards onTabChange={onTabChange} heading={'Total Jobs Created'} count={data?.totalJobsCreated} icon={""} iconBg={"#FF7239"} />
              <DashboardtwoCards onTabChange={onTabChange} heading={'Total Applications Received'} count={data?.totalApplications} icon={""} iconBg={"#6347FF"} />
              <DashboardtwoCards onTabChange={onTabChange} heading={'Total Applicants Hired'} count={data?.totalHired} icon={""} iconBg={"#02D052"} />
            </div>

          </div>
          {/* boxes container */}
          <div className='employer-dashboard-section-2 flex gap-[10px] -justify-between -flex-wrap w-full'>

            {/* 1st box */}

            <div className='bg-[#FFFFFF] h-[550px] max-w-[100%] min-w-[55%] mt-[10px] rounded-lg flex justify-center items-center cursor-pointer'>
              <div>
                <div className='w-full flex justify-center'>
                  <img src='/assets/images/ChatBoxImage.svg' className='' />
                </div>
                <div className='flex justify-center'>
                  <a className='text-[#6347FF] mt-[15px]' href="#" onClick={handleLinkClick}>Post a Job</a>

                </div>
                {isDropdownVisible && (
                  <div className='mt-[15px]'>
                    <Select
                      styles={customStylesSelect}
                      className="react-select font-[500] w-[150px] text-[18px] h-[40px]"
                      classNamePrefix="All"
                      options={[
                        { value: "Clone_a_job", label: "Clone a job" },
                        { value: "Create_a_new_job", label: "Create a new job" }
                      ]}
                      value={selectedOption}
                      onChange={handleSelectChange}
                      isSearchable={true}
                      placeholder="Select"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 2nd box */}

            <div className='employer-dashboard-card-section bg-[#FFFFFF] scrollnone h-[550px] overflow-y-scroll rounded-lg  max-w-[100%] min-w-[45%] mt-[10px] rounded -ml-10px p-5'>
              <p className='font-bold px-2 text-[18px]'>
                Last 5 Applicants
              </p>
              <div className='flex justify-between px-[20px] py-[5px] -bg-[red]'>
                <p className='font-semibold -bg-[red] w-[33%] flex justify-center text-[15px]'>
                  Applicants
                </p>
                <p className='flex justify-center w-[33%] font-semibold text-[15px]'>
                  Skills
                </p>
                <p className='w-[33%] flex justify-center font-semibold text-[15px]'>
                  Status
                </p>
              </div>
              <div className=''>
                {
                  data && data.last5Applicants.length > 0 ?

                    data.last5Applicants.map((applicant, index) => (
                      <DashboardtwoApplicants 
                      key={index}
                      image={applicant?.photo} 
                      skill={applicant?.skills} 
                      firstName={applicant?.personalInformation?.personalInformation?.firstName} 
                      lastName={applicant?.personalInformation?.personalInformation?.lastName} 
                      ButtonInfo={applicatnStatusEnum[applicant.status]} 
                      adress={applicant?.personalInformation?.address}
                      />))
                    :

                    <div className='flex justify-center items-center h-[300px]'>
                      <p className='text-[#000000] font-semibold text-[16px]'>
                        No Applicants
                      </p>
                    </div>

                }
                {/* <DashboardtwoApplicants image={'/assets/images/Group 965.svg'} ButtonInfo={"Hired"}/>
                <DashboardtwoApplicants image={'/assets/images/Group 962.svg'} ButtonInfo={"New"}/>
                <DashboardtwoApplicants image={'/assets/images/Group 965.svg'} ButtonInfo={"Hired"}/>
                <DashboardtwoApplicants image={'/assets/images/Group 962.svg'} ButtonInfo={"New"}/>       */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboardtwo;