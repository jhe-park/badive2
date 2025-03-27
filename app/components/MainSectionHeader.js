const MainSectionHeader = ({title}) => {
  return (<h1 className='flex items-center justify-center font-ELAND_Choice_M font-bold 
    gap-[10px] text-3xl py-[50px]
    sm:gap-[14px] sm:text-[40px] sm:py-24
    md:gap-[27px] md:text-[50px] md:py-[115px]
    lg:gap-[27px] lg:py-[100px]
  '>
    <img src='/story/title.png' className='w-[50px] h-[50px]' />
    {title}
  </h1>)
}
export default MainSectionHeader