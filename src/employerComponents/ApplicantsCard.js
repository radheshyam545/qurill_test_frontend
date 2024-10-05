import React from 'react';
import ProgressBar from '../components/ProgressBar';


function ApplicantsCard({setshowApplicantsOpeningCard}) {    
  return (
    <>
        
            <tr className=" border-0 cursor-pointer h-[80px] under-shadow w-full hover:scale-[1.01]"  onClick={()=>{setshowApplicantsOpeningCard(true)}}  >
              <td className="text-[16px] font-bold bg-white ">
              <span className='flex items-centers'>
                <img src="/assets/images/applicantcard-img.svg" alt="" className='mr-[10px]' />
                <p className='font-semibold flex items-center' >Asad Minhas Ahmed</p>
              </span>
              </td>
              <td className="text-[16px] bg-white" >
                <p className='text-[#6347FF]'>8 Applications</p>
              </td>
              <td className="text-[16px] bg-white" >
                <p>USA</p>
              </td>
              <td className="text-[16px] bg-white" >
                -
              </td>
              <td className="text-[16px] bg-white ">
                -
              </td>
              <td className="text-[16px] bg-white ">
                <ProgressBar Progress=
                  {
                    // item?.status
                    10
                  }
                />
              </td>
              <td className="text-[16px] bg-white">
                  <img src="/assets/images/applicantcard-msg.svg" alt="" className='h-[45px]' />
              </td>
            </tr>
            <tr className="border-0 ">
              <td colSpan={7} className="bg-[#FAFAFA] h-[12px] p-0"></td>
            </tr>
    </>
  );
}

export default ApplicantsCard;
