import { Button, Popover, Select, Space } from "antd";
import { TextConfig } from "konva/lib/shapes/Text";
import { CompactPicker } from "react-color";
import { ColorBlock } from "../ColorBlock";
import { IconButton } from "../IconButton";

const FontFamilies = [
  "Roboto",
  "Roboto Condensed",
  "Roboto Mono",
  "Open Sans",
  "Montserrat",
  "Poppins",
  "Oswald",
  "Noto Sans SC",
];

const range = (start: number, stop: number, step = 1) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);

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
        style={{ width: 200 }}
      />

      <Select
        options={range(10, 80, 2).map((f) => ({ value: f, label: f }))}
        placeholder="Font Size"
        value={value.fontSize}
        onChange={(fontSize) => {
          onChange({
            ...value,
            fontSize: fontSize as unknown as number,
          });
        }}
      />

      <Button
        type={value.fontStyle?.includes("bold") ? "primary" : "default"}
        onClick={() => {
          let fontStyle = value.fontStyle;
          if (fontStyle) {
            switch (fontStyle) {
              case "bold":
                fontStyle = "noraml";
                break;
              case "italic":
                fontStyle = "italic bold";
                break;
              case "italic bold":
                fontStyle = "italic";
                break;
              case "normal":
                fontStyle = "bold";
                break;
            }
          } else {
            fontStyle = "bold";
          }
          onChange({
            ...value,
            fontStyle,
          });
        }}
      >
        <strong>Bold</strong>
      </Button>

      <Button
        type={value.fontStyle === "normal" ? "primary" : "default"}
        onClick={() => {
          onChange({
            ...value,
            fontStyle: "normal",
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

      <Button
        type={value.fontStyle?.includes("italic") ? "primary" : "default"}
        onClick={() => {
          let fontStyle = value.fontStyle;
          if (fontStyle) {
            switch (fontStyle) {
              case "bold":
                fontStyle = "italic bold";
                break;
              case "italic":
                fontStyle = "normal";
                break;
              case "italic bold":
                fontStyle = "bold";
                break;
              case "normal":
                fontStyle = "italic";
                break;
            }
          } else {
            fontStyle = "italic";
          }
          onChange({
            ...value,
            fontStyle: fontStyle,
          });
        }}
      >
        <div className="italic">Italic</div>
      </Button>
    </Space>
  );
};
