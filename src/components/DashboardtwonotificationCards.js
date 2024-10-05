import React from 'react';

function DashboardtwonotificationCards(props) {
  return (
    <>
        <div className="notificationcard bg-[#f3f8fc] rounded-xl flex items-center cursor-pointer m-2" style={{width:"92%", height:"90px", padding:"8px"}}> 
        <div className="profileSection flex items-center " style={{width:"30%"}}>
            <div className="profile  min-w-[45px] [w-[45px] h-[45px] rounded-full bg-[#FFFFFF] flex justify-center items-center" > <img src="/assets/images/notification-bulb.svg" alt="" className=' w-[20px]' /></div>
            <div className='ml-2'>
            <p className="profileName font-semibold text-sm">{props.profileName}</p>
            <p className="profileTime " style={{fontSize:"10px"}}>{props.profileTime}</p>
            </div>
        </div>
        <div className="profileDescription text-xs ml-1.5"style={{width:"70%"}}><p>{props.profileDesc}</p></div>
        </div>
    </>
  );
//   class="min-w-[45px] [w-[45px] h-[45px] rounded-full bg-[#E5EBFE]"
}
// backgroundImage:"url(/assets/images/notification-profile.png" 
export default DashboardtwonotificationCards;
