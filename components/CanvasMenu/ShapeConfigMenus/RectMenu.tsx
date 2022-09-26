import { InputNumber, Popover, Space } from "antd";
import { RectConfig } from "konva/lib/shapes/Rect";
import { CompactPicker } from "react-color";
import { ColorBlock } from "../ColorBlock";
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

      <div>
        <div className="text-xs text-gray-400">Opacity:</div>
        <InputNumber
          style={{ width: 100 }}
          value={(value.opacity as number) * 100}
          onChange={(opacity) => {
            onChange({
              ...value,
              opacity: (opacity || 100) / 100,
            });
          }}
          size="small"
          addonAfter="%"
          max={100}
        />
      </div>
    </Space>
  );
};
