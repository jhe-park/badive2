import { headers } from 'next/headers';
import MainBanner from './components/MainBanner';
import MainCurriculum from './components/MainCurriculum';
import MainInstructor from './components/MainInstructor';
import MainNews from './components/MainNews';
import MainStory from './components/MainStory';
import WelcomePopup from './components/WelcomePopup';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';

const Home: NextPage<NextPageProps> = async ({ params, searchParams }) => {
  const { returnUrl } = await searchParams;

  console.log('in home');
  console.log('returnUrl');
  console.log(returnUrl);

  if (typeof returnUrl === 'string' && returnUrl.length > 0) {
    redirect(returnUrl);
  }

  checkIsSafariBrowser();

  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <WelcomePopup />
      <MainBanner isSafari={await checkIsSafariBrowser()} />
      <MainStory />
      <MainInstructor />
      <MainCurriculum />
      <MainNews />
    </div>
  );
};

async function checkIsSafariBrowser() {
  const headersList = headers();
  const userAgent = (await headersList).get('user-agent') || '';
  const isSafari = userAgent.includes('Safari') && !userAgent.includes('Chrome') && !userAgent.includes('Edg');
  return isSafari;
}

export default Home;
