import { InputNumber, Popover, Space } from "antd";
import { EllipseConfig } from "konva/lib/shapes/Ellipse";
import { CompactPicker } from "react-color";
import { ColorBlock } from "./ColorBlock";
import { IconButton } from "./IconButton";

export const EllipseMenu = (props: {
  value: EllipseConfig;
  onChange: (value: EllipseConfig) => void;
}) => {
  const { value, onChange } = props;

  return (
    <Space>
      <Popover
        content={
          <CompactPicker
            onChange={(color) => {
              onChange({ ...value, fill: color.hex });
            }}
            color={value.fill}
          />
        }
        trigger="click"
        placement="bottomLeft"
      >
        <IconButton>
          <ColorBlock color={value.fill} />
        </IconButton>
      </Popover>
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
        <IconButton>
          <ColorBlock color={value.stroke as string | undefined} />
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
    </Space>
  );
};
