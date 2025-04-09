import { headers } from 'next/headers';
import MainBanner from './components/MainBanner';
import MainCurriculum from './components/MainCurriculum';
import MainInstructor from './components/MainInstructor';
import MainNews from './components/MainNews';
import MainStory from './components/MainStory';
import WelcomePopup from './components/WelcomePopup';

export default async function Home() {
  checkIsSafariBrowser();
  return (
    <div className="flex w-full h-full flex-col items-center justify-start">
      <WelcomePopup />
      <MainBanner isSafari={await checkIsSafariBrowser()} />
      <MainStory />
      <MainInstructor />
      <MainCurriculum />
      <MainNews />
    </div>
  );
}

async function checkIsSafariBrowser() {
  const headersList = headers();
  const userAgent = (await headersList).get('user-agent') || '';
  const isSafari = userAgent.includes('Safari') && !userAgent.includes('Chrome') && !userAgent.includes('Edg');
  return isSafari;
}
