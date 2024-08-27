"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import stringReplace from 'react-string-replace';
import { PrimeIcons } from "primereact/api";
import { ProgressSpinner } from 'primereact/progressspinner'; 
import { TabView, TabPanel } from 'primereact/tabview'
import { ProgressBar } from 'primereact/progressbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const iconStyleSuccess = {
    color: 'white', 
    backgroundColor: '#52b669', 
    fontSize: '1.2em', 
    borderRadius: '50%', 
    padding: '0.2em',  
    marginRight: '0.4em' 
};

const iconStyleDanger = {
    color: 'white', 
    backgroundColor: 'red', 
    fontSize: '1.2em', 
    borderRadius: '50%', 
    padding: '0.2em',  
    marginRight: '0.4em'
};

interface Company {
    company_name: string;
    url: string;
}

interface Law {
    privacy_law: string;
    title: string;
}

interface ReportCompliant {
    amend: string;
    legal: string;
    section: string;
    folder: string
}

interface Report {
    article_content: string[];
    amend: string;
    section: string;
    single_article: number;
    legal_provision: string;
    compliant: ReportCompliant[];
    Title: string;
}

interface CompanyComplianceQA {
    compliance: boolean;
    question: string;
    reason: string;
}

interface ModifyRecommended {
    section_after: string;
    section_before: string;
}


