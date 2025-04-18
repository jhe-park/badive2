import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";

const columns = [
  {
    key: "name",
    label: "프로그램명",
  },
  {
    key: "sales",
    label: "매출현황",
  },
];

const formatCurrency = (number) => {
  return number.toLocaleString('ko-KR') + '원';
};

export default function DetailSales({ detailSales}) {
  return (
    <Table
      shadow="none"
      className="w-full mb-4"
      aria-label="Example table with dynamic content"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} className="text-center">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={detailSales}>
        {(item) => (
          <TableRow key={(item as any).key}>
            {(columnKey) => (
              <TableCell className="text-center">
                {columnKey === 'sales' && item[columnKey]
                  ? formatCurrency(Number(item[columnKey].toString().replace(/[^0-9]/g, '')))
                  : getKeyValue(item, columnKey) || '-'}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
