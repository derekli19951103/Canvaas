import { HTMLAttributes } from "react";

export const IconButton = (props: HTMLAttributes<HTMLDivElement>) => {
  const { children, style, ...rest } = props;
  return (
    <div
      {...rest}
      style={{ width: 40, height: 40, backgroundColor: "#F2F2F2", ...style }}
      className="flex justify-center items-center rounded-md"
    >
      {children}
    </div>
  );
};
