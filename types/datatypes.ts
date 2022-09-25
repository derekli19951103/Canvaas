export type CanvasItemTypes =
  | "image"
  | "text"
  | "rect"
  | "ellipse"
  | "line"
  | "arrow";

export interface CanvasItem {
  id: string;
  type: CanvasItemTypes;
  data: any;
}

export interface CanvasData {
  background: string;
  items: CanvasItem[];
}
