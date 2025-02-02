import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  SelectItem,
  Radio,
  RadioGroup,
  Divider
} from "@nextui-org/react";

export default function App() {
  const [action, setAction] = React.useState(null);

  return (
    <Form
      className="flex flex-col gap-4 md:p-5 w-full"
      validationBehavior="native"
      onReset={() => setAction("reset")}
      onSubmit={(e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));

        setAction(`submit ${JSON.stringify(data)}`);
      }}
    >
      <div className="text-2xl font-bold w-full justify-center items-center text-center">내 정보 수정</div>
      <Divider className="w-full bg-black h-0.5"></Divider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 w-full gap-y-5">

        <div className="flex flex-col">

          {/* <div>비밀번호</div> */}
          <Input
            label="비밀번호"
            name="username"
            placeholder="비밀번호"
            variant="bordered"
            type="text"
            className="w-full col-span-1"
          />
        </div>
        <div className="flex flex-col">
          {/* <div>비밀번호 확인</div> */}
          <Input
            label="비밀번호 확인"
            name="username"
            placeholder="비밀번호 확인"
            variant="bordered"
            type="text"
            className="w-full col-span-1"
          />
        </div>
        <div className="flex flex-col">
          {/* <div>이름</div> */}
          <Input
            label="이름"
            name="username"
            placeholder="홍길동동"
            type="text"
            variant="bordered"
            className="w-full col-span-1"
          />
        </div>
        <div className="flex flex-col">
          {/* <div>휴대폰번호</div> */}
          <Input
            label="휴대폰번호"
            name="username"
            placeholder="010-1234-5678"
            type="text"
            variant="bordered"
            className="w-full col-span-1"
          />
        </div>
        <div className="flex flex-col">
          {/* <div>생년월일</div> */}
          <Input
            label="생년월일"
            name="username"
            placeholder="1980-01-01"
            type="text"
            variant="bordered"
            className="w-full col-span-1"
          />
        </div>
        <div className="flex flex-col">
          {/* <div>보유한 라이센스</div> */}
          <Input
            label="보유한 라이센스"
            name="username"
            placeholder=""
            type="text"
            variant="bordered"
            className="w-full col-span-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          {/* <div>희망하는 강습</div> */}
          <div className="flex flex-row gap-2 justify-start items-center w-full">
            {/* <span>01.</span> */}
            <Select label="희망하는 강습1" variant="bordered">
              <SelectItem value="강습1">강습1</SelectItem>
              <SelectItem value="강습2">강습2</SelectItem>
              <SelectItem value="강습3">강습3</SelectItem>
            </Select>
          </div>
          <div className="flex flex-row gap-2 justify-start items-center w-full">
            {/* <span>02.</span> */}
            <Select label="희망하는 강습2" variant="bordered">
              <SelectItem value="강습1">강습1</SelectItem>
              <SelectItem value="강습2">강습2</SelectItem>
              <SelectItem value="강습3">강습3</SelectItem>
            </Select>
          </div>
          <div className="flex flex-row gap-2 justify-start items-center w-full">
            {/* <span>03.</span> */}
            <Select label="희망하는 강습3" variant="bordered">
              <SelectItem value="강습1">강습1</SelectItem>
              <SelectItem value="강습2">강습2</SelectItem>
              <SelectItem value="강습3">강습3</SelectItem>
            </Select>
          </div>
        </div>
        <div className="flex flex-col">
          {/* <div>성별</div> */}
          <RadioGroup label="성별" orientation="horizontal" className="w-full border-2 border-gray-200 rounded-xl p-4">
            <Radio value="male">남</Radio>
            <Radio value="female">여</Radio>
          </RadioGroup>
        </div>
        <div className="flex flex-col">
          {/* <div>이메일</div> */}
          <Input
            label="이메일"
            name="email"
            placeholder="abcd1234@naver.com"
            type="text"
            variant="bordered"
            className="w-full col-span-1"
          />
        </div>
        <div className="flex flex-col gap-y-5">
          {/* <div>주소</div> */}
          <div className="flex flex-row gap-2 justify-start items-center w-full">
            <Input
              name="address"
              label="주소"
              placeholder="서울시시"
              type="text"
              variant="bordered"
              className="w-full col-span-1"
            />
            <Button>주소검색</Button>
          </div>
          <div>
            {/* <div>상세주소</div> */}
            <Input
              name="detailAddress"
              placeholder="상세주소"
              label="개포동동"
              type="text"
              variant="bordered"
              className="w-full col-span-1"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 w-full">
        <Button type="reset" variant="flat" className="w-full">
          취소
        </Button>
        <Button color="primary" type="submit" className="w-full">
          확인
        </Button>
      </div>
      {action && (
        <div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>
      )}
    </Form>
  );
}
