"use client";

import { Button } from "@nextui-org/react";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { useState, useEffect } from "react";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "로그인 중...",
  ...props
}: Props) {
  const { pending } = useFormStatus();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (pending) {
      setIsPending(true);
      const timer = setTimeout(() => {
        setIsPending(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [pending]);

  return (
    <Button isLoading={isPending} type="submit" aria-disabled={isPending} {...props}>
      {isPending ? pendingText : children}
    </Button>
  );
}
