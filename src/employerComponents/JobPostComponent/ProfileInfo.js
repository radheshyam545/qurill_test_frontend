import React, { useEffect, useState } from 'react'
import Switch from '../../employerContainers/Switch';

function ProfileInfo({postJobData, setPostJobData}) {
    const [isProfileActive, setIsProfileActive] = useState(true);
    const [isPortfolioActive, setIsPortfolioActive] = useState(true);
    

    useEffect(() => {
        const profileIsActive = Object.values(postJobData?.applicantsInfo?.profile).some(value => value);
        const portfolioIsActive = Object.values(postJobData?.applicantsInfo?.portfolio).some(value => value);
        setIsProfileActive(profileIsActive);
        setIsPortfolioActive(portfolioIsActive);
      }, [postJobData]);
    
  return (
    <div>
      <div>
            <p className='font-[700] text-[16px]  mt-[50px]'>Applicants Info</p>
            <div className='w-[100%] -bg-[red] flex -h-[500px] switch-wrapper'>
              <div className='w-[40%] -bg-[green] switch-left'>
                <div className='flex gap-[8px] mt-[10px]'>
                  <Switch postJobData={postJobData} isProfileActive={isProfileActive} setPostJobData={setPostJobData} name={"profile"} setIsProfileActive={setIsProfileActive} />
                  <p className='font-bold text-[15px] switch-text-900'>Profile</p>
                </div>
                <div className='w-[100%] -h-[200px] -bg-[blue] pl-[20px] mt-[15px] flex flex-col gap-[5px]'>
                  <div className='flex gap-[8px]'>
                    <Switch postJobData={postJobData} setPostJobData={setPostJobData} name={"personalInformation"} />
                    <p className='text-[15px] switch-text-900 font-[500]'>Personal Information</p>
                  </div>
                  <div className='flex gap-[8px]'>
                    <Switch postJobData={postJobData} setPostJobData={setPostJobData} name={"contact"} />
                    <p className='text-[15px] switch-text-900 font-[500]'>Contact</p>
                  </div>
                  <div className='flex gap-[8px]'>
                    <Switch postJobData={postJobData} setPostJobData={setPostJobData} name={"address"} />
                    <p className='text-[15px] switch-text-900 font-[500]'>Address</p>
                  </div>
                  <div className='flex gap-[8px]'>
                    <Switch postJobData={postJobData} setPostJobData={setPostJobData} name={"languages"} />
                    <p className='text-[15px] switch-text-900 font-[500]'>Languages</p>
                  </div>
                  <div className='flex gap-[8px]'>
                    <Switch postJobData={postJobData} setPostJobData={setPostJobData} name={"demographics"} />
                    <p className='text-[15px] switch-text-900 font-[500]'>Demographics</p>
                  </div>
                  <div className='flex gap-[8px]'>
                    <Switch postJobData={postJobData} setPostJobData={setPostJobData} name={"citizenshipStatus"} />
                    <p className='text-[15px] switch-text-900 font-[500]'>Citizenship Status</p>
                  </div>
                  <div className='flex gap-[8px]'>
                    <Switch postJobData={postJobData} setPostJobData={setPostJobData} name={"legalDeclarations"} />
                    <p className='text-[15px] switch-text-900 font-[500]'>Legal declarations</p>
                  </div>
                  <div className='flex gap-[8px]'>
                    <Switch postJobData={postJobData} setPostJobData={setPostJobData} name={"personalStatement"} />
                    <p className='text-[15px] switch-text-900 font-[500]'>Personal statement</p>
                  </div>
                </div>
              </div>
              <div className='w-[40%] -bg-[yellow] switch-right'>
                <div className='flex gap-[8px] mt-[9px]'>
                  <Switch postJobData={postJobData} setPostJobData={setPostJobData} name={"work"} />
                  <p className='font-bold text-[15px] switch-text-900'>Work</p>
                </div>
                <div className='flex gap-[8px] mt-[9px]'>
                  <Switch postJobData={postJobData} setPostJobData={setPostJobData} name={"educationAndTraining"} />
                  <p className='font-bold text-[15px] switch-text-900'>Education and training</p>
                </div>
                <div className='flex gap-[8px] mt-[9px]'>
                  <Switch postJobData={postJobData} setPostJobData={setPostJobData} name={"skills"} />
                  <p className='font-bold text-[15px] switch-text-900'>Skills</p>
                </div>
                <div className='flex gap-[8px] mt-[9px]'>
                  <Switch postJobData={postJobData} isPortfolioActive={isPortfolioActive} setPostJobData={setPostJobData} name={"portfolio"} setIsPortfolioActive={setIsPortfolioActive} />
                  <p className='font-bold text-[15px] switch-text-900'>Portfolio</p>
                </div>
                <div className='w-[100%] -h-[200px] -bg-[blue] pl-[20px] mt-[15px] flex flex-col gap-[5px]'>
                  <div className='flex gap-[8px]'>
                    <Switch postJobData={postJobData} setPostJobData={setPostJobData} name={"cv"} />
                    <p className='text-[15px] font-[500] switch-text-900'>CV</p>
                  </div>
                  <div className='flex gap-[8px]'>
                    <Switch postJobData={postJobData} setPostJobData={setPostJobData} name={"coverLetter"} />
                    <p className='text-[15px] font-[500] switch-text-900'>Cover letter</p>
                  </div>
                  <div className='flex gap-[8px]'>
                    <Switch postJobData={postJobData} setPostJobData={setPostJobData} name={"projects"} />
                    <p className='text-[15px] font-[500] switch-text-900'>Projects</p>
                  </div>
                  <div className='flex gap-[8px]'>
                    <Switch postJobData={postJobData} setPostJobData={setPostJobData} name={"websiteUrls"} />
                    <p className='text-[15px] font-[500] switch-text-900'>Website URLs</p>
                  </div>
                  <div className='flex gap-[8px]'>
                    <Switch postJobData={postJobData} setPostJobData={setPostJobData} name={"Certifications"} />
                    <p className='text-[15px] font-[500] switch-text-900'>Certifications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default ProfileInfo
