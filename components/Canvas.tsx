import { useWindowSize } from "hooks/useWindowResize";
import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useMemo, useRef } from "react";
import { Layer, Line, Stage } from "react-konva";
import { CanvasData, CanvasItem } from "types/datatypes";
import { TArrow } from "./Shapes/TArrow";
import { TEllipse } from "./Shapes/TEllipse";
import { TImage } from "./Shapes/TImage";
import { TLine } from "./Shapes/TLine";
import { TRect } from "./Shapes/TRect";
import { TText } from "./Shapes/TText/TText";
import Color from "color";

const grid = 70;

export const Canvas = (props: {
  state: CanvasData;
  onChange?: (state: CanvasData) => void;
  selectedId?: string;
  onSelect?: (id?: string) => void;
  editable?: boolean;
  dispGrid?: boolean;
}) => {
  const { state, onChange, selectedId, onSelect, editable, dispGrid } = props;

  const gridLayer = useRef<any>(null);

  const windowSize = useWindowSize();
  const width = state.width || windowSize.width;
  const height = state.height || windowSize.height;

  useEffect(() => {
    if (gridLayer.current) {
      if (dispGrid && !gridLayer.current.isVisible()) {
        gridLayer.current.show();
      } else if (!dispGrid && gridLayer.current.isVisible()) {
        gridLayer.current.hide();
      }
    }
  }, [dispGrid]);

  const gridLines = useMemo(() => {
    const verticalLines = [];
    const horizontalLines = [];

    const bgColor = Color(state.background);
    const darken = bgColor.darken(0.1);
    if (width) {
      for (let i = 0; i < width / grid; i++) {
        verticalLines.push(
          <Line
            strokeWidth={2}
            stroke={darken.hex()}
            points={[i * grid, 0, i * grid, width]}
          />
        );
        horizontalLines.push(
          <Line
            strokeWidth={2}
            stroke={darken.hex()}
            points={[0, i * grid, width, i * grid]}
          />
        );
      }
    }

    return verticalLines.concat(horizontalLines);
  }, [width, state.background]);

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
      width={width}
      height={height}
      globalCompositeOperation="destination-over"
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
      style={{ backgroundColor: state.background }}
    >
      <Layer ref={gridLayer}>{gridLines}</Layer>
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
