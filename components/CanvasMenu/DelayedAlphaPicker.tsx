import { useEffect, useState } from "react";
import { AlphaPicker, AlphaPickerProps } from "react-color";

export const DelayedAlphaPicker = (
  props: Omit<AlphaPickerProps, "onChangeComplete">
) => {
  const { color, onChange, ...rest } = props;
  const [currentColor, setCurrentColor] = useState(color);

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  return (
    <AlphaPicker
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
