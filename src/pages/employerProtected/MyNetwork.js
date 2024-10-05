import React, { useState } from 'react';
import MyNetworkCards from '../../components/MyNetworkCards';
import MyRequestsCards from '../../components/MyRequestCards';
import ReactPaginate from "react-paginate";
function MyNetwork() {
  const [tabChange,setTabChange] = useState(1)
  const tabHandel = ((value)=>{
      setTabChange(value);
  
  })
  
const ArrowRight = () => {
  return (
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.00224 5.64428C6.90021 5.50966 6.85201 5.4274 6.78628 5.36196C5.12178 3.69613 3.45416 2.03342 1.79092 0.366338C1.47667 0.0509956 1.11673 -0.0805011 0.686678 0.0597204C0.0181257 0.278466 -0.215993 1.09424 0.225953 1.64204C0.279787 1.70873 0.342386 1.76793 0.403107 1.82838C2.32926 3.75035 4.25605 5.67294 6.18283 7.59429C6.72368 8.13399 7.2758 8.13523 7.81477 7.59803C9.75282 5.66547 11.6896 3.73103 13.6289 1.80034C13.8737 1.55666 14.0258 1.28432 13.9964 0.929718C13.9638 0.537097 13.766 0.253538 13.4111 0.0946206C13.0468 -0.0686596 12.695 -0.0175567 12.377 0.224248C12.2968 0.285322 12.2273 0.36073 12.156 0.432399C10.5115 2.07455 8.86768 3.7167 7.22509 5.36009C7.15936 5.42553 7.10929 5.50655 7.00162 5.64428L7.00224 5.64428Z" fill="#919191" />
      </svg>
  )
}
  const [currentPage, setCurrentPage] = useState(0); //Pagination

  const PER_PAGE = 100;
  const pageCount = Math.ceil(1000 / PER_PAGE);
  function handlePageClick({ selected: selectedPage }) {
      setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;

  return (
    <>
        <div className='  px-[20px] bg-[#FFFFFF]  rounded-[10px]  p-[5px] h-[100vh] overflow-scroll '>
    {/* Tabs section */}
    <div className='container h-[] w-[100%] m-auto flex items-center m-[10px] flex-wrap border-b-2 border-[#D8D8D8] mb-[15px]'>
      <button onClick={() => tabHandel(1)} className= {tabChange===1?' px-[10px] py-[8px] my-[10px] w-28 h-full rounded bg-[#FFCB05]  font-medium ml-4':'my-[5px] px-[10px] py-[8px] w-28 h-full rounded bg-white hover:bg-[#FFCB05] font-medium ml-4 transition-all border  border-[#D8D7D7]'}>
       Suggestions
      </button>
      <button onClick={() => tabHandel(2) }  className={tabChange===2?'my-[10px] px-[10px] py-[8px] w-28 h-full rounded bg-[#FFCB05]  font-medium ml-4':'my-[5px] px-[10px] py-[8px] w-28 h-full rounded bg-white hover:bg-[#FFCB05] font-medium ml-4 transition-all border  border-[#D8D7D7]'}>
        Friends
      </button>
      <button onClick={() => tabHandel(0) } className={tabChange===0?'my-[10px] px-[10px] py-[8px] w-28 h-full rounded bg-[#FFCB05]  font-medium ml-4':'my-[5px] px-[10px] py-[8px] w-28 h-full rounded bg-white hover:bg-[#FFCB05] font-medium ml-4 transition-all border  border-[#D8D7D7] '}>
        Requests
      </button>
    </div>
    {tabChange ==1 ? 
    <>
    <div className='overflow-scroll rounded-[15px] flex 'style={{gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', display:'grid', gridTemplateRows:'repeat(auto, 1fr)', gap:"10px"}}>
      
        <MyNetworkCards text={"connect"} flag={false} name={'Henry'} desc={'Full Stack Developer | React Native Developer'} plus={'+'} />
        <MyNetworkCards text={"connect"} flag={false} name={'Henry'} desc={'Full Stack Developer | React Native Developer'} plus={'+'} />
        <MyNetworkCards text={"connect"} flag={false} name={'Henry'} desc={'Full Stack Developer | React Native Developer'} plus={'+'} />
        <MyNetworkCards text={"connect"} flag={false} name={'Henry'} desc={'Full Stack Developer | React Native Developer'} plus={'+'} />
        <MyNetworkCards text={"connect"} flag={false} name={'Henry'} desc={'Full Stack Developer | React Native Developer'} plus={'+'} />
        <MyNetworkCards text={"connect"} flag={false} name={'Henry'} desc={'Full Stack Developer | React Native Developer'} plus={'+'} />
        <MyNetworkCards text={"connect"} flag={false} name={'Henry'} desc={'Full Stack Developer | React Native Developer'} plus={'+'} />
        {/* <MyNetworkCards text={"connect"} flag={false} name={'Henry'} desc={'Full Stack Developer | React Native Developer'} plus={'+'} />      */}
    </div>
    <div className="pagination-wrapper flex flex-row items-center justify-between mt-6 px-[15px] w-[100%]">
                    <div className='pagination'>
                        <span>
                            Showing {offset + 1} to {offset + PER_PAGE} of {1000}{" "}
                            entries
                        </span>
                    </div>
                    <div className="react-pagination">
                        <ReactPaginate
                            previousLabel={
                                <ArrowRight />
                            }
                            nextLabel={<ArrowRight />}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            // containerClassName={styles.pagination}
                            // previousLinkClassName={styles.paginationLink}
                            // nextLinkClassName={styles.paginationLink}
                            // disabledClassName={styles.paginationDisabled}
                            // activeClassName={styles.paginationActive}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={1}
                        />
                    </div>
                </div>   
    </>
    : 
    tabChange ==2 ?
     <>
    <div className='overflow-scroll rounded-[15px]'style={{gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', display:'grid', gridTemplateRows:'repeat(auto, 1fr)', gap:"10px"}}>    
        <MyNetworkCards text={"Message"} flag={false} name={'Henry'} desc={'Full Stack Developer | React Native Developer'} arrow={"/assets/images/network-card-arrow.svg"}/>
        <MyNetworkCards text={"Message"} flag={false} name={'Henry'} desc={'Full Stack Developer | React Native Developer'} arrow={"/assets/images/network-card-arrow.svg"}/>
        <MyNetworkCards text={"Message"} flag={false} name={'Henry'} desc={'Full Stack Developer | React Native Developer'} arrow={"/assets/images/network-card-arrow.svg"}/>
        <MyNetworkCards text={"Message"} flag={false} name={'Henry'} desc={'Full Stack Developer | React Native Developer'} arrow={"/assets/images/network-card-arrow.svg"}/>
        <MyNetworkCards text={"Message"} flag={false} name={'Henry'} desc={'Full Stack Developer | React Native Developer'} arrow={"/assets/images/network-card-arrow.svg"}/>
        <MyNetworkCards text={"Message"} flag={false} name={'Henry'} desc={'Full Stack Developer | React Native Developer'} arrow={"/assets/images/network-card-arrow.svg"}/>
        <MyNetworkCards text={"Message"} flag={false} name={'Henry'} desc={'Full Stack Developer | React Native Developer'} arrow={"/assets/images/network-card-arrow.svg"}/>
        <MyNetworkCards text={"Message"} flag={false} name={'Henry'} desc={'Full Stack Developer | React Native Developer'} arrow={"/assets/images/network-card-arrow.svg"}/>
    </div>
    <div className=" pagination-wrapper flex flex-row items-center justify-between mt-6 px-[15px] w-[100%] overflow-scroll">
                    <div className='as' id='pagination-id'>
                        <span id='pagination'>
                            Showing {offset + 1} to {offset + PER_PAGE} of {1000}{" "}
                            entries
                        </span>
                    </div>
                    <div className="react-pagination">
                        <ReactPaginate
                            previousLabel={
                                <ArrowRight />
                            }
                            nextLabel={<ArrowRight />}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            // containerClassName={styles.pagination}
                            // previousLinkClassName={styles.paginationLink}
                            // nextLinkClassName={styles.paginationLink}
                            // disabledClassName={styles.paginationDisabled}
                            // activeClassName={styles.paginationActive}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={1}
                        />
                    </div>
                </div>
    </>
    :    

    <>
    <div className='overflow-scroll rounded-[15px]  ' style={{gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', display:'grid', gridTemplateRows:'repeat(auto, 1fr)', gap:"10px"}}> 
        <MyRequestsCards/>
        <MyRequestsCards/>
        <MyRequestsCards/>
        <MyRequestsCards/>
        <MyRequestsCards/>
        <MyRequestsCards/>
        <MyRequestsCards/>
        <MyRequestsCards/>
    </div>
    <div className= "pagination-wrapper network-pagination flex flex-row items-center justify-between mt-6 px-[15px] w-[100%] overflow-scroll">
                    <div className='as'>
                        <span id='as' className='network-pagination-title'>
                            Showing {offset + 1} to {offset + PER_PAGE} of {1000}{" "}
                            entries
                        </span>
                    </div>
                    <div className="react-pagination">
                        <ReactPaginate
                            previousLabel={
                                <ArrowRight />
                            }
                            nextLabel={<ArrowRight />}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            // containerClassName={styles.pagination}
                            // previousLinkClassName={styles.paginationLink}
                            // nextLinkClassName={styles.paginationLink}
                            // disabledClassName={styles.paginationDisabled}
                            // activeClassName={styles.paginationActive}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={1}
                        />
                    </div>
                </div>

    </>
    }

    {/* Cards section */}
    {/* Card header */}
   </div>
   
    </>
  );
}

export default MyNetwork;

// style={{gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', display:'grid', gridTemplateRows:'repeat(4, 1fr)'}}