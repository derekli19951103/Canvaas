import { Button, InputNumber, Popover, Space } from "antd";
import {
  fromColorResultToColor,
  fromColorToColorResult,
} from "helpers/color.helpers";
import { ArrowConfig } from "konva/lib/shapes/Arrow";
import { ColorBlock } from "../ColorBlock";
import { DelayedColorPicker } from "../DelayedColorPicker";
import { IconButton } from "../IconButton";

export const ArrowMenu = (props: {
  value: ArrowConfig;
  onChange: (value: ArrowConfig) => void;
}) => {
  const { value, onChange } = props;

  return (
    <Space>
      <Popover
        content={
          <DelayedColorPicker
            onChange={(color) => {
              const c = fromColorResultToColor(color);
              onChange({
                ...value,
                stroke: c.rgb,
                opacity: c.opacity,
              });
            }}
            color={fromColorToColorResult(
              value.stroke as string,
              value.opacity
            )}
          />
        }
        trigger="click"
        placement="bottomLeft"
        overlayClassName="compact-popover"
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
