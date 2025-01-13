import React from "react";
import { Button } from "@nextui-org/react";
export default function SayGoodbye() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>

      <div className="flex gap-2 w-full">
        <Button color="primary" type="submit" className="w-full">
          Submit
        </Button>
        <Button type="reset" variant="flat" className="w-full">
          Reset
        </Button>
      </div>
    </div>
  );
}
