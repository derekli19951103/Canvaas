import { InputNumber, Popover, Select, Space } from "antd";
import { ImageConfig } from "konva/lib/shapes/Image";
import { CompactPicker } from "react-color";
import { ColorBlock } from "../ColorBlock";
import { IconButton } from "../IconButton";

export const ImageMenu = (props: {
  value: ImageConfig;
  onChange: (value: ImageConfig) => void;
}) => {
  const { value, onChange } = props;

  return (
    <Space>
      <Popover
        content={
          <CompactPicker
            onChange={(color) => {
              onChange({ ...value, stroke: color.hex });
            }}
            color={value.stroke as string | undefined}
          />
        }
        trigger="click"
        placement="bottomLeft"
      >
        <IconButton style={{ width: 120 }}>
          <ColorBlock color={value.stroke as string | undefined} />{" "}
          <span className="ml-2 select-none">Outline color</span>
        </IconButton>
      </Popover>
      <div>
        <div className="text-xs text-gray-400">Outline Thickness:</div>
        <InputNumber
          value={value.strokeWidth}
          onChange={(strokeWidth) => {
            onChange({
              ...value,
              strokeWidth: strokeWidth as number,
            });
          }}
          size="small"
        />
      </div>
      <div>
        <div className="text-xs text-gray-400">Shadow Size:</div>
        <Select
          size="small"
          style={{ width: 100 }}
          options={[
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" },
          ]}
          onChange={(size) => {
            switch (size) {
              case "small":
                onChange({
                  ...value,
                  shadowColor: "silver",
                  shadowOffset: { x: 6, y: 6 },
                  shadowBlur: 10,
                });
                break;
              case "medium":
                onChange({
                  ...value,
                  shadowColor: "silver",
                  shadowOffset: { x: 12, y: 12 },
                  shadowBlur: 20,
                });
                break;
              case "large":
                onChange({
                  ...value,
                  shadowColor: "silver",
                  shadowOffset: { x: 24, y: 24 },
                  shadowBlur: 40,
                });
                break;
            }
          }}
          placeholder="Shadow Size"
        />
      </div>
    </Space>
  );
};
