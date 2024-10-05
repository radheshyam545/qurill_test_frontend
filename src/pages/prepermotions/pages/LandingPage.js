import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './landingpageNw.css';
import { useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from '../../../app/toaster'

function LandingPage() {
  const [queryParams, setQueryParams] = useState({});
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    setQueryParams(params);
  }, []);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleEmailVerification = async (values, { resetForm }) => {
    setLoading(true); // Show loader
    try {
      let obj = { email: values.email }
      const { ref } = queryParams
      if (ref) { obj = { ...obj, referance: ref } }
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/promotion/sign-up`, obj);
      const { data } = response;
      if (data.statusCode === 200) {
        notifySuccess(data.message)
        navigate("/emailverification-permotion")
      }
    }
    catch (error) {
      const { message } = error.response.data
      notifyError(message)
    }
    setLoading(false);
  };

  const validationSchema = Yup.object({ email: Yup.string().email('Invalid email address').required('Required') });
  return (
    <>
      <div className='outer_cont'>
        <div className='inner_cont'>

          <div className='section11 flex justify-center items-center w-[50%] p-[10px]'>
            <img  src='/assets/svg/pic.svg' className='w-[90%] h-[90%] object-contain' />
          </div>
          <div className='section2  w-[50%] p-[40px]'>
            {/* <div className='h-[60px] landing-logo-mbl-header w-[100%]  flex items-center justify-end'> */}
            <div className='flex landing-logo-mbl hidden flex  items-center  gap-[10px] justify-center '>
              <img src="/assets/svg/weblogo.svg" alt="" className='h-[40px] landing-logo' />
              <span className='text-[20px] font-semibold landing-logo-text'>Qruil</span>
            </div>
            <div className='flex gap-[5px] Login-Button'>
              <button className='bg-[#353535] text-[white] py-[10px] px-[20px] rounded-[5px] cursor-pointer' onClick={() => navigate("/login")}>Log In</button>
              <button className='bg-[#353535] text-[white] py-[10px] px-[20px] rounded-[5px] cursor-pointer' onClick={() => navigate("/register")}>Sign Up</button>
            </div>

            {/* </div> */}
            <div className='logo-align landing-text-wrapper landing-logo-laptop flex items-center gap-[10px] justify-center mb-[40px] mt-[40px]'>
              <img src="/assets/svg/weblogo.svg" alt="" className='h-[70px] landing-logo' />
              <span className='text-[28px] font-semibold landing-logo-text'>Qruil</span>
            </div>
            <h1 className='text-[36px] landing-heading font-semibold'>Job Applications should <span style={{ color: '#FF5733' }}>NOT</span> be<br />a full-time job</h1>
            <p>Apply to jobs at the click of a button</p>
            {/* //// */}
            {/* <div className='email_input '> */}
            <Formik
              initialValues={{ email: '' }}
              validationSchema={validationSchema}
              onSubmit={handleEmailVerification}
            >
              <Form className=' landing-form -h-[50px] -bg-[red] w-[90%] flex'>
                <Field
                  className='email  shadow1 h-[50px] border-none outline-none w-[75%] rounded-l-[25px] px-[20px]'
                  placeholder='Enter Email'
                  type="email"
                  name="email"
                />
                <button className='cta landing-cta text-[14px] h-[50px] w-[25%] bg-[#353535] m-[0px] px-[10px] text-[white] shadow1 rounded-r-[25px]' type="submit">
                  {loading ?
                    // <Spinner/>
                    <span className="loading"></span>
                    : 'Join Now'}
                </button>
              </Form>
            </Formik>
            {/* </div> */}
            {/* //// */}
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;