import { Menu } from "antd";
import { KonvaEventObject } from "konva/lib/Node";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import * as util from "konva/lib/Util";
import { AiOutlineCopy, AiOutlineDelete } from "react-icons/ai";
import { BsChevronBarDown, BsChevronBarUp } from "react-icons/bs";
import { MdOutlineCenterFocusWeak } from "react-icons/md";
import { CanvasData } from "types/datatypes";
import { v4 as uuidv4 } from "uuid";

export const BasicContextMenu = (props: {
  event: KonvaEventObject<PointerEvent>;
  state: CanvasData;
  onDoneAction: (actionName: string) => void;
  onChange?: (state: CanvasData) => void;
}) => {
  const { event, state, onChange, onDoneAction } = props;

  const contentLayerChildren = event.target.getLayer()?.children as
    | Shape<ShapeConfig>[]
    | undefined;

  const clickedOnEmpty = event.target === event.target.getStage();

  const generalMenus = [
    {
      key: "reset-view",
      label: (
        <div className="flex items-center">
          <MdOutlineCenterFocusWeak className="mr-2" /> Reset Focus
        </div>
      ),
      onClick: () => {
        const stage = event.target.getStage();
        if (stage) {
          stage.position({
            x: 0,
            y: 0,
          });
          stage.offset({
            x: 0,
            y: 0,
          });
        }

        onDoneAction("reset-view");
      },
    },
  ];

  const itemSpecificMenus = [
    {
      key: "moveup",
      label: (
        <div className="flex items-center">
          <BsChevronBarUp className="mr-2" /> Move Up
        </div>
      ),
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
          const item = state.items.find((_, i) => i === event.target.index);
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

        onDoneAction("moveup");
      },
    },

    {
      key: "movedown",
      label: (
        <div className="flex items-center">
          <BsChevronBarDown className="mr-2" /> Move Down
        </div>
      ),
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
            const item = state.items.find((_, i) => i === event.target.index);
            if (item) {
              const itemsCopy = state.items.filter((i) => i.id !== item.id);
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

        onDoneAction("movedown");
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
        const duplicate = state.items.find((_, i) => i === event.target.index);
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
        onDoneAction("duplicate");
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
        onDoneAction("remove");
      },
    },
  ];

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
        items={
          clickedOnEmpty
            ? generalMenus
            : [...generalMenus, ...itemSpecificMenus]
        }
      />
    </div>
  );
};
