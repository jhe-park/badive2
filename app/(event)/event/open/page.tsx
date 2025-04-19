import { type NextPage } from 'next';
import { redirect } from 'next/navigation';

const PageForEvent1: NextPage<NextPageProps> = ({}) => {
  redirect('http://jhecompany.dothome.co.kr/event');

  return <iframe src="http://jhecompany.dothome.co.kr/event" className="min-h-screen w-screen" frameBorder="0"></iframe>;
};

export default PageForEvent1;
