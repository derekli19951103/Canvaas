import { useWindowSize } from "hooks/useWindowResize";
import { CanvasData } from "pages";
import { useEffect, useRef } from "react";

export const Canvas = (props: {
  state: CanvasData;
  onChange: (state: CanvasData) => void;
}) => {
  const { state, onChange } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if (ctx) {
        canvasRef.current.height = windowSize.height!;
        canvasRef.current.width = windowSize.width!;

        ctx.globalCompositeOperation = "destination-over";

        state.items.map((i) => {
          switch (i.type) {
            case "image":
              const image = new Image();
              image.onload = () => {
                ctx.drawImage(image, 0, 0);
              };
              image.src = i.data.src;
              return;
            case "text":
              ctx.fillText(i.data.content, 100, 100);
              return;
          }
        });
      }
    }
  }, [windowSize.height, windowSize.width, state]);

  return <canvas ref={canvasRef} />;
};
