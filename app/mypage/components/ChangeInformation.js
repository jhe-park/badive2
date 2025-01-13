import React from "react";
import { Form, Input, Button } from "@nextui-org/react";

export default function App() {
  const [action, setAction] = React.useState(null);

  return (
    <Form
      className="flex flex-col gap-4 p-5 w-full"
      validationBehavior="native"
      onReset={() => setAction("reset")}
      onSubmit={(e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));

        setAction(`submit ${JSON.stringify(data)}`);
      }}
    >
      <div className="grid grid-cols-2 gap-x-5 w-full">
      <Input
          isRequired
          errorMessage="Please enter a valid username"
          label="Username"
          labelPlacement="outside"
          name="username"
          placeholder="Enter your username"
          type="text"
          className="w-full col-span-1"
        />
      
      
        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
          className="w-full col-span-1"
        />
                <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
          className="w-full col-span-1"
        />
                <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
          className="w-full col-span-1"
        />
                <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
          className="w-full col-span-1"
        />
                <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
          className="w-full col-span-1"
        />
      </div>
      

      

      <div className="flex gap-2 w-full">
        <Button color="primary" type="submit" className="w-full">
          Submit
        </Button>
        <Button type="reset" variant="flat" className="w-full">
          Reset
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
