import { Slider } from "antd";
import { CSSProperties } from "react";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";

export const ZoomSlider = (props: {
  value: number;
  onChange: (value: number) => void;
  style?: CSSProperties;
  className?: string;
}) => {
  const { value, onChange, style, className } = props;

  return (
    <div
      className={`p-2 border rounded-full flex flex-col items-center bg-white shadow-lg ${className}`}
      style={{ position: "absolute", right: 0, zIndex: 1, ...style }}
    >
      <AiOutlineZoomIn size="20px" className="mb-4" />
      <Slider
        vertical
        reverse
        value={value}
        onChange={onChange}
        style={{ height: 200 }}
        min={1}
        max={100}
        tooltip={{ open: false }}
      />
      <AiOutlineZoomOut size="20px" className="mt-4" />
    </div>
  );
};
