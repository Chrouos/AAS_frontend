"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import stringReplace from 'react-string-replace';

interface Company {
    company_name: string;
    url: string;
}

interface Law {
    privacy_law: string;
    title: string;
}

interface Report {
    GDPR_Violation: string;
    amend: string;
    section: string;
}


const CheckPrivacyPolicy = () => {
    const [selectedLaw, setSelectedLaw] = useState<Law | null>(null);  // 修改為單選
    const [companyList, setCompanyList] = useState<Company[]>([]);
    const [lawList, setLawList] = useState([]);
    const [selectCompany, setSelectCompany] = useState<string | null>(null);
    const [selectCompanyUrl, setSelectCompanyUrl] = useState<string | null>(null);
    const [responseReport, setResponseReport] = useState<Report[]>([]);
    const [responsePrivacyPolicy, setResponsePrivacyPolicy] = useState<string | null>('');
    const [displayPrivacyPolicy, setDisplayPrivacyPolicy] = useState<ReactNode[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<string>('');
    const [modalAmendment, setModalAmendment] = useState<string>('');

    const fetchCompanyPrivacyPolicy = async () => {
        try {
            const response = await fetch("http://140.115.54.33:5469/get_existing_privacy_policies");
            if (response.ok) {
                const data = await response.json();
                setCompanyList(data.companies);
            } else {
                console.error("Failed to fetch companies");
            }
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

    const fetchAvailablePrivacyLaws = async () => {
        try {
            const response = await fetch("http://140.115.54.33:5469/get_available_privacy_laws");
            if (response.ok) {
                const data = await response.json();
                setLawList(data.law);
            } else {
                console.error("Failed to fetch laws");
            }
        } catch (error) {
            console.error("Error fetching laws:", error);
        }
    };

    const handleConfirm = async () => {
        try {
            if (selectCompanyUrl && selectedLaw) {
                const request = {
                    url: selectCompanyUrl,
                    selected_law: selectedLaw.title
                };

                const response = await fetch("http://140.115.54.33:5469/submit_ai_act_form", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(request),
                });

                if (response.ok) {
                    const data = await response.json();
                    setResponseReport(data.GDPR_report);
                    setResponsePrivacyPolicy(data.privacy_policy);

                    const highlight_text = highlightPrivacyPolicy(data.privacy_policy, data.GDPR_report);
                    setDisplayPrivacyPolicy(highlight_text);
                    
                } else {
                    console.error("Failed to fetch chatbot response");
                }
            } else {
                console.log("No company or law selected.");
            }
        }catch (error) {
            console.error("Error fetching chatbot response:", error);
        }
    };

    const handleHighlightClick = (section: string, violation: string, amendment: string) => {
        setModalContent(violation);
        setModalAmendment(amendment);
        setIsModalVisible(true);
    };

    const countryTemplate = (option: any) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                <div>{option.title}</div>
            </div>
        );
    };

    useEffect(() => {
        fetchCompanyPrivacyPolicy();
        fetchAvailablePrivacyLaws();
    }, []);

    const handleCompanyChange = (e: any) => {
        const selectedValue = e.value;

        // 檢查選擇的值是否在 companyList 中
        if(selectedValue.url){
            setSelectCompany(e.value.company_name);
            setSelectCompanyUrl(selectedValue.url);
        }
        else{
            setSelectCompany(selectedValue);
            setSelectCompanyUrl(selectedValue);
        }
    };

    // highlight 文字
    const highlightPrivacyPolicy = (text: string, reports: Report[]): ReactNode[] => {
        // 將 \n 替換為 <br />，以處理換行
        let formattedText = text.replace(/\n/g, '<br />');
        
        let highlightedText: ReactNode[] = [formattedText];
        reports.forEach((report, sectionIndex) => {
            highlightedText = highlightedText.map((chunk, chunkIndex) =>
                typeof chunk === 'string'
                    ? stringReplace(chunk, report.section, (match, i) => (
                        <span
                            key={`${sectionIndex}-${chunkIndex}-${i}`}
                            onClick={() => handleHighlightClick(report.section, report.GDPR_Violation, report.amend)}
                            className="highlighted-text"
                        >
                            {match}
                        </span>
                    ))
                    : chunk
            ).flat();
        });

        // 處理 <br /> 標籤，使其正確渲染為換行
        return highlightedText.map((textChunk, i) => 
            typeof textChunk === 'string' ? (
                textChunk.split('<br />').map((line, index) => (
                    <React.Fragment key={`${i}-${index}`}>
                        {line}
                        {index < textChunk.split('<br />').length - 1 && <br />}
                    </React.Fragment>
                ))
            ) : (
                textChunk
            )
        );
    };

    return (
        <div className="card" style={{fontSize: '1.3rem'}}>
            <div className="flex justify-content-between align-items-center">
                <div className="flex justify-content-center" style={{ flexGrow: 1 }}>
                    <Dropdown 
                        value={selectCompany} 
                        onChange={handleCompanyChange} 
                        options={companyList}  
                        optionLabel="company_name" 
                        editable 
                        placeholder="Select a Company" 
                        className="w-full w-3" 
                    />
                    <Dropdown
                        value={selectedLaw} 
                        options={lawList} 
                        onChange={(e) => setSelectedLaw(e.value)} 
                        optionLabel="title" 
                        placeholder="Select a Law" 
                        itemTemplate={countryTemplate} 
                        className="w-full w-auto ml-2" 
                    />
                    <Button 
                        label="確定" 
                        icon="pi pi-check" 
                        className="ml-2 w-auto" 
                        onClick={handleConfirm}
                        disabled={!selectCompany || !selectedLaw}
                    />
                </div>
                <div 
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '45px',
                        height: '45px',
                        border: '5px solid red',
                        borderRadius: '50%',
                        marginLeft: 'auto',  // 保持這一行
                    }}
                >
                    <span
                        style={{
                            color: 'red',
                            fontSize: '15px',
                            fontWeight: 'bold',
                        }}
                    >
                        100
                    </span>
                </div>
            </div>
            <Divider className="mt-5 mb-5"></Divider>
            <div className="flex justify-content-center">
                <div className="w-8" style={{ fontSize: '1.1em', lineHeight: '1.6' }}>
                    {displayPrivacyPolicy}
                </div>
            </div>
            <Dialog 
                header={<span style={{ fontSize: '1.5rem' }}>詳細資訊</span>} 
                visible={isModalVisible} 
                style={{ width: '50vw' }} 
                modal 
                onHide={() => setIsModalVisible(false)}
            >
                <h4 style={{ fontSize: '1.25rem', fontFamily: 'inherit', fontWeight: '600' }}>違規法條</h4>
                <p>{modalContent}</p>
                <h4 style={{ fontSize: '1.25rem', fontFamily: 'inherit', fontWeight: '600' }}>修正建議</h4>
                <p>{modalAmendment}</p>
            </Dialog>
        </div>
    );
};

export default CheckPrivacyPolicy;
