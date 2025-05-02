'use client';

import React, { useState } from 'react';

interface PrivacyPolicyProps {
  onConsent?: (isConsented: boolean) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onConsent }) => {
  const [isExpanded, setIsExpanded] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });
  const [isConsented, setIsConsented] = useState(false);

  const toggleSection = (sectionNumber: number) => {
    setIsExpanded(prev => ({
      ...prev,
      [sectionNumber]: !prev[sectionNumber],
    }));
  };

  const handleConsent = () => {
    const newConsentState = !isConsented;
    setIsConsented(newConsentState);
    if (onConsent) {
      onConsent(newConsentState);
    }
  };

  return (
    <div className="mx-auto mb-12 mt-44 max-w-3xl rounded-lg bg-white px-16 py-8 shadow-md">
      <h1 className="mb-6 pb-8 text-center text-3xl font-bold text-gray-800">개인정보 처리방침</h1>

      {/* Section 1 */}
      <div className="mb-4 border-b pb-2">
        <div className="flex cursor-pointer items-center justify-between" onClick={() => toggleSection(1)}>
          <h2 className="text-lg font-semibold text-gray-700">1. 개인정보의 수집 방법</h2>
          <svg
            className={`h-5 w-5 transition-transform duration-200 ${isExpanded[1] ? 'rotate-180 transform' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isExpanded[1] && (
          <div className="mt-2 pl-2 text-gray-600">
            <p>이용자로부터 모바일 홈페이지 양식을 통해 개인정보를 수집합니다.</p>
          </div>
        )}
      </div>

      {/* Section 2 */}
      <div className="mb-4 border-b pb-2">
        <div className="flex cursor-pointer items-center justify-between" onClick={() => toggleSection(2)}>
          <h2 className="text-lg font-semibold text-gray-700">2. 개인정보의 수집 목적, 항목 및 보유기간</h2>
          <svg
            className={`h-5 w-5 transition-transform duration-200 ${isExpanded[2] ? 'rotate-180 transform' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isExpanded[2] && (
          <div className="mt-2 pl-2 text-gray-600">
            <p className="mb-3">
              이용자의 개인정보는 보유기간이 경과하거나 이용목적이 달성되면 지체 없이 파기합니다. 단, 법령 등에 의해 보관해야 하는 경우에는 해당기간 동안
              보관합니다.
            </p>

            <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 p-3">
              <h3 className="mb-2 font-medium">개인정보 수집 및 이용에 대한 안내</h3>
              <ol className="ml-5 list-decimal space-y-1">
                <li>수집/이용 목적: 주문, 예약, 문의 등 고객요청 처리 및 결과 회신</li>
                <li>수집하는 항목: 이름, 연락처, 주소, 이메일</li>
                <li>보유/이용 기간: 고객요청 처리 후 3개월</li>
              </ol>
              <p className="mt-2 text-sm text-gray-500">상기 내용에 동의하지 않으시는 경우, 개인정보 수집 목적에 따른 서비스 제공이 일부 제한될 수 있습니다.</p>
            </div>
          </div>
        )}
      </div>

      {/* Section 3 */}
      <div className="mb-4 border-b pb-2">
        <div className="flex cursor-pointer items-center justify-between" onClick={() => toggleSection(3)}>
          <h2 className="text-lg font-semibold text-gray-700">3. 개인정보의 제3자 제공 및 처리 위탁</h2>
          <svg
            className={`h-5 w-5 transition-transform duration-200 ${isExpanded[3] ? 'rotate-180 transform' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isExpanded[3] && (
          <div className="mt-2 pl-2 text-gray-600">
            <p className="mb-3">법령에 의거하여 제3자 제공 및 처리 위탁 동의가 필요한 경우에는 이용자에게 명시적으로 동의를 받습니다.</p>

            <p className="mb-2">공개로 동의를 대신할 수 있는 처리 위탁은 아래과 같습니다.</p>
            <ul className="ml-5 list-disc">
              <li>업체명: 택배사</li>
              <li>위탁업무: 주문상품 배송</li>
            </ul>
          </div>
        )}
      </div>

      {/* Section 4 */}
      <div className="mb-4 border-b pb-2">
        <div className="flex cursor-pointer items-center justify-between" onClick={() => toggleSection(4)}>
          <h2 className="text-lg font-semibold text-gray-700">4. 개인정보의 파기절차 및 방법</h2>
          <svg
            className={`h-5 w-5 transition-transform duration-200 ${isExpanded[4] ? 'rotate-180 transform' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isExpanded[4] && (
          <div className="mt-2 pl-2 text-gray-600">
            <p>이용자의 개인정보는 원칙적으로 보유기간이 경과하거나 이용목적이 달성된 경우에는 재생 불가능한 방법으로 지체 없이 파기합니다.</p>
          </div>
        )}
      </div>

      {/* Section 5 */}
      <div className="mb-4 border-b pb-2">
        <div className="flex cursor-pointer items-center justify-between" onClick={() => toggleSection(5)}>
          <h2 className="text-lg font-semibold text-gray-700">5. 이용자 및 법정대리인의 권리와 그 행사방법</h2>
          <svg
            className={`h-5 w-5 transition-transform duration-200 ${isExpanded[5] ? 'rotate-180 transform' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isExpanded[5] && (
          <div className="mt-2 pl-2 text-gray-600">
            <p>
              이용자 및 법정대리인은 언제든지 등록되어 있는 자신 또는 만14세 미만 아동의 개인정보를 조회하거나 수정할 수 있으며 정보삭제를 요청할 수도 있습니다.
            </p>
            <p className="mt-2">정보삭제를 원하시는 경우 '개인정보 보호책임자'에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.</p>
          </div>
        )}
      </div>

      {/* Section 6 */}
      <div className="mb-4 border-b pb-2">
        <div className="flex cursor-pointer items-center justify-between" onClick={() => toggleSection(6)}>
          <h2 className="text-lg font-semibold text-gray-700">6. 개인정보 보호책임자</h2>
          <svg
            className={`h-5 w-5 transition-transform duration-200 ${isExpanded[6] ? 'rotate-180 transform' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isExpanded[6] && (
          <div className="mt-2 pl-2 text-gray-600">
            <p>개인정보보호 관련 민원은 개인정보 보호책임자에게 신고하여 주시기 바랍니다.</p>
            <p className="mt-2 font-medium">박치양/010-8644-8733</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-gray-600">
        <p>본 '개인정보 처리방침'은 최신의 상태로 관리되고 있습니다.</p>
        <p className="mt-1 font-medium">시행일: 2025년 03월 01일</p>
      </div>

      {/* Consent Checkbox */}
      {/* <div className="mt-8 flex items-center justify-center">
        <label className="flex cursor-pointer items-center">
          <input type="checkbox" checked={isConsented} onChange={handleConsent} className="form-checkbox h-5 w-5 rounded text-blue-600" />
          <span className="ml-2 text-gray-700">개인정보 처리방침에 동의합니다</span>
        </label>
      </div> */}
    </div>
  );
};

export default PrivacyPolicy;
