import React from 'react';


function Component1Tab() {
    
  return (
   <>
    <table className="table w-full text-[12px]">
    <thead>
            <tr className="border-0">
              <th className="font-bold text-[#000]">JOB TITLE</th>
              <th className="font-bold text-[#000]">ATTACHMENTS</th>
              <th className="font-bold text-[#000]">APPLIED DATE</th>
              <th className="font-bold text-[#000]">MEET REQUIRMENTS</th>
              <th className="font-bold text-[#000]">STATUS</th>
              <th className="font-bold text-[#000]">ACTION</th>
            </tr>
          </thead>
          <tbody>
    <tr className=" border-0 cursor-pointer h-[80px] under-shadow w-full hover:scale-[1.01]">
              <td className="text-[16px] bg-white ">
              <span className=''>
                <p className='font-semibold flex items-center my-[5px]' >Steps Job 1</p>
                <p className=' my-[5px]' >Banking & Financial Services | Banking - Busines....</p>
              </span>
              </td>
              <td className="text-[16px] bg-white" ><img src="/assets/images/applicant-tab-job-card-icon.svg" alt="" className='h-[45px]' /></td>
              <td className="text-[16px] bg-white" >13 Jan, 2023</td>
              <td className="text-[16px] bg-white" ></td>
              <td className="text-[16px] bg-white "><button className='border border-[3px] border-[#5C89FF] bg-[#DCECFF] text-[#5C89FF] px-[15px] py-[7px] rounded-[10px]'>New</button></td>
              <td className="text-[16px] bg-white "><button className="flex  py-[16px] px-[20px] rounded-[8px] bg-[#F2F2F2] text-[#BCBCBC]">
                <span className='h-[3px] w-[3px] rounded-[50%] bg-[#BCBCBC] m-[3px]'></span>
                <span className='h-[3px] w-[3px] rounded-[50%] bg-[#BCBCBC] m-[3px]'></span>
                <span className='h-[3px] w-[3px] rounded-[50%] bg-[#BCBCBC] m-[3px]'></span>
              </button></td>
            </tr>
            <tr className="border-0 ">
              <td colSpan={7} className="bg-[#FAFAFA] h-[12px] p-0"></td>
            </tr>
            </tbody>
        </table>
   </>
  );
}

export default Component1Tab;

