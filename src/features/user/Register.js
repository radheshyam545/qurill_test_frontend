import { useState, useRef, useEffect } from 'react'
// import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { postCall } from '../../app/axiosConfig'
import { notifyError, notifySuccess } from '../../app/toaster'

function Register() {
    const [isButton1Clicked, setIsButton1Clicked] = useState(false);

    const handleButton1Click = () => {
        setIsButton1Clicked(true);
    };

    const handleButton2Click = () => {
        setIsButton1Clicked(false);
    };
    const navigate = useNavigate()
    const INITIAL_REGISTER_OBJ_OF_Seeker = {
        firstName: "",
        lastName: "",
        password: "",
        email: ""
    }
    const INITIAL_REGISTER_OBJ_OF_Employer = {
        businessName: "",
        password: "",
        email: ""
    }
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ_OF_Seeker)
    useEffect(() => {
        setRegisterObj(isButton1Clicked ? INITIAL_REGISTER_OBJ_OF_Employer : INITIAL_REGISTER_OBJ_OF_Seeker)
    }, [isButton1Clicked])
    const submitForm = async (e) => {
        e.preventDefault()
        setErrorMessage("")
        if (!isButton1Clicked) {
            if (registerObj?.firstName.trim() === "") return setErrorMessage("First Name is required!")
            if (registerObj?.lastName.trim() === "") return setErrorMessage("Last Name is required!")
            if (registerObj?.email.trim() === "") return setErrorMessage("Email is required!")
            if (registerObj?.password.trim() === "") return setErrorMessage("Password is required!")
            else {
                try {
                    registerObj.role = isButton1Clicked ? 'EMPLOYER' : 'SEEKER'
                    setLoading(true)
                    const responce = await postCall('/auth/sign-up', registerObj)

                    const { data, status } = responce

                    if (status === 200) {
                        setLoading(false)
                        console.log('')
                        notifySuccess(data?.message)
                        navigate('/login')
                    }
                } catch (e) {
                    const { response } = e
                    setLoading(false)
                    if (response?.status === 400) {
                        const { data } = response
                        notifyError(data?.message)
                    }
                }
            }
        } else if (isButton1Clicked) {
            if (registerObj?.email.trim() === "") return setErrorMessage("Email is required!")
            if (registerObj?.password.trim() === "") return setErrorMessage("Password is required!")
            if (registerObj?.businessName.trim() === "") return setErrorMessage("Business Name is required!")
            else {
                try {
                    registerObj.role = isButton1Clicked ? 'EMPLOYER' : 'SEEKER'
                    setLoading(true)
                    // Call API to check user credentials and save token in localstorage
                    const responce = await postCall('/auth/sign-up', registerObj)

                    const { data, status } = responce

                    if (status === 200) {
                        setLoading(false)
                        console.log('')
                        notifySuccess(data?.message)
                        navigate('/login')
                    }
                } catch (e) {
                    const { response } = e
                    setLoading(false)
                    if (response?.status === 400) {
                        const { data } = response
                        notifyError(data?.message)
                    }
                }
            }
        }


    }



    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setRegisterObj({ ...registerObj, [updateType]: value })
    }


    return (
        <div className="min-h-screen bg-[#F3F8FC] flex items-center">
            <div className="card mx-auto w-full max-w-[600px]">
                <div className=" column-reverse-767  bg-base-100 rounded-xl">
                    {/* <div className='bg-[#F2F2F2]'>
                        <LandingIntro
                            heading={'New Here?'}
                            subHeading={'Register and discover a great amount of new opportunities!'}
                        />
                    </div> */}
                    <div className='pb-[100px] pt-[60px] px-[54px] bg-[#fff]'>
                    <div className='flex justify-center items-center'> 
                    <img src="/logo_1.png" className="w-[58px] h-[58px] inline-block mr-2 mask -mask-circle" alt="dashwind-logo" />
                    <img src="/logotext.svg" className="h-[30px] inline-block mr-2 mask -mask-circle" alt="dashwind-logo" />
                    </div>
                        <h2 className='text-[24px] font-semibold mb-[40px] text-center mt-[55px]'>Register</h2>

                        {/* employer / jobhunter buttons */}
                        <div className='w-full flex justify-between border border-[#FFCB05] rounded  bg-[#FFCB05] '>
                            <button className={`border border-[#FFCB05] text-[20px] text-center w-full rounded py-3 ${isButton1Clicked ? 'bg-[#FFCB05]' : 'bg-white'}`}
                                value="EMPLOYER"
                                checked={role}
                                onChange={() => { setRole(!role); }}
                                onClick={handleButton1Click}>Employer</button>

                            <button className={`text-[20px] text-center w-full py-3 ${isButton1Clicked ? 'bg-white' : 'bg-[#FFCB05]'}`}
                                value="SEEKER"
                                checked={!role}
                                onChange={() => { setRole(!role); }}
                                onClick={handleButton2Click}>Job hunter</button>
                        </div>
                        <form onSubmit={(e) => submitForm(e)}>
                            {/* jobhunter Register Form */}
                            <div className={`${isButton1Clicked ? 'hidden' : 'block'} mb-4 mt-10`}>
                                <InputText defaultValue={registerObj.text} updateType="firstName" containerStyle="mt-4" labelTitle="First name" updateFormValue={updateFormValue} />
                                <InputText defaultValue={registerObj.text} updateType="lastName" containerStyle="mt-4" labelTitle="Last name" updateFormValue={updateFormValue} />
                                <InputText defaultValue={registerObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue} />
                                <InputText defaultValue={registerObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />
                            </div>
                            {/* employer Register Form */}
                            <div className={`${isButton1Clicked ? 'block' : 'hidden'} mb-4 mt-10`}>
                                <InputText defaultValue={registerObj.email} updateType="email" containerStyle="mt-4" labelTitle="Organization Email" updateFormValue={updateFormValue} />
                                <InputText defaultValue={registerObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />
                                <InputText defaultValue={registerObj.text} updateType="businessName" containerStyle="mt-4" labelTitle="Legal business name" updateFormValue={updateFormValue} />
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn w-full btn-primary text-[20px] h-auto py-[18px] font-normal rounded-[5px] min-h-auto text-black"}>{loading ? <span className="loading"></span> : 'Register'}</button>

                            <div className='text-center mt-[20px] text-[20px]'>Already have an account? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Register;





