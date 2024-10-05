
import React, { useState, useEffect } from "react";
import "./VerificationPage.css";
import axios from "axios";
// import { notifyError } from "../app/toaster";
import Spinner from "../component/spinner";

const VerificationPage = () => {

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  useEffect(() => {
    
    if (params.ref) getVerify(params)
  }, []);

  const getVerify = async (params) => {
    setLoading(true)
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/promotion/email-varification/${params.ref}`)
      const { data } = res
      if (data.success) {
        setSuccess(true)
      }
      setLoading(false)

    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <div className="flex justify-center h-[100vh] bg-[#FEF5E6]  -flex-col">
      <div className="min-h-[100vh] -bg-[#FEF5E6] pt-[40px] flex flex-col items-center">
        <div className="h-[300px] w-[300px] bg-[#EF941F] rounded-[50%] relative overflow-hidden mt-[80px] thankyou-img-wrapper ">
          <img src="/assets/svg/thankyouicon.svg" alt="" className="h-[100%] thankyou-img relative" />
          <div className="bg-[#EF941F] h-[30px] w-[300px] absolute bottom-[2px] right-[0px]"></div>
        </div>
        <p className="thankyou-text mt-[40px] text-[25px] font-semibold">
          {(params?.ref && loading )  &&  <Spinner/> }
          {(params?.ref && !loading && success)  &&  "Thank you for verifying your email" }
          {(params?.ref && !loading && !success)  &&  "Invalid Referance Number" }
          {(!params?.ref)  &&  "Welcome to our waitlist" }
          </p>
      </div>
    </div>
  );
};

export default VerificationPage;
