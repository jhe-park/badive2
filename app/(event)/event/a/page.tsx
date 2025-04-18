import { type NextPage } from 'next';

const PageForEvent1: NextPage<NextPageProps> = ({}) => {
  return (
    <div className="pt-32">
      <iframe src="http://jhecompany.dothome.co.kr/event/" className="w-screen min-h-screen" frameBorder="0"></iframe>
    </div>
  );
};

export default PageForEvent1;
