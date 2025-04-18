import React from "react";
import {cn} from "@nextui-org/react";

// @ts-ignore
const CellWrapper  = React.forwardRef(({children, className, ...props}, ref) => (
  <div
    ref={ref as any}
    className={cn(
      "flex items-center justify-between gap-2 rounded-medium bg-content2 p-4",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));

CellWrapper.displayName = "CellWrapper";

export default CellWrapper;
