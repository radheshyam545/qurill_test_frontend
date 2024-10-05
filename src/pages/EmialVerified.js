import React, { useEffect, useState } from "react";
import { putCall } from "../app/axiosConfig";
import { notifySuccess } from "../app/toaster";
import { useNavigate } from "react-router-dom";
function EmailVerified() {
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    setQueryParams(params);
  }, []);

  const emailVarification = async () => {
    try {
      setLoading(true);
      const res = await putCall(
        `/auth/verify-email?email=${queryParams.email}`
      );
      const { data } = res;
      if (data.success) {
        notifySuccess(data.message);
        navigate("/login");
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("Error Verify email", e);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <div className="flex flex-col items-center justify-center">
          <img
            src="/assets/images/Emailverified.svg"
            alt=""
            className="h-[180px] w-[180px]"
          />
          <h1 className="font-bold text-[50px]">Confirm Your Email !</h1>
          {/* <p>
            This code generates and displays three random Lorem Ipsum paragraphs
            on the email verification page. You can adjust the numParagraphs
            parameter in the generateLoremIpsum function to change the number of
            paragraphs displayed.
          </p> */}
          {/* <h1 className="font-bold text-[40px]">Verify Now</h1> */}
          <div className="p-3">
            <button
              className="inline-flex py-2 px-4 rounded bg-yellow-500 hover:bg-yellow-400 transition-colors duration-100"
              onClick={() => {
                emailVarification();
              }}
            >
              {loading ? <span className="loading"></span> : "Verify Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerified;
