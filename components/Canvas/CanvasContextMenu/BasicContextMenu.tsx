import { Menu } from "antd";
import { KonvaEventObject } from "konva/lib/Node";
import { AiOutlineCopy, AiOutlineDelete } from "react-icons/ai";
import { CanvasData } from "types/datatypes";
import { v4 as uuidv4 } from "uuid";

export const BasicContextMenu = (props: {
  event: KonvaEventObject<PointerEvent>;
  state: CanvasData;
  onDoneAction: () => void;
  onChange?: (state: CanvasData) => void;
}) => {
  const { event, state, onChange, onDoneAction } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: event.evt.y,
        left: event.evt.x,
        zIndex: 1,
      }}
    >
      <Menu
        mode="vertical"
        items={[
          {
            key: "moveup",
            label: "Move Up",
            onClick: () => {
              const item = state.items.find((_, i) => i === event.target.index);
              if (item && onChange) {
                onChange({
                  ...state,
                  items: state.items
                    .filter((_, i) => i !== event.target.index)
                    .concat([item]),
                });
              }
              onDoneAction();
            },
          },
          {
            key: "movedown",
            label: "Move Down",
            onClick: () => {
              const item = state.items.find((_, i) => i === event.target.index);
              if (item && onChange) {
                onChange({
                  ...state,
                  items: [item].concat(
                    state.items.filter((_, i) => i !== event.target.index)
                  ),
                });
              }
              onDoneAction();
            },
          },
          {
            key: "duplicate",
            label: (
              <div className="flex items-center">
                <AiOutlineCopy className="mr-2" /> Duplicate
              </div>
            ),
            onClick: () => {
              const duplicate = state.items.find(
                (_, i) => i === event.target.index
              );
              if (duplicate && onChange) {
                onChange({
                  ...state,
                  items: state.items.concat([
                    {
                      ...duplicate,
                      id: uuidv4(),
                      data: {
                        ...duplicate.data,
                        x: duplicate.data.x + 20,
                        y: duplicate.data.y + 20,
                      },
                    },
                  ]),
                });
              }
              onDoneAction();
            },
          },
          {
            key: "remove",
            label: (
              <div className="flex items-center">
                <AiOutlineDelete className="mr-2" /> Remove
              </div>
            ),
            onClick: () => {
              onChange &&
                onChange({
                  ...state,
                  items: state.items.filter((_, i) => i !== event.target.index),
                });
              onDoneAction();
            },
          },
        ]}
      />
    </div>
  );
};
