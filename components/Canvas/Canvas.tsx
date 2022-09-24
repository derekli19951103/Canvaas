import Color from "color";
import { useWindowSize } from "hooks/useWindowResize";
import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useMemo, useRef, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import { CanvasData, CanvasItem } from "types/datatypes";
import { BasicContextMenu } from "./CanvasContextMenu/BasicContextMenu";
import { TArrow } from "./Shapes/TArrow";
import { TEllipse } from "./Shapes/TEllipse";
import { TImage } from "./Shapes/TImage";
import { TLine } from "./Shapes/TLine";
import { TRect } from "./Shapes/TRect";
import { TText } from "./Shapes/TText/TText";

const grid = 70;

export const Canvas = (props: {
  state: CanvasData;
  onChange?: (state: CanvasData) => void;
  selectedId?: string;
  onSelect?: (id?: string) => void;
  editable?: boolean;
  dispGrid?: boolean;
  scale?: number;
}) => {
  const { state, onChange, selectedId, onSelect, editable, dispGrid, scale } =
    props;

  const gridLayer = useRef<any>(null);
  const contentLayer = useRef<any>(null);
  const stage = useRef<any>(null);

  const [contextMenuEvent, setContextMenuEvent] =
    useState<KonvaEventObject<PointerEvent>>();

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

  useEffect(() => {
    if (stage.current) {
      const node = stage.current;
      node.x(node.width() / 2);
      node.y(node.height() / 2);

      node.offset({
        x: node.width() / 2,
        y: node.height() / 2,
      });

      node.scale({
        x: (scale || 100) / 100,
        y: (scale || 100) / 100,
      });
    }
  }, [scale]);

  const gridLines = useMemo(() => {
    const verticalLines = [];
    const horizontalLines = [];

    const bgColor = Color(state.background);
    const darken = bgColor.darken(0.1);
    if (width) {
      const gridWidth = width;
      for (let i = 0; i < gridWidth / grid; i++) {
        verticalLines.push(
          <Line
            key={`${i}-v`}
            strokeWidth={2}
            stroke={darken.hex()}
            points={[i * grid, 0, i * grid, gridWidth]}
          />
        );
        horizontalLines.push(
          <Line
            key={`${i}-h`}
            strokeWidth={2}
            stroke={darken.hex()}
            points={[0, i * grid, gridWidth, i * grid]}
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
    if (e.evt.type !== "contextmenu") {
      const clickedOnEmpty = e.target === e.target.getStage();
      // deselect when clicked on empty area
      if (clickedOnEmpty) {
        onSelect && onSelect(undefined);
      }

      setContextMenuEvent(undefined);
    }
  };

  const checkSelect = (item: CanvasItem) => {
    if (editable) {
      onSelect && onSelect(item.id);
    }
  };

  const onContextMenu = (e: KonvaEventObject<PointerEvent>) => {
    console.log(e);
    e.evt.preventDefault();
    setContextMenuEvent(e);
  };

  return (
    <div>
      {contextMenuEvent && (
        <BasicContextMenu
          event={contextMenuEvent}
          state={state}
          contentLayerChildren={contentLayer.current?.children}
          onChange={onChange}
          onDoneAction={() => {
            setContextMenuEvent(undefined);
          }}
        />
      )}
      <Stage
        width={width}
        height={height}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        onContextMenu={onContextMenu}
        draggable
        style={{ backgroundColor: state.background }}
        ref={stage}
      >
        <Layer ref={gridLayer}>{gridLines}</Layer>
        <Layer ref={contentLayer}>
          {state.items.map((i) => {
            switch (i.type) {
              case "image":
                return (
                  <TImage
                    key={i.id}
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
                    key={i.id}
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
                    key={i.id}
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
                    key={i.id}
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
                    key={i.id}
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
                    key={i.id}
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
    </div>
  );
};
