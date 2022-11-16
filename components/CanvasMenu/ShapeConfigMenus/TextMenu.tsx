import { Button, Popover, Select, Space } from "antd";
import {
  fromColorResultToColor,
  fromColorToColorResult,
} from "helpers/color.helpers";
import { TextConfig } from "konva/lib/shapes/Text";
import { ColorBlock } from "../ColorBlock";
import { DelayedColorPicker } from "../DelayedColorPicker";
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
        style={{ width: 160 }}
      />

      <Select
        options={range(10, 80, 2).map((f) => ({ value: f, label: f }))}
        placeholder="Font Size"
        value={value.fontSize}
        onChange={(fontSize) => {
          onChange({
            ...value,
            fontSize: fontSize as number,
            height: fontSize as number,
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
