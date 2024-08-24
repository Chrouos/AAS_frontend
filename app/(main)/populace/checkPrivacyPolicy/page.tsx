"use client";

import React, { useState, ReactNode } from 'react';
import stringReplace from 'react-string-replace';

const CheckList: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<string>('');

    const text = `這是一篇範例文章。我們會在文章中高亮某些特定的行。請注意該行文字會被高亮顯示。這是另一行需要高亮的文字。這裡還有一行需要高亮的文字。`;

    const linesToHighlight = [
        "我們會在文章中高亮某些特定的行。",
        "這是另一行需要高亮的文字",
        "這裡還有一行需要高亮的文字。"
    ];

    // 點擊高亮文字時顯示模態框
    const handleHighlightClick = (line: string) => {
        setModalContent(line);
        setIsModalVisible(true);
    };

    // 使用 ReactNode[] 初始化 highlightedText
    let highlightedText: ReactNode[] = [text];

    // 使用 stringReplace 依次處理每個 lineToHighlight
    linesToHighlight.forEach(line => {
        highlightedText = highlightedText.map(chunk =>
            typeof chunk === 'string'
                ? stringReplace(chunk, line, (match, i) => (
                    <span
                        key={i}
                        onClick={() => handleHighlightClick(match)}
                        style={{ backgroundColor: 'yellow', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                        {match}
                    </span>
                ))
                : chunk
        ).flat();  // 使用 flat() 將嵌套的數組展平
    });

    return (
        <div className="grid p-fluid" style={{ height: '580px' }}>
            <div className="card" style={{ width: '100%', height: '100%', marginBottom: '10px', position: 'relative', margin: 'auto' }}>
                <p>{highlightedText}</p> {/* 顯示高亮後的文字 */}
                
                {isModalVisible && (
                    <div
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white',
                            padding: '20px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            zIndex: 1000,
                        }}
                    >
                        <h2>高亮內容</h2>
                        <p>{modalContent}</p>
                        <button onClick={() => setIsModalVisible(false)}>關閉</button>
                    </div>
                )}

                {isModalVisible && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 999,
                        }}
                        onClick={() => setIsModalVisible(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default CheckList;
