import { ArrowConfig } from "konva/lib/shapes/Arrow";
import { LineConfig } from "konva/lib/shapes/Line";
import { TextConfig } from "konva/lib/shapes/Text";
import { CanvasItem } from "types/datatypes";

export const shapes: CanvasItem[] = [
  {
    id: "1",
    type: "image",
    data: {
      src: "https://file-assets-prod.bspacesoft.com/files/R_photo/0/2022/8/8/18c19ad0420845e9a4c845f180f6a5d7/4569d7ea-99b1-4fdf-bc53-38d1c40c7ed2.jpg",
      x: 100,
      y: 100,
    },
  },
  {
    id: "2",
    type: "text",
    data: {
      text: "GGGGGGiberrish",
      x: 10,
      y: 10,
      fontSize: 20,
      stroke: "blue",
      strokeWidth: 0,
      fill: "blue",
      fontStyle: "normal",
    } as TextConfig,
  },
];
