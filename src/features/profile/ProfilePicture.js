import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postProfileData } from './profileSlice';
import { notifySuccess } from '../../app/toaster';
import { singleFileUpload } from '../../app/helperFunction';
import CustomOverlay from '../../containers/CustomOverlay';


// async function singleFileUpload(file) {
//     // Mock function for file upload, replace with your actual upload logic
//     return new Promise((resolve) => {
//         setTimeout(() => resolve({ data: { url: URL.createObjectURL(file) } }), 1000);
//     });
// }

function ProfilePicture() {
    const { profilePagesData } = useSelector(state => state.profile)
  const { skills,work,educationTraining,personalInformation } = profilePagesData
    const fileInputRef = useRef(null);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('');
    const [isLoading, setLoading2] = useState(false);

    const handleFileChange = async (e, key) => {
        
        if (e.target.files) {
            if (key === "photo") {
                setLoading2(true)
                let res = await singleFileUpload(e.target.files[0])
                setLoading2(false)
                const { url } = res.data
                try {
                    dispatch(postProfileData({ "photo": url })).unwrap().then(() => {
                    setImage(url);
                        notifySuccess('Skill Update Successfully')
                        setLoading()
                    })
                } catch (e) {
                setLoading2(false)
                    console.log('error profile', e)
                }
            }
        }

    };
    // const handleFileChange = async (e) => {
    //     setLoading(true);
    //     const file = e.target.files[0];
    //     if (file) {
    //         const res = await singleFileUpload(file);
    //         const { url } = res.data;
    //         setImage(url);
    //         setLoading(false);
    //     }
    // };

    // const handleDeleteImage = () => {
    //     setImage('');
    // };
    const handleClick = () => {
        fileInputRef.current.click();
    };
    return (
        <div>
            <div className="portfolio-project-upload-section flex gap-[20px]">
                <div className="portfolio-project-upload-left mb-5 w-2/12">
                < CustomOverlay isLoading={isLoading} />
                    <label className="mb-1 block font-semibold text-[15px]">Upload Profile Picture</label>
                    <div className="relative py-2 h-[250px] w-[250px] gap-1 flex items-center justify-center flex-col border-[1px] border-dashed border-[#BFBFBF]">
                        <input
                            className="absolute cursor-pointer left-0 top-0 w-full h-full z-1 opacity-0"
                            type="file"
                            // id="profilePicture"
                            id="pPhotoFile"
                            ref={fileInputRef}

                            name="file"
                            accept=".jpg,.jpeg,.png,.gif"
                            // onChange={handleFileChange}
                            onChange={(e) => handleFileChange(e, 'photo')}

                            aria-label="Upload Profile Picture"
                            multiple

                        // disabled={!!image} // Disable input if an image is already uploaded
                        />
                        {profilePagesData?.photo ? (
                            <div className="relative w-full h-full">
                                <img src={profilePagesData?.photo} alt="Profile Preview" className=" w-full h-full  object-contain" />
                                <button
                                    // onClick={handleDeleteImage}
                                    onClick={() => handleClick()}
                                    className="absolute top-2 text-[15px] right-2 bg-[red] text-white px-2 py-1 rounded"
                                    aria-label="Delete Picture"
                                >
                                    Edit
                                </button>
                            </div>
                        ) : (
                            <>
                                <svg width="85" height="66" viewBox="0 0 85 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M42.443 65.9936C31.5377 65.9936 20.6349 65.9936 9.72963 65.9936C3.83864 65.9936 0 62.201 0 56.383C0 40.7968 0 25.2105 0 9.62427C0 3.80384 3.84118 0.00866233 9.7271 0.00866233C15.6054 0.00866233 21.4863 -0.0163718 27.3646 0.018676C30.998 0.0387033 34.1753 1.2103 36.6736 3.91649C36.8865 4.1468 37.155 4.3596 37.2767 4.63247C37.8341 5.88417 38.8223 6.04189 40.0942 6.03438C49.7985 5.98431 59.5003 6.00434 69.2046 6.00684C75.0879 6.00684 78.9747 9.79951 78.8759 15.6325C78.8455 17.455 79.0913 18.6416 80.9612 19.6529C83.6748 21.1199 84.9544 23.7936 84.9671 26.8703C85.0101 36.929 85.0127 46.9852 84.9721 57.0439C84.9519 62.1058 80.9206 65.9786 75.729 65.9886C64.6337 66.0087 53.5409 65.9936 42.4455 65.9936H42.443ZM45.5266 35.9902C45.894 36.3157 46.1245 36.5084 46.3399 36.7162C48.3517 38.6564 50.3559 40.609 52.3779 42.5417C53.7182 43.8234 55.5628 43.8484 56.7815 42.6368C58.0079 41.4176 57.98 39.5926 56.6472 38.2909C53.3635 35.089 50.0772 31.8871 46.7478 28.7328C44.2876 26.4021 40.7656 26.3696 38.2902 28.6978C34.9025 31.8821 31.5706 35.1265 28.2691 38.401C27.7953 38.8691 27.4862 39.6202 27.3646 40.2886C27.1492 41.4877 27.8891 42.6568 28.9913 43.2051C30.1593 43.7859 31.4769 43.6056 32.4904 42.6468C34.5883 40.6566 36.6559 38.6363 38.7386 36.6336C38.9261 36.4534 39.139 36.2956 39.4582 36.0253C39.4582 36.5285 39.4582 36.8664 39.4582 37.2044C39.4582 42.762 39.4405 48.322 39.481 53.8796C39.4861 54.563 39.6685 55.3241 40.0106 55.9099C40.6871 57.0715 42.1339 57.5146 43.4033 57.1265C44.6727 56.736 45.5215 55.5669 45.524 54.1224C45.5342 48.4697 45.5291 42.817 45.5291 37.1643C45.5291 36.8339 45.5291 36.5034 45.5291 35.9927L45.5266 35.9902ZM41.2597 12.005C41.921 13.3494 42.557 14.556 43.1144 15.7952C43.8112 17.3423 44.9489 18.0282 46.682 18.0207C55.051 17.9832 63.42 18.0032 71.7865 18.0032H72.838C72.838 17.097 72.838 16.3209 72.838 15.5448C72.8354 13.1366 71.6851 12.005 69.2375 12.005C60.268 12.005 51.301 12.005 42.3315 12.005H41.2547H41.2597Z" fill="#F1F1F1" />
                                </svg>
                                <h5 className="text-16 font-semibold mt-3">
                                    {loading ? <span className="loading"></span> : 'Upload Picture'}
                                </h5>
                                <p className="text-13 m-0 text-[#CECECE]">
                                    <span className="text-[#4C73FF] underline">choose files Profile Picture</span>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePicture;
