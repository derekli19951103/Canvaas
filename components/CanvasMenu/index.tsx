import { Button, Col, Popover, Row, Space } from "antd";
import { useMemo } from "react";
import { CanvasData, CanvasItem } from "types/datatypes";
import { TextMenu } from "./TextMenu";
import { CgFormatText } from "react-icons/cg";
import { CompactPicker } from "react-color";
import { ShapeMenu } from "./ShapeMenu";
import { RectMenu } from "./RectMenu";
import { IconButton } from "./IconButton";
import { ColorBlock } from "./ColorBlock";
import { EllipseMenu } from "./EllipseMenu";
import { LineMenu } from "./LineMenu";
import { ArrowMenu } from "./ArrowMenu";
import { v4 as uuidv4 } from "uuid";

export const CanvasMenu = (props: {
  state: CanvasData;
  onChange: (state: CanvasData) => void;
  selectedId?: string;
}) => {
  const { selectedId, state, onChange } = props;

  const defaultX = state.width ? state.width / 2 : 300;
  const defaultY = state.height ? state.height / 2 : 300;

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
    <Row justify="space-between">
      <Col>
        <Space>
          <Popover
            content={
              <CompactPicker
                onChange={(color) => {
                  onChange({ ...state, background: color.hex });
                }}
                color={state.background}
              />
            }
            trigger="click"
            placement="bottomLeft"
          >
            <IconButton style={{ width: 160 }}>
              <ColorBlock color={state.background} />{" "}
              <span className="ml-2 select-none">Background color</span>
            </IconButton>
          </Popover>
          <ShapeMenu state={state} onChange={onChange} />
          <IconButton>
            <CgFormatText
              size="25px"
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
                        fill: "blue",
                        fontStyle: "normal",
                        fontFamily: "Roboto",
                      },
                    },
                  ]),
                });
              }}
            />
          </IconButton>
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
      </Col>
    </Row>
  );
};
