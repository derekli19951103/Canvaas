import { Menu } from "antd";
import { KonvaEventObject } from "konva/lib/Node";
import { AiOutlineCopy, AiOutlineDelete } from "react-icons/ai";
import { CanvasData } from "types/datatypes";
import { v4 as uuidv4 } from "uuid";
import * as util from "konva/lib/Util";
import { Shape, ShapeConfig } from "konva/lib/Shape";

export const BasicContextMenu = (props: {
  event: KonvaEventObject<PointerEvent>;
  state: CanvasData;
  contentLayerChildren?: Shape<ShapeConfig>[];
  onDoneAction: () => void;
  onChange?: (state: CanvasData) => void;
}) => {
  const { event, state, onChange, onDoneAction, contentLayerChildren } = props;

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
              const objectIndex = event.target.index;
              let mostTopIndex = 0;

              contentLayerChildren?.forEach((group) => {
                // do not check intersection with itself
                if (group === event.target) {
                  return;
                }
                if (group.className === "Transformer") {
                  return;
                }
                if (
                  util.Util.haveIntersection(
                    group.getClientRect(),
                    event.target.getClientRect()
                  )
                ) {
                  if (mostTopIndex < group.index) {
                    mostTopIndex = group.index;
                  }
                }
              });

              if (objectIndex !== mostTopIndex) {
                const item = state.items.find(
                  (_, i) => i === event.target.index
                );
                if (item) {
                  const itemsCopy = state.items.filter((i) => i.id !== item.id);
                  itemsCopy.splice(mostTopIndex + 1, 0, item);

                  if (onChange) {
                    onChange({
                      ...state,
                      items: itemsCopy,
                    });
                  }
                }
              }

              onDoneAction();
            },
          },
          {
            key: "movedown",
            label: "Move Down",
            onClick: () => {
              const objectIndex = event.target.index;

              if (contentLayerChildren) {
                let mostBottomIndex = contentLayerChildren.length;

                for (let i = 0; i < contentLayerChildren.length; i++) {
                  const group = contentLayerChildren[i];
                  // do not check intersection with itself
                  if (group === event.target) {
                    continue;
                  }
                  if (group.className === "Transformer") {
                    continue;
                  }
                  if (
                    util.Util.haveIntersection(
                      group.getClientRect(),
                      event.target.getClientRect()
                    )
                  ) {
                    if (mostBottomIndex > group.index) {
                      mostBottomIndex = group.index;
                    }
                  }
                }

                if (objectIndex !== mostBottomIndex) {
                  const item = state.items.find(
                    (_, i) => i === event.target.index
                  );
                  if (item) {
                    const itemsCopy = state.items.filter(
                      (i) => i.id !== item.id
                    );
                    itemsCopy.splice(mostBottomIndex, 0, item);

                    if (onChange) {
                      onChange({
                        ...state,
                        items: itemsCopy,
                      });
                    }
                  }
                }
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
