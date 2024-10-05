import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCall } from '../../app/axiosConfig'
import moment from 'moment'
import { statusEnum } from '../jobSearch/jobConst'
import { useSelector } from 'react-redux'
import { CountryDATAEnum, usaCitiesEnum, USStatesEnum } from '../../pages/employerProtected/JobConsts'
function JobAnalyss({jobs}) {
    // const [jobs, setJobs] = useState([])
    const { _ID } = useParams()
    // const getJobData = async () => {
    //     try {
    //         const response = await getCall(`/jobs/${_ID}`)
    //         setJobs([response.data])
    //     } catch (error) {
    //         console.error('Error fetching profile data:', error)
    //     }
    // }
    // useEffect(() => { getJobData() }, [])

    return (
        <>
            <div className='bg-[white] overflow-x-auto scrollnone rounded-[15px] -py-[15px]'>
                {/* <div className='-h-[60px] -bg-[white] pt-[20px] mx-[40px] flex items-center'> <button className="font-semibold py-[6px] px-[20px]  bg-[#FFCB05] rounded-[8px]" onClick={()=>{navigate('/employer/job-ads')}}> Back </button></div> */}
                <div >
                    <table className="table w-full text-[12px] ">
                        <thead>
                            <tr className="border-0">
                                <th className="font-bold text-[#000]">
                                </th>
                                <th className="font-bold text-[#000]">
                                </th>
                                <th className="font-bold text-[#000]">
                                </th>
                                <th className="font-[500] text-center px-[0px] -bg-[#E2E2E2]  text-[15px]  text-[#000]">
                                    <p className='bg-[#E2E2E2] text-[15px]  p-[10px]'>
                                        Applicants
                                    </p>
                                </th>
                                <th className="font-[500] text-center px-[0px] -bg-[#E2E2E2]  text-[15px]  text-[#000]">
                                    <p className='bg-[#E2E2E2] p-[10px] text-[15px]'>New</p>

                                </th>
                                <th className="font-[500] text-center px-[0px] -bg-[#E2E2E2] text-[15px] text-[#000]">
                                    <p className='bg-[#E2E2E2] p-[10px] text-[15px]'>Shortlisted</p>

                                </th>
                                <th className="font-[500] text-center px-[0px] -bg-[#E2E2E2] text-[15px]  text-[#000]">
                                    <p className='bg-[#E2E2E2] p-[10px] text-[15px]'>Screened</p>

                                </th>
                                <th className="font-[500] text-center px-[0px] -bg-[#E2E2E2]  text-[15px]  text-[#000]">
                                    <p className='bg-[#E2E2E2] p-[10px] text-[15px]'>Interviewed</p>

                                </th>
                                <th className="font-[500] text-center px-[0px] -bg-[#E2E2E2] text-[15px]  text-[#000]">
                                    <p className='bg-[#E2E2E2] p-[10px] text-[15px]'>Hired</p>

                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                jobs?.map((item) => (
                                    <tr className=" border-0 cursor-pointer  w-full h-[80px] pb-[50px]" >

                                        <td className=" bg-white rounded-l-[15px] leading-[15px] px-[40px] " >
                                            <h1 className=' -font-[800]  -text-[18px] my-[10px] text-[16px] font-semibold'> {item?.title?.length > 25 ? `${item?.title?.slice(0, 25)}...` : item?.title}</h1>
                                            <p className='text-nowrap text-[#919191] text-[12px]'>{moment(item?.createdAt).format('MMMM D, YYYY h:mm A')} </p>
                                        </td>
                                        <td className=" bg-white" >
                                            <p className='text-[15px] -w-[200px] -text-center font-[500]'>{item?.city}, {item?.state} </p>
                                            <p className='text-nowrap text-[#919191] text-[12px]'>{item?.country ? CountryDATAEnum[item?.country] : "---"}</p>
                                        </td>
                                        <td></td>
                                        <td className=" bg-white" >
                                            <p className='text-[15px] my-[6px] font-[500] text-center' >{item?.applicants}</p>
                                        </td>
                                        <td className=" bg-white" >
                                            <p className='text-[15px] my-[6px] font-[500] text-center' >{item?.applied}</p>
                                        </td>
                                        <td className=" bg-white" >
                                            <p className='text-[15px] my-[6px] font-[500] text-center' >{item?.shortListed}</p>
                                        </td>
                                        <td className=" bg-white" >
                                            <p className='text-[15px] my-[6px] font-[500] text-center' >{item?.screened}</p>
                                        </td>
                                        <td className=" bg-white" >
                                            <p className='text-[15px] my-[6px] font-[500] text-center' >{item?.interviewed}</p>
                                        </td>
                                        <td className=" bg-white" >
                                            <p className='text-[15px] my-[6px] font-[500] text-center' >{item?.hired}</p>
                                        </td>
                                        <td className="bg-white rounded-r-[15px]">
                                            <div className="flex items-center gap-2">
                                                <button className="font-semibold text-[15px] py-[6px] px-[20px]  bg-[#FFCB05] rounded-[8px]  ">
                                                    {statusEnum[item?.status]}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>)
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default JobAnalyss
