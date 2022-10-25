/* eslint-disable jsx-a11y/alt-text */
import { ImageConfig } from "konva/lib/shapes/Image";
import { Fragment, useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";
import { useImage } from "react-konva-utils";
import { defaultTransformSettings } from "./settings";

const respectToScreen = 0.67;

export const TImage = (
  props: Omit<ImageConfig, "image"> & {
    url: string;
    isSelected: boolean;
    canvasHeight: number;
    canvasWidth: number;
    onChange: (value: Omit<ImageConfig, "image">) => void;
    onSelect: () => void;
  }
) => {
  const {
    url,
    isSelected,
    onChange,
    onSelect,
    canvasHeight,
    canvasWidth,
    ...shapeProps
  } = props;
  const [image, status] = useImage(url, "anonymous", "no-referrer");
  const [loadingImage] = useImage(
    "/icons/loading.jpg",
    "anonymous",
    "no-referrer"
  );
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && trRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    if (image && (!shapeProps.width || !shapeProps.height)) {
      if (image.width > canvasWidth) {
        const adjustedWidth = canvasWidth * respectToScreen;
        const aspectRatio = adjustedWidth / image.width;
        image.width = adjustedWidth;
        image.height = image.height * aspectRatio;
      }
      if (image.height > canvasHeight) {
        const adjustedHeight = canvasHeight * respectToScreen;
        const aspectRatio = adjustedHeight / image.height;
        image.height = adjustedHeight;
        image.width = image.width * aspectRatio;
      }

      onChange({ ...shapeProps, width: image.width, height: image.height });
    }
  }, [canvasHeight, canvasWidth, image, onChange, shapeProps]);

  return (
    <Fragment>
      <Image
        ref={shapeRef}
        image={image}
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
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = transform.target.scaleX();
          const scaleY = transform.target.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
            rotation: transform.target.rotation(),
          });
        }}
      />
      {status === "loading" && (
        <Image
          image={loadingImage}
          x={shapeProps.x}
          y={shapeProps.y}
          width={200}
          height={200}
        />
      )}
      {isSelected && <Transformer ref={trRef} {...defaultTransformSettings} />}
    </Fragment>
  );
};
