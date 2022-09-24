import { HTMLAttributes } from "react";

export const IconButton = (props: HTMLAttributes<HTMLDivElement>) => {
  const { children, style, className, ...rest } = props;
  return (
    <div
      {...rest}
      style={{ width: 40, height: 40, ...style }}
      className={`flex justify-center items-center rounded-md bg-zinc-100 hover:bg-zinc-200 ${className}`}
    >
      {children}
    </div>
  );
};
