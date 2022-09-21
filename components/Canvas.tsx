import { usePointLoc } from "hooks/usePointLoc";
import { useWindowSize } from "hooks/useWindowResize";
import { KonvaEventObject } from "konva/lib/Node";
import { Ellipse, Layer, Line, Rect, Stage, Text } from "react-konva";
import { CanvasData, CanvasItem } from "types/datatypes";
import { CanvasImage } from "./CanvasImage";

export const Canvas = (props: {
  state: CanvasData;
  onChange: (state: CanvasData) => void;
}) => {
  const { state, onChange } = props;

  const windowSize = useWindowSize();

  const onDragEnd = (e: KonvaEventObject<DragEvent>, i: CanvasItem) => {
    const { items, ...rest } = state;
    const itemsCopy = items.slice();
    const index = items.findIndex((s) => s.id === i.id);

    if (index > -1) {
      const item = items[index];

      itemsCopy[index] = {
        ...item,
        data: { ...item.data, x: e.target.x(), y: e.target.y() },
      };

      onChange({ items: itemsCopy, ...rest });
    }
  };

  return (
    <Stage
      width={windowSize.width}
      height={windowSize.height}
      globalCompositeOperation="destination-over"
    >
      <Layer>
        {state.items.map((i) => {
          switch (i.type) {
            case "image":
              return (
                <CanvasImage
                  url={i.data.src}
                  {...i.data}
                  draggable
                  onDragEnd={(e: KonvaEventObject<DragEvent>) => {
                    onDragEnd(e, i);
                  }}
                />
              );
            case "text":
              return (
                <Text
                  {...i.data}
                  draggable
                  onDragEnd={(e) => {
                    onDragEnd(e, i);
                  }}
                />
              );
            case "rect":
              return (
                <Rect
                  {...i.data}
                  draggable
                  onDragEnd={(e) => {
                    onDragEnd(e, i);
                  }}
                />
              );
            case "ellipse":
              return (
                <Ellipse
                  {...i.data}
                  draggable
                  onDragEnd={(e) => {
                    onDragEnd(e, i);
                  }}
                />
              );
            case "line":
              return (
                <Line
                  {...i.data}
                  draggable
                  onDragEnd={(e) => {
                    onDragEnd(e, i);
                  }}
                />
              );
          }
        })}
      </Layer>
    </Stage>
  );
};
