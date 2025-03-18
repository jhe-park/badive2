import React from "react";

export default function Instruction({ data }) {
  return (
    <div className="w-full h-full md:px-10 px-2 py-9 flex flex-col items-center justify-center gap-y-12">
      {data.instruction.map((item, index) => (
        <div className="relative w-full" key={index}>
          {/* Semi-circle header that overlaps the border */}
          <div
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-2 rounded-full text-center font-bold z-10 ${index === 3 ? "text-white" : ""} text-[18px] md:text-[25px]`}
            style={{
              backgroundColor:
                index === 0
                  ? "#BBDCFF"
                  : index === 1
                    ? "#58A8FF"
                    : index === 2
                      ? "#58A8FF"
                      : index === 3
                        ? "#268EFF"
                        : "#BBDCFF",
            }}
          >
            {item.title}
          </div>

          {/* Main content box */}
          <div className="border border-[#393939] rounded-lg px-4 pt-10 pb-6 text-sm text-center">
            <div
              style={{ lineHeight: "2" }}
              className="list-disc space-y-4 text-[14px] md:text-[23px] xl:text-[25px]"
            >
              <div dangerouslySetInnerHTML={{ __html: item.description1.replace(/<div>/g, '<div>• ') }} />
            </div>
            <div
              style={{ lineHeight: "2" }}
              className="list-disc space-y-4 text-[#8D0000] text-[14px] md:text-[23px] xl:text-[25px]"
            >
              <div dangerouslySetInnerHTML={{ __html: item.description2?.replace(/<div>/g, '<div>• ') }} />
            </div>
          </div>
        </div>
      ))}

      {/* Second Box - Cautions */}
    </div>
  );
}
