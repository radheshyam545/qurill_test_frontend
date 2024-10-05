import React from 'react';

function Disqualifiers({profileStatusCheck,disqualifierModal,setDisqualifierModal,disqualifierData}) {
  return (
    <>
        <div className=' flex justify-center items-center  model h-[100%] w-[100%] top-0 left-0 fixed bg-[#0000005e] z-[999999]'>
        <div className=' max-h-[80%] -h-[260px] w-[320px] mt-[0%] bg-[white] -overflow-y-scroll rounded-[15px] p-[15px]'>
        <div className="header border-b border-b-[#000] pb-[10px]">
            <p className='font-semibold'>{profileStatusCheck ? 'Application':'Disqualifiers'}</p>
        </div>
        <div className="center py-[15px] flex flex-col gap-[8px] -border-b py-[15px] pl-[25px] ">
            <ul className='flex flex-col gap-[20px] text-[#909090] font-[500] mt-[10px]'>
                {
                    disqualifierData.map(item => (<li className='list-disc'>{item}</li>))
                }
            </ul>
        </div>
        <div className="-footer flex float-right pt-[15px] ">
            <button className='px-[23px] py-[4px] rounded-[5px] bg-[#FFCB05] ' onClick={()=>setDisqualifierModal(false)}>Ok</button>
        </div>
        </div>
        </div>
    </>
  );
}

export default Disqualifiers;
