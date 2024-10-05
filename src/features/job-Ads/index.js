import React, { useState } from "react";
import JobSearchFilter from "./JobSearchFilter";
import SearchBarEmployer from "../../employerComponents/SearchBarEmployer";
import JobList from "./jobList";
import JobAnalyss from './jobAnalyss'; // Corrected import path and component name
import JobShowDetail from "./jobShowDetail";
import ApplicantsOpeningCard from "../../employerComponents/ApplicantsOpeningCard";

const JobSearchListing = () => {

    const [showApplicantsOpeningCard, setshowApplicantsOpeningCard] = useState(false)

    const [showJobAnalysis, setShowJobAnalysis] = useState(false); // Renamed state variable for clarity

    return (
        
        <div className="">
            {showJobAnalysis ? <div className="pb-4"><JobAnalyss setShowJobAnalysis={setShowJobAnalysis} /></div> : ""}

            <div className="bg-[#FFFFFF] rounded-xl ">
                <div>
                    <div className="pt-[30px]  px-[40px]"><SearchBarEmployer /></div>

                    {showJobAnalysis ? "" : <div><JobSearchFilter /> </div>}

                    {showJobAnalysis ? "" : <JobList setShowJobAnalysis={setShowJobAnalysis} />}

                    {showJobAnalysis ? <JobShowDetail setshowApplicantsOpeningCard={setshowApplicantsOpeningCard} /> : ""}
                </div>
                <div className=' '>
                    {showApplicantsOpeningCard ? <ApplicantsOpeningCard setshowApplicantsOpeningCard={setshowApplicantsOpeningCard}/> : ""}
                </div>
            </div>
        </div>
    );
}

export default JobSearchListing;
