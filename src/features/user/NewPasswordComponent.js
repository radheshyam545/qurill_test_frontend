import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';
import axios from 'axios';
import { postCall } from '../../app/axiosConfig';
import { notifyError, notifySuccess } from '../../app/toaster';

function NewPasswordComponent() {
    const navigate = useNavigate()
    const INITIAL_USER_OBJ = {
        newPassword: "",
        comfirmPassword: ""
    };
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);
    const [queryParams, setQueryParams] = useState({});

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        setQueryParams(params);
    }, []);
    const updateFormValue = ({ updateType, value }) => {

        setUserObj(prevState => ({
            ...prevState,
            [updateType]: value
        }));
    };
    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        if (userObj.newPassword !== userObj.comfirmPassword) {
            setErrorMessage("Passwords do not match.");
            setLoading(false);
            return;
        }
        try {
            const response = await postCall('/auth/reset-password', {
                resetToken: queryParams.resetToken,
                password: userObj.comfirmPassword
            });
            if (response?.status == 200) {
                notifySuccess(response?.data?.message)
                navigate('/login')
            }
        } catch (error) {
            notifyError(error?.response?.data?.message || 'Error updating newPassword. Please try again.');
            setErrorMessage("Error updating newPassword. Please try again.");
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
                        <h2 className='text-[24px] font-semibold mb-[10px] text-center mt-[55px]'>Set New Password</h2>
                        <form onSubmit={submitForm}>
                            <div className="mb-4">
                                <InputText
                                    type="password"
                                    defaultValue={userObj.newPassword}
                                    updateType="newPassword"
                                    containerStyle="mt-4"
                                    labelTitle="New Password"
                                    updateFormValue={updateFormValue}
                                />
                            </div>
                            <div className="mb-4">
                                <InputText
                                    type="password"
                                    defaultValue={userObj.comfirmPassword}
                                    updateType="comfirmPassword"
                                    containerStyle="mt-4"
                                    labelTitle="Confirm Password"
                                    updateFormValue={updateFormValue}
                                />
                            </div>
                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button
                                type="submit"
                                className="btn w-full btn-primary text-[20px] h-auto py-[18px] font-normal rounded-[5px] min-h-auto text-black"
                            >
                                {loading ? <span className="loading"></span> : 'Confirm'}
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

export default NewPasswordComponent;
