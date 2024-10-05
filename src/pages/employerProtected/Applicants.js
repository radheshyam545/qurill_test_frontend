// import React, { useState } from 'react';
// import Select from "react-select";
// import { Link,useNavigate } from 'react-router-dom'
// import { customStylesSelect } from '../../components/ReactSelectStyle';
// import ProgressBar from '../../components/ProgressBar';
// import ApplicantsCard from '../../employerComponents/ApplicantsCard';
// import ApplicantsOpeningCard from '../../employerComponents/ApplicantsOpeningCard';
// import SearchBarEmployer from '../../employerComponents/SearchBarEmployer';


// function Applicants() {
//   const navigate = useNavigate()
  
//   return (
//     <>
          
//       <div className='main bg-[white] -h-[600px] rounded-[15px] px-[30px] py-[20px] '>
//         <span className='flex items-center'>
//           <SearchBarEmployer />
//           <p className='ml-[20px] font-semibold'>Hide Advance Filter</p>
//         </span>
//         <div className="grid lg:grid-cols-3 gap-2 mt-[20px]">
//           <div className="mb-5">
//             <label className="mb-1 font-semibold">Job Location</label>
//             <Select
//               value={"ddf"}
//               name="country"
//               styles={customStylesSelect}
//               className="react-select"
//               classNamePrefix="select"
//               options={[{ value: "asds", label: "asdsd" }]}
//               isSearchable
//               placeholder={""}
//             />
//           </div>
//           <div className="mb-5">
//             <label className="mb-1 font-semibold">Data Range</label>
//             <Select
//               value={"ddf"}
//               name="country"
//               styles={customStylesSelect}
//               className="react-select"
//               classNamePrefix="select"
//               options={[{ value: "asds", label: "asdsd" }]}
//               isSearchable
//               placeholder={""}
//             />
//           </div>
//           <div className="mb-5">
//             <label className="mb-1 font-semibold">Select Skill</label>
//             <Select
//               value={"ddf"}
//               name="country"
//               styles={customStylesSelect}
//               className="react-select"
//               classNamePrefix="select"
//               options={[{ value: "asds", label: "asdsd" }]}
//               isSearchable
//               placeholder={""}
//             />
//           </div>
//         </div>
//         <div className=" p-3 flex justify-end w-full">
//           <div className="flex items-center gap-2">
//             <button className=" py-[5px] px-[30px] h-[50px]  bg-[#F4FCFF] rounded-[8px] font-semibold">
//               Clear
//             </button>
//             <button className=" py-[5px] px-[30px] h-[50px]  bg-[#FFCB05] ml-2  rounded-[8px] font-semibold ">
//               Filter
//             </button>
//           </div>
//         </div>
//         <table className="table w-full text-[12px]">
//           <thead>
//             <tr className="border-0">
//               <th className="font-bold text-[#000]">APPLICANT NAME</th>
//               <th className="font-bold text-[#000]">JOBS APPLIED</th>
//               <th className="font-bold text-[#000]">LOCATION</th>
//               <th className="font-bold text-[#000]">WORK RIGHTS</th>
//               <th className="font-bold text-[#000]">COUNTRY</th>
//               <th className="font-bold text-[#000]">PROFILE STATUS</th>
//               <th className="font-bold text-[#000]">CHAT</th>
//             </tr>
//           </thead>
//           <tbody>
//             {[1, 2, 3, 4, 5, 6].map((item) => { return (<ApplicantsCard  setshowApplicantsOpeningCard={setshowApplicantsOpeningCard}/>) })}
//           </tbody>
//         </table>
//       </div>
    
     
//     </>

//   );
// }

// export default Applicants;
