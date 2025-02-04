'use client'
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
const ToastBegin = () => {
  useEffect(() => {
    const message = new URLSearchParams(window.location.search).get('message');
    console.log('message', message)
    if (message?.includes('success')) {
      toast.success("로그인에 성공하였습니다.");
    }
    if (message?.includes('fail')) {
      toast.error("로그인에 실패하였습니다.");
    }
  }, []);
  return <>
  <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
  </>;
};


export default ToastBegin;