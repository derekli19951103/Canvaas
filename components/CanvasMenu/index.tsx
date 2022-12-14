import { Col, Popover, Row, Space } from "antd";
import { ReactNode, useMemo } from "react";
import { CgFormatText } from "react-icons/cg";
import { CanvasData, CanvasItem } from "types/datatypes";
import { v4 as uuidv4 } from "uuid";
import { CleanCanvasButton } from "./CleanCanvasButton";
import { ColorBlock } from "./ColorBlock";
import { DelayedColorPicker } from "./DelayedColorPicker";
import { IconButton } from "./IconButton";
import { ArrowMenu } from "./ShapeConfigMenus/ArrowMenu";
import { EllipseMenu } from "./ShapeConfigMenus/EllipseMenu";
import { ImageMenu } from "./ShapeConfigMenus/ImageMenu";
import { LineMenu } from "./ShapeConfigMenus/LineMenu";
import { RectMenu } from "./ShapeConfigMenus/RectMenu";
import { TextMenu } from "./ShapeConfigMenus/TextMenu";
import { ShapeMenu } from "./ShapeMenu";

export const CanvasMenu = (props: {
  state: CanvasData;
  onChange: (state: CanvasData) => void;
  selectedId?: string;
  children?: ReactNode;
}) => {
  const { selectedId, state, onChange, children } = props;

  const defaultX = 300;
  const defaultY = 300;

  const selectedItem = useMemo(() => {
    if (selectedId) {
      return state.items.find((i) => i.id === selectedId);
    }
  }, [selectedId, state]);

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

  return (
    <Row justify="space-between" gutter={[0, 8]}>
      <Col>
        <Space>
          <ShapeMenu state={state} onChange={onChange} />
          <IconButton
            onClick={() => {
              onChange({
                ...state,
                items: state.items.concat([
                  {
                    id: uuidv4(),
                    type: "text",
                    data: {
                      text: "Sample Text",
                      x: defaultX,
                      y: defaultY,
                      fontSize: 20,
                      width: 200,
                      fill: "black",
                      fontStyle: "normal",
                      fontFamily: "Roboto",
                    },
                  },
                ]),
              });
            }}
          >
            <CgFormatText size="25px" />
          </IconButton>
          <Popover
            content={
              <DelayedColorPicker
                onChange={(color) => {
                  onChange({ ...state, background: color.hex });
                }}
                color={state.background}
                disableAlpha
              />
            }
            trigger="click"
            placement="bottomLeft"
            overlayClassName="compact-popover"
          >
            <IconButton style={{ width: 160 }}>
              <ColorBlock color={state.background} />{" "}
              <span className="ml-2 select-none">Background color</span>
            </IconButton>
          </Popover>

          {/* <ExternalImageLinkMenu state={state} onChange={onChange} /> */}

          <CleanCanvasButton state={state} onChange={onChange} />

          {children}
        </Space>
      </Col>

      <Col>
        {selectedItem?.type === "text" && (
          <TextMenu
            value={selectedItem.data}
            onChange={(value) => {
              onChangeData(value, selectedItem);
            }}
          />
        )}
        {selectedItem?.type === "rect" && (
          <RectMenu
            value={selectedItem.data}
            onChange={(value) => {
              onChangeData(value, selectedItem);
            }}
          />
        )}
        {selectedItem?.type === "ellipse" && (
          <EllipseMenu
            value={selectedItem.data}
            onChange={(value) => {
              onChangeData(value, selectedItem);
            }}
          />
        )}
        {selectedItem?.type === "line" && (
          <LineMenu
            value={selectedItem.data}
            onChange={(value) => {
              onChangeData(value, selectedItem);
            }}
          />
        )}
        {selectedItem?.type === "arrow" && (
          <ArrowMenu
            value={selectedItem.data}
            onChange={(value) => {
              onChangeData(value, selectedItem);
            }}
          />
        )}
        {selectedItem?.type === "image" && (
          <ImageMenu
            value={selectedItem.data}
            onChange={(value) => {
              onChangeData(value, selectedItem);
            }}
          />
        )}
      </Col>
    </Row>
  );
};
