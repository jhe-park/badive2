'use client'
import React, { useState } from 'react';
import Froala from '@/components/Froala/Froala';

export default function FroalaExample() {
  const [content, setContent] = useState('<h2>안녕하세요! 🌟</h2><p>Froala 에디터에 오신 것을 환영합니다.</p><p>이 에디터는 다음과 같은 기능을 제공합니다:</p><ul><li>다양한 <strong>폰트 크기</strong> 및 스타일 지원</li><li><span style="color: #1e88e5;">텍스트 색상</span> 변경</li><li><span style="background-color: #fff176;">배경색</span> 변경</li><li>이미지 및 비디오 삽입</li><li>표 만들기</li><li>그리고 더 많은 기능들!</li></ul><p>자유롭게 사용해 보세요!</p>');

  const handleEditorChange = (model) => {
    setContent(model);
  };

  const handleSave = () => {
    alert('저장된 내용:\n' + content);
    console.log('저장된 내용:', content);
  };

  return (
    <div className="froala-example-container" style={{width: '100%'}}>
      
      <div className="editor-wrapper">
        <Froala
          value={content}
          onChange={handleEditorChange}
          placeholder="내용을 입력해주세요..."
          height={400}
          events={{
            'initialized': function() {
              console.log('에디터가 초기화되었습니다.');
            }
          }}
        />
      </div>
      
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>
          내용 저장하기
        </button>
      </div>
      
      
      
      <style jsx>{`
        .froala-example-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 0 20px;
          font-family: 'Noto Sans KR', sans-serif;
        }
        
        .example-title {
          color: #343a40;
          font-size: 32px;
          margin-bottom: 16px;
          text-align: center;
        }
        
        .example-description {
          color: #6c757d;
          text-align: center;
          margin-bottom: 30px;
          font-size: 16px;
          line-height: 1.6;
        }
        
        .editor-wrapper {
          margin-bottom: 30px;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .button-container {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }
        
        .save-button {
          background-color: #228be6;
          color: white;
          border: none;
          padding: 12px 24px;
          font-size: 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
          font-weight: 500;
        }
        
        .save-button:hover {
          background-color: #1c7ed6;
        }
        
        .preview-container {
          background-color: #f8f9fa;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .preview-title {
          color: #343a40;
          font-size: 24px;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #dee2e6;
        }
        
        .content-preview {
          background-color: white;
          padding: 20px;
          border-radius: 4px;
          min-height: 200px;
        }
      `}</style>
    </div>
  );
};

