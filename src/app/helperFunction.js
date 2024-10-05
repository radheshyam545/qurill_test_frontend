import { useState } from "react";
import { notifyError, notifySuccess } from "./toaster";
import moment from "moment";

export const singleFileUpload = async (file) => {

    const formData = new FormData();
    formData.append("file", file);

    try {
        const token = localStorage.getItem('token');
        // You can write the URL of your server or any other endpoint used for file upload
        const result = await fetch(`${process.env.REACT_APP_API_URL}/file/upload`,
            {
                method: "POST",
                body: formData,
                headers: { Authorization: token ? `Bearer ${token}` : null }
            }
        );

        const data = await result.json();
        if (data?.success === true) {
            notifySuccess('File uploaded successfully')
            return data
        } else {
            // setIsloading(false)
            notifyError(data.error)
        }

    } catch (error) {
        console.error(error);
    }
}


export const multipleFileUpload = async (files) => {

    const formData = new FormData();

    for (var i = 0; i < files.length; i++) {formData.append('files', files[i]);}

    try {
        const token = localStorage.getItem('token');
        // You can write the URL of your server or any other endpoint used for file upload
        const result = await fetch(`${process.env.REACT_APP_API_URL}/file/uploads`,
            {
                method: "POST",
                body: formData,
                headers: { Authorization: token ? `Bearer ${token}` : null }
            }
        );

        const data = await result.json();
        if (data?.success === true) {
            notifySuccess('File uploaded successfully')
            return data
        } else {
            notifyError(data.error)
        }


    } catch (error) {
        console.error(error);
    }
}



export const formatDate = (date, format = 'primry') => {
    if (!date) {
        return ''
    }
    if (format === 'primry') {
        return moment(date).format('YYYY-DD-MM')
    }
    return moment(date).format('YYYY-DD-MM')
};

export const selectFieldValue = (date, key) => {
    return date.find(item => item.value ===  key ?? date[0])
};

export const selectFieldValueDefault = (date, key) => {
    return date.find(item => item.value ===  key) ?? ''
};

export const selectFieldLabelDefault = (date, key) => {
    return date.find(item => item.label ===  key) ?? ''
};