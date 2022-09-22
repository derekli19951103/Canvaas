import { useWindowSize } from "hooks/useWindowResize";
import { KonvaEventObject } from "konva/lib/Node";
import { Layer, Stage } from "react-konva";
import { CanvasData, CanvasItem } from "types/datatypes";
import { TImage } from "./Shapes/TImage";
import { TRect } from "./Shapes/TRect";
import { TEllipse } from "./Shapes/TEllipse";
import { TText } from "./Shapes/TText/TText";
import { TLine } from "./Shapes/TLine";
import { TArrow } from "./Shapes/TArrow";
import { useState } from "react";

export const Canvas = (props: {
  state: CanvasData;
  onChange: (state: CanvasData) => void;
  selectedId?: string;
  onSelect: (id?: string) => void;
}) => {
  const { state, onChange, selectedId, onSelect } = props;

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

      onChange({ items: itemsCopy, ...rest });
    }
  };

  const checkDeselect = (
    e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>
  ) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      onSelect(undefined);
    }
  };

  const checkSelect = (item: CanvasItem) => {
    onSelect(item.id);
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
