import React from 'react'
import StoryCarousel from './StoryCarousel'
export default function Story() {
  return (
    <div className=" w-full h-[400px] flex flex-col justify-center items-start gap-y-5 px-[2vw] py-[1vw]">
      <div className='flex  gap-x-5 justify-center items-center'>
        <img src="/logo/youtube_story.png" alt="" className='h-12 w-auto' />
        <p className='text-[36px] font-bold'>BDN DIVING STORY</p>
      </div>
      
      <StoryCarousel></StoryCarousel>

    </div>
  )
}
