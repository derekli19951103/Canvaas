import { useWindowSize } from "hooks/useWindowResize";
import { KonvaEventObject } from "konva/lib/Node";
import { Layer, Stage } from "react-konva";
import { CanvasData, CanvasItem } from "types/datatypes";
import { TArrow } from "./Shapes/TArrow";
import { TEllipse } from "./Shapes/TEllipse";
import { TImage } from "./Shapes/TImage";
import { TLine } from "./Shapes/TLine";
import { TRect } from "./Shapes/TRect";
import { TText } from "./Shapes/TText/TText";

export const Canvas = (props: {
  state: CanvasData;
  onChange?: (state: CanvasData) => void;
  selectedId?: string;
  onSelect?: (id?: string) => void;
  editable?: boolean;
}) => {
  const { state, onChange, selectedId, onSelect, editable } = props;

  const windowSize = useWindowSize();

  const onChangeData = (value: any, i: CanvasItem) => {
    const { items, ...rest } = state;
    const itemsCopy = items.slice();
    const index = items.findIndex((s) => s.id === i.id);

    if (index > -1) {
      const item = items[index];

      itemsCopy[index] = {
        ...item,
        data: value,
      };

      onChange && onChange({ items: itemsCopy, ...rest });
    }
  };

  const checkDeselect = (
    e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>
  ) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      onSelect && onSelect(undefined);
    }
  };

  const checkSelect = (item: CanvasItem) => {
    if (editable) {
      onSelect && onSelect(item.id);
    }
  };

  return (
    <Stage
      width={state.width || windowSize.width}
      height={state.height || windowSize.height}
      globalCompositeOperation="destination-over"
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
      style={{ backgroundColor: state.background }}
    >
      <Layer>
        {state.items.map((i) => {
          switch (i.type) {
            case "image":
              return (
                <TImage
                  url={i.data.src}
                  {...i.data}
                  draggable={editable}
                  isSelected={i.id === selectedId}
                  onSelect={() => {
                    checkSelect(i);
                  }}
                  onChange={(props) => {
                    onChangeData(props, i);
                  }}
                />
              );
            case "rect":
              return (
                <TRect
                  {...i.data}
                  draggable={editable}
                  isSelected={i.id === selectedId}
                  onSelect={() => {
                    checkSelect(i);
                  }}
                  onChange={(props) => {
                    onChangeData(props, i);
                  }}
                />
              );
            case "text":
              return (
                <TText
                  {...i.data}
                  draggable={editable}
                  isSelected={i.id === selectedId}
                  onSelect={() => {
                    checkSelect(i);
                  }}
                  onChange={(props) => {
                    onChangeData(props, i);
                  }}
                />
              );
            case "ellipse":
              return (
                <TEllipse
                  {...i.data}
                  draggable={editable}
                  isSelected={i.id === selectedId}
                  onSelect={() => {
                    checkSelect(i);
                  }}
                  onChange={(props) => {
                    onChangeData(props, i);
                  }}
                />
              );
            case "line":
              return (
                <TLine
                  {...i.data}
                  draggable={editable}
                  isSelected={i.id === selectedId}
                  onSelect={() => {
                    checkSelect(i);
                  }}
                  onChange={(props) => {
                    onChangeData(props, i);
                  }}
                />
              );
            case "arrow":
              return (
                <TArrow
                  {...i.data}
                  draggable={editable}
                  isSelected={i.id === selectedId}
                  onSelect={() => {
                    checkSelect(i);
                  }}
                  onChange={(props) => {
                    onChangeData(props, i);
                  }}
                />
              );
          }
        })}
      </Layer>
    </Stage>
  );
};
