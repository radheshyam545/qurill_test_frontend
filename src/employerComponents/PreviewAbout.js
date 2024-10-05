import React, { useEffect, useState } from 'react';
function PreviewAbout({ personalInformation, educationTraining }) {

    const [digre, setDigre] = useState("")
    const [acdemicname, setAcdemicname] = useState("")

    useEffect(() => {
        if (educationTraining) {
            setDigre(educationTraining[0]?.degree)
            setAcdemicname(educationTraining[0]?.academicCenter)
        }
    }, [educationTraining]);

    return (
        <>
            <div className='profile-about w-[100%] bg-[#FFFFFF] flex p-[15px] border border-[#b9b9b9] m-auto my-2 rounded-xl border-opacity-[60%]'>
                <div className="profile-left h-[100%] w-[50%] bg-[]">
                    <p className='text-[26px] font-semibold text-[#2E2D46]'>About</p>
                    <div className='flex my-[20px]'>
                        {educationTraining[0]?.degree ? <>
                            <img src="/assets/images/profile-study-icon.svg" alt="" className='w-[20px]' />
                            <p className='ml-[10px] text-[16px]'>{`${digre} at ${acdemicname}`}</p></> : ""}
                    </div>
                    <div className='flex my-[20px]'>
                        {personalInformation?.address?.city ? <><img src="/assets/images/profile-home-icon.svg" alt="" className='w-[20px]' />
                            <p className='ml-[10px] text-[16px]'>Live in <span className='font-bold'>{`${personalInformation?.address?.city},${personalInformation?.address?.country}`}</span> </p></> : ""}
                    </div>
                    <div className='flex my-[20px]'>
                        {personalInformation?.contact?.phone ? <><img src="/assets/images/profile-telephone-icon.svg" alt="" className='w-[20px]' />
                            <p className='ml-[10px] text-[16px]'>{personalInformation?.contact?.phone}</p></> : ""}
                    </div>
                    <div className='flex my-[20px]'>
                        {personalInformation?.contact?.email ? <><img src="/assets/images/profile-email-icon.svg" alt="" className='w-[20px]' />
                            <p className='ml-[10px] text-[16px]'>{personalInformation?.contact?.email}</p></> : ""}
                    </div>
                    <div className='flex my-[20px]'>
                        {personalInformation?.demographics?.gender ? <> <img src="/assets/images/profile-gender-icon.svg" alt="" className='w-[18px]' />
                            <p className='ml-[10px] text-[16px] leading-[22px]'>
                                <p className='font-bold'>{personalInformation?.demographics?.gender}</p>
                                <p className='text-[#C1C1C1] text-[18px]'>Gender</p>
                            </p></> : ""}
                    </div>
                    <div className='flex my-[20px]'>
                        <div className='flex'>
                            <img src="/assets/images/profile-connection-icon.svg" alt="" className='w-[20px]' />
                            <p className='ml-[10px] text-[16px] text-[#02A2FF]'>265 Connections</p>
                        </div>
                        <div className='flex ml-[15px]'>
                            <img src="/assets/images/profile-followers-icon.svg" alt="" className='w-[20px]' />
                            <p className='ml-[10px] text-[16px] text-[#02A2FF]'>265 Connections</p>
                        </div>
                    </div>
                </div>
                <div className="profile-right h-[100%] w-[50%] bg-[]">
                    <p className='text-[26px] font-semibold text-[#2E2D46]'>Info</p>
                    {personalInformation?.personalStatements ? <p className=' text-[16px] my-[20px]'>{personalInformation?.personalStatements}</p> : ""}
                </div>
            </div>
        </>
    );
}

export default PreviewAbout;