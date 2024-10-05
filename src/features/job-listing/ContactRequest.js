import React, { useEffect, useState } from 'react';
import { postCall } from '../../app/axiosConfig';
import { notifySuccess } from '../../app/toaster';
import { getJobBoardData } from '../jobSearch/jobSearchSlice';
import { useDispatch } from 'react-redux';

function ContactRequest({ status: pageStatus, contactRequest, setContactRequest, detailForContact }) {
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)
  const [buttonShow, setButtonShow] = useState(false)
  const [payload, setPayload] = useState({ jobId: '', status: '' });
  useEffect(() => { setPayload({ jobId: "", status: detailForContact?.contactRequest?.status }); }, [detailForContact])
  useEffect(() => { if (payload.status) { processPayload() } }, [payload]);
  const handleResponse = (value) => { setPayload({ jobId: detailForContact?._id, status: value }); };

  const processPayload = async () => {
    setLoader(true)
    try {
      const response = await postCall('/jobs/response-contact-request', payload);
      if (response?.status === 200) {
        notifySuccess("Contact details shared with the company successfully");
        setButtonShow(true)
        setLoader(false)
        setContactRequest(false)
        dispatch(getJobBoardData(pageStatus));

      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoader(false)
    }
  };

  return (
    <>
      <div className=' flex justify-center items-center model h-[100vh] w-[100%] top-0 left-0 fixed bg-[#0000005e] z-[999999]'>
        <div className=' max-h-[80%] h-[280px] scrollnone w-[600px] bg-[white] overflow-y-scroll rounded-[15px] p-[15px]'>
          <div className="header flex justify-between border-b pb-[10px]">
            <p className='font-semibold'>Contact Request</p>
            <img onClick={() => { setContactRequest(!contactRequest) }} className='cursor-pointer' src="/assets/images/job-board-contact-request-popup-croxx.svg" alt="" />
          </div>
          {console.log('detailForContact===>payload', payload)}
          <div className="center py-[15px] flex flex-col gap-[8px] border-b">
            <p className='font-semibold'> {payload.status === "pending" ? `Your contact information has been requested by the ${detailForContact?.businessName}.` : ""}</p>
            <p className='font-semibold'> {payload.status === "accepted" ? "Your contact details have been shared with the company." : ""}</p>
            <p className='font-semibold'> {payload.status === "rejected" ? "Your contact details have been not shared with the company." : ""}</p>
            <p>- Personal Information</p>
            <p>- Contact</p>
            <p>- Address</p>
          </div>
          {detailForContact?.contactRequest?.status === "pending" && !buttonShow &&
            <div className="-footer grid gap-2 float-right pt-[15px] grid-cols-2 ">
              <button className='px-[23px] -py-[4px] rounded-[5px] bg-[#E2E2E2] ' onClick={() => handleResponse('rejected')}>{loader && payload.status == "rejected" ? "Loading..." : "Decline"}  </button>
              <button className='px-[23px] -py-[4px] rounded-[5px] bg-[#FFCB05] ' onClick={() => handleResponse('accepted')}>{loader && payload.status == "accepted" ? "Loading..." : "Accept"}</button>
            </div>
          }

        </div>
      </div>
    </>
  );
}

export default ContactRequest;
