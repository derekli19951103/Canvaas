import { Button, InputNumber, Popover, Space } from "antd";
import { ArrowConfig } from "konva/lib/shapes/Arrow";
import { CompactPicker } from "react-color";
import { ColorBlock } from "./ColorBlock";
import { IconButton } from "./IconButton";

export const ArrowMenu = (props: {
  value: ArrowConfig;
  onChange: (value: ArrowConfig) => void;
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
            color={value.fill}
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
        <div className="text-xs text-gray-400">Thickness:</div>
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
        <div className="text-xs text-gray-400">Arrow Head Size:</div>
        <InputNumber
          value={value.pointerWidth}
          onChange={(pointerWidth) => {
            onChange({
              ...value,
              pointerWidth: pointerWidth as number,
            });
          }}
          size="small"
        />
      </div>

      <Button
        type={value.dash ? "primary" : "default"}
        onClick={() => {
          onChange({
            ...value,
            dash: value.dash ? undefined : [5, 5],
          });
        }}
      >
        Dashed
      </Button>
    </Space>
  );
};
