"use client";

import { RadioButton } from "primereact/radiobutton";
import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputTextarea } from 'primereact/inputtextarea';

const CheckList = () => {
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [questions, setQuestions] = useState<
        { Checklist_Item: string; GDPR_Checklist_Question: string; Section: string }[]
    >([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);
    const [chatBotResponse, setChatBotResponse] = useState<string>("目前還未送出問題");
    const [loading, setLoading] = useState(false);
    const [additionalComments, setAdditionalComments] = useState<{ [key: string]: string }>({});
    const [responses, setResponses] = useState<{ [key: string]: string }>({}); // 儲存每個問題的最後一次回應

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

    const getChatBotMessage = async (question: string, answer: string) => {
        setLoading(true);
        setChatBotResponse("");
        try {
            const request = {
                question,
                answer,
                query: additionalComments[questions[currentQuestionIndex].GDPR_Checklist_Question] || "我的回答正確嗎"
            };
            const response = await fetch("http://140.115.54.33:5469/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });
            if (response.ok) {
                const data = await response.json();
                setChatBotResponse(data.gpt_response);
                setResponses(prevResponses => ({
                    ...prevResponses,
                    [question]: data.gpt_response,
                })); // 儲存API回應
                setAnsweredQuestionsCount(prevCount => Math.max(prevCount, currentQuestionIndex + 1));
            } else {
                console.error("Failed to fetch chatbot response");
            }
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {  
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

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (currentQuestion) {
            setAdditionalComments((prevComments) => ({
                ...prevComments,
                [currentQuestion.GDPR_Checklist_Question]: e.target.value,
            }));
        }
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        if(currentQuestionIndex < answeredQuestionsCount){
            setChatBotResponse("目前還未送出問題");
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
            const previousQuestion = questions[currentQuestionIndex - 1];
            setChatBotResponse(responses[previousQuestion.GDPR_Checklist_Question] || "目前還未送出問題");
        }
    };

    return (
        <div className="grid p-fluid" style={{ height: '80vh', fontSize: '1.5rem' }}>
            <div className="card" style={{ width: '80%', height: '100%', marginBottom: '10px', position: 'relative', margin: 'auto' }}>
                <div style={{ float: 'left', height: '100%', width: '50%', position: 'relative', margin: 'auto' }}>
                    <h1>隱私保障法普小學堂</h1>
                    {questions.length > 0 && (
                        <div className="field">
                            <div style={{ marginBottom: '0.5rem', fontWeight: 'bold', color: '#007ad9', letterSpacing: '0.02rem' }}>
                                {currentQuestionIndex + 1}. {questions[currentQuestionIndex].Checklist_Item}
                            </div>
                            <label style={{ display: 'block', fontWeight: 'bold', letterSpacing: '0.02rem' }}>
                                {questions[currentQuestionIndex].GDPR_Checklist_Question}
                            </label>
                            <div className="p-formgroup-inline" style={{ marginTop: '0.5rem',  }}>
                                <div className="field-radiobutton">
                                    <RadioButton
                                        inputId={`${currentQuestionIndex}-yes`}
                                        name={questions[currentQuestionIndex].GDPR_Checklist_Question}
                                        value="是"
                                        onChange={(e) => handleAnswerChange(e.value)}
                                        checked={answers[questions[currentQuestionIndex].GDPR_Checklist_Question] === "是"}
                                        disabled={loading}
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
                                        disabled={loading}
                                    />
                                    <label htmlFor={`${currentQuestionIndex}-no`}>否</label>
                                </div>
                            </div>
                            <div className="field">
                                <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
                                    請輸入您想提問的問題：
                                </div>
                                <InputTextarea
                                    id="comment"
                                    value={additionalComments[questions[currentQuestionIndex].GDPR_Checklist_Question] || ''}
                                    onChange={handleCommentChange}
                                    rows={10}
                                    cols={30}
                                    style={{ width: '80%', marginTop: '0.5rem', marginRight: '20px', fontSize: '1.5rem' }}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    )}
                    {currentQuestionIndex >= questions.length && (
                        <div>
                            <h3>問卷已完成，感謝您的參與！</h3>
                        </div>
                    )}
                    <div style={{ position: 'absolute', bottom: 0, right: 0, display: 'flex', alignItems: 'center' }}>
                        <Button
                            label="送出"
                            icon="pi pi-send"
                            size="small"
                            severity="success"
                            disabled={!answers[questions[currentQuestionIndex]?.GDPR_Checklist_Question] || loading}
                            style={{ marginRight: '5px' }}
                            onClick={() => getChatBotMessage(
                                questions[currentQuestionIndex].GDPR_Checklist_Question,
                                answers[questions[currentQuestionIndex]?.GDPR_Checklist_Question]
                            )}
                        />
                        <img 
                            src="/layout/images/robot.png" 
                            alt="Robot" 
                            style={{ 
                                width: '100px', 
                                height: '100px' 
                            }} 
                        />
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
                    <p>
                        {chatBotResponse.split('\n').map((line, index) => (
                            <span key={index}> {line} <br /> </span>
                        ))}
                    </p>
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
            {questions.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: 'auto', marginTop: '10px' }}>
                    {currentQuestionIndex > 0 && (
                        <Button
                            label="上一題"
                            icon="pi pi-chevron-left"
                            onClick={handlePreviousQuestion}
                            className="p-button-secondary"
                            style={{ width: '150px', padding: '0.25rem' }}
                            disabled={loading}
                        />
                    )}
                    <Button
                        label={currentQuestionIndex === questions.length - 1 ? "完成" : "下一題"}
                        icon="pi pi-chevron-right"
                        iconPos="right"
                        onClick={handleNextQuestion}
                        disabled={loading}
                        style={{ width: '150px', padding: '0.25rem', marginLeft: 'auto' }}
                    />
                </div>
            )}
        </div>
    );
};

export default CheckList;
