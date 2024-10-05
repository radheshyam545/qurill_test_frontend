import { useCallback } from "react";

export const getCountryList = () => {
    return fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code")
        .then((response) => response.json())
        .then((data) => {
            return data.countries;
        })
        .catch((error) => {
            console.error("Error fetching country list:", error);
            return []; // Return an empty array or handle the error appropriately
        });
}


export const getCountryCode = () => {
    return fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code")
        .then((response) => response.json())
        .then((data) => {
            return data.countries;
        })
        .catch((error) => {
            console.error("Error fetching country list:", error);
            return []; // Return an empty array or handle the error appropriately
        });
}