const CheckPrivacyPolicy = () => {
    const [selectedLaw, setSelectedLaw] = useState<Law | null>(null);  // 修改為單選
    const [companyList, setCompanyList] = useState<Company[]>([]);
    const [lawList, setLawList] = useState([]);
    const [selectCompany, setSelectCompany] = useState<string | null>(null);
    const [selectCompanyUrl, setSelectCompanyUrl] = useState<string | null>(null);
    const [responseReport, setResponseReport] = useState<Report[]>([]);
    const [currentResponseReport, setCurrentResponseReport] = useState<Report | null>(null);
    const [responsePrivacyPolicy, setResponsePrivacyPolicy] = useState<string | null>('');
    const [modifyRecommended, setModifyRecommended] = useState<ModifyRecommended[]>([]);
    const [displayPrivacyPolicy, setDisplayPrivacyPolicy] = useState<ReactNode[]>([]);
    const [companyComplianceQA, setCompanyComplianceQA] = useState<CompanyComplianceQA[]>([]);
    const [companyComplianceQAErrorCount, setCompanyComplianceQAErrorCount] = useState<string>("0");

    const [referenceCompanySection, setReferenceCompanySection] = useState<ReportCompliant[]>([]);
    const [selectReferenceCountry, setSelectReferenceCountry] = useState<ReportCompliant | null>(null);

    const [displayCheckHighlightText, setDisplayCheckHighlightText] = useState<ReactNode[]>([]);
    const [displayModifyHighlightText, setDisplayModifyHighlightText] = useState<ReactNode[]>([]);

    const [isHighlightModalVisible, setHighlightIsModalVisible] = useState(false);
    const [isCheckListScoreModalVisible, setCheckListScoreModalVisible] = useState(false);

    const [currentDisplayMode, setCurrentDisplayMode] = useState<string>("");

    const [loading, setLoading] = useState(false); 
    const [loadingValue, setLoadingValue] = useState(0);

    const [htmlBodyPrivacyPolicy, setHtmlBodyPrivacyPolicy] = useState<string>("");

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

        setLoadingStatus(true, 0)
    
        setResponseReport([]);
        setResponsePrivacyPolicy('');
        setCompanyComplianceQA([])
        setCompanyComplianceQAErrorCount("0")
        setCurrentDisplayMode('')
    
        try {
            if (selectCompanyUrl && selectedLaw) {
                
                const request = {
                    url: selectCompanyUrl,
                    selected_law: selectedLaw.title
                };
    
                const htmlBodyResponse = await fetch("http://140.115.54.33:5469/get_html_content", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
    
                let htmlBodyPrivacyPolicy = '';
                if (htmlBodyResponse.ok) {
                    const data = await htmlBodyResponse.json();
                    htmlBodyPrivacyPolicy = data.html;
                    setHtmlBodyPrivacyPolicy(htmlBodyPrivacyPolicy);
                }
                setLoadingStatus(true, 20)
    
                // Check Mode
                const checkResponse = await fetch("http://140.115.54.33:5469/submit_ai_act_form", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(request),
                });
                setLoadingStatus(true, 20)
    
                let GDPR_report = '';
                if (checkResponse.ok) {
                    const data = await checkResponse.json();
                    setResponseReport(data.GDPR_report);
                    setResponsePrivacyPolicy(data.privacy_policy);
                    setCompanyComplianceQA(data.company_compliance_QA)
                    setCompanyComplianceQAErrorCount(data.company_compliance_check_false)
    
                    GDPR_report = data.GDPR_report;
    
                    setLoadingStatus(true, 40)
                    
                } else {
                    console.error("Failed to fetch chatbot response");
                }
    
                // Modify Mode
                const ModifyResponse = await fetch("http://140.115.54.33:5469/update_section", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(request),
                });
                setLoadingStatus(true, 60)
    
                if (ModifyResponse.ok) {
                    const data = await ModifyResponse.json();
                    setModifyRecommended(data.modified_sections)
                    setLoadingStatus(true, 80)
                } else {
                    console.error("Failed to fetch chatbot response");
                }
    
                // Highlight and set privacy policy
                const highlightedPrivacyPolicy = highlightPrivacyPolicy_byHTML(htmlBodyPrivacyPolicy, GDPR_report);
                setDisplayPrivacyPolicy(highlightedPrivacyPolicy);
    
            } else {
                console.log("No company or law selected.");
            }
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
        } finally {
            setLoading(false);
            setLoadingStatus(false, 100)
            setCurrentDisplayMode('check')
        }
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
                            onClick={() => {
                                setCurrentResponseReport(report);
                                setHighlightIsModalVisible(true);
                            }}
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

    const modifyRecommendedText = (text: string, modifyRecommended: ModifyRecommended[]): ReactNode[] => {
        let formattedText = text.replace(/\n/g, '<br />');
        let modifiedText: ReactNode[] = [formattedText];
    
        modifyRecommended.forEach((modifyItem, index) => {
            modifiedText = modifiedText.map((chunk, chunkIndex) =>
                typeof chunk === 'string'
                    ? stringReplace(chunk, modifyItem.section_before, (match, i) => (
                        <React.Fragment key={`${index}-${chunkIndex}-${i}`}>
                            <span style={{ color: 'red', textDecoration: 'line-through' }}>
                                {match}
                            </span>
                            <span style={{ color: 'green', marginLeft: '0.5em' }}>
                                {modifyItem.section_after}
                            </span>
                        </React.Fragment>
                    ))
                    : chunk
            ).flat();
        });
    
        // 處理 <br /> 標籤，使其正確渲染為換行
        return modifiedText.map((textChunk, i) => 
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

    const highlightPrivacyPolicy_byHTML = (htmlText: string, reports: Report[]): ReactNode[] => {
        let highlightedText: ReactNode[] = [htmlText];
        reports.forEach((report, sectionIndex) => {
            highlightedText = highlightedText.map((chunk, chunkIndex) =>
                typeof chunk === 'string'
                    ? stringReplace(chunk, report.section, (match, i) => (
                        <span
                            key={`${sectionIndex}-${chunkIndex}-${i}`}
                            onClick={() => {
                                setCurrentResponseReport(report);
                                setHighlightIsModalVisible(true);
                            }}
                            className="highlighted-text"
                        >
                            {match}
                        </span>
                    ))
                    : chunk
            ).flat();
        });
    
        // 使用 dangerouslySetInnerHTML 來渲染 HTML 字符串
        return highlightedText.map((textChunk, i) => 
            typeof textChunk === 'string' ? (
                <span key={i} dangerouslySetInnerHTML={{ __html: textChunk }} />
            ) : (
                textChunk
            )
        );
    };

    const modifyRecommendedText_byHtml = (htmlText: string, modifyRecommended: ModifyRecommended[]): ReactNode[] => {
        let modifiedText: ReactNode[] = [htmlText];
    
        modifyRecommended.forEach((modifyItem, index) => {
            modifiedText = modifiedText.map((chunk, chunkIndex) =>
                typeof chunk === 'string'
                    ? stringReplace(chunk, modifyItem.section_before, (match, i) => (
                        <React.Fragment key={`${index}-${chunkIndex}-${i}`}>
                            <span style={{ color: 'red', textDecoration: 'line-through' }}>
                                {match}
                            </span>
                            <span style={{ color: 'green', marginLeft: '0.5em' }}>
                                {modifyItem.section_after}
                            </span>
                        </React.Fragment>
                    ))
                    : chunk
            ).flat();
        });
    
        // 使用 dangerouslySetInnerHTML 來渲染 HTML 字符串
        return modifiedText.map((textChunk, i) => 
            typeof textChunk === 'string' ? (
                <span key={i} dangerouslySetInnerHTML={{ __html: textChunk }} />
            ) : (
                textChunk
            )
        );
    };

    const reportSectionRecommendedText = (report: Report[]): ReactNode[] => {
        return [
            <DataTable value={report} style={{ fontSize: '1.2rem' }} scrollable={true} key="report-table">
                <Column field="section" header="段落" style={{ width: '33%', wordWrap: 'break-word' }}></Column>
                <Column field="legal_provision" header="條文" style={{ width: '33%', wordWrap: 'break-word' }}></Column>
                <Column field="amend" header="建議" style={{ width: '33%', wordWrap: 'break-word' }}></Column>
            </DataTable>
        ];
    };
    

    const changeDisplayMode = (mode: string) => {
        setCurrentDisplayMode(mode);
        if (mode === 'check') {
            setDisplayPrivacyPolicy(highlightPrivacyPolicy_byHTML(htmlBodyPrivacyPolicy, responseReport));
        } else if (mode === 'modify') {
            setDisplayPrivacyPolicy(modifyRecommendedText_byHtml(htmlBodyPrivacyPolicy, modifyRecommended));
        }
        else if (mode === 'table-layout') {
            setDisplayPrivacyPolicy(reportSectionRecommendedText(responseReport));
        }
    }

    const setLoadingStatus = (loadingStatus: boolean, value: number) => {
        setLoadingValue(value);
        setLoading(loadingStatus);
    }

    const progressBarValueTemplate = (value: string) => {
        return (
            <React.Fragment>
                {value}/<b>100</b>
            </React.Fragment>
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
                        placeholder="輸入公司隱私政策 PDF / URL" 
                        className="w-full w-4" 
                        disabled={loading}
                    />
                    <Dropdown
                        value={selectedLaw} 
                        options={lawList} 
                        onChange={(e) => setSelectedLaw(e.value)} 
                        optionLabel="title" 
                        placeholder="選擇法律" 
                        itemTemplate={countryTemplate} 
                        className="w-full w-auto ml-2" 
                        disabled={loading}
                    />
                    <Button 
                        label="確認" 
                        icon="pi pi-check-circle"
                        className="ml-2 w-auto" 
                        severity="secondary"
                        onClick={handleConfirm}
                        disabled={!selectCompany || !selectedLaw || loading}
                        outlined
                    />
                </div>
            </div>

            <Divider className="mt-5 mb-5"></Divider>
            <div className="flex justify-content-center ">
                <div className="flex flex-column gap-4  align-items-center mr-6 w-2">
                    <Button 
                        outlined 
                        severity="danger"
                        onClick={() => setCheckListScoreModalVisible(true)}
                        style={{
                            width: '70px',  
                            height: '70px',  
                            borderRadius: '50%', 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            padding: 0, 
                            transition: 'all 0.3s ease', 
                            opacity: (!selectCompany || !selectedLaw || loading || !responseReport.length) ? '0.5' : '1', // 禁用時降低透明度
                            cursor: (!selectCompany || !selectedLaw || loading || !responseReport.length) ? 'not-allowed' : 'pointer', // 禁用時改變鼠標樣式
                            boxShadow: (!selectCompany || !selectedLaw || loading || !responseReport.length) ? 'none' : '0 2px 5px rgba(0,0,0,0.2)', // 禁用時移除陰影
                            border: (!selectCompany || !selectedLaw || loading || !responseReport.length) ? '2px dashed #ccc' : '2px solid #f44336', // 禁用時改變邊框樣式
                        }}
                        disabled={!selectCompany || !selectedLaw || loading || !responseReport.length}
                    >
                        {companyComplianceQAErrorCount}
                    </Button>

                    <div className="w-10 flex justify-content-center flex-wrap"> 
                        <p className="w-10 text-500 text-sm text-center	">
                            需修正資料共 {responseReport.length} 筆
                        </p>
                    </div>

                    {/* <div className="connector connector-bottom"></div> */}

                    <Button 
                        label="檢查模式" 
                        icon="pi pi-search" 
                        className="w-10 color-primary-darker" 
                        onClick={(e) => changeDisplayMode('check')}
                        disabled={!selectCompany || !selectedLaw || loading}
                        outlined
                        style={{
                            border:(currentDisplayMode == 'check') ? '3px solid #0f2664' : '2px dotted #0f2664', 
                            background: (currentDisplayMode == 'check') ? '#3559b2' : '#3559b2', 
                            color: 'white',
                            opacity: (currentDisplayMode == 'check') ? '1' : '0.3',  
                        }}
                    />

                    <Button 
                        label="表格閱讀" 
                        icon="pi pi-pencil" 
                        className="w-10" 
                        severity="warning" 
                        onClick={(e) => changeDisplayMode('table-layout')}
                        disabled={!selectCompany || !selectedLaw || loading}
                        outlined
                        style={{
                            border:(currentDisplayMode == 'table-layout') ? '3px solid #0f2664' : '2px dotted #0f2664', 
                            background: (currentDisplayMode == 'table-layout') ? '#3559b2' : '#3559b2', 
                            color: 'white',
                            opacity: (currentDisplayMode == 'table-layout') ? '1' : '0.3', 
                        }}
                    />

                    <Button 
                        label="校正模式" 
                        icon="pi pi-pencil" 
                        className="w-10" 
                        severity="warning" 
                        onClick={(e) => changeDisplayMode('modify')}
                        disabled={!selectCompany || !selectedLaw || loading}
                        outlined
                        style={{
                            border:(currentDisplayMode == 'modify') ? '3px solid #0f2664' : '2px dotted #0f2664', 
                            background: (currentDisplayMode == 'modify') ? '#3559b2' : '#3559b2', 
                            color: 'white',
                            opacity: (currentDisplayMode == 'modify') ? '1' : '0.3', 
                        }}
                    />

                    {/* <div className="connector connector-bottom"></div> */}

                    <Button 
                        label="下載" 
                        icon="pi pi-download"
                        className="w-10" 
                        severity="success" 
                        disabled={true}
                        outlined
                        style={{
                            borderColor: '#0f2664',
                            background: '#3559b2',
                            color: 'white',
                            opacity: '0.3'
                        }}
                    />
                </div>
                <div className="w-9" style={{ fontSize: '1.1em', lineHeight: '1.6' }}>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ProgressBar 
                                value={loadingValue} 
                                displayValueTemplate={progressBarValueTemplate} 
                                style={{ width: '70%', marginTop: '1rem' }}
                                color="#3559b2">
                            </ProgressBar>
                            <ProgressSpinner style={{ width: '50px', height: '50px' , marginLeft: '20px' }} />

                        </div>
                    ) : (
                        displayPrivacyPolicy
                        // modifyRecommendedText_byHtml(htmlBodyPrivacyPolicy, modifyRecommended)
                        // highlightPrivacyPolicy_byHTML(htmlBodyPrivacyPolicy, responseReport)
                        // <div dangerouslySetInnerHTML={{ __html: htmlBodyPrivacyPolicy }} />
                    )}
                </div>
                
            </div>


            <Dialog 
                header="修正建議" 
                visible={isCheckListScoreModalVisible} 
                style={{ width: '50vw', fontSize: '1.1em'}} 
                onHide={() => setCheckListScoreModalVisible(false)}
                blockScroll={false} 
                // modal={false}      
            >
                <div>
                    {companyComplianceQA ? companyComplianceQA.map((item, index) => (
                        <p key={index} style={{ display: 'flex', alignItems: 'flex-start', fontSize: '1em' }}>
                            <i className={item.compliance ? PrimeIcons.CHECK : PrimeIcons.TIMES} 
                            style={{
                                ...(item.compliance ? iconStyleSuccess : iconStyleDanger), 
                                marginRight: '1em',
                                marginTop: '0.2em'
                            }} 
                            />
                            <div style={{ lineHeight: '1.4' }}>
                                <p style={{ fontSize: '1.1em', fontWeight: 'bold', marginBottom: '0.3em' }}>{item.question}</p>
                                <span style={{ fontSize: '0.9em', color: '#666', display: 'block' }}>{item.reason}</span>
                            </div>
                        </p>
                    )) : null}
                </div>
            </Dialog>

            <Dialog 
                header={<span style={{ fontSize: '1.5rem' }}>詳細資訊</span>} 
                visible={isHighlightModalVisible} 
                style={{ width: '50vw', fontSize:'1.2rem'}} 
                modal 
                onHide={() => {
                    setHighlightIsModalVisible(false);
                    setSelectReferenceCountry(null);
                }}
            >
                <TabView>
                    <TabPanel header="校正建議">
                        <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '1rem', fontSize: '1.1rem' }}>
                            <h4 style={{ fontSize: '1.5rem', fontFamily: 'inherit', fontWeight: '600' }}>隱私政策原文</h4>
                            <p>{currentResponseReport?.section}</p>
                            <h4 style={{ fontSize: '1.5rem', fontFamily: 'inherit', fontWeight: '600' }}>修正建議</h4>
                            <p>{currentResponseReport?.amend}</p>
                            <div>
                                <Divider />
                                <h4 style={{ fontSize: '1.5rem', fontFamily: 'inherit', fontWeight: '600' }}>選擇參考公司</h4>
                                <Dropdown 
                                    value={selectReferenceCountry} 
                                    onChange={(e) => setSelectReferenceCountry(e.value)} 
                                    options={currentResponseReport?.compliant} 
                                    optionLabel="folder" 
                                    placeholder="Select a Country" 
                                    filter 
                                    className="w-full " 
                                />
                                <p className="mt-5" style={{ fontSize: '1.3rem', color: '#171717', fontWeight: 'bold' }}> 所選參考公司的示範： </p>
                                <p style={{ fontSize: '1.2rem' }}>
                                    {selectReferenceCountry ? selectReferenceCountry.section : 'NONE'}
                                </p>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header={selectedLaw ? `${selectedLaw.title}` : ""}>
                        <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '1rem' }}>
                            <h4 style={{ fontSize: '1.25rem', fontFamily: 'inherit', fontWeight: '600' }}>
                                {selectedLaw ? `Art. ${currentResponseReport?.single_article} (${selectedLaw.title}) ${currentResponseReport?.Title}` : ""}
                            </h4>
                            {currentResponseReport?.article_content?.map((articleContent, index) => (
                                <p key={index}>{articleContent}</p>
                            ))}
                        </div>
                    </TabPanel>
                </TabView>
            </Dialog>

        </div>
    );
};

export default CheckPrivacyPolicy;
