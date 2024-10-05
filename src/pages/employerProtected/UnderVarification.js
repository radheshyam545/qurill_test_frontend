import { useEffect } from 'react'

function InternalPage() {

    return (
        <>
            <div className="-wrapper h-[100vh] w-[100%] -bg-[#F3F8FC] flex justify-center items-center">
                <div className='p-[20px] -h-[500px] w-[700px] rounded-[10px] border bg-[white]'>
                    <div className='header flex p-[20px] items-center justify-center gap-[10px]'>
                        <div className='h-[70px] w-[65px] bg-[#FFCB05] -under-shadow -border -border-[5px] rounded-[8px] -border-[white]'></div>
                        <p className='text-[24px] font-bold under-shadow'>Qruil</p>
                    </div>
                    <p className='text-[#FFCB05] text-[24px] font-semibold text-center'>Verification Complete</p>
                    <p className=' text-[18px] font-semibold text-center mt-[30px]'>Thanks you for validating your account information</p>
                    <div className='flex justify-center mt-[30px]'>
                        <div className='loaderrr'></div>
                    </div>
                    <p className=' text-[18px] font-semibold text-center mt-[30px]'>In 20 minutes, your Company Information will be verified.</p>
                    <p className=' text-[18px] text-center mt-[30px]'>You will be notified via email</p>
                </div>

            </div>
        </>
    )
}

export default InternalPage