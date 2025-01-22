"use client";

import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { cn } from "@heroui/react";

import companyTypes from "./company-types";
import states from "./states";
import companyIndustries from "./company-industries";

const CompanyInformationForm = React.forwardRef(
  ({ className, ...props }, ref) => {
    const inputProps = {
      labelPlacement: "outside",
      classNames: {
        label:
          "text-small font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
      },
    };

    const selectProps = {
      labelPlacement: "outside",
      classNames: {
        label:
          "text-small font-medium text-default-700 group-data-[filled=true]:text-default-700",
      },
    };

    return (
      <>
        <div className="text-4xl font-bold leading-9 text-default-foreground">
          ‘필리핀 코론 수중 프로필 촬영 다이빙 투어’{" "}
        </div>
        <div className="py-4 text-default-500 bg-gray-100 rounded-lg p-6">
          <p>※ 필리핀 코론 수중 프로필 촬영 다이빙 투어 신청서 작성 안내</p>
          <p>
            {" "}
            이 신청서를 작성하신 분들만 다이빙 투어를 참가하실 수 있으십니다.
          </p>
          <p>
            참석확정 여부는 00월 00일까지 카카오톡 or 문자로 연락드리도록
            하겠습니다.{" "}
          </p>
          <p>
            <span className="text-red-500">*</span>는 필수항목 입니다.{" "}
          </p>
        </div>
        <form
          ref={ref}
          className={cn(
            "flex grid grid-cols-12 flex-col gap-4 py-8",
            className
          )}
          {...props}
        >
          <Input
            className="col-span-12 md:col-span-6"
            label="신청자"
            name="company-name"
            placeholder="이름을 입력해주세요"
            isRequired
            {...inputProps}
          />

          <Input
            className="col-span-12 md:col-span-6"
            label="연락처"
            name="contact"
            placeholder="연락처를 입력해주세요"
            isRequired
            {...inputProps}
          />

          <Select
            classNames={{
              base: "col-span-6 ",
            }}
            label="성별"
            name="gender"
            placeholder="성별을 선택해주세요"
            labelPlacement="outside"
            selectedKeys={['male']}
            isRequired
          >
            <SelectItem key="male" value="male">남</SelectItem>
            <SelectItem key="female" value="female">여</SelectItem>
          </Select>

          <Input
            className="col-span-12 md:col-span-6"
            label="Street Name"
            name="street-name"
            placeholder="Geary 2234"
            {...inputProps}
          />

          <Input
            className="col-span-12 md:col-span-6"
            label="Suite"
            name="suite"
            placeholder="#166"
            {...inputProps}
          />

          <Select
            className="col-span-12 md:col-span-4"
            items={states}
            label="State"
            name="state"
            placeholder="Delaware"
            {...selectProps}
          >
            {(registrationState, index) => (
              <SelectItem key={`${registrationState.value}-${index}`}>
                {registrationState.title}
              </SelectItem>
            )}
          </Select>

          <Input
            className="col-span-12 md:col-span-4"
            label="City"
            name="city"
            placeholder="San Francisco"
            {...inputProps}
          />

          <Input
            className="col-span-12 md:col-span-4"
            label="Zip Code"
            name="zip-code"
            placeholder="9409"
            {...inputProps}
          />

          <Input
            className="col-span-12 md:col-span-6"
            label="EIN"
            name="ein"
            placeholder="Type your company EIN here"
            {...inputProps}
          />

          <Input
            className="col-span-12 md:col-span-6"
            label="Confirm EIN"
            name="confirm-ein"
            placeholder="Confirm your company EIN here"
            {...inputProps}
          />
        </form>
      </>
    );
  }
);

CompanyInformationForm.displayName = "CompanyInformationForm";

export default CompanyInformationForm;
