"use client";
import { useState, useEffect, ReactNode } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
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
    const [selectedLaw, setSelectedLaw] = useState<Law[] | null>(null);
    const [companyList, setCompanyList] = useState<Company[]>([]);
    const [lawList, setLawList] = useState([]);
    const [selectCompany, setSelectCompany] = useState<string | null>(null);
    const [selectCompanyUrl, setSelectCompanyUrl] = useState<string | null>(null);
    const [responseReport, setResponseReport] = useState<Report[]>([
        {
            "GDPR_Violation": "5(1)(a) - Principles relating to processing of personal data -  processed lawfully, fairly and in a transparent manner in relation to the data subject ('lawfulness, fairness and transparency')",
            "amend": "It is unclear what is meant by \"標示\" (marking) in this context. If this refers to using techniques like browser fingerprinting to uniquely identify users without their knowledge or consent, then this would be a violation of GDPR. The policy should clarify what data is collected and how it is used to identify users. It should also provide a clear and unambiguous way for users to opt out of this tracking.",
            "section": "本公司會對個別連線者的瀏覽器予以標示，歸納使用者瀏覽器在本網站內部所瀏覽的網頁，除非您願意告知或提供你的個人資料，否則本公司不會，也無法將此項記錄和您對應。"
        },
        {
            "GDPR_Violation": "7(4), 4(11) - Conditions for consent. Definitions - Consent of the data subject",
            "amend": "While the policy mentions that users can manage cookie preferences in their browser settings, it does not clearly state that consent is required to store non-essential cookies. The policy should explicitly mention that by continuing to use the website after being informed about the use of cookies, the user consents to the placement of those cookies. It should also differentiate between essential and non-essential cookies and provide users with granular control over their cookie preferences.",
            "section": "Cookies 是伺服端為了區別使用者的不同喜好，經由瀏覽器寫入使用者硬碟的一些簡短資訊。您可以在Firefox瀏覽器的「工具選項」的「個人隱私」項目或是IE瀏覽器的「網際網際網路選項」的「隱私權」項目中選擇修改您瀏覽器對Cookies的接受程度。如果您選擇「拒絕所有的cookies」，您就可能無法使用部份個人化服務，或是參與部份的活動。"
        }
    ]);
    const [responsePrivacyPolicy, setResponsePrivacyPolicy] = useState<string | null>('本公司會對個別連線者的瀏覽器予以標示，歸納使用者瀏覽器在本網站內部所瀏覽的網頁，除非您願意告知或提供你的個人資料，否則本公司不會，也無法將此項記錄和您對應。請您注意，與本網站連結的其他網站，也可能蒐集您個人的資料。對於您於前述連結網站主動提供的個人資料，將依相關法令及各該連結網站所揭露之隱私權保護政策蒐集、利用與處理，不適用本網站之隱私權保護政策，本公司也不負擔任何連帶責任。本網站上述蒐集資料之運用政策線上申請及網路市場調查本公司於本網站所蒐集的申請或受訪者姓名、身分證字號、電話、e-mail、住址及其他個人資料，除依法令規定或經您書面同意外，僅於本公司蒐集之特定目的(包含申辦本公司金融商品、參加本網站抽獎活動或市場調查分析)必要範圍內處理及利用，本公司不會將前述個人資料用做其他用途。本公司並將依法令規範對前述個人資料負保密之責，絕不會公布個別申請者或受訪者之任何個人資訊。個人資料之查詢、閱覽及刪除對於本公司透過本網站所蒐集與保存您的個人資料，除法令另有規定外，您可以向本公司：（1）查詢或請求閱覽您的個人資料。（2）請求製給您個人資料之複製本。（3）請求補充或更正您的個人資料。（4）請求停止蒐集、利用或處理您的個人資料；或（5）請求刪除您的個人資料。您得隨時向本公司提出上述申請，本公司將依個人資料保護法及法令遵循或內部控制等相關法令規範，據以決定或受理您的申請。 若您的個人資料已逾法令規定之保存時限且蒐集之特定目的均已消滅，則本公司將主動銷毀或刪除您的個人資料。其他當您在本網站主動註冊成為會員後，其所輸入的資料，僅供本網站依服務或活動設計參考使用。凡未經您主動註冊所產生的資料，例如使用者連線設備的IP位址、設備資訊、使用時間、使用的瀏覽器、瀏覽及點選紀錄等資料，本公司僅會在對本網站全體使用者整體行為進行統計分析之特定目的必要範圍內利用及處理，並不會對個別使用者進行分析。Cookies的運用與政策Cookies 是伺服端為了區別使用者的不同喜好，經由瀏覽器寫入使用者硬碟的一些簡短資訊。您可以在Firefox瀏覽器的「工具選項」的「個人隱私」項目或是IE瀏覽器的「網際網際網路選項」的「隱私權」項目中選擇修改您瀏覽器對Cookies的接受程度。如果您選擇「拒絕所有的cookies」，您就可能無法使用部份個人化服務，或是參與部份的活動。 依據以下目的及情況，本公司暨所屬各子公司之相關網站會在本政策原則下，在您瀏覽器中寫入並讀取Cookies：為提供更好、更個人化的服務，以及方便您參與個人化的互動活動。');
    const [test, setTest] = useState<ReactNode[]>([]);
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
                setLawList(data.laws);
            } else {
                console.error("Failed to fetch laws");
            }
        } catch (error) {
            console.error("Error fetching laws:", error);
        }
    };

    const handleConfirm = async () => {
        console.log('okk');
        const test1 = highlightPrivacyPolicy(responsePrivacyPolicy ?? '', responseReport);
        setTest(test1);
        try {
            if (selectCompanyUrl && selectedLaw) {
                console.log(selectedLaw[0].title);
                console.log(selectCompanyUrl);
                const request = {
                    url: selectCompanyUrl,
                    selected_law: selectedLaw[0].title
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
                    
                    console.log(data.GDPR_report);
                    console.log(data.privacy_policy);
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
                <div>{option.title}</div>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        const length = selectedLaw ? selectedLaw.length : 0;

        return (
            <div className="py-2 px-3">
                <b>{length}</b> item{length > 1 ? 's' : ''} selected.
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
        let highlightedText: ReactNode[] = [text];
        reports.forEach((report, sectionIndex) => {
            highlightedText = highlightedText.map((chunk, chunkIndex) =>
                typeof chunk === 'string'
                    ? stringReplace(chunk, report.section, (match, i) => (
                        <span
                            key={`${sectionIndex}-${chunkIndex}-${i}`}
                            onClick={() => handleHighlightClick(report.section, report.GDPR_Violation, report.amend)}
                            style={{ backgroundColor: '#FFECA6', cursor: 'pointer' }}
                        >
                            {match}
                        </span>
                    ))
                    : chunk
            ).flat();
        });
        return highlightedText;
    };

    return (
        <div className="card">
            <div className="flex justify-content-between align-items-center">
                <div className="flex justify-content-center" style={{ flexGrow: 1 }}>
                    <Dropdown 
                        value={selectCompany} 
                        onChange={handleCompanyChange} 
                        options={companyList}  
                        optionLabel="company_name" 
                        editable 
                        placeholder="Select a Company" 
                        className="w-full w-auto" 
                    />
                    <MultiSelect 
                        value={selectedLaw} 
                        options={lawList} 
                        onChange={(e: MultiSelectChangeEvent) => setSelectedLaw(e.value)} 
                        optionLabel="title" 
                        placeholder="Select a Law" 
                        itemTemplate={countryTemplate} 
                        panelFooterTemplate={panelFooterTemplate} 
                        className="w-full w-auto ml-2" 
                        display="chip" 
                    />
                    <Button 
                        label="確定" 
                        icon="pi pi-check" 
                        className="ml-2 w-auto" 
                        onClick={handleConfirm}
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
                <div className="w-10" style={{ fontSize: '1.1em', lineHeight: '1.6' }}>
                    {test}
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
