import React, { useEffect, useState } from 'react';

const profileList = ['personalInformation', 'contact', 'address', 'languages', 'demographics', 'citizenshipStatus', 'legalDeclarations', 'personalStatement']
const portfolioList = ['cv', 'coverLetter', 'projects', 'websiteUrls', 'Certifications']
const applicationList = ['isProfile', 'work', 'educationAndTraining', 'skills', 'isPortfolio']

function Switch({ postJobData, isPortfolioActive, isProfileActive, setPostJobData, name, setIsProfileActive, setIsPortfolioActive }) {
  // Determine initial checked state based on `name`
  const isChecked = getCheckedState();
  console.log(isChecked)
  // Function to determine checked state based on `name`
  function getCheckedState() {
    if (applicationList.includes(name)) {
      return postJobData.applicantsInfo[name];
    } else if (portfolioList.includes(name)) {
      return postJobData.applicantsInfo.portfolio[name];
    } else if (profileList.includes(name)) {
      return postJobData.applicantsInfo.profile[name];
    }
    else if (name == "profile") { return isProfileActive }
    else if (name == "portfolio") { return isPortfolioActive }

    return false;
  }

  // Toggle function to update `postJobData` when switch is clicked
  const toggleSwitch = () => {
    const updatedData = { ...postJobData };
    if (name === 'profile') {
      if (isProfileActive) {
        profileList.map(item => { updatedData.applicantsInfo.profile[item] = false })
      } else {
        profileList.map(item => { updatedData.applicantsInfo.profile[item] = true })
      }
      setIsProfileActive(!isProfileActive)
    }
    if (name === 'portfolio') {
      if (isPortfolioActive) {
        portfolioList.map(item => { updatedData.applicantsInfo.portfolio[item] = false })
      } else {
        portfolioList.map(item => { updatedData.applicantsInfo.portfolio[item] = true })
      }
      setIsPortfolioActive(!isPortfolioActive)
    }
    else if (['isProfile', 'work', 'educationAndTraining', 'skills', 'isPortfolio'].includes(name)) {
      updatedData.applicantsInfo[name] = !postJobData.applicantsInfo[name];
    } else if (['cv', 'coverLetter', 'projects', 'websiteUrls', 'Certifications'].includes(name)) {
      updatedData.applicantsInfo.portfolio[name] = !postJobData.applicantsInfo.portfolio[name];
    } else if (profileList.includes(name)) {
      updatedData.applicantsInfo.profile[name] = !postJobData.applicantsInfo.profile[name];
    }

    setPostJobData(updatedData);
  };

  return (
    <div>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={toggleSwitch}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#ffcb05]"></div>
      </label>
    </div>
  );
}

export default Switch;
