import React, { useEffect, useState } from 'react'
import Doughnut from '../../components/EChart/Doughnut';
import MiniDoughnut from '../../components/EChart/MiniDoughnut';
import { useNavigate } from 'react-router-dom';
import { analyticsData } from '../../features/profile/profileSlice';
import { useSelector, useDispatch } from 'react-redux'

function MyResume() {
   const navigate = useNavigate()
   const [trackPercentage, setTrackPercentage] = useState(0)
   const [percentage, setPersentage] = useState(0)  

   const { profileAnalyticsData } = useSelector(state => state.profile)
   const { educationTraining, personalInformation, portfolio, skills, work } = profileAnalyticsData || {}

   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(analyticsData())
   }, [])

   useEffect(() => {
      calculateTotalPersentage()
   }, [profileAnalyticsData])

   const calculateTotalPersentage = () => {
      let total = 0
      Object.keys(profileAnalyticsData).map(key => {
         if (!profileAnalyticsData[key]?.isCompleted) {
            total = total + 1
         }
      })
      setTrackPercentage(total)
   }

  const calculateTotalPersentage2 = () => {
    let gain = 0
    let total = 0
    Object.keys(profileAnalyticsData).map(key => {
      gain = gain + profileAnalyticsData[key].completedWeight
      total = total + profileAnalyticsData[key].totalWeight
    })
    setPersentage((gain / total) * 100)
  }

  useEffect(() => {
   calculateTotalPersentage2()
  }, [profileAnalyticsData])

   return (
      <div className='bg-white rounded-xl  p-[30px]'>
         <h2 className='text-[25px] font-semibold mb-4 h-8'>
            My Resume
         </h2>
         <div className='resume-upper w-[100%]  bg-[] m-auto rounded flex '>
            <div className='resume-upper-left w-[100%] h-[] bg-[] '>
               <Doughnut percentage={percentage} />
            </div>
            <div className=' resume-upper-right w-[50%] px-4 ] '>
               <div className='w-[100%] '>
                  <p className='text-[20px] font-semibold font-bold'>
                     {
                        percentage <= 25 ? "Needs Work" : percentage <= 85 ? "You are on track" :
                     'Good Job'
                     }
                     </p>
                  {trackPercentage > 0 && <p className=' text-[18px] mt-[3px]'>You need only {trackPercentage} points to reach the green zone</p>}
               </div>

               <div className='w-[100%] border-b-2 border-t-2 border-b-[#D8D8D8] p-2 mt-[15px] h-[250px] overflow-y-scroll'>
                  <p className='text-lg  text-[#02A2FF]'>{trackPercentage > 0 ? `${trackPercentage} steps to improve your score` : 'All steps completed'}</p>

                  <div className='flex justify-start my-[20px]'>
                     <span>
                        {
                           personalInformation?.isCompleted ?
                              <img src="/assets/images/resume-info-icon-success.svg" alt="" className='w-[25px]' />
                              :
                              <img src="/assets/images/resume-info-icon.svg" alt="" className='w-[25px]' />
                        }
                     </span>
                     <span className='ml-[10px]'>
                        <p className='font-semibold text-[18px]'>{personalInformation?.isCompleted ? 'Your Personal information is Completed' : "Complete your Personal Information"}</p>
                        {/* <p>Add your demographics details</p> */}
                     </span>
                  </div>

                  <div className='flex justify-start my-[20px]'>
                     <span>
                        {
                           work?.isCompleted ?
                              <img src="/assets/images/resume-info-icon-success.svg" alt="" className='w-[25px]' />
                              :
                              <img src="/assets/images/resume-info-icon.svg" alt="" className='w-[25px]' />
                        }
                     </span>
                     <span className='ml-[10px]'>
                        <p className='font-semibold text-[18px]'>{work?.isCompleted ? 'Your Work is Completed' : "Complete your Work"}</p>
                        {/* <p>Add your demographics details</p> */}
                     </span>
                  </div>
                  <div className='flex justify-start my-[20px]'>
                     <span>
                        {
                           educationTraining?.isCompleted ?
                              <img src="/assets/images/resume-info-icon-success.svg" alt="" className='w-[25px]' />
                              :
                              <img src="/assets/images/resume-info-icon.svg" alt="" className='w-[25px]' />
                        }
                     </span>
                     <span className='ml-[10px]'>
                        <p className='font-semibold text-[18px]'>{educationTraining?.isCompleted ? 'Your education and training is Completed' : "Complete your education and training"}</p>
                        {/* <p>Add your demographics details</p> */}
                     </span>
                  </div>
                  <div className='flex justify-start my-[20px]'>
                     <span>
                        {
                           skills?.isCompleted ?
                              <img src="/assets/images/resume-info-icon-success.svg" alt="" className='w-[25px]' />
                              :
                              <img src="/assets/images/resume-info-icon.svg" alt="" className='w-[25px]' />
                        }
                     </span>
                     <span className='ml-[10px]'>
                        <p className='font-semibold text-[18px]'>{skills?.isCompleted ? 'Your skills information is Completed' : "Complete your skills information"}</p>

                        {/* <p>Add your demographics details</p> */}
                     </span>
                  </div>

                  <div className='flex justify-start my-[20px]'>
                     <span>
                        {
                           portfolio?.isCompleted ?
                              <img src="/assets/images/resume-info-icon-success.svg" alt="" className='w-[25px]' />
                              :
                              <img src="/assets/images/resume-info-icon.svg" alt="" className='w-[25px]' />
                        }
                     </span>
                     <span className='ml-[10px]'>
                        <p className='font-semibold text-[18px]'>{portfolio?.isCompleted ? 'Your portfolio information is Completed' : "Complete your portfolio information"}</p>

                        {/* <p>Add your demographics details</p> */}
                     </span>
                  </div>

               </div>

               <div className='w-[100%] p-2 h-[95px] flex flex-col items-center'>
                  <button className='block w-[45%] h-[40px] bg-[#FFCB05] rounded-xl mt-2 font-semibold'
                     onClick={() => { navigate('/seeker/profile') }}
                  >
                     Edit Profile
                  </button>
               </div>
            </div>

         </div>
         <div className=' m-auto m-[50px] flex flex wrap justify-between items-center  p-4 gap-[10px] mt-[40px]' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', display: 'grid', gridTemplateRows: 'repeat(auto, 300px)' }}>
            <div className=' font-semibold rounded-xl border border-slate-200 py-2'><h4 className='text-center text-xl h-14 overflow-hidden '>Personal Information</h4><span className='flex justify-center items-center h-[100%]'> <MiniDoughnut color={"#67A381"} doughnutData={personalInformation} /> </span></div>
            <div className=' font-semibold rounded-xl border border-slate-200 py-2'><h4 className='text-center text-xl h-14 overflow-hidden'>work</h4><div className=' flex justify-center items-center'><MiniDoughnut doughnutData={work} /> </div></div>
            <div className=' font-semibold rounded-xl border border-slate-200 py-2'><h4 className='text-center text-xl h-14 overflow-hidden'>Education & Training</h4><div className='flex justify-center items-center'><MiniDoughnut color={"#67A381"} doughnutData={educationTraining} /> </div></div>
            <div className=' font-semibold rounded-xl border border-slate-200 py-2'><h4 className='text-center text-xl h-14 overflow-hidden'>Skills</h4><div className=' flex justify-center items-center'><MiniDoughnut doughnutData={skills} /> </div></div>
            <div className=' font-semibold rounded-xl border border-slate-200 py-2'><h4 className='text-center text-xl h-14 overflow-hidden'>Portfolio</h4><div className=' flex justify-center items-center'><MiniDoughnut color={"#67A381"} doughnutData={portfolio} /> </div></div>

         </div>
      </div>
   )
}

export default MyResume;
