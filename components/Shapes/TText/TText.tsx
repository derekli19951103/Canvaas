import { TextConfig } from "konva/lib/shapes/Text";
import { Fragment, useEffect, useRef, useState } from "react";
import { Text, Transformer } from "react-konva";
import { EditableTextInput } from "./EditableTextInput";
import { defaultTransformSettings } from "../settings";

export const TText = (
  props: TextConfig & {
    isSelected: boolean;
    onChange: (value: TextConfig) => void;
    onSelect: () => void;
  }
) => {
  const { isSelected, onChange, onSelect, ...shapeProps } = props;
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isSelected && trRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    } else {
      setIsEditing(false);
    }
  }, [isSelected]);

  if (isEditing) {
    return (
      <EditableTextInput
        config={shapeProps}
        onChange={(e) => {
          onChange({ ...shapeProps, text: e.currentTarget.value });
        }}
        onKeyDown={(e) => {
          if ((e.key === "Enter" && !e.shiftKey) || e.key === "Escape") {
            setIsEditing(false);
          }
        }}
      />
    );
  } else {
    return (
      <Fragment>
        <Text
          ref={shapeRef}
          {...shapeProps}
          draggable
          onTap={onSelect}
          onClick={onSelect}
          onDragStart={onSelect}
          onDragEnd={(e) => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onDblClick={() => {
            setIsEditing(true);
          }}
          onDblTap={() => {
            setIsEditing(true);
          }}
          onTransform={(transform) => {
            const node = shapeRef.current;
            const scaleX = transform.target.scaleX();

            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              width: node.width() * scaleX,
              rotation: transform.target.rotation(),
            });
          }}
        />
        {isSelected && (
          <Transformer
            ref={trRef}
            {...defaultTransformSettings}
            enabledAnchors={["middle-left", "middle-right"]}
          />
        )}
      </Fragment>
    );
  }
};
