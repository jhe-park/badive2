import MainBanner from './components/MainBanner.js'
import MainStory from './components/MainStory.js'
import MainInstructor from './components/MainInstructor.js'
import MainCurriculum from './components/MainCurriculum.js'
import MainNews from './components/MainNews.js'

export default async function Home() {
  return (
    <div className="flex w-full h-full flex-col items-center justify-start">
      <MainBanner />
      <MainStory />
      <MainInstructor />
      <MainCurriculum />
      <MainNews />
    </div>
  );
}
