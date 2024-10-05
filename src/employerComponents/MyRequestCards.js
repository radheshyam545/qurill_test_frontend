import React, { useEffect, useState } from 'react';

function MyRequestsCards({ text, flag, text1, icon }) {
  const [request, setRequest] = useState(false)

  useEffect(() => {
    // if(request==false){
    setRequest(flag)
    // }
    // else if(request==true) {(setRequest(flag))}
  })

  return (
    <>
      {/* <div className='flex flex-wrap'> */}

      {/* <div className='container h-96 w-50 rounded-xl m-5 p-8 m-[10px]'> */}
      <div className='rounded-xl border border-[2px] border-[#D8D8D8]  '>
        <div className=' h-28 rounded-t-xl relative bg-center bg-[#919191]' style={{ backgroundImage: "url(/assets/images/article-img2.sv)" }} >
          <img src="/assets/images/logo512.pn" alt="" />
        </div>
        <div className='w-full h-66 rounded-b-xl flex flex-col items-center relative p-4'>
          <div className=' h-28 w-28 rounded-full absolute top-[-50px] border-2 border-[white] bg-[#e5ebfe]'>
            <img src="/assets/images/connection-profile.svg" alt="" className='w-[100%] h-[100%] rounded-[50%]' />
          </div>
          <h2 className='w-full h-8 bg-[] mt-12 text-xl font-semibold text-center'>
            Henry
          </h2>
          <p className=' w-full h-16 mt-2 text-center'>
            Full Stack Developer | React Native Developer
          </p>
         
                <div className='w-[90%] m-auto flex justify-between'>
                  <button className='w-[47%] mt-4 h-10 border-[1px] font-semibold  text-[#02A2FF] text-[18px] border-[#02A2FF] rounded-xl  transition-all font-[10px]'>
                    + Accept
                  </button>
                  <button className='text-[red] mt-4 text-[18px] font-semibold w-[47%]  h-10 border-[1px] border-[red] rounded-xl transition-all font-[10px]'>
                  - Reject
                  </button>
                  </div>
                  {/* <img src="/assets/images/my-network-card-arrow.svg" alt="" className='w-[20px]'/> */}
                  
        </div>
      </div>



    </>
  );
}

export default MyRequestsCards;
