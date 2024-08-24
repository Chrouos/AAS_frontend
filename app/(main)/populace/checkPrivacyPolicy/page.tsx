"use client";
import { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';

const CheckPrivacyPolicy = () => {

    const [companyList, setCompanyList] = useState([])
    const [selectCompany, setSelectCompany] = useState(null)

    const fetchCompanyPrivacyPolicy = async () => {
        try {
            const response = await fetch("http://140.115.54.33:5469/get_existing_privacy_policies");
            if (response.ok) {
                const data = await response.json();
                setCompanyList(data.companies);
            } else {
                console.error("Failed to fetch questions");
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    useEffect(() => {
        fetchCompanyPrivacyPolicy();
    }, [])

    return (
        <div>
            <div className="card flex justify-content-center">
                <Dropdown 
                    value={selectCompany} 
                    onChange={(e) => {setSelectCompany(e.value); console.log(e.value)}} 
                    options={companyList}  optionLabel="company_name" 
                    editable 
                    placeholder="Select a City" 
                    className="w-full md:w-14rem" />
        </div>

        </div>
    );
};

export default CheckPrivacyPolicy;
