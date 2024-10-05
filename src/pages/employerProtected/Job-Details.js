import React, { useEffect, useState } from 'react'
import JobAnalyss from '../../features/job-Ads/jobAnalyss'
import JobShowFilter from '../../features/job-Ads/jobShowFilter'
import MiniDoughnutForEmployer from '../../employerComponents/EChart/MiniDoughnutForEmployer'
import ApplicantsOpeningCard from '../../employerComponents/ApplicantsOpeningCard'
import Select from "react-select";
import InterviewModal from '../../employerComponents/Modal/interviewModal';
import { getCall, postCall } from '../../app/axiosConfig'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { CountryDATAEnum, educationList1, Experience, usaCitiesEnum, USStatesEnum } from './JobConsts'
import CustomOverlay from '../../containers/CustomOverlay'
import ReactPaginate from 'react-paginate'
import { applicantStatus } from '../../app/selectData'
import { notifyStatus } from '../../app/toaster'

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#fff',
        border: '1px solid #e3d8d8',
        // border:'#868686',
        borderRadius: '5px',
        boxShadow: 'none',
        fontSize: '15px',
        paddingTop: '2px',
        paddingBottom: '2px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#fff'
        }
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: '#33C264',
        fontWeight: '400'

    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: '#33C264',
        fontWeight: '400',
        fontSize: '15px'

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
        // borderRadius: '8px',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',

    }),
    menuList: (provided, state) => ({
        ...provided,
        padding: 0,
        // borderRadius:'20px'
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#fff' : 'white',
        color: state.isSelected ? '#000' : '#000',
        fontSize: '13px',
        // borderBottomLeftRadius: '12px',
        // borderBottomRightRadius: '12px',
        fontWeight: '400',
        '&:hover': {
            backgroundColor: '#E2E2E2',
            color: '#000'
        },
        width: '100%',
        boxSizing: 'border-box'
    })

}
const statuses =
    [
        { applied: 'Applied' },
        { new: 'New' },
        // { reviewing: 'Reviewing' },
        { 'short-listed': 'Shortlisted' },
        { screened: 'Screened' },
        // { contacted: 'Contacted' },
        { interview: 'Interviewed' },
        { offer: 'Offered' },
        { hire: 'Hired' },
        { reject: 'Rejected' },
    ]
