"use client";

import { Button } from "@nextui-org/react";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "로그인 중...",
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button isLoading={pending} type="submit" aria-disabled={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
}
