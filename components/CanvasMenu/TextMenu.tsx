import { Button, InputNumber, Popover, Select, Space } from "antd";
import { TextConfig } from "konva/lib/shapes/Text";
import { CompactPicker } from "react-color";

const FontFamilies = ["Calibri", "Roboto"];

export const TextMenu = (props: {
  value: TextConfig;
  onChange: (value: TextConfig) => void;
}) => {
  const { value, onChange } = props;
  return (
    <Space>
      <Popover
        content={
          <CompactPicker
            onChange={(color) => {
              onChange({ ...value, stroke: color.hex, fill: color.hex });
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

      <Select
        options={FontFamilies.map((f) => ({ value: f, label: f }))}
        placeholder="Font Family"
        value={value.fontFamily}
        onChange={(font) => {
          onChange({
            ...value,
            fontFamily: font,
          });
        }}
      />

      <InputNumber
        value={value.fontSize}
        onChange={(fontSize) => {
          onChange({
            ...value,
            fontSize: fontSize as number,
          });
        }}
      />

      <Button
        type={
          value.strokeWidth === value.fontSize! / 20 ? "primary" : "default"
        }
        onClick={() => {
          onChange({
            ...value,
            strokeWidth: value.fontSize! / 20,
          });
        }}
      >
        <strong>Bold</strong>
      </Button>
      <Button
        type={value.strokeWidth === 0 ? "primary" : "default"}
        onClick={() => {
          onChange({
            ...value,
            strokeWidth: 0,
          });
        }}
      >
        Regular
      </Button>

      <Button
        type={value.textDecoration === "underline" ? "primary" : "default"}
        onClick={() => {
          onChange({
            ...value,
            textDecoration:
              value.textDecoration === "underline" ? "" : "underline",
          });
        }}
      >
        <div style={{ textDecoration: "underline" }}>Underlined</div>
      </Button>
    </Space>
  );
};
