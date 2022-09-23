import { TransformerConfig } from "konva/lib/shapes/Transformer";

export const defaultTransformSettings: TransformerConfig = {
  anchorCornerRadius: 10,
  borderDash: [3, 3],
  rotationSnaps: [0, 90, 180, 270],
  ignoreStroke: false,
};
