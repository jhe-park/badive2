import Script from 'next/script';

// 다음과 같이 변경
export function SmartMediaLog() {
  return (
    <>
      <Script
        id="hpt-info"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `var hpt_info={'_account':'UHPT-31657', '_server': 'a29'};`,
        }}
      />
      <Script id="smart-media-log" src="//cdn.smlog.co.kr/core/smart.js" strategy="afterInteractive" />
      {/* noscript 태그 */}
      <noscript>
        <img src="//a29.smlog.co.kr/smart_bda.php?_account=31657" style={{ display: 'none', width: 0, height: 0 }} alt="" />
      </noscript>
    </>
  );
}
