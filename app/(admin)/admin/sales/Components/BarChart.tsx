"use client";

import React from "react";
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";
import {
  Card,
  Button,
  Select,
  SelectItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
} from "@heroui/react";
import {Icon} from "@iconify/react";
import { useRouter } from "next/navigation";

const data = [
  {
    title: "",
    value: "",
    unit: "KRW",
    categories: ["Low", "Medium", "High"],
    color: "warning",
    chartData: [
      {
        weekday: "1월",
        Low: 120,
        Medium: 280,
        High: 180,
      },
      {
        weekday: "2월",
        Low: 150,
        Medium: 320,
        High: 220,
      },
      {
        weekday: "3월",
        Low: 180,
        Medium: 250,
        High: 150,
      },
      {
        weekday: "4월",
        Low: 140,
        Medium: 290,
        High: 180,
      },
      {
        weekday: "5월",
        Low: 160,
        Medium: 270,
        High: 190,
      },
      {
        weekday: "6월",
        Low: 130,
        Medium: 240,
        High: 210,
      },
      {
        weekday: "7월",
        Low: 170,
        Medium: 300,
        High: 240,
      },
    ],
  }
];

export default function Component({monthlySales}) {
  // monthlySales 데이터를 차트 데이터 형식으로 변환
  const chartData = [{
    title: "월별 매출",
    value: "",
    unit: "KRW",
    color: "warning",
    chartData: monthlySales.map(item => ({
      weekday: item.name.split('-')[1] + '월',
      sales: item.sales
    }))
  }];

  return (
    <dl className="grid w-full grid-cols-1 gap-5 ">
      {chartData.map((item, index) => (
        <BarChartCard key={index} {...item} />
      ))}
    </dl>
  );
}

const formatWeekday = (weekday) => {
  const day =
    {
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
      Sun: 0,
    }[weekday] ?? 0;

  return new Intl.DateTimeFormat("en-US", {weekday: "long"}).format(new Date(2024, 0, day));
};

const BarChartCard = React.forwardRef(
  //@ts-ignore
  ({className, title, value, unit, color, chartData, ...props}, ref) => {
    const router = useRouter();
    
    // 총 매출 계산
    const totalSales = chartData.reduce((sum, item) => sum + item.sales, 0);
    const formattedTotal = new Intl.NumberFormat('ko-KR', { 
      style: 'currency', 
      currency: 'KRW'
    }).format(totalSales);

    // 커스텀 툴팁 컴포넌트
    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        const amount = new Intl.NumberFormat('ko-KR').format(payload[0].value);
        return (
          <div className="bg-white p-2 border rounded-md shadow-md">
            <p>{`${label} 매출액: ${amount}원`}</p>
          </div>
        );
      }
      return null;
    };

    return (
      <Card
        ref={ref as any}
        className={cn("h-[300px] border border-transparent dark:border-default-100 ", className)}
        shadow="none"
        {...props}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-x-2">
            <dt>
              <h3 className="text-small font-medium text-default-500">{title}</h3>
            </dt>
            <div className="flex items-center justify-end gap-x-2">
              <div className="text-white text-sm bg-gray-400 rounded-md px-2 py-1">
                합계: {formattedTotal}
              </div>
              <div>
                <Button size='sm' variant='light' className="underline" onPress={() => router.push('/admin/sales/detail')}>
                  자세히 보기
                </Button>
              </div>
            </div>
          </div>
        </div>

        <ResponsiveContainer
          className="[&_.recharts-surface]:outline-none"
          height="100%"
          width="100%"
        >
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 14,
              left: -8,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="weekday"
              style={{fontSize: "var(--heroui-font-size-tiny)"}}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              style={{fontSize: "var(--heroui-font-size-tiny)"}}
              tickLine={false}
            />
            <Tooltip content={
              // @ts-ignore
              <CustomTooltip />
              } cursor={false} />
            <Bar
              dataKey="sales"
              fill={`hsl(var(--heroui-${color}-400))`}
              radius={[4, 4, 0, 0]}
              barSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    );
  }
);

BarChartCard.displayName = "BarChartCard";
