import { InputNumber, Popover, Select, Space } from "antd";
import {
  fromColorResultToColor,
  fromColorToColorResult,
} from "helpers/color.helpers";
import { ImageConfig } from "konva/lib/shapes/Image";
import { ColorBlock } from "../ColorBlock";
import { DelayedAlphaPicker } from "../DelayedAlphaPicker";
import { DelayedColorPicker } from "../DelayedColorPicker";
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
          <DelayedAlphaPicker
            onChange={(color) => {
              const c = fromColorResultToColor(color);
              onChange({
                ...value,
                opacity: c.opacity,
              });
            }}
            color={fromColorToColorResult(undefined, value.opacity)}
          />
        }
        trigger="click"
        placement="bottomLeft"
        overlayClassName="compact-popover"
      >
        <IconButton style={{ width: 70 }} className="select-none">
          Opacity
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
        <IconButton style={{ width: 130 }}>
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
            { value: "none", label: "None" },
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" },
          ]}
          onChange={(size) => {
            switch (size) {
              case "small":
                onChange({
                  ...value,
                  shadowColor: "rgba(0,0,0,0.3)",
                  shadowOffset: { x: 6, y: 6 },
                  shadowBlur: 10,
                });
                break;
              case "medium":
                onChange({
                  ...value,
                  shadowColor: "rgba(0,0,0,0.3)",
                  shadowOffset: { x: 12, y: 12 },
                  shadowBlur: 20,
                });
                break;
              case "large":
                onChange({
                  ...value,
                  shadowColor: "rgba(0,0,0,0.3)",
                  shadowOffset: { x: 24, y: 24 },
                  shadowBlur: 40,
                });
                break;
              case "none":
                onChange({
                  ...value,
                  shadowColor: "rgba(0,0,0,0)",
                  shadowOffset: { x: 0, y: 0 },
                  shadowBlur: 0,
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
