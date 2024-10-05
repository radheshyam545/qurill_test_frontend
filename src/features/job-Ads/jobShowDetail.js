import React from 'react'
import JobShowFilter from './jobShowFilter'
import MiniDoughnutForEmployer from '../../employerComponents/EChart/MiniDoughnutForEmployer'

function JobShowDetail({setshowApplicantsOpeningCard}) {

    const demoData = [{
        NAME: "Sale Manager",
        WORKRIGHTS: "USA Citizen",
        JOBLOCATION: "USA",
    },
    {
        NAME: "Sale Manager",
        WORKRIGHTS: "USA Citizen",
        JOBLOCATION: "USA",
    },
    {
        NAME: "Sale Manager",
        WORKRIGHTS: "USA Citizen",
        JOBLOCATION: "USA",
    },
    {
        NAME: "Sale Manager",
        WORKRIGHTS: "USA Citizen",
        JOBLOCATION: "USA",
    },

    {
        NAME: "Sale Manager",
        WORKRIGHTS: "USA Citizen",

        JOBLOCATION: "USA ",

    },
    {
        NAME: "Sale Manager",
        WORKRIGHTS: "USA Citizen",
        JOBLOCATION: "USA",
    },
    {
        NAME: "Sale Manager",
        WORKRIGHTS: "USA Citizen",

        JOBLOCATION: "USA "
    },
    {
        NAME: "Sale Manager",
        WORKRIGHTS: "USA Citizen",

        JOBLOCATION: "USA ",
    },
    {
        NAME: "Sale Manager",
        WORKRIGHTS: "USA Citizen",

        JOBLOCATION: "USA ",

    },
    {
        NAME: "Sale Manager",
        WORKRIGHTS: "USA Citizen",

        JOBLOCATION: "USA ",

    },
    {
        NAME: "Sale Manager",
        WORKRIGHTS: "USA Citizen",

        JOBLOCATION: "USA ",

    }]
    const obj ={completedWeight: 0, totalWeight: 0}
    return (
        <div>
            <div><JobShowFilter /></div>
            <div className="rounded-[10px]">
                <div className=" card bg-white px-[40px] p-2 bg-[#FAFAFA] rounded-[10px]">
                    <div className="job-search-table-box -overflow-x-auto  -m-auto bg-[]">
                        {
                            demoData && demoData?.length > 0 ?
                                <table className="table w-full text-[12px] border-dotted">
                                    <thead >
                                        <tr >
                                            <th className="font-bold text-[#000]">Applicant</th>
                                            <th className="font-bold text-[#000]">WORK RIGHT</th>
                                            <th className="font-bold text-[#000]">COUNTRY</th>
                                            <th className="font-bold text-[#000]">MEET REUIRMENTS</th>
                                            <th className="font-bold text-[#000]">STATUS</th>
                                            <th className="font-bold text-[#000]">ACTION</th>
                                        </tr>

                                        <tr className="dotted-line border-t-[3px] border-[#CECECE] border-dotted "></tr>
                                    </thead>
                                    <tbody >
                                        <tr style={{ height: '20px' }}></tr>
                                        {demoData?.map((item, index) => {
                                            return (
                                                <>

                                                    <tr className=" border-0 cursor-pointer under-shadow  w-full hover:scale-[1.01] h-[110px]" id={index} onClick={(() => { setshowApplicantsOpeningCard(true) })}>
                                                        <td className="text-[16px] font-bold bg-white rounded-l-[10px]">

                                                            <span className='flex items-centers'>
                                                                <img src="/assets/images/applicantcard-img.svg" alt="" className='mr-[10px]' />
                                                                {item.NAME}
                                                            </span>
                                                        </td>
                                                        <td className="text-[16px] bg-white" >
                                                            {item?.WORKRIGHTS}
                                                        </td>
                                                        <td className="text-[16px] bg-white" >{item?.JOBLOCATION}</td>
                                                        <td className="text-[16px] bg-white" >
                                                        
                                                        <MiniDoughnutForEmployer/>
                                                        
                                                        
                                                        </td>
                                                        <td className="text-[16px] bg-white ">
                                                            <div className="flex items-center gap-2">
                                                            Interview
                                                            </div>
                                                        </td>
                                                        <td className="text-[16px] bg-white rounded-r-[10px] ">
                                                            <div className="flex items-center gap-2">
                                                                <button className="flex  py-[16px] px-[20px] rounded-[8px] bg-[#F2F2F2] text-[#BCBCBC]">
                                                                    <span className='h-[3px] w-[3px] rounded-[50%] bg-[#BCBCBC] m-[3px]'></span>
                                                                    <span className='h-[3px] w-[3px] rounded-[50%] bg-[#BCBCBC] m-[3px]'></span>
                                                                    <span className='h-[3px] w-[3px] rounded-[50%] bg-[#BCBCBC] m-[3px]'></span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    <tr className="border-0 ">
                                                        <td colSpan={7} className="bg-[#FAFAFA] h-[12px] p-0"></td>
                                                    </tr>
                                                </>)
                                        }
                                        )}
                                    </tbody>
                                </table>
                                : <div className="job-listing-table-box -overflow-x-auto flex w-full flex justify-center">
                                    <span>No Record Found</span>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobShowDetail
