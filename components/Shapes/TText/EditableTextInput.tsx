import { TextConfig } from "konva/lib/shapes/Text";
import { ChangeEventHandler, KeyboardEventHandler } from "react";
import { Html } from "react-konva-utils";
import { DelayedTextArea } from "./DelayedTextArea";

export const EditableTextInput = ({
  config,
  onChange,
  onKeyDown,
}: {
  config: TextConfig;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
}) => {
  return (
    <Html
      groupProps={{ x: config.x, y: config.y }}
      divProps={{ style: { opacity: 1 } }}
    >
      <DelayedTextArea
        value={config.text}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={{
          width: config.width,
          height: config.height,
          border: "1px solid #62c5ff",
          padding: "0px",
          margin: "0px",
          background: "none",
          outline: "none",
          resize: "none",
          color: config.fill,
          fontSize: config.fontSize,
          fontFamily: config.fontFamily,
          fontStyle: config.fontStyle,
          textDecoration: config.textDecoration,
        }}
      />
    </Html>
  );
};
