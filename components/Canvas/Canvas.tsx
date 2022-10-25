import { useWindowSize } from "hooks/useWindowResize";
import { KonvaEventObject } from "konva/lib/Node";
import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { Layer, Rect, Stage } from "react-konva";
import { CanvasData, CanvasItem } from "types/datatypes";
import { BasicContextMenu } from "./CanvasContextMenu/BasicContextMenu";
import { TArrow } from "./Shapes/TArrow";
import { TEllipse } from "./Shapes/TEllipse";
import { TImage } from "./Shapes/TImage";
import { TLine } from "./Shapes/TLine";
import { TRect } from "./Shapes/TRect";
import { TText } from "./Shapes/TText/TText";

const Canvas = forwardRef(
  (
    props: {
      state: CanvasData;
      width?: number;
      height?: number;
      selectedId?: string;
      scale?: number;

      editable?: boolean;
      draggable?: boolean;

      onChange?: (state: CanvasData) => void;
      onSelect?: (id?: string) => void;
      onDropFile?: (files: FileList, x: number, y: number) => void;
      onDropLink?: (link: string, x: number, y: number) => void;

      style?: CSSProperties;
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const {
      state,
      width,
      height,
      selectedId,
      editable,
      draggable,
      scale,
      style,
      onSelect,
      onChange,
      onDropFile,
      onDropLink,
    } = props;

    const contentLayer = useRef<any>(null);
    const backgroundLayer = useRef<any>(null);

    const [contextMenuEvent, setContextMenuEvent] =
      useState<KonvaEventObject<PointerEvent>>();

    const windowSize = useWindowSize();
    const canvasWidth = width || windowSize.width || 1000;
    const canvasHeight = height || windowSize.height || 1000;

    useEffect(() => {
      if (contentLayer.current) {
        const node = contentLayer.current;
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
      if (backgroundLayer.current) {
        const node = backgroundLayer.current;
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
        const clickedOnEmpty = e.target.id() === "bg-rect";
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
      e.evt.preventDefault();
      setContextMenuEvent(e);
    };

    return (
      <div
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();

          const html = e.dataTransfer.getData("text/html");
          const files = e.dataTransfer.files;
          if (files.length > 0) {
            onDropFile &&
              onDropFile(files, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
          } else if (html) {
            const link = /src="?([^"\s]+)"?\s*/.exec(html);

            if (link?.at(0)) {
              onDropLink &&
                onDropLink(
                  link[0].replace('src="', "").replace('"', ""),
                  e.nativeEvent.offsetX,
                  e.nativeEvent.offsetY
                );
            }
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        style={{ width: canvasWidth, height: canvasHeight, ...style }}
        ref={ref}
      >
        {contextMenuEvent && editable && (
          <BasicContextMenu
            event={contextMenuEvent}
            state={state}
            onChange={onChange}
            onDoneAction={(_actionName) => {
              setContextMenuEvent(undefined);
            }}
          />
        )}
        <Stage
          width={canvasWidth}
          height={canvasHeight}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          onContextMenu={onContextMenu}
          draggable={false}
        >
          <Layer>
            <Rect
              id="bg-rect"
              fill={state.background}
              width={canvasWidth}
              height={canvasHeight}
              ref={backgroundLayer}
            />
          </Layer>
          <Layer ref={contentLayer}>
            {state.items.map((i) => {
              switch (i.type) {
                case "image":
                  return (
                    <TImage
                      key={i.id}
                      url={i.data.src}
                      {...i.data}
                      draggable={draggable}
                      canvasHeight={height}
                      canvasWidth={width}
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
                      draggable={draggable}
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
                      draggable={draggable}
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
                      draggable={draggable}
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
                      draggable={draggable}
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
                      draggable={draggable}
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
  }
);

Canvas.displayName = "CanvasComponent";

export { Canvas };
