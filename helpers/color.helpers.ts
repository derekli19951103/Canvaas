import { ColorResult, RGBColor } from "react-color";

export const fromColorResultToColor = (res: ColorResult) => {
  const rgb = res.rgb;
  return { rgb: `rgb(${rgb.r},${rgb.g},${rgb.b})`, opacity: rgb.a };
};

export const fromColorToColorResult = (
  color?: string,
  opacity?: number | Number
) => {
  if (color) {
    if (color.includes("#")) {
      return { ...hexToRgb(color), opacity } as RGBColor;
    }
    if (/[\d\.]+/g.test(color)) {
      const [r, g, b, _a] = color.match(/[\d\.]+/g)!.map(Number);
      return { r, g, b, a: opacity } as RGBColor;
    }
    return color;
  }
  return { r: 0, b: 0, g: 0, a: opacity } as RGBColor;
};

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};
