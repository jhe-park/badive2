import MainBanner from './components/MainBanner.js'

export default async function Home() {
  return (
    <div className="flex w-full h-full flex-col items-center justify-start">
      <MainBanner />
    </div>
  );
}
