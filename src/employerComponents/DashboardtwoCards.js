import React from 'react';

function DashboardtwoCards(props) {
    return (
        <>
            <div onClick={()=>{props.onTabChange('/employer/job-ads')}} className="dashboardTwocard w-1/4 rounded-lg flex items-center justify-between cursor-pointer bg-[#FFFFFF] grow shrink m-[5px]" style={{ height: "80px", width: "300px", padding: "15px"}}>
                <div className='flex'>
                    <div className=" flex justify-center item-center cardIcon size-11 rounded-[10px] flex justify-center items-center " style={{backgroundColor: `${props.iconBg}` }}> 
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.4257 0H2.57434C1.15048 0 0 1.15117 0 2.57588V16.4241C0 17.8488 1.15048 19 2.57434 19H16.4257C17.8495 19 19 17.8488 19 16.4241V2.56449C19 1.15117 17.8495 0 16.4257 0ZM14.8309 6.09778L8.4976 14.0192C8.33813 14.213 8.11031 14.3383 7.85971 14.3497C7.84832 14.3497 7.82554 14.3497 7.81415 14.3497C7.57494 14.3497 7.35851 14.2585 7.18765 14.0876L4.22602 11.1242C3.88429 10.7822 3.88429 10.2124 4.22602 9.87043C4.56775 9.52849 5.13729 9.52849 5.47902 9.87043L7.73441 12.1272L13.4412 4.9808C13.7488 4.59328 14.307 4.53629 14.6829 4.84403C15.0701 5.15177 15.1271 5.71026 14.8195 6.08638L14.8309 6.09778Z" fill="white"/></svg>
                    </div> 
                    <div className="cardText" style={{paddingLeft:"8px"}}>
                        <p className='font-semibold text-[15px] text-[#1E1E1E]'>{props.heading}</p>
                        <p className='font-semibold text-[15px] text-[#1E1E1E]'>{props.count}</p>
                    </div>
                </div>
                <i  class="fa-solid fa-angle-right text-xl float-end text-[#1E1E1E]"></i>
            </div>
        </>
    );
}

export default DashboardtwoCards;
