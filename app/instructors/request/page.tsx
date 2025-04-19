import React from 'react';
import RequestForm from './components/RequestForm';
export default async function page() {
  return (
    <div className="mt-[100px] flex h-full w-full flex-col items-center justify-center">
      <div className="my-24 flex h-full w-[calc(1320/1920*100%)] flex-col items-center justify-center gap-y-5">
        <RequestForm className={''}></RequestForm>
      </div>
    </div>
  );
}
