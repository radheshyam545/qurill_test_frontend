import React, { useEffect } from 'react';
import ProfilePreviewHeader from '../../components/ProfilePreviewHeader';
import PreviewAbout from '../../components/PreviewAbout';
import PreviewEducation from '../../components/PreviewEducation';
import PreviewSkill from '../../components/PreviewSkill';
import PreviewExperience from '../../components/PreviewExperience';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileData } from '../../features/profile/profileSlice';

function ProfilePreview() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getProfileData())
  },[])

  const { profilePagesData } = useSelector(state => state.profile)
  const { skills,work,educationTraining,personalInformation } = profilePagesData
  return (
    <>
    

    <div className='h-[] bg-[] '>
    <ProfilePreviewHeader  educationTraining={educationTraining?? []} work={work ?? []} profilePagesData={profilePagesData??[]} />
    {
      profilePagesData && Object.keys(profilePagesData).length>0 &&
    <div className='mt-[15px] rounded-[15px]  '>
        <PreviewAbout personalInformation={personalInformation ?? []}  educationTraining={educationTraining ?? []} />
        <PreviewEducation educationTraining={educationTraining ?? []}/>
        <PreviewExperience work={work ?? []}/>
        <PreviewSkill skills={skills ?? []}/>
    </div>
    }
    </div>
   
   


    </>
  );
}

export default ProfilePreview;