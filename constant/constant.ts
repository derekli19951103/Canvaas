import { ArrowConfig } from "konva/lib/shapes/Arrow";
import { EllipseConfig } from "konva/lib/shapes/Ellipse";
import { LineConfig } from "konva/lib/shapes/Line";
import { RectConfig } from "konva/lib/shapes/Rect";
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
    } as TextConfig,
  },
  {
    id: "3",
    type: "rect",
    data: {
      width: 100,
      height: 50,
      x: 100,
      y: 100,
      fill: "red",
    } as RectConfig,
  },
  {
    id: "4",
    type: "ellipse",
    data: {
      radiusX: 100,
      radiusY: 100,
      x: 200,
      y: 200,
      fill: "black",
    } as EllipseConfig,
  },
  {
    id: "5",
    type: "line",
    data: {
      points: [0, 0, 100, 100],
      x: 300,
      y: 300,
      stroke: "blue",
      strokeWidth: 10,
    } as LineConfig,
  },
  {
    id: "6",
    type: "arrow",
    data: {
      points: [0, 0, 100, 100],
      x: 400,
      y: 400,
      stroke: "blue",
      strokeWidth: 10,
    } as ArrowConfig,
  },
];
