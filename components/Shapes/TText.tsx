import { TextConfig } from "konva/lib/shapes/Text";
import { Fragment, useEffect, useRef } from "react";
import { Text, Transformer } from "react-konva";
import { defaultTransformSettings } from "./settings";

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

  useEffect(() => {
    if (isSelected && trRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

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
};
