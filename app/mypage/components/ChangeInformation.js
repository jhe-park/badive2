import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  SelectItem,
  Radio,
  RadioGroup,
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
      <div className="grid grid-cols-2 gap-x-5 w-full">
        <div className="flex flex-col">
          <div>비밀번호</div>
          <Input
            name="username"
            placeholder=""
            type="text"
            className="w-full col-span-1"
          />
        </div>
        <div className="flex flex-col">
          <div>비밀번호 확인</div>
          <Input
            name="username"
            placeholder=""
            type="text"
            className="w-full col-span-1"
          />
        </div>
        <div className="flex flex-col">
          <div>이름</div>
          <Input
            name="username"
            placeholder=""
            type="text"
            className="w-full col-span-1"
          />
        </div>
        <div className="flex flex-col">
          <div>휴대폰번호</div>
          <Input
            name="username"
            placeholder="010-1234-5678"
            type="text"
            className="w-full col-span-1"
          />
        </div>
        <div className="flex flex-col">
          <div>생년월일</div>
          <Input
            name="username"
            placeholder="1980-01-01"
            type="text"
            className="w-full col-span-1"
          />
        </div>
        <div className="flex flex-col">
          <div>보유한 라이센스</div>
          <Input
            name="username"
            placeholder=""
            type="text"
            className="w-full col-span-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>희망하는 강습</div>
          <div className="flex flex-row gap-2 justify-start items-center w-full">
            <span>01.</span>
            <Select>
              <SelectItem>강습1</SelectItem>
              <SelectItem>강습2</SelectItem>
              <SelectItem>강습3</SelectItem>
            </Select>
          </div>
          <div className="flex flex-row gap-2 justify-start items-center w-full">
            <span>02.</span>
            <Select>
              <SelectItem>강습1</SelectItem>
              <SelectItem>강습2</SelectItem>
              <SelectItem>강습3</SelectItem>
            </Select>
          </div>
          <div className="flex flex-row gap-2 justify-start items-center w-full">
            <span>03.</span>
            <Select>
              <SelectItem>강습1</SelectItem>
              <SelectItem>강습2</SelectItem>
              <SelectItem>강습3</SelectItem>
            </Select>
          </div>
        </div>
        <div className="flex flex-col">
          <div>성별</div>
          <RadioGroup orientation="horizontal">
            <Radio value="male">남</Radio>
            <Radio value="female">여</Radio>
          </RadioGroup>
        </div>
        <div className="flex flex-col">
          <div>이메일</div>
          <Input
            name="username"
            placeholder="abcd1234@naver.com"
            type="text"
            className="w-full col-span-1"
          />
        </div>
        <div className="flex flex-col">
          <div>주소</div>
          <div className="flex flex-row gap-2 justify-start items-center w-full">
            <Input
              name="username"
              placeholder="abcd1234@naver.com"
              type="text"
              className="w-full col-span-1"
            />
            <Button>주소검색</Button>
          </div>
          <div>
            <div>상세주소</div>
            <Input
              name="username"
              placeholder="abcd1234@naver.com"
              type="text"
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
