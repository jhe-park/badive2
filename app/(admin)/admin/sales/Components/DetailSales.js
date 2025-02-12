import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
  } from "@heroui/react";
  
  const rows = [
    {
      key: "1",
      name: "스쿠버다이빙",
      sales: "11,000,000원",
    },
    {
      key: "2",
      name: "프리다이빙",
      sales: "12,000,000원",
    },
    {
      key: "3",
      name: "머메이드",
      sales: "15,000,000원",
    },
    {
      key: "4",
      name: "체험다이빙",
      sales: "10,000,000원",
    },
    {
        key: "5",
        name: "다이빙 투어",
        sales: "30,000,000원",
      },
      {
        key: "6",
        name: "합계",
        sales: "75,000,000원",
      },
  ];
  
  const columns = [
    {
      key: "name",
      label: "프로그램명",
    },
    {
      key: "sales",
      label: "매출현황",
    }
  ];
  
  export default function DetailSales() {
    return (
      <Table shadow="none" className="w-full mb-4" aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key} className="text-center">{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => <TableCell className="text-center">{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
  