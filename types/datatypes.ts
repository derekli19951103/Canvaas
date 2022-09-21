import { ArrowConfig } from "konva/lib/shapes/Arrow";
import { EllipseConfig } from "konva/lib/shapes/Ellipse";
import { ImageConfig } from "konva/lib/shapes/Image";
import { LineConfig } from "konva/lib/shapes/Line";
import { RectConfig } from "konva/lib/shapes/Rect";
import { TextConfig } from "konva/lib/shapes/Text";

export type CanvasItemTypes =
  | "image"
  | "text"
  | "rect"
  | "ellipse"
  | "line"
  | "arrow";

export type CanvasDataTypes =
  | ImageConfig
  | TextConfig
  | RectConfig
  | EllipseConfig
  | LineConfig
  | ArrowConfig;

export interface CanvasItem {
  id: string;
  type: CanvasItemTypes;
  data: CanvasDataTypes;
}

export interface CanvasData {
  background: string;
  items: CanvasItem[];
}
