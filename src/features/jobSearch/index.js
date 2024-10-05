import React, { useEffect, useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import ReactPaginate from "react-paginate";
import JobSearchFilter from "./JobSearchFilter";
import { useDispatch, useSelector } from "react-redux";
import { postApplyJob } from "./jobSearchSlice";
import { notifySuccess } from "../../app/toaster";
import CustomOverlay from "../../containers/CustomOverlay";
import { analyticsData } from "../profile/profileSlice";
import Disqualifiers from "./Disqualifiers";
import { getCall } from "../../app/axiosConfig";
import { use } from "echarts";
import { jobExperience, jobTyoeEnum, modeEnum, rateUnitEnum } from "./jobConst";
import JobPreviewMode from "./jobPreviewMode";
import moment from "moment";
import { CountryDATAEnum } from "../../pages/employerProtected/JobConsts";
const JobIcon = () => {
  return (
    <div className="inline-flex gap-1 relative ml-[20px]">
      <svg
        width="19"
        height="25"
        viewBox="0 0 19 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        <path
          d="M18.8924 12.1163C18.8924 15.5994 18.8931 19.0833 18.8924 22.5664C18.8924 23.4344 18.4137 24.0513 17.6126 24.2128C17.4833 24.2389 17.3468 24.2346 17.2139 24.2353C12.0331 24.236 6.85239 24.2353 1.67165 24.2353C0.655513 24.2353 0.00166736 23.593 0.00095278 22.584C-0.00119097 19.1446 0.00095278 15.7052 0.00095278 12.2657C0.00095278 8.73818 0.00095278 5.21061 0.00095278 1.68375C0.00095278 0.806623 0.467576 0.196015 1.26863 0.0260884C1.38868 0.000705148 1.51658 0.00141021 1.64021 0.00141021C6.82952 3.2308e-08 12.0195 0 17.2089 0C18.2422 0 18.891 0.639516 18.8917 1.66542C18.8931 5.14857 18.8917 8.63241 18.8924 12.1156V12.1163ZM0.662659 12.1029H0.664081C0.664081 13.3516 0.664081 14.601 0.664081 15.8497C0.664081 18.0489 0.65765 20.2474 0.673371 22.4465C0.675515 22.7145 0.744833 23.0092 0.874173 23.2419C1.04139 23.5415 1.37724 23.5972 1.71524 23.5972C5.62902 23.5944 9.54351 23.5951 13.4573 23.5951C14.7235 23.5951 15.9891 23.5972 17.2553 23.5937C17.8063 23.5923 18.1407 23.2962 18.2071 22.7638C18.2236 22.6334 18.2257 22.5008 18.2257 22.369C18.2271 17.3819 18.2279 12.3948 18.2279 7.40767C18.2279 5.53425 18.2286 3.66083 18.2264 1.7874C18.2264 1.49691 18.2236 1.20359 18.0142 0.963858C17.792 0.710025 17.504 0.638811 17.1753 0.638811C12.0217 0.641632 6.86883 0.640221 1.71524 0.640221C1.65307 0.640221 1.59019 0.638106 1.52802 0.643042C1.07354 0.676181 0.753405 0.970909 0.691951 1.41935C0.672657 1.55825 0.663374 1.69927 0.663374 1.83958C0.661945 5.26138 0.661944 8.68248 0.661944 12.1043L0.662659 12.1029Z"
          fill="#C1BBBB"
        />
        <path
          d="M4.54719 7.15756C4.55076 4.49726 6.75526 2.36577 9.46639 2.35308C12.1532 2.34039 14.4013 4.59315 14.352 7.2739C14.307 9.73325 12.3154 12.0382 9.4278 12.0269C6.5323 12.0156 4.50003 9.6705 4.54719 7.15686V7.15756ZM12.8907 9.59365C13.9997 8.26244 14.0898 5.7911 12.4055 4.1842C10.684 2.54275 7.95004 2.62031 6.34223 4.32663C4.75013 6.01743 4.98952 8.44294 6.00851 9.59153C6.67951 9.20726 7.3405 8.82862 7.96505 8.47114C7.77497 8.14821 7.48913 7.81753 7.38409 7.43819C7.27619 7.04898 7.29334 6.60477 7.35194 6.19793C7.41125 5.78475 7.67993 5.44701 7.99863 5.16145C8.74966 4.4888 9.95803 4.44156 10.7827 5.06838C11.2078 5.39131 11.488 5.81789 11.5866 6.33754C11.7459 7.1773 11.4808 7.89227 10.8755 8.4373C11.5565 8.82792 12.2125 9.20373 12.89 9.59224L12.8907 9.59365ZM9.19842 8.97387C8.3888 8.97669 7.47198 9.32571 6.67022 9.98991C6.50944 10.1232 6.50229 10.2127 6.67236 10.3594C8.2323 11.6983 10.614 11.7124 12.1918 10.3819C12.4198 10.1894 12.4241 10.1584 12.1882 9.96382C11.3929 9.30808 10.4775 8.97246 9.19771 8.97458L9.19842 8.97387ZM9.46997 5.28343C8.59746 5.28132 7.92646 5.91872 7.92289 6.75425C7.9186 7.62151 8.5753 8.28782 9.43637 8.28923C10.2974 8.29135 10.9685 7.63984 10.9706 6.80079C10.9727 5.94551 10.3203 5.28555 9.47068 5.28343H9.46997Z"
          fill="#C1BBBB"
        />
        <path
          d="M9.4507 17.2141C7.47201 17.2141 5.49404 17.2141 3.51535 17.2141C2.87151 17.2141 2.56639 16.9145 2.56496 16.2813C2.56425 15.8505 2.56282 15.4197 2.56568 14.9889C2.56925 14.5207 2.87509 14.1942 3.34814 14.1519C3.41889 14.1456 3.49034 14.1498 3.5618 14.1498C7.48273 14.1498 11.4044 14.1498 15.3253 14.1498C16.037 14.1498 16.3279 14.4368 16.3286 15.1412C16.3286 15.5106 16.3286 15.8794 16.3286 16.2489C16.3286 16.9201 16.032 17.2155 15.3582 17.2155C13.3888 17.2155 11.4194 17.2155 9.44998 17.2155L9.4507 17.2141ZM9.44927 16.5704C11.4015 16.5704 13.3538 16.5704 15.306 16.5704C15.6383 16.5704 15.6754 16.5351 15.6776 16.2376C15.6797 15.9125 15.6783 15.5868 15.6783 15.2617C15.6783 14.8041 15.6712 14.7971 15.1931 14.7971C11.3779 14.7971 7.56276 14.7971 3.74759 14.7971C3.65827 14.7971 3.56966 14.7978 3.48034 14.8006C3.29669 14.807 3.2088 14.8923 3.21308 15.0834C3.22094 15.4352 3.21452 15.787 3.21523 16.1389C3.21523 16.5591 3.22809 16.5725 3.64613 16.5725C5.58051 16.5725 7.51489 16.5725 9.44927 16.5725V16.5704Z"
          fill="#C1BBBB"
        />
        <path
          d="M9.44642 18.8441C10.8199 18.8441 12.1926 18.8434 13.566 18.8441C14.1184 18.8441 14.4492 19.1677 14.4521 19.7085C14.4542 20.1393 14.4542 20.5708 14.4521 21.0016C14.4499 21.5643 14.1405 21.8752 13.5531 21.8788C12.3941 21.8858 11.235 21.8809 10.0753 21.8809C8.55034 21.8809 7.02541 21.8809 5.50049 21.8809C4.70158 21.8809 4.44005 21.6242 4.44005 20.8451C4.44005 20.458 4.43719 20.0709 4.44076 19.6838C4.44576 19.1769 4.78305 18.8455 5.29898 18.8448C6.68099 18.8434 8.06299 18.8448 9.44571 18.8441H9.44642ZM9.44571 21.2223C10.7906 21.2223 12.1361 21.2188 13.481 21.2259C13.7068 21.2273 13.8097 21.1596 13.804 20.9276C13.7947 20.5412 13.799 20.1541 13.8025 19.7677C13.804 19.5689 13.7139 19.4808 13.5103 19.4843C13.1716 19.4906 12.8336 19.4857 12.4948 19.4857C10.1517 19.4857 7.80931 19.4857 5.46619 19.4857C5.13534 19.4857 5.09532 19.521 5.09246 19.8185C5.08889 20.1612 5.09032 20.5038 5.09246 20.8465C5.09389 21.2075 5.10818 21.2223 5.46404 21.2223C6.79103 21.2223 8.11872 21.2223 9.44571 21.2223Z"
          fill="#C1BBBB"
        />
      </svg>
      <svg
        width="18"
        height="17"
        viewBox="0 0 18 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-[-10px] bottom-[-5px]"
      >
        <path
          d="M17.1397 7.23725C16.9724 6.13669 16.607 5.10584 16.023 4.15534C15.6203 3.50051 15.156 2.88963 14.5841 2.36533C13.934 1.76954 13.2326 1.24568 12.4245 0.871873C11.5102 0.420374 10.5469 0.137577 9.52693 0.0492307C9.47249 0.0412396 9.41805 0.0319166 9.36316 0.0252573C8.95282 -0.0235773 8.54294 0.0119388 8.1326 0.0203739C7.69032 0.0292529 7.25794 0.0856347 6.8296 0.186412C6.37562 0.258332 5.94054 0.395513 5.51446 0.560219C4.89356 0.800397 4.29875 1.09074 3.75928 1.48275C3.73993 1.49296 3.71879 1.50095 3.70079 1.51383C1.35981 3.18664 0.102701 5.44502 0.00506607 8.29741C-0.0610736 10.2308 0.521585 11.9849 1.6833 13.5449C2.26911 14.3316 2.9692 15.0046 3.80112 15.5391C4.32979 15.9174 4.91065 16.1993 5.51671 16.4315C5.98598 16.6113 6.46471 16.7627 6.96593 16.8328C7.00103 16.8666 7.04692 16.8608 7.09056 16.8697C7.37267 16.9265 7.66377 16.9252 7.94273 17.0006H9.28937C9.39195 16.9323 9.51974 16.9833 9.62637 16.9323C9.91882 16.9221 10.2041 16.8617 10.488 16.7982C11.2389 16.6299 11.9624 16.3866 12.6355 16.0106C13.1277 15.7549 13.5979 15.4654 14.0262 15.1138C14.6003 14.6428 15.1259 14.1256 15.5645 13.5267C16.5026 12.2464 17.0601 10.8244 17.2014 9.24746C17.2041 9.21594 17.196 9.17954 17.2347 9.16134V7.83259C17.1631 7.6408 17.1708 7.43614 17.1406 7.23769L17.1397 7.23725ZM12.5883 13.2244C12.456 13.2834 12.321 13.3371 12.1923 13.4028C12.0969 13.4517 12.0416 13.4335 11.9669 13.3553C11.346 12.7032 10.5685 12.3343 9.69206 12.1505C9.67046 12.146 9.64751 12.1482 9.62547 12.1474C9.1247 12.0217 8.61537 12.0244 8.10695 12.0661C7.70472 12.099 7.31013 12.1802 6.93219 12.3263C6.30184 12.5389 5.74977 12.8768 5.28364 13.3451C5.19186 13.4375 5.12527 13.4472 5.01324 13.3895C4.79997 13.2803 4.5804 13.1822 4.35904 13.0899C4.2551 13.0464 4.24386 13.0104 4.31405 12.9212C4.72483 12.4 5.24 12.0022 5.82266 11.6896C6.23434 11.4685 6.68338 11.338 7.13376 11.2146C7.75466 11.0743 8.38456 11.0353 9.01941 11.0521C9.01941 10.6885 9.01941 10.3254 9.01941 9.96178C8.34947 10.0364 7.72406 9.92271 7.1666 9.52848C6.77291 9.23015 6.46831 8.86078 6.27349 8.40928C6.16326 8.15445 6.10162 7.88631 6.10117 7.60617C6.09982 6.9984 6.06877 6.38886 6.10117 5.78286C6.12681 5.31316 6.31893 4.88209 6.61589 4.50695C6.71532 4.38131 6.8305 4.26721 6.93848 4.14823C7.71326 3.52537 8.57803 3.39307 9.52108 3.6883C10.1892 3.96977 10.6801 4.42659 10.9523 5.09918C11.0549 5.35312 11.1192 5.61727 11.1233 5.88897C11.1327 6.51316 11.162 7.13825 11.1093 7.76111C11.0207 8.81505 10.2315 9.69008 9.18094 9.92316C9.1265 9.93514 9.07295 9.9489 9.01851 9.96222C9.01851 10.3258 9.01851 10.689 9.01851 11.0526C9.52468 11.1094 10.0277 11.1778 10.5159 11.3323C11.2074 11.5511 11.8292 11.8912 12.3849 12.3511C12.3934 12.3258 12.3997 12.3001 12.4042 12.2743C12.3993 12.3001 12.393 12.3258 12.3849 12.3511C12.5919 12.5656 12.8132 12.7671 12.9878 13.0286C12.8497 13.0965 12.7183 13.1609 12.5874 13.2253L12.5883 13.2244Z"
          fill="#1E1E1E"
        />
      </svg>
    </div>
  );
};
const JobSearchListing = () => {
  const { profileAnalyticsData } = useSelector((state) => state.profile);
  const {
    educationTraining,
    personalInformation,
    portfolio,
    skills,
    work,
    questions,
  } = profileAnalyticsData || {};
  const [totalJobs, setTotalJobs] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const PER_PAGE = 50;
  const pageCount = totalPages;
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [disqualifierModal, setDisqualifierModal] = useState(false);
  const [disqualifierData, setDisqualifierData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState(false);
  const [jobs, setjobs] = useState("");
  const [jobCompanyName, SetJobCompanyName] = useState("");
  const [getIndex, setIndex] = useState(0);
  const handleClick = (index) => {
    setIndex(index);
  };
  const [currentPage, setCurrentPage] = useState(0);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    dispatch(analyticsData());
  }, []);
  const getPaginatedJobs = () => {
    return jobs?.slice(offset, offset + PER_PAGE);
  };
  const modalOpen = (item) => {
    setModal(true);
    handleClick(jobs?.indexOf(item));
  };
  const [applyFilter, setApplyFilter] = useState(false);
  const [profileStatusCheck, setProfileStatusCheck] = useState(false);
  const [profileComplettion, setProfileCompletion] = useState(true);
  const checkprofiileCompletion = () => {
    if (
      educationTraining &&
      personalInformation &&
      portfolio &&
      skills &&
      work &&
      questions
    ) {
      const count =
        educationTraining?.completedWeight +
        personalInformation?.completedWeight +
        portfolio?.completedWeight +
        skills?.completedWeight +
        work?.completedWeight +
        questions?.completedWeight;
      if (count === 100) {
        setProfileCompletion(true);
      } else {
        setProfileCompletion(false);
      }
    }
  };
  useEffect(() => {
    checkprofiileCompletion();
  }, []);

  const applyCheck = (item) => {
    let check = true;
    let disArr = [];
    if (
      educationTraining &&
      personalInformation &&
      portfolio &&
      skills &&
      work &&
      questions
    ) {
      const count =
        educationTraining?.completedWeight +
        personalInformation?.completedWeight +
        portfolio?.completedWeight +
        skills?.completedWeight +
        work?.completedWeight +
        questions?.completedWeight;
      if (count === 100) {
        check = false;
      } else {
        setProfileStatusCheck(true);
        disArr = ["Profile is not completed 100%"];
      }
    }
    if (check == false) {
      if (!item?.eligibility.isEligible) {
        setProfileStatusCheck(false);
        disArr = [...disArr, ...item?.eligibility?.reasons];
        check = true;
      }
    }

    setDisqualifierModal(check);
    setDisqualifierData(disArr);
    return check;
  };

  const handleApply = (jobId) => {
    setLoading(true);
    dispatch(postApplyJob({ jobId }))
      .unwrap()
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setModal(false);
          // dispatch(getJobListData())
          getJobData(filter);
          notifySuccess("Job Applied Successfully");
          setModal(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
    //  handleClick(jobs.indexOf(item))
  };
  const [filter, setFilter] = useState({
    title: "",
    location: "",
  });
  // console.log("filter is isisisisi ", filter)
  const filterObjectWithValue = (obj) => {
    let filteredObj = {};
    for (let key in obj) {
      if (obj[key]) {
        filteredObj[key] = obj[key];
      }
    }
    return filteredObj;
  };

  useEffect(() => {
    getJobData(filter);
  }, [currentPage]);
  useEffect(() => {
    if (applyFilter) {
      getJobData(filter);
      setApplyFilter(false);
    }
    if (filter?.title === "" && filter?.location === "") {
      setCurrentPage(0);
    }
  }, [applyFilter]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const getJobData = async (filterObj) => {
    try {
      setIsLoadingData(true);
      // const response = await getCall('/jobs');
      const response = await getCall(`/jobs`, {
        ...filterObjectWithValue(filterObj),
        page: currentPage + 1,
      });

      setTotalJobs(response?.data?.totalJobs);
      setTotalPages(response?.data?.totalPages);
      setjobs(response?.data?.jobs);
      SetJobCompanyName(response?.data?.businessNames);
      // console.log( "656566666666666", response?.data?.locations)

      setIsLoadingData(false);
      // setCurrentPage(temp);
    } catch (error) {
      setIsLoadingData(false);
      console.error("Error fetching job data:", error);
    }
  };
  const ArrowRight = () => {
    return (
      <svg
        width="14"
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.00224 5.64428C6.90021 5.50966 6.85201 5.4274 6.78628 5.36196C5.12178 3.69613 3.45416 2.03342 1.79092 0.366338C1.47667 0.0509956 1.11673 -0.0805011 0.686678 0.0597204C0.0181257 0.278466 -0.215993 1.09424 0.225953 1.64204C0.279787 1.70873 0.342386 1.76793 0.403107 1.82838C2.32926 3.75035 4.25605 5.67294 6.18283 7.59429C6.72368 8.13399 7.2758 8.13523 7.81477 7.59803C9.75282 5.66547 11.6896 3.73103 13.6289 1.80034C13.8737 1.55666 14.0258 1.28432 13.9964 0.929718C13.9638 0.537097 13.766 0.253538 13.4111 0.0946206C13.0468 -0.0686596 12.695 -0.0175567 12.377 0.224248C12.2968 0.285322 12.2273 0.36073 12.156 0.432399C10.5115 2.07455 8.86768 3.7167 7.22509 5.36009C7.15936 5.42553 7.10929 5.50655 7.00162 5.64428L7.00224 5.64428Z"
          fill="#919191"
        />
      </svg>
    );
  };

  const getPayDisplay = (postJobData) => {
    const { showBy, minimum, maximum, rateUnit } = postJobData?.pay?.pay || {};
    if (showBy === "range") {
      return minimum && maximum ? `$${minimum} - $${maximum} ` || "" : "";
    } else if (showBy === "starting_amount") {
      return minimum ? `Starting at $${minimum} ` || "" : "";
    } else if (showBy === "maximum_amount") {
      return maximum ? `$${maximum} maximum  ` || "" : "";
    } else if (showBy === "exact_amount") {
      return minimum ? `$${minimum} ` || "" : "";
    }

    return "";
  };
  // console.log("jobs", jobs[0]?.experienceLevel)
  return (
    <>
      {isLoadingData ? <CustomOverlay isLoading={true} /> : null}

      {
        // jobs && jobs?.length > 0 ?
        <div className="rounded-[10px] ">
          {
            <JobSearchFilter
              filter={filter}
              setFilter={setFilter}
              setApplyFilter={setApplyFilter}
              jobs={jobs}
              getJobData={getJobData}
              jobCompanyName={jobCompanyName}
            />
          }
          {/* {filters && filters?.length > 0 && <JobSearchFilter />} */}

          <div className=" card bg-[white]  px-[40px] p-2 rounded-[10px]">
            <div className="job-search-table-box z-[10] overflow-x-auto mt-[20px]  p-[5px] scrollnone -pr-[100px]  -m-auto">
              {jobs && jobs?.length > 0 ? (
                <table className="table w-full text-[12px]">
                  <thead>
                    {/* <tr className="border-0">
                                                <th className="font-bold text-[#000]"></th>
                                                <th className="font-bold text-[#000]">COMPANIES NAME</th>
                                                <th className="font-bold text-[#000]">JOB TYPE</th>
                                                <th className="font-bold text-[#000]">JOB TIMING</th>
                                                <th className="font-bold text-[#000]">LOCATION</th>
                                                <th className="font-bold text-[#000]">JOB SALARY</th>
                                                <th className="font-bold text-[#000]">Action</th>
                                            </tr> */}
                  </thead>

                  <tbody className="">
                    {jobs && jobs.length > 0 ? (
                      jobs &&
                      jobs?.length > 0 &&
                      jobs?.map((item, index) => {
                        console.log(item);

                        return (
                          <>
                            {/* <tr className="h-[50px] border-0 cursor-pointer under-shadow -w-full hover:scale-[0.99]" id={index}> */}
                            <tr
                              className=" border-0 cursor-pointer rounded-lg  under-shadow -bg-[red] hover:scale-[1.005]  h-[50px] "
                              id={index}
                            >
                              <td
                                className={`rounded-l-lg min-w-[75px] px-[5px] w-[60px] max-w-[75px] p-[0px] min-h-[50px] ${
                                  item?.photo ? "" : "bg-[#FFCB05]"
                                }`}
                                onClick={() => {
                                  modalOpen(item);
                                }}
                              >
                                {item?.photo ? (
                                  <>
                                    <img
                                      src={
                                        item?.photo ||
                                        "/assets/images/employer-images/legitimacylogo.png"
                                      }
                                      alt="Profile"
                                      className="h-[50px] w-[100%] -bg-[red] object-contain"
                                    />
                                  </>
                                ) : (
                                  <JobIcon />
                                )}
                              </td>
                              <td
                                className="left-shadow  text-[15px] font-bold bg-white text-nowrap "
                                onClick={() => {
                                  modalOpen(item);
                                }}
                              >
                                {item && item?.businessName
                                  ? item?.businessName
                                  : "-"}
                                <p className="text-[11px] text-nowrap text-[#919191] font-[400]">
                                  {item?.createdAt
                                    ? moment(item?.createdAt).format(
                                        "MMMM D, YYYY h:mm A"
                                      )
                                    : "---"}
                                </p>
                              </td>
                              <td
                                onClick={() => {
                                  modalOpen(item);
                                }}
                                className="text-[15px] text-nowrap -w-[20%] bg-white"
                              >
                                {item?.title?.length > 20
                                  ? `${item?.title.slice(0, 20)}...`
                                  : item?.title}
                                <p className="text-[11px] text-[#919191] mt-[5px]">{`${
                                  modeEnum[item?.mode]
                                }, ${jobTyoeEnum[item?.type]}, ${
                                  jobExperience[item?.experienceLevel]
                                }`}</p>
                              </td>
                              <td
                                className="text-[15px] text-nowrap bg-white"
                                onClick={() => {
                                  modalOpen(item);
                                }}
                              >
                                {item?.city
                                  ? `${item?.city}, ${item?.state}`
                                  : "---"}
                                <p className="text-[12px] text-nowrap leading-[20px] my-[3px] opacity-[0.6]">
                                  {item?.country
                                    ? `${CountryDATAEnum[item?.country]}`
                                    : "---"}
                                </p>
                              </td>
                              <td
                                onClick={() => {
                                  modalOpen(item);
                                }}
                                className="text-[15px] text-nowrap -w-[20%] bg-white"
                              >
                                {getPayDisplay(item)}
                                <p className="text-[11px] text-[#919191] text-nowrap mt-[5px]">{`${
                                  rateUnitEnum[item?.pay?.pay?.rateUnit]
                                }`}</p>
                              </td>
                              <td className="text-[15px] bg-white  text-nowrap rounded-r-lg">
                                <div className="flex items-center gap-2">
                                  {/* {console.log(item?.eligibility?.isEligible,index)} */}
                                  {item?.eligibility?.isEligible &&
                                  profileComplettion ? (
                                    <button
                                      className="inline-flex py-[5px] px-[8px] text-[15px] rounded-[8px] bg-[#FFCB05]"
                                      disabled={item?.isAlreadyApplied}
                                      onClick={() => {
                                        if (applyCheck(item)) {
                                          return;
                                        }
                                        setSelectedJobId(item?._id);
                                        handleApply(item?._id);
                                      }}
                                    >
                                      {loading &&
                                      selectedJobId === item?._id ? (
                                        <span className="loading"></span>
                                      ) : item.isAlreadyApplied ? (
                                        "Applied"
                                      ) : (
                                        "Apply"
                                      )}
                                    </button>
                                  ) : (
                                    <button
                                      className="inline-flex py-[5px] px-[8px] text-[15px] rounded-[8px] bg-[#E2E2E2]"
                                      disabled={item?.isAlreadyApplied}
                                      onClick={() => {
                                        if (applyCheck(item)) {
                                          return;
                                        }
                                        setSelectedJobId(item?._id);
                                        handleApply(item?._id);
                                      }}
                                    >
                                      {loading &&
                                      selectedJobId === item?._id ? (
                                        <span className="loading"></span>
                                      ) : item.isAlreadyApplied ? (
                                        "Applied"
                                      ) : (
                                        "Apply"
                                      )}
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>

                            <tr className="border-0 ">
                              <td
                                colSpan={7}
                                className="transparent h-[10px] p-0"
                              ></td>
                            </tr>
                          </>
                        );
                      })
                    ) : (
                      <CustomOverlay isLoading={true} />
                    )}
                  </tbody>
                </table>
              ) : (
                <div className="job-listing-table-box -overflow-x-auto flex w-full flex justify-center">
                  <span>No Record Found</span>
                </div>
              )}
            </div>
            <div className="pagination-wrapper flex flex-row items-center justify-between mt-6  w-[100%]">
              {jobs && jobs?.length > 0 && (
                <>
                  <div>
                    <span>
                      Showing {currentPage * PER_PAGE + 1} to{" "}
                      {Math.min((currentPage + 1) * PER_PAGE, totalJobs)} of{" "}
                      {totalJobs} entries
                    </span>
                  </div>
                  <div className="react-pagination">
                    <ReactPaginate
                      previousLabel={<ArrowRight />}
                      nextLabel={<ArrowRight />}
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={2}
                      marginPagesDisplayed={1}
                      forcePage={currentPage}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        // <CustomOverlay isLoading={true} />
        // <div className="loading-indicator"></div>
      }

      <JobPreviewMode
        applyCheck={applyCheck}
        loading={loading}
        selectedJobId={selectedJobId}
        jobs={jobs}
        modal={modal}
        setModal={setModal}
        getIndex={getIndex}
        setSelectedJobId={setSelectedJobId}
        handleApply={handleApply}
      />

      {/* -------------Disqualifiers Model----------------------- */}
      <div className={disqualifierModal ? "" : `hidden`}>
        <Disqualifiers
          profileStatusCheck={profileStatusCheck}
          disqualifierModal={disqualifierModal}
          setDisqualifierModal={setDisqualifierModal}
          disqualifierData={disqualifierData}
        />
      </div>
      {/* -------------Disqualifiers Model----------------------- */}
    </>
  );
};

export default JobSearchListing;