// { applied: 'Applied', new: 'New', reviewing: 'Reviewing', shortlisted: 'Shortlisted', screened: 'Screened', contacted: 'Contacted', interviewed: 'Interviewed', offered: 'Offered', hired: 'Hired', rejected: 'Rejected' }
function JobShowDetail() {

    const { _ID } = useParams()
    const [change, setChange] = useState(true)
    const [qualification, setQualification] = useState(educationList1)
    const [applicantsData, setApplcantsData] = useState("")
    const [showApplicantsOpeningCard, setshowApplicantsOpeningCard] = useState(false)
    const [interview, setInterview] = useState(false)
    const [interviewTimeBtn, setInterviewTimeBtn] = useState("1")
    const [interviewTypeBtn, setInterviewTypeBtn] = useState("1")
    const [jobs, setJobs] = useState([])
    const [selectedApplicantData, setSelectedApplicantData] = useState("")
    const [selectedApplicantIndex, setSelectedApplicantIndex] = useState("")
    const [applyFilter, setApplyFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(0)
    const statusEntries = Object.entries(statuses);
    const [totalJobs, setTotalJobs] = useState("");
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [checkShowHide, setCheckShowHide] = useState("")
    const [checkShowHideQuestion, setCheckShowHideQuestion] = useState("")
    const [totalPages, setTotalPages] = useState(""); ////pagination 
    const [singleJobs, setSingleJobs] = useState([])
    const [payloadRes, setPayloadRes] = useState('');
    const [payload, setPayload] = useState('')
    const [seekerResponse, setSeekerResponse] = useState('')
    const [disabled, setDisabled] = useState(false);
    const PER_PAGE = 10;
    const pageCount = totalPages;
    const [filter, setFilter] = useState({ applicantName: '', education: '', experienceLevel: '', certification: '', applicationStatus: "", });
    const handlePageClick = ({ selected }) => { setCurrentPage(selected); };
    useEffect(() => { getJobData(filter); }, [currentPage]);
    useEffect(() => { if (applyFilter) { getJobData(filter); setApplyFilter(false) } if (filter?.title === '') { setCurrentPage(0) } }, [applyFilter]);
    const [id1, setId] = useState('');
    const [temp, setTemp] = useState(true);

    const handleSelectChange = async (selectedOption, _userId, item,index) => {
        setTemp(false)
        setSelectedApplicantData(item)

        console.log("lolololololololomm",item)
        const itemm = (item?.interviewDetails?.employerProposal?.time)
        const itemm2 = (item?.interviewDetails?.employerProposal?.interviewType)
        const statusList = ["interview", "short-listed", "screened", "offer", "hire"];
        if (statusList.includes(item?.applicantStatus)) {
            // console.log("applicantsDataitem",item?.interviewDetails?.employerProposal?.time)
            if (itemm?.fixedTime && typeof itemm.fixedTime === 'object' && Object.keys(itemm.fixedTime).length > 0) {
                setInterviewTimeBtn("3");
            } else if (Array.isArray(itemm?.proposedTime) && itemm.proposedTime.length > 0) {
                setInterviewTimeBtn("1");
            } else if (itemm?.requestAvailability && typeof itemm.requestAvailability === 'object' && Object.keys(itemm.requestAvailability).length > 0) {
                setInterviewTimeBtn("2");
            }
            if (itemm2?.inPerson && typeof itemm2.inPerson === 'object' && Object.keys(itemm2.inPerson).length > 0) {
                setInterviewTypeBtn("1");
            } else if (itemm2?.phone && typeof itemm2.phone === 'object' && Object.keys(itemm2.phone).length > 0) {
                setInterviewTypeBtn("3");
            } else if (itemm2?.video && typeof itemm2.video === 'object' && Object.keys(itemm2.video).length > 0) {
                setInterviewTypeBtn("2");
            }
        }
        setId(_userId);
        if (selectedOption.value === "interview") {
            setPayloadRes(applicantsData.find((_, ind) => ind === index)?.interviewDetails?.employerProposal)
            setSeekerResponse(applicantsData.find((_, ind) => ind === index)?.interviewDetails?.seekerResponse?.status)
            setInterview(!interview)
            setshowApplicantsOpeningCard(false)
        }
        else {
            //post api call for status change
            try {
                setIsLoadingData(true);
                const response = await postCall(`/jobs/change-applicant-status`, { jobId: _ID, userId: _userId, status: selectedOption.value });
                const { status } = response;
                if (status == 200) {
                    notifyStatus("Status Updated Successfully")
                    getJobData(filter)
                }
            } catch (error) {
                setIsLoadingData(false);
                console.error('Error fetching job data:', error);
            }

        }
    }
    console.log("applicantsDatadd", selectedApplicantData)

    useEffect(() => {
        if (seekerResponse === "pending") {
            setDisabled(payloadRes?.timeZone ? true : false)
            if (payloadRes?.interviewType?.inPerson && Object.keys(payloadRes?.interviewType?.inPerson).length > 0) {
                setInterviewTypeBtn("1");
            } else if (payloadRes?.interviewType?.video && Object.keys(payloadRes?.interviewType?.video).length > 0) {
                setInterviewTypeBtn("2");
            } else if (payloadRes?.interviewType?.phone && Object.keys(payloadRes?.interviewType?.phone).length > 0) {
                setInterviewTypeBtn("3");
            }

            if (payloadRes?.time?.proposedTime && Object.keys(payloadRes?.time?.proposedTime).length > 0) {
                setInterviewTimeBtn("1");
            } else if (payloadRes?.time?.requestAvailability && Object.keys(payloadRes?.time?.requestAvailability).length > 0) {
                setInterviewTimeBtn("2");
            } else if (payloadRes?.time?.fixedTime && Object.keys(payloadRes?.time?.fixedTime).length > 0) {
                setInterviewTimeBtn("3");
            }
        }
        else { setDisabled(true) }
    }, [seekerResponse, payloadRes]);
    const [response, setResponse] = useState('')
    console.log(response, "response--->>>")
    const interviewBlockSet = () => {
        const foundItem = response.find((item) => {
            return item.user._id === _ID;
        });

        if (foundItem) {
            console.log(foundItem, "kkkkkkkkkk11");
        } else {
            console.log("kkkkkkkkkk222");
        }
    };
    const getJobData = async (filterData) => {
        try {
            setIsLoadingData(true);
            const response = await getCall(`/jobs/${_ID}/applicants`, { ...filterObjectWithValue(filterData), limit: PER_PAGE, page: (currentPage + 1) });
            const response1 = await getCall(`/jobs/${_ID}`);
            console.log(response.data, "responsesfsfsf")
            console.log(response1, "responsesfsfsf")
            setResponse(response?.data?.applicants);

            const newEmployerProposal = response?.data?.applicants?.[0]?.interviewDetails?.employerProposal;
            const mergedEmployerProposal = { ...payloadRes, ...newEmployerProposal };
            // setPayloadRes(mergedEmployerProposal);
            setSingleJobs([response1?.data])
            setCheckShowHide(response1?.data?.applicantsInfo)
            setCheckShowHideQuestion(response1?.data?.questions)
            console.log(response?.data, '1111111111')
            setApplcantsData(response?.data?.applicants)
            setTotalJobs(response?.data?.totalApplicants);
            setTotalPages(response?.data?.totalPages);
            setJobs(response?.data);
            setIsLoadingData(false);
            console.log("called");
            interviewBlockSet()
        } catch (error) {
            setIsLoadingData(false);
            console.error('Error fetching job data:', error);
        }
    };
    const filterObjectWithValue = (obj) => { let filteredObj = {}; for (let key in obj) { if (obj[key]) { filteredObj[key] = obj[key]; } } return filteredObj }
    const handleClick = (value) => {
        let updatedFilter = { ...filter };
        const isSelected = Object.values(updatedFilter).includes(value);
        if (isSelected) {
            for (const field in updatedFilter) {
                if (updatedFilter[field] === value) {
                    updatedFilter[field] = '';
                    break;
                }
            }
            getJobData(updatedFilter)
        }
        else { updatedFilter['applicationStatus'] = value; getJobData(updatedFilter) } setFilter(updatedFilter);
    };
    // console.log("lklklklklklk",applicantsData)
    const AplicantDataSHoe = (item, index) => { setTemp(true); setSelectedApplicantData(item); setSelectedApplicantIndex(index); setChange(!change) }
    useEffect(() => { if (selectedApplicantData && Object.keys(selectedApplicantData).length > 0 && temp) setshowApplicantsOpeningCard(true) }, [selectedApplicantData, change])
    const ArrowRight = () => {
        return (
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.00224 5.64428C6.90021 5.50966 6.85201 5.4274 6.78628 5.36196C5.12178 3.69613 3.45416 2.03342 1.79092 0.366338C1.47667 0.0509956 1.11673 -0.0805011 0.686678 0.0597204C0.0181257 0.278466 -0.215993 1.09424 0.225953 1.64204C0.279787 1.70873 0.342386 1.76793 0.403107 1.82838C2.32926 3.75035 4.25605 5.67294 6.18283 7.59429C6.72368 8.13399 7.2758 8.13523 7.81477 7.59803C9.75282 5.66547 11.6896 3.73103 13.6289 1.80034C13.8737 1.55666 14.0258 1.28432 13.9964 0.929718C13.9638 0.537097 13.766 0.253538 13.4111 0.0946206C13.0468 -0.0686596 12.695 -0.0175567 12.377 0.224248C12.2968 0.285322 12.2273 0.36073 12.156 0.432399C10.5115 2.07455 8.86768 3.7167 7.22509 5.36009C7.15936 5.42553 7.10929 5.50655 7.00162 5.64428L7.00224 5.64428Z" fill="#919191" />
            </svg>
        )
    }
    console.log(applicantsData, '000')
    return (
        <div className='overflow-y-auto'>
            <CustomOverlay isLoading={isLoadingData} />
            <div>
                <div><JobAnalyss jobs={singleJobs} /></div>
                <div>
                </div>
                <div className="rounded-[15px] mt-[20px] ">
                    <div className=" card -bg-white job-detail px-[40px] p-2 bg-[#FAFAFA] rounded-[10px]">
                        <div className='-bg-[white] -mt-[20px] rounded-[15px] px-[px] pb-[30px]'>
                            {/* <SearchBarEmployer /> */}
                            <div><JobShowFilter filter={filter} setFilter={setFilter} setApplyFilter={setApplyFilter} setCurrentPage={setCurrentPage} /></div>
                        </div>
                        <div className=" -m-auto bg-[]">
                            <div className='flex gap-[15px] border-b flex-wrap mt-[30px]'>
                                {statuses.map((item) => (
                                    <button
                                        key={Object.keys(item)[0]}
                                        className={`px-[18px] py-[10px] font-bold text-[15px] border rounded-[7px] ${Object.values(filter).includes(Object.keys(item)[0]) ? 'bg-[#FFCB05]' : ''}`}
                                        onClick={() => handleClick(Object.keys(item)[0])}
                                    >
                                        {Object.values(item)[0]}
                                    </button>
                                ))}
                            </div>
                            {/* open model interview */}
                            <InterviewModal
                                selectedApplicantData={selectedApplicantData}
                                disabled={disabled}
                                getJobData={getJobData}
                                payloadRes={payloadRes}
                                payload={payload}
                                setPayload={setPayload}
                                jobs={jobs}
                                jobId={_ID}
                                userId={id1}
                                interview={interview}
                                setInterviewTypeBtn={setInterviewTypeBtn}
                                setInterviewTimeBtn={setInterviewTimeBtn}
                                interviewTypeBtn={interviewTypeBtn}
                                interviewTimeBtn={interviewTimeBtn}
                                setInterview={setInterview}
                                customStyles={customStyles}
                            />

                            {/* open model interview */}
                            <div className=' job-search-table-box scrollnone -bg-[red] -z-[10] min-h-[450px] kio'>
                                {
                                    applicantsData && applicantsData?.length > 0 ?
                                        <div className=' scrollnone -bg-[red] min-h-[20px] relative'>
                                            <table className="table w-full -bg-[blue] -overflow-y-hidden z-[4] -text-[12px] -border-dotted mt-[60px]">
                                                <thead className='m-[20px]'>
                                                    <tr className='-bg-[red] border-b-[0px]' >
                                                        <th className=" font-bold text-[#000] text-[15px]"></th>
                                                        <th className="min-w-[185px]  max-w-[185px] m-[20px] bg-[#E2E2E2] text-[#1E1E1E] font-semibold -bg-[red] text-[#000] text-[15px] text-center">Education</th>
                                                        <th className="min-w-[185px] max-w-[185px] m-[20px] bg-[#E2E2E2] -bg-[blue] text-[#1E1E1E] -bg-[yellow] font-semibold text-[#000] text-[15px] text-center">Skill</th>
                                                        <th className="min-w-[185px]  max-w-[185px] m-[20px] bg-[#E2E2E2] text-[#1E1E1E]  font-semibold -bg-[red] text-[#000] text-[15px] text-center">Experience</th>
                                                        <th className="min-w-[185px]  max-w-[185px] m-[20px] bg-[#E2E2E2] text-[#1E1E1E] -bg-[yellow] font-semibold text-[#000] text-[15px] text-center">Rating</th>
                                                    </tr>

                                                    <tr className="border-0 border-b-[0px] ">
                                                        <th colSpan={8} className="-bg-[#FAFAFA] border-b-[0px] h-[12px] p-0"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className='mt-[20px] '>
                                                    {applicantsData?.map((item, index) => (
                                                        <>
                                                            <tr className=" border-0 -cursor-pointer -under-shadow w-full -hover:scale-[1.01] h-[110px]" id={index}>
                                                                <td className="min-w-[200px] bg-white -bg-[red] rounded-l-[15px] " onClick={() => { AplicantDataSHoe(item,index) }}>
                                                                    <span className='-flex -items-centers'>
                                                                        <p className='font-semibold text-[15px] text-nowrap'>{`${item?.profile?.personalInformation?.personalInformation?.firstName} ${item?.profile?.personalInformation?.personalInformation?.lastName}`}
                                                                            {
                                                                                console.log('item?.interviewDetails?.seekerResponse?.status', item?.interviewDetails?.seekerResponse?.status)

                                                                            }
                                                                            {
                                                                                item?.interviewDetails?.seekerResponse?.status != 'pending' &&
                                                                                <span className='inline-block relative'>
                                                                                    <img src="/assets/images/employer-images/icons8-info.svg" alt="" className=' bbbb h-[16px] ml-[3px] cursor-pointer' />

                                                                                    <div className=' aaaa h-[40px] w-[350px] rounded-[5px] border bg-[#E3D8D8] absolute top-[-50px] font-normal px-[15px] items-center flex right-[] '>
                                                                                        <p>{`${item?.profile?.personalInformation?.personalInformation?.firstName} ${item?.profile?.personalInformation?.personalInformation?.lastName}`} has {item?.interviewDetails?.seekerResponse?.status} your request</p>
                                                                                        <div className='bg-[#E3D8D8] h-[12px] w-[12px] absolute right-[] bottom-[-5px] rotate-[45deg]'></div>
                                                                                    </div>
                                                                                </span>
                                                                            }
                                                                        </p>
                                                                        {/* {console.log(5555,item?.profile?.personalInformation?.address?.state)} */}
                                                                        <p className='text-nowrap'>
                                                                            {(() => {
                                                                                // Combine the string as specified
                                                                                const address = `${item?.profile?.personalInformation?.address?.city || "==="}, ${item?.profile?.personalInformation?.address?.state || "---"}, ${CountryDATAEnum[item?.profile?.personalInformation?.address?.country] || "---"}`;

                                                                                // Truncate if the length exceeds 25 characters
                                                                                return address.length > 25 ? address.slice(0, 25) + '...' : address;
                                                                            })()}
                                                                        </p>
                                                                        <p className='text-nowrap text-[#919191] text-[12px] '>{moment(item?.appliedAt).format('MMMM D, YYYY h:mm A')}</p>
                                                                    </span>
                                                                </td>
                                                                <td className="min-w-[185px] max-w-[185px] -text-[16px] bg-white text-center -bg-[yellow]" onClick={() => { AplicantDataSHoe(item,index) }}>
                                                                    {qualification.map((item1) => { if (item1.value == item?.profile?.educationTraining?.[0]?.degree) { return <button className=' text-center px-[20px] py-[8px] text-[white] bg-[#4BA5FF] rounded-[8px]'>{item1?.label}</button> } })}
                                                                </td>
                                                                {/* --- */}
                                                                <td className=" text-[13px] -min-w-[185px] -max-w-[185px] min-h-[110px] flex justify-center flex-wrap bg-white min-h-[100%]- bg-[red] -text-center" onClick={() => { AplicantDataSHoe(item,index) }}>
                                                                    <div className=' -min-w-[185px] max-w-[185px] text-center -bg-[yellow] flex items-center justify-center flex-wrap  '>
                                                                        {item?.profile?.skills?.slice(0, 5).map((skill, index) => (<button className='border border-[#e3d8d8] m-[3px] -w-[70px] px-[8px] py-[2px] rounded-[12px] text-[10px] font-[500] border-[2px]'>{skill.slice(0, 12)}</button>))}
                                                                    </div>
                                                                </td>
                                                                <td className=" min-w-[185px] max-w-[185px] text-center -text-[16px] bg-white" onClick={() => { AplicantDataSHoe(item,index) }} >
                                                                    {Experience.map((item1) => { if (item1.value == item?.profile?.personalInformation?.experienceLevel) { return <p className='font-[500] text-nowrap'>{item1?.label}</p> } })}
                                                                </td>
                                                                <td className="min-w-[185px] max-w-[185px] text-center -text-[16px]  min-h-[110px]  bg-white -bg-[red] " onClick={() => { AplicantDataSHoe(item,index) }} >
                                                                    <div className='text-center -bg-[blue] inline-block'>
                                                                        <MiniDoughnutForEmployer value={item?.skillsMatchingPercentage ? `${item?.skillsMatchingPercentage}%` : "0%"} onClick={() => { AplicantDataSHoe(item,index) }} />
                                                                    </div>
                                                                </td>

                                                                <td className="--text-[16px] bg-white " onClick={() => { AplicantDataSHoe(item,index) }}>
                                                                    <span className='-flex -items-centers text-center leading-[25px]'>
                                                                        <p className='font-semibold text-[15px] text-nowrap'>{item?.profile?.work[0]?.employer}</p>
                                                                        <p className='text-nowrap text-[15px]'>{item?.profile?.work[0]?.title}</p>
                                                                        <p className='text-nowrap text-[15px]'>{item?.profile?.work[0]?.ongoing ? `${moment(item?.profile?.work[0]?.from).format('MMM YYYY')} - Present` : `${moment(item?.profile?.work[0]?.from).format('MMM YYYY')} - ${moment(item?.profile?.work[0]?.to).format('MMM YYYY')}`}</p>
                                                                    </span>
                                                                </td>

                                                                <td className="-text-[16px] bg-white rounded-r-[15px]">

                                                                    <Select
                                                                        styles={customStyles}
                                                                        className="  py-[5px] px-4 text-[15px] rounded-xl min-w-[150px] text-center font-semibold duration-100"
                                                                        classNamePrefix="All"
                                                                        value={applicantStatus.filter((i) => i.value === item?.applicantStatus)}
                                                                        options={applicantStatus}
                                                                        isSearchable={false}
                                                                        placeholder={'Applied'}
                                                                        onChange={(e) => handleSelectChange(e, item.user._id,item,index)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr className="border-0 ">
                                                                <td colSpan={7} className="bg-[#FAFAFA] h-[12px] p-0"></td>
                                                            </tr>
                                                        </>)
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        : <div className="job-listing-table-box flex w-full flex justify-center mt-5">
                                            {!isLoadingData && <span>No Record Found</span>}
                                        </div>
                                }
                                {
                                    <div className="pagination-wrapper text-[15px] flex flex-row items-center justify-between mt-6 w-[99%]">
                                        {jobs && jobs?.applicants?.length > 0 && <>
                                            <div>
                                                <span className='text-[15px]'>
                                                    Showing {currentPage * PER_PAGE + 1} to {Math.min((currentPage + 1) * PER_PAGE, totalJobs)} of {totalJobs} entries
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
                                        </>}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {showApplicantsOpeningCard ? <ApplicantsOpeningCard _ID={_ID} handleSelectChange={handleSelectChange} checkShowHideQuestion={checkShowHideQuestion} checkShowHide={checkShowHide} setshowApplicantsOpeningCard={setshowApplicantsOpeningCard} selectedApplicantData={selectedApplicantData} selectedApplicantIndex={selectedApplicantIndex} /> : ""}
            </div>
        </div>
    )
}

export default JobShowDetail

