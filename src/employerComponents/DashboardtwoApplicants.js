import React from 'react'
import BlueButton from './BlueButton'
import { CountryDATAEnum } from '../pages/employerProtected/JobConsts'

function DashboardtwoApplicants({ image, ButtonInfo, skill, firstName, lastName, adress }) {
    return (
        <div>
            <div className='bg-[#fafafc] w-full min-h-[90px] flex justify-between items-center rounded-xl py-2 px-3 mt-[8px] cursor-pointer'>


                <div className='ml-[10px] w-[100%] flex justify-between gap-[10px] items-center'>
                    <span className=' -bg-[yellow] flex items-center w-[33%] max-w-[33%]' >
                        {/* <div className='h-[50px] w-[80px] bg-[red]'>
                            <img className='object-cover h-[100%] w-[100%]' src={image?image:'/assets/images/applicantcard-img.svg'} />
                        </div> */}
                        <span className=' ml-[10px] truncate'>
                            <h4 className='truncate font-semibold text-[15px]'>{firstName} {lastName} </h4>
                            <p className='truncate text-[15px]'>{adress?.city}, {adress?.state}, {adress?.country === 'usa' ? 'United States' : adress?.country}</p>
                        </span>
                    </span>
                    {/* <img src={image} className='mr-[80px]' /> */}
                    <div className=' -bg-[blue] flex gap-[10px] justify-center flex-wrap w-[33%]'>
                        {skill.map((skill, index) => (<button className='border border-[#e3d8d8] m-[-2px] -w-[70px] px-[8px] py-[2px] rounded-[12px] text-[10px] font-[500] border-[2px]'>{skill.slice(0, 12)}</button>))}
                    </div>
                    <div className='w-[33%] -bg-[pink] flex justify-center'>
                        <button className="inline-flex py-[6px] text-[#4CC587] border border-[1px] border-[E3D8D8] -font-semibold text-[13px] px-[10px] rounded-[8px] bg-[#FFFFFF]">
                            {ButtonInfo}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardtwoApplicants
