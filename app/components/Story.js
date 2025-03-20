import React from 'react'
import StoryCarousel from './StoryCarousel'

export default function Story() {
  return (
    <div className=" max-w-[1280px] w-full h-full md:h-auto md:aspect-[768/266] xl:aspect-[1280/338] aspect-[375/184] flex flex-col justify-evenly items-start ">
      <div className='flex gap-x-5 justify-center xl:justify-start items-center w-full mt-0 '>
        <img src="/logo/youtube_story.png" alt="" className='h-8 w-auto md:h-12' />
        <div className='xl:text-[35px] md:text-[30px] text-[20px] font-bold'>BADIVE DIVING STORY</div>
      </div>
      
      <StoryCarousel></StoryCarousel>

    </div>
  )
}
