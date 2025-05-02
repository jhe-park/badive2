import React from 'react';
import StoryCarousel from './StoryCarousel';

export default function Story() {
  return (
    <div className="flex aspect-[375/184] h-full w-full max-w-[1280px] flex-col items-start justify-evenly md:aspect-[768/266] md:h-auto xl:aspect-[1280/338]">
      <div className="mt-0 flex w-full items-center justify-center gap-x-5 xl:justify-start">
        <img loading="lazy" src="/logo/youtube_story.png" alt="" className="h-8 w-auto md:h-12" />
        <div className="text-[20px] font-bold md:text-[30px] xl:text-[35px]">BADIVE DIVING STORY</div>
      </div>

      <StoryCarousel></StoryCarousel>
    </div>
  );
}
