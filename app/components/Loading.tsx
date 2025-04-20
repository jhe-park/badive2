'use client';

import useLoginStatusStore from '../store/useLoginStatusStore';

type TProps = { unconditionalLoading?: boolean };

export const Loading: React.FC<TProps> = ({ unconditionalLoading }) => {
  const { loginStatus, setLoginStatus } = useLoginStatusStore();

  const isLoading = unconditionalLoading || loginStatus === 'LOGIN_WORK_IN_PROGRESS' || loginStatus === 'LOGIN_COMPLETED';

  return (
    <>
      {isLoading && (
        <div className="fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
          <div
            className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">로딩 중...</span>
          </div>
        </div>
      )}
    </>
  );
};
