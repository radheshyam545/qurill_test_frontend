import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { postCall } from '../../app/axiosConfig'
import { notifyError } from '../../app/toaster'
// import { USER_ROLE } from '../../app/enums'

function Login() {
    const navigate = useNavigate()

    const INITIAL_LOGIN_OBJ = {
        password: "",
        email: ""
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

    const submitForm = async (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (loginObj.email.trim() === "") return setErrorMessage("Email is required! (use any value)")
        if (loginObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)")
        else {
            setLoading(true)
            // Call API to check user credentials and save token in localstorage
            try {
                const responce = await postCall('/auth/sign-in', loginObj)
                const { data: { data, message: newMessage }, status, message } = responce
                if (status === 200) {
                    if (data == null) {
                        setLoading(false)
                        notifyError(newMessage)
                        return
                    }
                    const { user, token } = data
                    // const role = tokenData?.user?.role
                    // const user = USER_ROLE.EMPLOYER
                    localStorage.setItem("token", token)

                    //for notification
                    if (navigator.serviceWorker.controller) {
                        navigator.serviceWorker.controller.postMessage({ type: 'SET_TOKEN', token: localStorage.getItem('token') });
                    }
                    localStorage.setItem("role", user?.role)
                    if (user?.role == "EMPLOYER") {
                        localStorage.setItem("Status", user?.status)
                    }
                    setLoading(false)
                    //windo reload 
                    window.location.reload()
                }
                else {
                    setLoading(false)
                    setErrorMessage(data.message)
                }
            } catch (e) {
                setLoading(false)
            }
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

    return (
        <div className="min-h-screen bg-[#F3F8FC] flex items-center">
            <div className="card mx-auto w-full max-w-[600px]">
                <div className=" column-reverse-767 bg-base-100 rounded-xl">
                    {/* <div className='bg-[#F2F2F2]'>
                        <LandingIntro
                            heading={'Welcome Back!'}
                            subHeading={"Login and discover a great amount of new opportunities!"}
                        />
                    </div> */}
                    <div className='pb-[100px] pt-[60px] px-[54px] bg-[#fff] rounded-[15px]'>
                        <div className='flex justify-center items-center'>
                            <img src="/logo_1.png" className="w-[58px] h-[58px] inline-block mr-2 mask -mask-circle" alt="dashwind-logo" />
                            <img src="/logotext.svg" className="h-[30px] inline-block mr-2 mask -mask-circle" alt="dashwind-logo" />
                        </div>
                        <h2 className='text-[24px] font-semibold mb-[10px] text-center mt-[55px]'>Login</h2>
                        <form onSubmit={(e) => submitForm(e)}>

                            <div className="mb-4">
                                <InputText type="email" defaultValue={loginObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue} />
                                <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />
                            </div>

                            <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-[20px] text-[#000]  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn w-full btn-primary text-[20px] h-auto py-[18px] font-normal rounded-[5px] min-h-auto text-black "}> {loading ? <span className="loading"></span> : 'Login'}</button>

                            <div className='text-center mt-[20px] text-[20px]'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login