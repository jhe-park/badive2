import { RiArrowRightWideLine } from 'react-icons/ri';

const ViewMoreButton = ({ onClick, className, useReverse }) => {
  return (
    <button onClick={onClick} className={['group inline-flex items-center justify-center gap-[6px] sm:gap-[11px] md:gap-[15px]', className].join(' ')}>
      <span className={['text-sm uppercase text-black sm:text-lg md:text-xl', useReverse && 'text-white'].join(' ')}>VIEW MORE</span>
      <span
        className={[
          'inline-flex h-4 w-4 items-center justify-center rounded-full border border-black p-px sm:h-6 sm:w-6 sm:p-1 md:h-[34px] md:w-[34px] md:p-[5px]',
          useReverse && 'bg-white group-hover:bg-black group-hover:text-white',
        ].join(' ')}
      >
        <RiArrowRightWideLine />
      </span>
    </button>
  );
};
export default ViewMoreButton;
