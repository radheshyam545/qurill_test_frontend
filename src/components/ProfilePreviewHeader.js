import React, { useEffect, useRef, useState } from 'react';
import DashboardTwoButton from './DashboardTwoButton';
import DashboardTwoUnderlineButton from './DashboardTwoUnderlineButton';
import { useDispatch } from 'react-redux';
import { singleFileUpload } from '../app/helperFunction';
import { notifySuccess } from "../app/toaster";
import { postProfileData } from "../features/profile/profileSlice";


function ProfilePreviewHeader({ educationTraining, work, profilePagesData }) {
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const [loading, setLoading] = useState(false)
  const [CoverPicloading, setCovePicLoading] = useState(false)
  const dispatch = useDispatch()
  const [workloc, setWorkloc] = useState("")
  const [acdemicname, setAcdemicname] = useState("")
console.log("---->",)
  useEffect(() => {
    setAcdemicname(educationTraining[0]?.academicCenter)
    setWorkloc(work[0]?.employeer)
  }, [educationTraining]);

  const handleFileChange = async (e, key) => {
    if (e.target.files) {
      if (key === "photo") {
        setLoading(true)
        let res = await singleFileUpload(e.target.files[0])
      const { url } = res.data
        try {
          dispatch(postProfileData({ "photo": url })).unwrap().then(() => {
            notifySuccess('Skill Update Successfully')
            setLoading()
          })
        } catch (e) {
          console.log('error profile', e)
        }
      } else {
        setCovePicLoading(true)
        let res = await singleFileUpload(e.target.files[0])
      const { url } = res.data
        try {
          
          dispatch(postProfileData({ "coverPhoto": url })).unwrap().then(() => {
            notifySuccess('Skill Update Successfully')
            setCovePicLoading(false)
          })
        } catch (e) {
          console.log('error profile', e)
        }
      }
    }

  };



  const onCickEditButton = () => {
    fileInputRef2.current.click();
  }

  const handleClick = () => {
    fileInputRef.current.click();
  };


  return (
    <>
      <div className=' profile-header w-[100%] h-[500px] bg-[#FFFFFF] rounded-b-[15px] pb-[15px] '>
        <input
          type="file"
          className='hidden'
          id="cPhotoFile"
          ref={fileInputRef2}
          name="file"
          accept='.jpg,.jpeg,.png,.gif'
          multiple
          onChange={(e) => handleFileChange(e, 'coverPhoto')}
        />

        <input
          className='hidden'
          type="file"
          ref={fileInputRef}
          id="pPhotoFile"
          name="file"
          accept='.jpg,.jpeg,.png,.gif'
          multiple
          onChange={(e) => handleFileChange(e, 'photo')}
        />

        <div className='relative z-[1] w-[100%] bg-[#919191] h-[380px] bg-cover bg-no-repeat bg-center' style={{ backgroundImage: profilePagesData?.coverPhoto === "" ? "url()" : `url(${profilePagesData.coverPhoto})` }}>

          <span className='profile-preview-banner-btn absolute' style={{ bottom: "15px", right: "15px" }}>
          {CoverPicloading ?<>
                  <span className="flex gap-[10px] justify-center items-center">
                    <span className="loading"></span>
                  </span>
                  </>: <DashboardTwoUnderlineButton onCickEditButton={onCickEditButton} text={'Edit Profile'} bg={'#FFFFFF'} />
                }
           
          </span>

        </div>
        <div className="header-profile-section flex bg-[]   h-[100px] pl-[50px] px-[15px]  pb-[] relative " style={{ zIndex: "1" }}>
          <div className="header-profile-left h-[] w-[60%] bg-[] flex items-end relative">
            <div className="profile-circle h-[200px] w-[200px] bg-[#e5ebfe] border-4 border-[white] rounded-[50%] bg-cover bg-no-repeat bg-center flex relative" style={{ backgroundImage: profilePagesData?.photo === "" ? "url(/assets/images/connection-profile.svg)" : `url(${profilePagesData.photo})` }}>
              <span className='profile-preview-camera-circle w-[45px] h-[45px] rounded-[50%] border border-[3px] border-[black] bg-[#FFFFFF] absolute cursor-pointer flex justify-center items-center ' style={{ right: '-10px', bottom: '30px' }}>
                {loading ?<>
                  <span className="flex gap-[10px] justify-center items-center">
                    <span className="loading"></span>
                  </span>
                  </>:<img src="/assets/images/profile-camera-icon.svg" onClick={() => handleClick()} alt="" className='w-[28px]  ' />
                }
              </span>
            </div>{profilePagesData?.personalInformation?.personalInformation?.firstName&&profilePagesData?.personalInformation?.personalInformation?.firstName?<>
            <p className="profile-name text-[24px] text-[#2E2D46] cursor-pointer font-bold"> {`${profilePagesData?.personalInformation?.personalInformation?.firstName} ${profilePagesData?.personalInformation?.personalInformation?.lastName}`}</p>
            </>:""}
            <img src="assets/images/profile-pemcil-icon.svg" alt="" className='w-[16px] mb-[10px]  ml-[10px] cursor-pointer' />
          </div>
          <div className="header-profile-right h-[] w-[40%] bg-[] flex items-end justify-end relative">
            <div className=''>

              <span className='flex my-[2px] w-[100%] '>
                <img src="/assets/images/profile-preview-company.svg" alt="" />
                <p className='ml-[10px] font-15px-profile-preview  padding-00'>{workloc}</p>
              </span>
              <span className='flex my-[2px] w-[100%]'>
                <img src="/assets/images/profile-preview-city.svg" alt="" />
                <p className='ml-[10px] font-15px-profile-preview padding-00'>{acdemicname}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePreviewHeader;