"use client";

import React, { useState } from 'react';
import stringReplace from 'react-string-replace';
import parse, { DOMNode, Element } from 'html-react-parser';

const CheckList: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<string>('');

    const text = `<p>這是一篇範例文章。</p><p>我們會在文章中高亮某些特定的行。</p><p>請注意該行文字會被高亮顯示。</p><p>這是另一行需要高亮的文字。</p><p>這裡還有一行需要高亮的文字。</p>`;

    const linesToHighlight = [
        "我們會在文章中高亮某些特定的行。",
        "這是另一行需要高亮的文字",
        "這裡還有一行需要高亮的文字。"
    ];

    const handleHighlightClick = (line: string) => {
        setModalContent(line);
        setIsModalVisible(true);
    };

    let highlightedText = text;
    linesToHighlight.forEach(line => {
        highlightedText = stringReplace(highlightedText, line, (match, i) => (
            `<span
                key=${i}
                style="background-color: yellow; color: blue; text-decoration: underline; cursor: pointer;"
            >
                ${match}
            </span>`
        )).join(''); // 使用 join 将结果转回字符串
    });

    const parsedText = parse(highlightedText, {
        replace: (domNode: DOMNode) => {
            if (domNode instanceof Element && domNode.tagName === 'span') {
                const content = domNode.children.length > 0 ? domNode.children[0].data : '';
                return (
                    <span
                        style={{ backgroundColor: 'yellow', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                        onClick={() => handleHighlightClick(content)}
                    >
                        {content}
                    </span>
                );
            }
        }
    });

    return (
        <div className="grid p-fluid" style={{ height: '580px' }}>
            <div className="card" style={{ width: '100%', height: '100%', marginBottom: '10px', position: 'relative', margin: 'auto' }}>
                <div>{parsedText}</div> {/* 渲染解析后的 HTML */}
                
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
