import { Popover } from "antd";
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
        <div>
          <IconButton style={{ width: 60, height: 60 }} className="mb-2">
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
          </IconButton>
          <IconButton style={{ width: 60, height: 60 }} className="mb-2">
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
          </IconButton>
          <IconButton style={{ width: 60, height: 60 }} className="mb-2">
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
          </IconButton>
          <IconButton style={{ width: 60, height: 60 }}>
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
          </IconButton>
        </div>
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
