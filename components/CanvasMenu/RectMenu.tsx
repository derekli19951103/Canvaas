import { Space, Popover, Button, Select, InputNumber } from "antd";
import { RectConfig } from "konva/lib/shapes/Rect";
import { CompactPicker } from "react-color";

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
          />
        }
        trigger="click"
        placement="bottomLeft"
      >
        <Button
          icon={
            <div
              style={{
                backgroundColor: value.fill,
                width: 20,
                height: 20,
                margin: "0 5px",
                borderRadius: 4,
              }}
            />
          }
        />
      </Popover>
      <Popover
        content={
          <CompactPicker
            onChange={(color) => {
              onChange({ ...value, stroke: color.hex });
            }}
          />
        }
        trigger="click"
        placement="bottomLeft"
      >
        <Button
          icon={
            <div
              style={{
                backgroundColor: value.stroke as string | undefined,
                width: 20,
                height: 20,
                margin: "0 5px",
                borderRadius: 4,
              }}
            />
          }
        />
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
