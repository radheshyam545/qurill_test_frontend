import React, { useEffect, useState } from "react";
import ProfilePicture from "../../features/profile/ProfilePicture";
import { getProfileData } from "../../features/profile/profileSlice";
import { useDispatch } from "react-redux";
import DeleteUser from "../../features/jobSearch/DeleteUser";
import SettingComponent from "../../components/Settingcomponent";
import { postCall } from "../../app/axiosConfig";

function Profileinformation() {
  const dispatch = useDispatch();
  useEffect(() => {
    getPofileData();
  }, []);

  const getPofileData = async () => {
    try {
      dispatch(getProfileData());
    } catch (e) {
      console.log();
    }
  };

  const [profileStatusCheck, setProfileStatusCheck] = useState(false);
  const [disqualifierModal, setDisqualifierModal] = useState(false);
  const [disqualifierData, setDisqualifierData] = useState([]);

  const hendleTosubmit = async () => {
    setProfileStatusCheck(false);
    setDisqualifierModal(false);
    const responce = await postCall("/profile/delete", {});

    console.log(responce);

    if (responce?.status == 200) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  const cencelmd = async () => {
    setProfileStatusCheck(false);
    setDisqualifierModal(false);
  };

  return (
    <>
      <div className="bg-white h-[600px] p-[20px] rounded-xl ">
        {/* <div className=' h-[250px]  '>
          <div ><p className='font-bold '> Job Ad Notifications </p></div>
          <div className='flex justify-between mt-[10px]'>
            <div> <p className='font-bold '> TYPE </p></div>
            <div> <p className='font-bold'> DESCRIPTION </p></div>
            <div> <p className='font-bold'> ACTION </p></div>
          </div>
          <div class="border-t border-dotted border-[#CECECE]-300 border-t-[2.5px] mt-[10px] "></div>

          <div className='pt-[50px] '>
            <div>
              <span className='flex justify-center'>
                <img src="/assets/images/Group 1621.svg " alt="" className='mr-[10px]' />
              </span>
            </div>
            <div className='pt-[15px] flex justify-center'>No Record Found</div>
          </div>

        </div>
        
        <div className=' h-[250px]  '>
          <div ><p className='font-bold '> Other Notifications</p></div>
          <div className='flex justify-between mt-[10px]'>
            <div> <p className='font-bold '> TYPE </p></div>
            <div> <p className='font-bold'> DESCRIPTION </p></div>
            <div> <p className='font-bold'> ACTION </p></div>
          </div>
          <div class="border-t border-dotted border-[#CECECE]-300 border-t-[2.5px] mt-[10px] "></div>

          <div className='pt-[50px] '>
            <div>
              <span className='flex justify-center'>
                <img src="/assets/images/Group 1621.svg " alt="" className='mr-[10px]' />
              </span>
            </div>
            <div className='pt-[15px] flex justify-center'>No Record Found</div>
          </div>

        </div>


        <div>
          <button class="inline-flex py-2 px-4 rounded bg-[#FFCB05] hover:bg-[#F8B501] transition-colors duration-100 font-semibold">Save Changes</button>
        </div> */}

        <ProfilePicture />

        <div className="w-[97%] border border-[#919191] m-auto my-2 p-5 rounded bg-white ">
          <h2 className="text-2xl text-[18px] font-bold border-b border-slate-200 p-5">
            Account Management
          </h2>
          {/* component */}
          <div
            className="cursor-pointer"
            onClick={() => {
              setProfileStatusCheck(true);
              setDisqualifierModal(true);
            }}
          >
            <SettingComponent text={"Close account"} isNotToggleShow={true} />
          </div>
        </div>
        <div className={disqualifierModal ? "" : `hidden`}>
          <DeleteUser
            profileStatusCheck={profileStatusCheck}
            disqualifierModal={disqualifierModal}
            setDisqualifierModal={hendleTosubmit}
            cencelmd={cencelmd}
            disqualifierData={disqualifierData}
          />
        </div>
      </div>
    </>
  );
}

export default Profileinformation;
