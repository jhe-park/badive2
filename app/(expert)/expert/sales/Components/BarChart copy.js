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

export default function Component() {
    const router = useRouter();
  return (
    <dl className="grid w-full grid-cols-1 gap-5 ">
      {data.map((item, index) => (
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
  ({className, title, value, unit, categories, color, chartData, ...props}, ref) => {
    const router = useRouter();
    return (
      <Card
        ref={ref}
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
                <div className="text-white text-sm bg-gray-400 rounded-md px-2 py-1">합계:11,000,000원</div>
                <div>
                    <Button size='sm' variant='light' className="underline" onPress={() => router.push('/admin/sales/detail')}>자세히 보기</Button>
                </div>
              
            </div>
          </div>
          <dd className="flex items-baseline gap-x-1">
            <span className="text-3xl font-semibold text-default-900">{value}</span>
            <span className="text-medium font-medium text-default-500">{unit}</span>
          </dd>
        </div>

        <ResponsiveContainer
          className="[&_.recharts-surface]:outline-none"
          height="100%"
          width="100%"
        >
          <BarChart
            accessibilityLayer
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

            <Tooltip
              content={({label, payload}) => (
                <div className="flex h-auto min-w-[120px] items-center gap-x-2 rounded-medium bg-background p-2 text-tiny shadow-small">
                  <div className="flex w-full flex-col gap-y-1">
                    <span className="font-medium text-foreground">{formatWeekday(label)}</span>
                    {payload?.map((p, index) => {
                      const name = p.name;
                      const value = p.value;
                      const category = categories.find((c) => c.toLowerCase() === name) ?? name;

                      return (
                        <div key={`${index}-${name}`} className="flex w-full items-center gap-x-2">
                          <div
                            className="h-2 w-2 flex-none rounded-full"
                            style={{
                              backgroundColor: `hsl(var(--heroui-${color}-${(index + 1) * 200}))`,
                            }}
                          />

                          <div className="flex w-full items-center justify-between gap-x-2 pr-1 text-xs text-default-700">
                            <span className="text-default-500">{category}</span>
                            <span className="font-mono font-medium text-default-700">{value}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              cursor={false}
            />

            {categories.map((category, index) => (
              <Bar
                key={`${category}-${index}`}
                animationDuration={450}
                animationEasing="ease"
                barSize={48}
                dataKey={category}
                fill={`hsl(var(--heroui-${color}-${(index + 1) * 200}))`}
                radius={index === categories.length - 1 ? [4, 4, 0, 0] : 0}
                stackId="bars"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>

        <div className="flex w-full justify-center gap-4 pb-4 text-tiny text-default-500">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: `hsl(var(--heroui-${color}-${(index + 1) * 200}))`,
                }}
              />

              <span className="capitalize">{category}</span>
            </div>
          ))}
        </div>
      </Card>
    );
  },
);

BarChartCard.displayName = "BarChartCard";
