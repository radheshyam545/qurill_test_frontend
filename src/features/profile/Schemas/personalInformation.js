// import * as Yup from "yup";
import * as Yup from 'yup';


export const personalInformationSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("Please Enter First Name"),
    lastName: Yup.string().min(2).max(25).required("Please Enter Last Name"),
    nationality: Yup.string().required("Enter nationaly"),
    dd: Yup.string().required("Enter Day"),
    mm: Yup.string().required("Enter Month"),
    yyyy: Yup.string().required("Enter Year"),
});
export const contactSchema = Yup.object({
    email: Yup.string().email().required("Please Enter email"),
    phoneType: Yup.string().required("Required"),
    phoneCode: Yup.string().required("Required"),
    phone: Yup.string().required("Required")
});
export const addressSchema = Yup.object({
    type: Yup.string().required("Required"),
    addressLine1: Yup.string().required("Required"),
    addressLine2: Yup.string().required("Required"),
    postalCode: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    country: Yup.string().required("Required")

});
export const languagesSchema = Yup.object({
    mother: Yup.string().required("Required"),
    other: Yup.string().required("Required"),
});
export const demographicsSchema = Yup.object({
    gender: Yup.string().required("Required"),
    veteranStatus: Yup.string().required("Required"),
    race: Yup.string().required("Required"),
    isHaspanicLatino: Yup.boolean().required("Required"),
});
export const citizenshipsSchema = Yup.object({
    status: Yup.string().required("Required"),
    isEligibleToWork: Yup.boolean().required("Required"),
    isNeedSponserShip: Yup.boolean().required("Required"),
    isConvictedOfFelony: Yup.boolean().required("Required"),
    isDesiredCompensation: Yup.boolean().required("Required"),
    isAgreeTermsCondition: Yup.boolean().required("Required")
});
export const personalStatements = Yup.string().required("Required");
