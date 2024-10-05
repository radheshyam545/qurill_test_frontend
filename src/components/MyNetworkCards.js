
// import React, { useEffect, useState } from 'react';
// function MyNetworkCards({text,flag,text1,icon}) {
//   const [request,setRequest]=useState(false)

//   useEffect(()=>{
//       setRequest(flag)
//   })
//   return (
//     <>
//      <div className='  bg-[] rounded-xl border border-slate-400 m-[10px]  ' style={{flex: '1 1 250px'}}>
//         <div className=' h-28 rounded-t-xl relative bg-[red]' style={{backgroundImage: "url(/assets/images/article-img1.png)" }} >
//           <img src="/assets/images/logo512.png" alt="" />
//         </div>       
//         <div className='w-full  rounded-b-xl flex flex-col items-center relative p-4'>
//            <div className=' h-28 w-28 rounded-full bottom-36'>
//           <img src="/assets/images/connection-profile.svg" alt="" className='w-[100%] h-[100%] rounded-[50%]' />
//            </div>
//            <h2 className='w-full h-8 bg-[#fff] mt-[5px] text-xl font-semibold text-center'>
//             Henry
//            </h2>
//            <p className='bg-white w-full h-16 mt-2 text-center'>
//             Full Stack Developer | React Native Developer
//            </p>
//            {
//             request?
//             (
//               <>
//               <button className='w-4/5 mt-4 h-10 border-2 font-semibold  text-[#02A2FF] text-[18px] border-[#02A2FF] rounded-xl  transition-all font-[10px]'>
//               + {text}
//            </button>
//            <button className='text-[#02A2FF] text-[18px] font-semibold w-4/5 mt-4 h-10 border-2 border-[#02A2FF] rounded-xl transition-all font-[10px]'>
//                {text1}
//            </button>
//            </>
//            )
//             :
//            <button className='text-[#02A2FF] font-semibold text-[18px] w-4/5 mt-4 h-10 border-2 border-[#02A2FF] rounded-xl transition-all'>
//               + {text}
//            </button> 
//            }
//         </div>
//      </div>

//     </>
//   );
// }

// export default MyNetworkCards;


// new------------------------------------------------------

import React, { useEffect, useState } from 'react';

function MyNetworkCards({ text, flag, text1, icon,name, desc, arrow, plus}) {
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
      <div className='fff  bg-[] rounded-xl border border-[2px] border-[#D8D8D8] '>
        <div className=' h-28 rounded-t-xl relative bg-[#919191] bg-center ' style={{ backgroundImage: "url(/assets/images/article-img2.sv" }} >
          <img src="/assets/images/logo512.png" alt="" />
        </div>
        <div className='w-full h-66 rounded-b-xl flex flex-col items-center relative p-4'>
          <div className=' h-28 w-28 rounded-full absolute top-[-50px] bg-[#e5ebfe] border-2 border-[white]'>
            <img src="/assets/images/connection-profile.svg" alt="" className='w-[100%] h-[100%] rounded-[50%]' />
          </div>
          <h2 className='w-full h-8 bg-[] mt-12 text-xl font-semibold text-center'>
            {name}
          </h2>
          <p className=' w-full h-16 mt-2 text-center'>
            {desc}
          </p>  
              <button className='flex items-center justify-center text-[#02A2FF] font-semibold text-[18px] w-[70%] mt-4 h-10 border-[1px] border-[#02A2FF] rounded-xl transition-all'>
              <span ><img src={arrow} alt="" className='mx-[5px]' /></span>
              <span className='mx-[5px] text-[20px]'>{plus}</span>
              <p>{text}</p> 
              </button>
          
        </div>
      </div>



    </>
  );
}

export default MyNetworkCards;


