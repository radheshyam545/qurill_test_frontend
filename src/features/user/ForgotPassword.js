import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';
import { postCall } from '../../app/axiosConfig';
import { notifySuccess } from '../../app/toaster';

function ForgotPassword() {
    const INITIAL_USER_OBJ = {
        emailId: ""
    };
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);
    const updateFormValue = ({updateType,value}) => {
        setUserObj(prevState => ({
            ...prevState,
            [updateType]: value
        }));
    };
    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {  
            const response = await postCall("/auth/forgot-password",{ email: userObj.emailId });
                
            notifySuccess(response?.data?.message)
                console.log(response)

        } catch (error) {
            setErrorMessage("Please enter a valid Email ID.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-[#F3F8FC] flex items-center">
            <div className="card mx-auto w-full max-w-[600px]">
                <div className="column-reverse-767 bg-base-100 rounded-xl">
                    <div className='pb-[100px] pt-[60px] px-[54px] bg-[#fff] rounded-[15px]'>
                        <div className='flex justify-center items-center'> 
                            <img src="/logo_1.png" className="w-[58px] h-[58px] inline-block mr-2 mask -mask-circle" alt="logo" />
                            <img src="/logotext.svg" className="h-[30px] inline-block mask -mask-circle" alt="logo text" />
                        </div>
                        <h2 className='text-[24px] font-semibold mb-[10px] text-center mt-[55px]'>Forgot Password</h2>
                        <form onSubmit={submitForm}>
                            <div className="mb-4">
                                <InputText 
                                    type="email" 
                                    defaultValue={userObj.emailId} 
                                    updateType="emailId" 
                                    containerStyle="mt-4" 
                                    labelTitle="Email" 
                                    updateFormValue={updateFormValue} 
                                />
                            </div>
                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button 
                                type="submit" 
                                className="btn w-full btn-primary text-[20px] h-auto py-[18px] font-normal rounded-[5px] min-h-auto text-black"
                            >
                                {loading ? <span className="loading"></span> : 'Send Reset Link'}
                            </button>
                            <div className='text-center mt-[20px] text-[20px]'>
                                Don't have an account yet? 
                                <Link to="/register">
                                    <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                        Register
                                    </span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
