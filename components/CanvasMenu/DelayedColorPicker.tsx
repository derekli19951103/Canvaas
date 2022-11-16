import { useEffect } from "react";
import { useState } from "react";
import { SketchPicker, SketchPickerProps } from "react-color";

export const DelayedColorPicker = (
  props: Omit<SketchPickerProps, "onChangeComplete">
) => {
  const { color, onChange, ...rest } = props;
  const [currentColor, setCurrentColor] = useState(color);

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  return (
    <SketchPicker
      {...rest}
      onChange={(color) => {
        setCurrentColor(color.rgb);
      }}
      onChangeComplete={(color, e) => {
        onChange && onChange(color, e);
      }}
      color={currentColor}
    />
  );
};
