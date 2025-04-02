import { RiArrowRightWideLine } from 'react-icons/ri';

const ViewMoreButton = ({ onClick, className, useReverse }) => {
  return (
    <button onClick={onClick} className={['group inline-flex items-center justify-center gap-[6px] sm:gap-[11px] md:gap-[15px]', className].join(' ')}>
      <span 
      className={['text-black uppercase text-sm sm:text-lg md:text-xl', useReverse && 'text-white'].join(' ')}>
        VIEW MORE
      </span>
      <span className={['rounded-full border border-black inline-flex items-center justify-center p-px w-4 h-4 sm:p-1 md:p-[5px] sm:w-6 sm:h-6 md:w-[34px] md:h-[34px]', 
        useReverse && 'bg-white group-hover:bg-black group-hover:text-white'].join(' ')}>
        <RiArrowRightWideLine />
      </span>
    </button>
  )
}
export default ViewMoreButton