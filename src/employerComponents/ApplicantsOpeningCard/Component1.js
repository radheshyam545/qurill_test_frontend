import React from 'react';
import { Racer, veteranStatusOptionEnum } from '../../demoData';
import { CountryDATAEnum, USStatesEnum } from '../../pages/employerProtected/JobConsts';
import { languageDataEnum } from '../../components/PersonalInformation/data';

function Component1({ selectedApplicantData, showHide, showContact }) {
  const { personalInformation } = selectedApplicantData || {};
console.log(personalInformation)
  return (
    <>
      <div className='border border-[#919191] mt-[20px] p-[10px] rounded-[12px] border-[2px] grid lg:grid-cols-2 md:grid-cols-1'>
        <div>
        {showHide?.personalInformation && showContact==="accepted"  ? (<div className='pl-[15px]'>
            <span><p className='font-[700] text-[16px] text-[#1E1E1E]'>Personal information</p></span>
            <div className='pl-[15px] flex flex-col gap-[8px]'>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>First name</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.personalInformation?.firstName ? personalInformation?.personalInformation?.firstName : "Email address was not provided."}</p>
              </span>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Last name</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.personalInformation?.lastName ? personalInformation?.personalInformation?.lastName : "Phone type information was not provided."}</p>
              </span>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Date of Birth</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.personalInformation?.dateOfBirth ? personalInformation?.personalInformation?.dateOfBirth.substring(0, 10): "Phone number was not provided."}</p>
              </span>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Nationality</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.personalInformation?.nationality ? personalInformation?.personalInformation?.nationality : "Phone number was not provided."}</p>
              </span>
            </div>
          </div>) : ""}
          {showHide?.address &&showContact==="accepted"? (<div className='pl-[15px] flex flex-col gap-[8px]'>
            <span><p className='font-[700] text-[16px] text-[#1E1E1E]'>Address</p></span>
            <span className='leading-[20px]'>
              <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Type</p>
              <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.address?.type ? personalInformation?.address?.type : "Type was not provided."}</p>
            </span>
            <span className='leading-[20px]'>
              <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Address line 1</p>
              <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.address?.addressLine1 ? personalInformation?.address?.addressLine1 : "Address line 1 was not provided."}</p>
            </span>
            {personalInformation?.address?.addressLine2 ? (<span className='leading-[20px]'>
              <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Address line 2</p>
              <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.address?.addressLine2 ? personalInformation?.address?.addressLine2 : "Address line 2 was not provided."}</p>
            </span>) : ""}
            <span className='leading-[20px]'>
              <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Postal Code</p>
              <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.address?.postalCode ? personalInformation?.address?.postalCode : "Postal code was not provided."}</p>
            </span>
            <span className='leading-[20px]'>
              <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>City</p>
              <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.address?.city ? personalInformation?.address?.city : "City information was not provided."}</p>
            </span>
            <span className='leading-[20px]'>
              <p className='text-[#1E1E1E] mt-[5px] text-[14px] font-[500]'>State</p>
              <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{personalInformation?.address?.state ? personalInformation?.address?.state : "Country information was not provided."}</p>
            </span>
            <span className='leading-[20px]'>
              <p className='text-[#1E1E1E] mt-[5px] text-[14px] font-[500]'>Country</p>
              <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{personalInformation?.address?.country ? CountryDATAEnum[personalInformation?.address?.country] : "Country information was not provided."}</p>
            </span>
          </div>) : ""}
          
          {showHide?.contact && showContact==="accepted"  ? (<div className='pl-[15px]'>
            <span><p className='font-[700] text-[16px] text-[#1E1E1E]'>Contact</p></span>
            <div className='pl-[15px] flex flex-col gap-[8px]'>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Email address</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.contact?.email ? personalInformation?.contact?.email : "Email address was not provided."}</p>
              </span>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Type</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.contact?.phone ? personalInformation?.contact?.phoneType : "Phone type information was not provided."}</p>
              </span>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Phone Number</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.contact?.phone ? `${personalInformation?.contact?.phoneCode}${personalInformation?.contact?.phone}` : "Phone number was not provided."}</p>
              </span>
            </div>
          </div>) : ""}
          {showHide?.languages ? (<div className='pl-[15px]'>
            <span><p className='font-[700]  text-[16px] text-[#1E1E1E]'>Language</p></span>
            <div className='pl-[15px] flex flex-col gap-[8px]'>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[14px] font-[500]'>Mother tongue</p>
                <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{personalInformation?.languages?.mother ? languageDataEnum[personalInformation?.languages?.mother] : "Mother tongue information was not provided."}</p>
              </span>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[14px] font-[500]'>Other Language</p>
                <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{personalInformation?.languages?.other ? languageDataEnum[personalInformation?.languages?.other] : "Other language information was not provided."}</p>
              </span>
            </div>
          </div>) : ""}
          {showHide?.citizenshipStatus ? (<div className='mt-[10px] pl-[15px]'>
            <span><p className='font-[700] text-[16px] text-[#1E1E1E]'>Citizenship Status</p></span>
            <div className='pl-[15px] flex flex-col gap-[8px]'>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Please declare your citizenship status</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.citizenships?.status}</p>
              </span>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Are you eligible to work legally in the United States?</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.citizenships?.isEligibleToWork ? "Yes" : "No"}</p>
              </span>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Do you now, or will you in the future, need sponsorship from an employer in order to obtain, extend or renew your authorization to work in the United States?</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.citizenships?.isNeedSponserShip ? "Yes" : "No"}</p>
              </span>
            </div>
          </div>) : ""}
        </div>
        <div>
          {showHide?.demographics ? (<div>
            <span><p className='font-[700] text-[17px] text-[#1E1E1E]'>Demoghraphics</p></span>
            <div className='pl-[15px] flex flex-col gap-[8px]'>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Gender</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.demographics?.gender ? personalInformation?.demographics?.gender : "Gender information was not provided."}</p>
              </span>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[14px] font-[500]'>veteran status</p>
                <p className='text-[#9c9292] mt-[5px] text-[14px] font-[500]'>{veteranStatusOptionEnum[personalInformation?.demographics?.veteranStatus]}</p>
              </span>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Race</p>
                {
                  Racer.map((item) => {
                    if (item?.value == personalInformation?.demographics?.race) {
                      return (
                        <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{item.label}</p>
                      )
                    }
                  })
                }
              </span>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Are you Hispanic or Latino?</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.demographics?.isHaspanicLatino ? "Yes" : "No"}</p>
              </span>
            </div>
          </div>) : ""}
          <div className='mt-[40px]'>
            {/* <p className='font-[600] mb-[5px] text-[15px] text-[#1E1E1E]'>Legal declarations</p> */}
            {showHide?.legalDeclarations ? (<div className='pl-[15px] flex flex-col gap-[8px]'>
              <span><p className='font-[700] text-[16px] text-[#1E1E1E]'>Legal Declaration</p></span>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Have you been convicted of any felony?</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.citizenships?.isConvictedOfFelony ? "Yes" : "No"}</p>
              </span>
              <span className='leading-[20px]'>
                <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Are you presently subject to any noncompete, nondisclosure or nonsolicitation agreement?*</p>
                <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.citizenships?.isDesiredCompensation ? "Yes" : "No"}</p>
              </span>
            </div>) : ""}
            {showHide?.personalInformation ? (
              <div className='pl-[15px] flex flex-col gap-[8px]'>
                <span><p className='font-[700] text-[16px] text-[#1E1E1E]'>Personal Statement</p></span>
                <span className='leading-[20px]'>
                  <p className='text-[#1E1E1E] mt-[5px] text-[15px] font-[500]'>Personal Statement</p>
                  <p className='text-[#9c9292] mt-[5px] text-[15px] font-[500]'>{personalInformation?.personalStatements ? personalInformation?.personalStatements : "Personal statement was not provided."}</p>
                </span>
              </div>) : ""}

          </div>
        </div>
      </div>
    </>
  );
}

export default Component1;
