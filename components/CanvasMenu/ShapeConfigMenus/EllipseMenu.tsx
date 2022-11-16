import { InputNumber, Popover, Space } from "antd";
import {
  fromColorResultToColor,
  fromColorToColorResult,
} from "helpers/color.helpers";
import { EllipseConfig } from "konva/lib/shapes/Ellipse";
import { ColorBlock } from "../ColorBlock";
import { DelayedColorPicker } from "../DelayedColorPicker";
import { IconButton } from "../IconButton";

export const EllipseMenu = (props: {
  value: EllipseConfig;
  onChange: (value: EllipseConfig) => void;
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
                fill: c.rgb,
                opacity: c.opacity,
              });
            }}
            color={fromColorToColorResult(value.fill, value.opacity)}
          />
        }
        trigger="click"
        placement="bottomLeft"
        overlayClassName="compact-popover"
      >
        <IconButton>
          <ColorBlock color={value.fill} />
        </IconButton>
      </Popover>
      <Popover
        content={
          <DelayedColorPicker
            onChange={(color) => {
              const c = fromColorResultToColor(color);
              onChange({
                ...value,
                stroke: c.rgb,
              });
            }}
            color={fromColorToColorResult(value.stroke as string)}
            disableAlpha
          />
        }
        trigger="click"
        placement="bottomLeft"
        overlayClassName="compact-popover"
      >
        <IconButton>
          <ColorBlock color={value.stroke as string} />
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
