'use client';

export default function Description({ noticeData }) {
  return (
    <div className="p-6">
      <div className="mb-6 flex h-full w-full flex-col items-center justify-start gap-y-2 overflow-hidden rounded-lg">
        <style jsx>{`
          .content img {
            display: flex;
            justify-content: center;
            border-radius: 10px;
          }
        `}</style>
        <div className="content flex w-full flex-col justify-start gap-y-2" dangerouslySetInnerHTML={{ __html: noticeData.description }} />
      </div>
    </div>
  );
}
