import { Divider, Popover, Space } from "antd";
import { AiOutlineLine } from "react-icons/ai";
import { BiCircle, BiSquare } from "react-icons/bi";
import { BsArrowDownRight } from "react-icons/bs";
import { IoShapesOutline } from "react-icons/io5";
import { CanvasData } from "types/datatypes";
import { v4 as uuidv4 } from "uuid";
import { IconButton } from "./IconButton";

export const ShapeMenu = (props: {
  state: CanvasData;
  onChange: (state: CanvasData) => void;
}) => {
  const { state, onChange } = props;
  const defaultX = state.width ? state.width / 2 : 300;
  const defaultY = state.height ? state.height / 2 : 300;

  return (
    <Popover
      content={
        <Space>
          <BiCircle
            size="40px"
            onClick={() => {
              onChange({
                ...state,
                items: state.items.concat([
                  {
                    id: uuidv4(),
                    type: "ellipse",
                    data: {
                      radiusX: 100,
                      radiusY: 100,
                      x: defaultX,
                      y: defaultY,
                      fill: "white",
                      stroke: "black",
                      strokeWidth: 2,
                    },
                  },
                ]),
              });
            }}
          />
          <Divider type="vertical" />
          <BiSquare
            size="40px"
            onClick={() => {
              onChange({
                ...state,
                items: state.items.concat([
                  {
                    id: uuidv4(),
                    type: "rect",
                    data: {
                      width: 100,
                      height: 100,
                      x: defaultX,
                      y: defaultY,
                      fill: "white",
                      stroke: "black",
                      strokeWidth: 2,
                    },
                  },
                ]),
              });
            }}
          />
          <Divider type="vertical" />
          <AiOutlineLine
            size="40px"
            onClick={() => {
              onChange({
                ...state,
                items: state.items.concat([
                  {
                    id: uuidv4(),
                    type: "line",
                    data: {
                      points: [0, 0, 200, 0],
                      x: defaultX,
                      y: defaultY,
                      stroke: "black",
                      strokeWidth: 5,
                    },
                  },
                ]),
              });
            }}
          />
          <Divider type="vertical" />
          <BsArrowDownRight
            size="40px"
            onClick={() => {
              onChange({
                ...state,
                items: state.items.concat([
                  {
                    id: uuidv4(),
                    type: "arrow",
                    data: {
                      points: [0, 0, 200, 0],
                      x: defaultX,
                      y: defaultY,
                      stroke: "black",
                      strokeWidth: 10,
                      pointerWidth: 10,
                    },
                  },
                ]),
              });
            }}
          />
        </Space>
      }
      trigger="click"
      placement="bottomLeft"
    >
      <IconButton>
        <IoShapesOutline size="25px" />
      </IconButton>
    </Popover>
  );
};
