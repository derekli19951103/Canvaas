import { Menu } from "antd";
import { KonvaEventObject } from "konva/lib/Node";
import { AiOutlineCopy, AiOutlineDelete } from "react-icons/ai";
import { CanvasData } from "types/datatypes";

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
            key: "duplicate",
            label: (
              <div className="flex items-center">
                <AiOutlineCopy className="mr-2" /> Duplicate
              </div>
            ),
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
