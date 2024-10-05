import { useEffect, useState } from "react";
import PersonalInformation from "./PersonalInformation";
import Work from "./work";
import Education from "./Education";
import Skills from "./Skills";
import Portfolio from "./Portfolio";
import { getCall } from "../../app/axiosConfig";
import { useSelector, useDispatch } from 'react-redux'
import { getProfileData } from "./profileSlice";
import CustomOverlay from "../../containers/CustomOverlay";
import QuestionAnswer from "./Schemas/QuestionAnswer";
import ProfilePicture from "./ProfilePicture";

const ProfilePage = () => {

  const dispatch = useDispatch()
  const [showPersonalInformation, setPersonalInformation] = useState(true);
  const [showWork, setWork] = useState(false);
  const [showEducation, setEducation] = useState(false);
  const [showSkills, setSkills] = useState(false);
  const [showPortfolio, setPortfolio] = useState(false);
  const [showQuestionAnswer, setQuestionAnswer] = useState(false);
  const [showProfilePicture, setProfilePicture] = useState(false);

  useEffect(() => { getPofileData() }, []);
  const { profilePagesData } = useSelector(state => state.profile)

  const getPofileData = async () => {
    try { dispatch(getProfileData()) }
    catch (e) { console.log() }
  }
  
  const id= profilePagesData?.user?._id
  console.log(id,"dsdsdsdsddsd")

useEffect(() => {
  localStorage.setItem('id', id);
}, [id]);
  const handleTabClick = (section) => {
    setPersonalInformation(false);
    setWork(false);
    setEducation(false);
    setSkills(false);
    setPortfolio(false);
    setQuestionAnswer(false);
    setProfilePicture(false)
    switch (section) {
      case "personalInformation":
        setPersonalInformation(true);
        break;
      case "Work":
        setWork(true);
        break;
      case "Education":
        setEducation(true);
        break;
      case "skills":
        setSkills(true);
        break;
      case "Portfolio":
        setPortfolio(true);
        break;
      case "QuestionAnswer":
        setQuestionAnswer(true);
        break;
      case "ProfilePicture":
        setProfilePicture(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="profile ">
      {/* <div className="mb-5 text-center">
        <span className="px-[16px] py-[7px] rounded-[8px] bg-[#1F1E2C] text-[#fff] cursor-pointer">Porfile Preview</span>
      </div> */}
      <div className="card bg-white py-[32px] px-[52px] padding-10px rounded-[10px] ">
        <div className="flex items-center justify-between ">
          <ul className="flex items-center gap-[11px] flex-wrap m-[10px]">
            <li
              className={`py-[8px] px-[13px] rounded-[5px] text-[15px] font-semibold cursor-pointer border  border-[#D8D7D7] hover:bg-[#FFCB05] ${showPersonalInformation ? "bg-[#FFCB05]" : ""
                }`}
              onClick={() => handleTabClick("personalInformation")}
            >
              Profile
            </li>
            <li
              className={`py-[8px] px-[13px] rounded-[5px] text-[15px] font-semibold cursor-pointer border  border-[#D8D7D7] hover:bg-[#FFCB05] ${showWork ? "bg-[#FFCB05]" : ""
                }`}
              onClick={() => handleTabClick("Work")}
            >
              Work
            </li>
            <li
              className={`py-[8px] px-[13px] rounded-[5px] text-[15px] font-semibold cursor-pointer border border-[#D8D7D7] hover:bg-[#FFCB05] ${showEducation ? "bg-[#FFCB05]" : ""
                }`}
              onClick={() => handleTabClick("Education")}
            >
              Education and training
            </li>
            <li
              className={`py-[8px] px-[13px] rounded-[5px] text-[15px] font-semibold cursor-pointer border border-[#D8D7D7] hover:bg-[#FFCB05] ${showSkills ? "bg-[#FFCB05]" : ""
                }`}
              onClick={() => handleTabClick("skills")}
            >
              Skills
            </li>
            <li
              className={`py-[8px] px-[13px] rounded-[5px] text-[15px] font-semibold cursor-pointer border  border-[#D8D7D7] hover:bg-[#FFCB05] ${showPortfolio ? "bg-[#FFCB05]" : ""
                }`}
              onClick={() => handleTabClick("Portfolio")}
            >
              Portfolio
            </li>
            <li
              className={`py-[8px] px-[13px] rounded-[5px] text-[15px] font-semibold cursor-pointer border  border-[#D8D7D7] hover:bg-[#FFCB05] ${showQuestionAnswer ? "bg-[#FFCB05]" : ""
                }`}
              onClick={() => handleTabClick("QuestionAnswer")}
            >
              Question/Answer
            </li>
            <li
              className={`py-[8px] px-[13px] rounded-[5px] text-[15px] font-semibold cursor-pointer border  border-[#D8D7D7] hover:bg-[#FFCB05] ${showProfilePicture ? "bg-[#FFCB05]" : ""
                }`}
              onClick={() => handleTabClick("ProfilePicture")}
            >
              Profile Picture
            </li>
          </ul>
        </div>
        {
          profilePagesData && Object.keys(profilePagesData).length > 0 ?
            <div className="tab-data border-t-[1px] border-[#D4D4D4] py-[30px]">
              {showPersonalInformation && <PersonalInformation />}
              {showWork && <Work />}
              {showEducation && <Education />}
              {showSkills && <Skills />}
              {showPortfolio && <Portfolio />}
              {showQuestionAnswer && <QuestionAnswer />}
              {showProfilePicture && <ProfilePicture />}
            </div> :
            <CustomOverlay isLoading={true} />

          // <div className="loading-indicator"></div>
        }
      </div>
    </div>
  );
};

export default ProfilePage;
