import MainBanner from './components/MainBanner.js'
import MainStory from './components/MainStory.js'

export default async function Home() {
  return (
    <div className="flex w-full h-full flex-col items-center justify-start">
      <MainBanner />
      <MainStory />
    </div>
  );
}
