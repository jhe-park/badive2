'use client';

export default function Description({ noticeData }) {
  return (
    <div className="p-6">
      <div className="w-full h-full rounded-lg overflow-hidden mb-6 flex items-center justify-start flex-col gap-y-2">
        <style jsx>{`
          .content img {
            display: flex;
            justify-content: center;
            border-radius: 10px;
          }
        `}</style>
        <div className="w-full flex flex-col justify-start gap-y-2 content" dangerouslySetInnerHTML={{ __html: noticeData.description }} />
      </div>
    </div>
  );
}
