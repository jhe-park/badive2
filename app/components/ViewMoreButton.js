import { RiArrowRightWideLine } from 'react-icons/ri';

const ViewMoreButton = ({ onClick, className, useStroke }) => {
  return (
    <button onClick={onClick} className={['inline-flex items-center justify-center gap-[6px] sm:gap-[11px] md:gap-[15px]', className].join(' ')}>
      <span 
      className={['text-black uppercase text-sm sm:text-lg md:text-xl',
      useStroke && '[text-stroke:1px_white] [-webkit-text-stroke:1px_white]'].join(' ')}>
        VIEW MORE
      </span>
      <span className={['rounded-full border border-black inline-flex items-center justify-center p-px w-4 h-4 sm:p-1 md:p-[5px] sm:w-6 sm:h-6 md:w-[34px] md:h-[34px]', 
        useStroke && 'bg-white hover:bg-black hover:text-white'].join(' ')}>
        <RiArrowRightWideLine />
      </span>
    </button>
  )
}
export default ViewMoreButton