import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import DashboardtwoCards from '../../components/DashboardtwoCards';
import DashboardtwonotificationCards from '../../components/DashboardtwonotificationCards';
import DashboardtwoNotificationdate from '../../components/DashboardTwoButton';
import DashboardTwoUnderlineButton from '../../components/DashboardTwoUnderlineButton';
import DashboardTwoButton from '../../components/DashboardTwoButton';
import CustomOverlay from '../../containers/CustomOverlay';
import { getCall } from '../../app/axiosConfig';

function Dashboardtwo() {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [data,setData]=useState()
  const ApiCall = async () => {
    try {
      const res = await getCall("/profile/dashboard");
      setData(res?.data)
      console.log("1111",res?.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingData(false)
    }
  };
  useEffect(() => {
    ApiCall();
  }, []);
  return (
    <>
      <div className="dashboardTwo-wrapper w-full flex">
        <CustomOverlay isLoading={isLoadingData}/>
        <div className="dashboardTwo-left w-9/12 ">
          <div className="dashboardleftCards flex flex-wrap justify-between">
            <DashboardtwoCards heading={'Job Acceptance'} count={data?.totalJobsAccepted} icon={""} iconBg={"#FF7239"} status={'Accept'} />
            <DashboardtwoCards heading={'Job Rejection'} count={data?.totalJobsRejected} icon={""} iconBg={"#6347FF"} status={'Reject'} />
            <DashboardtwoCards heading={'Applied Jobs'} count={data?.totalJobsApplied} icon={""} iconBg={"#02D052"} status={'Applied'} />
          </div>
          <div className="dashboardTwo-center w-full flex -mt-[10px] h-[600px] ">
            <div className="mt-[15px] dashboardTwo-company-layoffs w-3/5 bg-[#FFFFFF] m-h-[] rounded-xl mr-[10px] p-[15px]">
              {/* ----- */}
              <div className="job-seeker leading-[30px] h-[100%]">
                <p className='font-semibold text-[#1E1E1E] text-[22px]'>Job Seeker Guidance</p>
                <p className='text-xs text-[#1E1E1E]'>Recommended based on your activity</p>

                <div className='px-[15px]'>
                  <p className='font-medium py-[10px] text-[15px] font-bold'> I want to improve my resume</p>
                  <p className='text-[15px]'>Explore our curated guide of expert-led courses, such as how to improve your resume and grow your network, to help you land your next opportunity.</p>
                  <ul className='list-disc list-inside'>
                    <li className='text-[15px]'>Your resume is a compelling marketing document, not an autobiography.</li>
                    <li className='text-[15px]'>Make your resume unique by using your own voice, so you can stand out in the sea of resumes.</li>
                    <li className='text-[15px]'>Make the words earn their spot - say what you need to without being too brief or too wordy.</li>
                  </ul>
                  <button className='my-[10px]'>
                    <DashboardTwoUnderlineButton underline={'underline'} text={'Show more'} bg={'#FFCB05'} />
                  </button>
                  <img src="/assets/images/guide.svg" alt="" className='float-right w-[15rem]' />
                </div>
              </div>
              {/* ------ */}
            </div>
            {/* <div className="dashboardTwo-notification w-2/5 bg-[#FFFFFF] text-sm  rounded-xl pb-[10px]  h-[100%]"> */}
          <div className="tipsSection  px-[40px] bg-[white] w-2/5 rounded-xl py-[10px] mt-[15px]">

              <div className='flex '>
                <p className='font-semibold text-[22px]'>Tips</p>
                <img className='ml-[5px] object-contain w-[10px]' src="/assets/images/tips-bulb.svg" alt="" />
              </div>
              <ul className='list-disc list-inside mt-[10px]'>
                <li className='text-[15px]'>Your resume is a compelling marketing document, not an autobiography.</li>
                <li className='text-[15px]'>Make your resume unique by using your own voice, so you can stand out in the sea of resumes.</li>
                <li className='text-[15px]'>Make the words earn their spot - say what you need to without being too brief or too wordy.</li>
                <li className='text-[15px]'>Make the words earn their spot - say what you need to without being too brief or too wordy.</li>
              </ul>
              <div className='w-full h-[60px] mt-[10px] bg-[]'>
                <span className='float-right'>
                  <DashboardTwoUnderlineButton underline={'underline'} text={'Show more'} bg={'#FFCB05'} />
                </span>
              </div>
              {/* <div className="dashboardTwo-notification-header flex bg-[] h-[10%] justify-between items-center border-b-2 border-[#FFCB05]    " style={{ padding: "10px" }}>
                <p className='text-base font-medium '>Notification</p>
                <span onClick={() => { navigate('/seeker/notifications') }}> <DashboardTwoButton text={'See all'} bg={'#FFCB05'} /> </span>
              </div>
              <div className="notification-body flex flex-col items-center rounded-lx bg-[#FFFFFF] w-[100%] h-[90%] overflow-y-scroll pb-[10px] ">
                <DashboardTwoButton text={'Today'} bg={'#FFCB05'} />
                <DashboardtwonotificationCards profileName={'Lisa'} profileTime={'1 Hour Ago'} profileDesc={'Use simple and straightforward language that is easy for your audience to understand.'} />
                <DashboardtwonotificationCards profileName={'Lisa'} profileTime={'1 Hour Ago'} profileDesc={'Use simple and straightforward language that is easy for your audience to understand.'} />
                <DashboardtwonotificationCards profileName={'Lisa'} profileTime={'1 Hour Ago'} profileDesc={'Use simple and straightforward language that is easy for your audience to understand.'} />
                <DashboardtwoNotificationdate text={'Yesterday'} bg={'#FFCB05'} />
                <DashboardtwonotificationCards profileName={'Lisa'} profileTime={'1 Hour Ago'} profileDesc={'Use simple and straightforward language that is easy for your audience to understand.'} />
              </div> */}
            </div>
          </div>
          {/* <div className="tipsSection px-[40px] bg-[white] w-full rounded-xl py-[10px] mt-[10px]">
            <div className='flex '>
              <p className='font-semibold text-[26px]'>Tips</p>
              <img className='ml-[5px] object-contain w-[10px]' src="/assets/images/tips-bulb.svg" alt="" />
            </div>
            <ul className='list-disc list-inside'>
              <li className='text-[15px]'>Your resume is a compelling marketing document, not an autobiography.</li>
              <li className='text-[15px]'>Make your resume unique by using your own voice, so you can stand out in the sea of resumes.</li>
              <li className='text-[15px]'>Make the words earn their spot - say what you need to without being too brief or too wordy.</li>
              <li className='text-[15px]'>Make the words earn their spot - say what you need to without being too brief or too wordy.</li>
            </ul>
            <div className='w-full h-[60px] bg-[]'>
              <span className='float-right'>
                <DashboardTwoUnderlineButton underline={'underline'} text={'Show more'} bg={'#FFCB05'} />
              </span>
            </div>
          </div> */}
          {/* Article----- */}
          <div className="article-section w-[100%] rounded-xl mt-[10px] flex">
            <div className="article-left w-[35%] h-[100%] rounded-xl bg-[#FFFFFF]">
              <div className='w-[100%] h-[300px]  rounded-xl bg-no-repeat bg-center bg-cover p-[8px] bg-[black]' style={{ backgroundImage: "url(/assets/images/article-img1.svg)" }} >
                <DashboardTwoButton text={'Article'} bg={'#FFFFFF'} />
              </div>
              <div className='p-[10px] w-[100%]  rounded-xl'>
                <p className="text-[15px]">A job may be important for a sense of purpose since it can prov...</p>
                <span className='float-right p-[10px]'>
                  <DashboardTwoUnderlineButton underline={'underline'} text={'Show more'} bg={'#FFCB05'} />
                </span>
              </div>
            </div>
            <div className=" bg-[#FFFFFF] article-right w-[65%] h-[100%] rounded-xl ml-[10px] " >
              <div className='h-[320px] bg-no-repeat bg-center bg-cover rounded-xl flex justify-center items-center' style={{ backgroundImage: "url(/assets/images/article-img2.svg)" }}>
                <img src="/assets/images/video-icon.svg" alt="" className='h-[60px] w-[60px] cursor-pointer' />
              </div>
              <div className=' w-[100%] flex justify-between  p-[20px]  '>
                <p className='text-[#1E1E1E] text-[15px]'>The Future of Work: Trends and Innovations to <br /> Watch in 2022. </p>
                <span className='ml-[10%]'>
                  <DashboardTwoUnderlineButton text={'Jobs'} bg={'#FFCB05'} />
                </span>
              </div>
            </div>
          </div>
          {/* Article------ */}
        </div>
        <div className="dashboardTwo-right w-3/12  ml-[15px]">
          <div className="new-connection  bg-[white] rounded-xl h-[] p-[10px]">
            {/* <div className="newConnections-header flex justify-between py-[10px] items-center"> */}

            <div className="dashboardTwo-notification-header flex bg-[] h-[10%] justify-between items-center border-b-2 border-[#FFCB05]    " style={{ padding: "10px" }}>

              <p className='font-semibold text-[18px]'>Notification</p>
              <DashboardTwoButton text={'See all'} bg={'#FFCB05'} />

            </div>
            <div className="notification-body flex flex-col items-center rounded-lx bg-[#FFFFFF] w-[100%] h-[90%] overflow-y-scroll pb-[10px] ">
              {/* <div className="newConnections-body h-[480px] overflow-y-scroll" > */}
              <DashboardTwoButton text={'Today'} bg={'#FFCB05'} />
              <DashboardtwonotificationCards profileName={'Lisa'} profileTime={'1 Hour Ago'} profileDesc={'Use simple and straightforward language that is easy for your audience to understand.'} />
              <DashboardtwonotificationCards profileName={'Lisa'} profileTime={'1 Hour Ago'} profileDesc={'Use simple and straightforward language that is easy for your audience to understand.'} />
              <DashboardtwonotificationCards profileName={'Lisa'} profileTime={'1 Hour Ago'} profileDesc={'Use simple and straightforward language that is easy for your audience to understand.'} />
              <DashboardtwoNotificationdate text={'Yesterday'} bg={'#FFCB05'} />
              <DashboardtwonotificationCards profileName={'Lisa'} profileTime={'1 Hour Ago'} profileDesc={'Use simple and straightforward language that is easy for your audience to understand.'} />
              <DashboardtwonotificationCards profileName={'Lisa'} profileTime={'1 Hour Ago'} profileDesc={'Use simple and straightforward language that is easy for your audience to understand.'} />
              <DashboardtwonotificationCards profileName={'Lisa'} profileTime={'1 Hour Ago'} profileDesc={'Use simple and straightforward language that is easy for your audience to understand.'} />
              {/* <NewConnectionscards name={'Lisa'} desc={'Working in Amazon as virtual assistant'} date={'1 week Ago'} />
              <NewConnectionscards name={'Lisa'} desc={'Working in Amazon as virtual assistant'} date={'1 week Ago'} />
              <NewConnectionscards name={'Lisa'} desc={'Working in Amazon as virtual assistant'} date={'1 week Ago'} />
              <NewConnectionscards name={'Lisa'} desc={'Working in Amazon as virtual assistant'} date={'1 week Ago'} />
              <NewConnectionscards name={'Lisa'} desc={'Working in Amazon as virtual assistant'} date={'1 week Ago'} />
              <NewConnectionscards name={'Lisa'} desc={'Working in Amazon as virtual assistant'} date={'1 week Ago'} />
              <NewConnectionscards name={'Lisa'} desc={'Working in Amazon as virtual assistant'} date={'1 week Ago'} /> */}

            </div>
          </div>
          {/* <div className="job-news bg-[white] rounded-xl h-[] p-[10px] mt-[20px]">
            <div className="job-news-header flex justify-between py-[10px] items-center">
              <p className='font-semibold text-[18px]'>Job News</p>
              <DashboardTwoButton text={'See all'} bg={'#FFCB05'} />
            </div>
            <div className="jon-news-body h-[480px] overflow-y-scroll">
              <JobNewscards heading={'Experienced Instructional Designer for Online Course...'} />
              <JobNewscards heading={'Experienced Instructional Designer for Online Course...'} />
              <JobNewscards heading={'Experienced Instructional Designer for Online Course...'} />
              <JobNewscards heading={'Experienced Instructional Designer for Online Course...'} />
              <JobNewscards heading={'Experienced Instructional Designer for Online Course...'} />
              <JobNewscards heading={'Experienced Instructional Designer for Online Course...'} />
              <JobNewscards heading={'Experienced Instructional Designer for Online Course...'} />
              <JobNewscards heading={'Experienced Instructional Designer for Online Course...'} />
              <JobNewscards heading={'Experienced Instructional Designer for Online Course...'} />
            </div>
          </div> */}
        </div>
      </div>


    </>
  );
}

export default Dashboardtwo;