/* eslint-disable jsx-a11y/alt-text */
import useImage from "use-image";
import { Image } from "react-konva";
import { ImageConfig } from "konva/lib/shapes/Image";

export const CanvasImage = (
  props: Omit<ImageConfig, "image"> & { url: string }
) => {
  const { url, ...rest } = props;
  const [image] = useImage(url);

  return <Image image={image} {...rest} />;
};
