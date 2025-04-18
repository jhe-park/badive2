import React from 'react';
import RequestForm from './components/RequestForm';
export default async function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px] ">
      <div className="w-[calc(1320/1920*100%)] h-full flex flex-col items-center justify-center gap-y-5 my-24">
        <RequestForm className={''}></RequestForm>
      </div>
    </div>
  );
}
