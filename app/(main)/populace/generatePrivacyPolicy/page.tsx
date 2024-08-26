"use client";

import { useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { RadioButton } from "primereact/radiobutton";

const Test = () => {

    const [chatBotResponse, setChatBotResponse] = useState<string>(`
        <h2>一、取得使用者同意</h2>
        <p>我們在蒐集、處理和使用您的個人資料前，將會根據相關法規取得您的明確同意。我們將告知您資料處理的法律依據及政策，並確保您的權利受到充分保護。</p>
        <h2>二、資料蒐集的範圍</h2>
        <p>我們蒐集的資料範圍包括：</p>
        <ul>
            <li><strong>個人資料</strong>：如姓名、身分證號碼、位置資料、線上識別碼、個人的電話號碼、信用卡號碼、人員號碼、帳戶資料、車牌、外表、客戶號碼或地址等。</li>
            <li><strong>敏感個人資料</strong>：如生理、遺傳、生物識別、健康、醫療數據，以及揭示種族和民族血統、政治觀點、宗教、意識形態信念、工會成員身份的個人數據。</li>
            <li><strong>數位資料</strong>：如能夠識別IP位址背後的用戶、cookie、GPS、社群活動資料等。</li>
        </ul>
        <h2>三、資料蒐集的用途</h2>
        <p>我們將蒐集到的資料用於下列特定用途：</p>
        <ul>
            <li>為您提供個性化的服務與支援</li>
            <li>改善我們的產品與服務</li>
            <li>與您保持聯繫並提供最新的產品資訊</li>
        </ul>
        <h2>四、資料保留的時間</h2>
        <p>我們將根據資料蒐集的目的，保留您的個人資料，並確保在資料不再需要時即予以刪除。</p>
        <h2>五、資料處理的流程</h2>
        <p>目前我們尚未詳細說明資料處理的具體流程，但我們承諾會以安全、合規的方式處理您的資料。</p>
        <h2>六、資料主體的權利</h2>
        <p>我們賦予您以下權利以管理您的個人資料：</p>
        <ul>
            <li>調整帳戶設定</li>
            <li>關閉、刪除或匯出活動資料</li>
            <li>刪除對話資料</li>
            <li>回報問題</li>
            <li>解除服務</li>
        </ul>
        <h2>七、風險告知</h2>
        <p>我們承諾負責保護您的資料安全，並制定了處理資料外洩事件的相關程序。在資料外洩時，我們將即時通知您，並啟動相關的通報程序以減少對您的影響。</p>
        <p>此隱私政策將隨著法律規範及技術的變更而更新，請定期查閱。</p>
    `);

    const [loading, setLoading] = useState(false);

    return (
        <div className="grid p-fluid" style={{ height: '85vh', fontSize: '1.5rem' }}>
            <div className="card" style={{ width: '90%', height: '100%', marginBottom: '10px', position: 'relative', margin: 'auto' }}>
                <div style={{ float: 'left', height: '100%', width: '50%', position: 'relative', margin: 'auto', overflowY: 'auto' }}>
                    <h3>1. 是否取得使用者同意? <span>(告知資料處理的相關法條、政策依據等)</span></h3>
                        <div>
                            <RadioButton inputId="consentYes" name="consent" value="yes" />
                            <label htmlFor="consentYes">是</label>
                            <RadioButton inputId="consentNo" name="consent" value="no" style={{ marginLeft: '10px' }} />
                            <label htmlFor="consentNo">否</label>
                        </div>
                        <h3>2. 是否告知資料蒐集的範圍?</h3>
                        <div className="ml-3">a. 個人資料: 姓名、身分證號碼、位置資料、線上識別碼、個人的電話號碼、信用卡號碼、人員號碼、帳戶資料、車牌、外表、客戶號碼或地址</div>
                        <div className="ml-3 mt-2 mb-2">
                            <RadioButton inputId="scope1Yes" name="scope1" value="yes" />
                            <label htmlFor="scope1Yes">是</label>
                            <RadioButton inputId="scope1No" name="scope1" value="no" style={{ marginLeft: '10px' }} />
                            <label htmlFor="scope1No">否</label>
                        </div>
                        <div className="ml-3">b. 敏感個人資料: 生理、遺傳、生物識別、健康、醫療數據，以及揭示種族和民族血統、政治觀點、宗教、意識形態信念、工會成員身份的個人數據。</div>
                        <div className="ml-3 mt-2 mb-2">
                            <RadioButton inputId="scope2Yes" name="scope2" value="yes" />
                            <label htmlFor="scope2Yes">是</label>
                            <RadioButton inputId="scope2No" name="scope2" value="no" style={{ marginLeft: '10px' }} />
                            <label htmlFor="scope2No">否</label>
                        </div>
                        <div className="ml-3">c. 數位資料: 使能夠識別 IP 位址背後的用戶、cookie、GPS、社群活動資料</div>
                        <div className="ml-3 mt-2 mb-2">
                            <RadioButton inputId="scope3Yes" name="scope3" value="yes" />
                            <label htmlFor="scope3Yes">是</label>
                            <RadioButton inputId="scope3No" name="scope3" value="no" style={{ marginLeft: '10px' }} />
                            <label htmlFor="scope3No">否</label>
                        </div>
                        <h3>3. 是否明列資料蒐集的用途?</h3>
                        <div className="mt-2 mb-2">
                            <RadioButton inputId="purposeYes" name="purpose" value="yes" />
                            <label htmlFor="purposeYes">是</label>
                            <RadioButton inputId="purposeNo" name="purpose" value="no" style={{ marginLeft: '10px' }} />
                            <label htmlFor="purposeNo">否</label>
                        </div>
                        <h3>4. 是否特定資料保留的時間?</h3>
                        <div className="mt-2 mb-2">
                            <RadioButton inputId="retentionYes" name="retention" value="yes" />
                            <label htmlFor="retentionYes">是</label>
                            <RadioButton inputId="retentionNo" name="retention" value="no" style={{ marginLeft: '10px' }} />
                            <label htmlFor="retentionNo">否</label>
                        </div>
                        <h3>5. 是否說明資料處理的流程?</h3>
                        <div className="mt-2 mb-2">
                            <RadioButton inputId="processYes" name="process" value="yes" />
                            <label htmlFor="processYes">是</label>
                            <RadioButton inputId="processNo" name="process" value="no" style={{ marginLeft: '10px' }} />
                            <label htmlFor="processNo">否</label>
                        </div>
                        <h3>6. 是否賦予資料主體相關的權利?</h3>
                        <div className="ml-3">a. 調整帳戶設定</div>
                        <div className="ml-3 mt-2 mb-2">
                            <RadioButton inputId="rights1Yes" name="rights1" value="yes" />
                            <label htmlFor="rights1Yes">是</label>
                            <RadioButton inputId="rights1No" name="rights1" value="no" style={{ marginLeft: '10px' }} />
                            <label htmlFor="rights1No">否</label>
                        </div>
                        <div className="ml-3">b. 關閉/刪除/匯出活動資料</div>
                        <div className="ml-3 mt-2 mb-2">
                            <RadioButton inputId="rights2Yes" name="rights2" value="yes" />
                            <label htmlFor="rights2Yes">是</label>
                            <RadioButton inputId="rights2No" name="rights2" value="no" style={{ marginLeft: '10px' }} />
                            <label htmlFor="rights2No">否</label>
                        </div>
                        <div className="ml-3">c. 刪除對話資料</div>
                        <div className="ml-3 mt-2 mb-2">
                            <RadioButton inputId="rights3Yes" name="rights3" value="yes" />
                            <label htmlFor="rights3Yes">是</label>
                            <RadioButton inputId="rights3No" name="rights3" value="no" style={{ marginLeft: '10px' }} />
                            <label htmlFor="rights3No">否</label>
                        </div>
                        <div className="ml-3">d. 回報問題</div>
                        <div className="ml-3 mt-2 mb-2">
                            <RadioButton inputId="rights4Yes" name="rights4" value="yes" />
                            <label htmlFor="rights4Yes">是</label>
                            <RadioButton inputId="rights4No" name="rights4" value="no" style={{ marginLeft: '10px' }} />
                            <label htmlFor="rights4No">否</label>
                        </div>
                        <div className="ml-3">e. 解除服務</div>
                        <div className="ml-3 mt-2 mb-2">
                            <RadioButton inputId="rights5Yes" name="rights5" value="yes" />
                            <label htmlFor="rights5Yes">是</label>
                            <RadioButton inputId="rights5No" name="rights5" value="no" style={{ marginLeft: '10px' }} />
                            <label htmlFor="rights5No">否</label>
                        </div>
                        <h3>7. 是否踐行風險告知?</h3>
                        <div className="ml-3">a. 負責與承諾</div>
                        <div className="ml-3 mt-2 mb-2">
                            <RadioButton inputId="risk1Yes" name="risk1" value="yes" />
                            <label htmlFor="risk1Yes">是</label>
                            <RadioButton inputId="risk1No" name="risk1" value="no" style={{ marginLeft: '10px' }} />
                            <label htmlFor="risk1No">否</label>
                        </div>
                        <div className="ml-3">b. 資料外洩時如何處理、相關通報程序</div>
                        <div className="ml-3 mt-2 mb-2">
                            <RadioButton inputId="risk2Yes" name="risk2" value="yes" />
                            <label htmlFor="risk2Yes">是</label>
                            <RadioButton inputId="risk2No" name="risk2" value="no" style={{ marginLeft: '10px' }} />
                            <label htmlFor="risk2No">否</label>
                        </div>
                </div>
                <div
                    style={{
                        float: 'right', 
                        width: '50%', 
                        height: '100%',
                        padding: '25px', 
                        border: '1px solid #ccc', 
                        borderRadius: '10px',
                        backgroundColor: loading ? '#d3d3d3' : '#f9f9f9', 
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        position: 'relative',
                        overflowY: 'auto'
                    }}
                >
                    <div dangerouslySetInnerHTML={{ __html: chatBotResponse }} />
                    {loading && (
                        <div 
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <ProgressSpinner style={{ width: '50px', height: '50px'}} strokeWidth="4" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Test;
