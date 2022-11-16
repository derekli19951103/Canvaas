import { InputNumber, Popover, Space } from "antd";
import {
  fromColorResultToColor,
  fromColorToColorResult,
} from "helpers/color.helpers";
import { RectConfig } from "konva/lib/shapes/Rect";
import { ColorBlock } from "../ColorBlock";
import { DelayedColorPicker } from "../DelayedColorPicker";
import { IconButton } from "../IconButton";

export const RectMenu = (props: {
  value: RectConfig;
  onChange: (value: RectConfig) => void;
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

      <div>
        <div className="text-xs text-gray-400">Border Radius:</div>
        <InputNumber
          value={value.cornerRadius as number}
          onChange={(cornerRadius) => {
            onChange({
              ...value,
              cornerRadius: cornerRadius as number,
            });
          }}
          size="small"
        />
      </div>
    </Space>
  );
};
