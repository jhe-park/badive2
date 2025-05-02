export default function Instruction({ data }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-12 px-2 py-9 md:px-10">
      {data.instruction.map((item, index) => (
        <div className="relative w-full" key={index}>
          {/* Semi-circle header that overlaps the border */}
          <div
            className={`absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full px-8 py-2 text-center font-bold ${index === 3 ? 'text-white' : ''} whitespace-nowrap text-[18px] md:text-[25px]`}
            style={{
              backgroundColor: index === 0 ? '#BBDCFF' : index === 1 ? '#58A8FF' : index === 2 ? '#58A8FF' : index === 3 ? '#268EFF' : '#BBDCFF',
            }}
          >
            {item.title}
          </div>

          {/* Main content box */}
          <div className="rounded-lg border border-[#393939] px-4 pb-6 pt-10 text-center text-sm">
            <div style={{ lineHeight: '2' }} className="list-disc space-y-4 text-[14px] md:text-[23px] xl:text-[25px]">
              <div dangerouslySetInnerHTML={{ __html: item.description1?.replace(/<div>/g, '<div>• ') }} />
            </div>
            <div style={{ lineHeight: '2' }} className="list-disc space-y-4 text-[14px] text-[#8D0000] md:text-[23px] xl:text-[25px]">
              <div dangerouslySetInnerHTML={{ __html: item.description2?.replace(/<div>/g, '<div>• ') }} />
            </div>
          </div>
        </div>
      ))}

      {/* Second Box - Cautions */}
    </div>
  );
}
