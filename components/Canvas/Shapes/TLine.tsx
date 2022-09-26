import { LineConfig } from "konva/lib/shapes/Line";
import { Fragment, useEffect, useRef } from "react";
import { Line, Transformer } from "react-konva";
import { defaultTransformSettings } from "./settings";

export const TLine = (
  props: LineConfig & {
    isSelected: boolean;
    onChange: (value: LineConfig) => void;
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
      <Line
        ref={shapeRef}
        {...shapeProps}
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
        onTransformEnd={(transform) => {
          const node = shapeRef.current;
          const scaleX = transform.target.scaleX();

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            height: node.height(),
            width: node.width() * scaleX,
            scaleX,
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
