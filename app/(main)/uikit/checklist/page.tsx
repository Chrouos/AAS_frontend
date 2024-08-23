"use client";

import { RadioButton } from "primereact/radiobutton";
import { useState, useEffect } from "react";
import { Button } from "primereact/button";

const CheckList = () => {
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [questions, setQuestions] = useState<
        { Checklist_Item: string; GDPR_Checklist_Question: string; Section: string }[]
    >([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("http://140.115.54.33:5469/get_checklist");
                if (response.ok) {
                    const data = await response.json();
                    setQuestions(data);
                } else {
                    console.error("Failed to fetch questions");
                }
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswerChange = (answer: string) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (currentQuestion) {
            setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [currentQuestion.GDPR_Checklist_Question]: answer,
            }));
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
    };

    return (
        <div className="grid p-fluid" style={{ height: '580px' }}>
            <div className="card" style={{ width: '80%', height: '100%', marginBottom: '10px', position: 'relative' }}>
                <div style={{ float: 'left', height: '100%', width: '50%', position: 'relative', margin: 'auto' }}>
                    <h2>個人資料保護問卷</h2>
                    {questions.length > 0 && (
                        <div className="field">
                            <div style={{ marginBottom: '0.5rem', fontWeight: 'bold', color: '#007ad9' }}>
                                {currentQuestionIndex + 1}. {questions[currentQuestionIndex].Checklist_Item}
                            </div>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>
                                {questions[currentQuestionIndex].GDPR_Checklist_Question}
                            </label>
                            <div className="p-formgroup-inline" style={{ marginTop: '0.5rem' }}>
                                <div className="field-radiobutton">
                                    <RadioButton
                                        inputId={`${currentQuestionIndex}-yes`}
                                        name={questions[currentQuestionIndex].GDPR_Checklist_Question}
                                        value="是"
                                        onChange={(e) => handleAnswerChange(e.value)}
                                        checked={answers[questions[currentQuestionIndex].GDPR_Checklist_Question] === "是"}
                                    />
                                    <label htmlFor={`${currentQuestionIndex}-yes`}>是</label>
                                </div>
                                <div className="field-radiobutton">
                                    <RadioButton
                                        inputId={`${currentQuestionIndex}-no`}
                                        name={questions[currentQuestionIndex].GDPR_Checklist_Question}
                                        value="否"
                                        onChange={(e) => handleAnswerChange(e.value)}
                                        checked={answers[questions[currentQuestionIndex].GDPR_Checklist_Question] === "否"}
                                    />
                                    <label htmlFor={`${currentQuestionIndex}-no`}>否</label>
                                </div>
                            </div>
                        </div>
                    )}
                    {currentQuestionIndex >= questions.length && (
                        <div>
                            <h3>問卷已完成，感謝您的參與！</h3>
                        </div>
                    )}
                    <img 
                        src="/layout/images/robot.png" 
                        alt="Robot" 
                        style={{ 
                            position: 'absolute', 
                            bottom: 0, 
                            right: 0, 
                            width: '100px', 
                            height: '100px' 
                        }} 
                    />
                </div>
                {/* 這裡是新增的框架 */}
                <div
                    style={{
                        float: 'right', 
                        width: '50%', 
                        height: '100%',
                        padding: '10px', 
                        border: '1px solid #ccc', 
                        borderRadius: '10px',
                        backgroundColor: '#f9f9f9',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
                    }}
                >
                        <p>這是右側顯示的文字框。</p>
                </div>
            </div>
            {questions.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: 'auto' }}>
                    {currentQuestionIndex > 0 && (
                        <Button
                            label="上一題"
                            icon="pi pi-chevron-left"
                            onClick={handlePreviousQuestion}
                            className="p-button-secondary"
                            style={{ width: '150px', padding: '0.25rem', fontSize: '0.9rem' }}
                        />
                    )}
                    <Button
                        label={currentQuestionIndex === questions.length - 1 ? "完成" : "下一題"}
                        icon="pi pi-chevron-right"
                        iconPos="right"
                        onClick={handleNextQuestion}
                        disabled={!answers[questions[currentQuestionIndex]?.GDPR_Checklist_Question]} // 確保有選擇答案後才能前進
                        style={{ width: '150px', padding: '0.25rem', fontSize: '0.9rem', marginLeft: 'auto' }}
                    />
                </div>
            )}
        </div>
    );
};

export default CheckList;
