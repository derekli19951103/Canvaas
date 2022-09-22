import { Button, Divider, Popover, Space } from "antd";
import { AiOutlineLine } from "react-icons/ai";
import { BiCircle, BiSquare } from "react-icons/bi";
import { BsArrowDownRight } from "react-icons/bs";
import { IoShapesOutline } from "react-icons/io5";
import { CanvasData } from "types/datatypes";
import { v4 as uuidv4 } from "uuid";

export const ShapeMenu = (props: {
  state: CanvasData;
  onChange: (state: CanvasData) => void;
}) => {
  const { state, onChange } = props;

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
                      x: 300,
                      y: 300,
                      fill: "black",
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
                      x: 300,
                      y: 300,
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
          <AiOutlineLine size="40px" />
          <Divider type="vertical" />
          <BsArrowDownRight size="40px" />
        </Space>
      }
      trigger="click"
      placement="bottomLeft"
    >
      <Button icon={<IoShapesOutline size="25px" />} />
    </Popover>
  );
};
