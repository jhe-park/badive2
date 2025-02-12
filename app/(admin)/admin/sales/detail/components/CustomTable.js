import React from "react";

const CustomTable = () => {
  const data = [
    {
      date: "12/01",
      items: [
        { name: "오픈워터다이빙", payment: "카드", amount: "000,000" },
        { name: "어드밴스 다이빙" },
        { name: "레스큐 다이빙" },
        { name: "마스터 다이빙" },
        { name: "스페셜 티" },
      ],
    },
    {
      date: "12/03",
      items: [
        { name: "오픈워터다이빙", payment: "카드", amount: "000,000" },
        { name: "어드밴스 다이빙" },
        { name: "레스큐 다이빙" },
        { name: "마스터 다이빙" },
        { name: "스페셜 티" },
      ],
    },
    {
      date: "12/03",
      items: [
        { name: "오픈워터다이빙", payment: "카드", amount: "000,000" },
        { name: "어드밴스 다이빙" },
        { name: "레스큐 다이빙" },
        { name: "마스터 다이빙" },
        { name: "스페셜 티" },
      ],
    },
  ];

  return (
    <div className="container mx-auto whitespace-nowrap overflow-x-auto">
      <table className="w-full border border-gray-300 text-left rounded-2xl ">
        <thead>
          <tr className="bg-gray-200 rounded-t-2xl">
            <th className="border px-4 py-2 text-center">날짜</th>
            <th className="border px-4 py-2 text-center">종목</th>
            <th className="border px-4 py-2 text-center">결제내역</th>
            <th className="border px-4 py-2 text-center">금액</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, entryIndex) => (
            <>
              {entry.items.map((item, itemIndex) => (
                <tr key={`${entryIndex}-${itemIndex}`}>
                  {itemIndex === 0 ? (
                    <td
                      rowSpan={entry.items.length}
                      className="border px-4 py-2 text-center font-bold bg-gray-100"
                    >
                      {entry.date}
                    </td>
                  ) : null}
                  <td className="border px-4 py-2 text-center">{item.name}</td>
                  <td className="border px-4 py-2 text-center font-bold">{item.payment || ""}</td>
                  <td className="border px-4 py-2 text-center font-bold">{item.amount || ""}</td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-200 font-bold">
            <td colSpan={3} className="border px-4 py-2 text-center">
              총 합계
            </td>
            <td className="border px-4 py-2">000,000</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CustomTable;
