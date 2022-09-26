import { CanvasMenu } from "components/CanvasMenu";
import { ZoomSlider } from "components/CanvasMenu/ZoomSlider";
import { shapes } from "constant/constant";
import { readFileAsDataUrl } from "helpers/utils";
import { useWindowSize } from "hooks/useWindowResize";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CanvasData } from "types/datatypes";
import { v4 as uuidv4 } from "uuid";

const Canvas = dynamic(
  () => import("components/Canvas/Canvas").then((mod) => mod.Canvas),
  { ssr: false }
);

export const CanvasEditor = (props: {
  state: CanvasData;
  onChange: (state: CanvasData) => void;
}) => {
  const { state, onChange } = props;

  const [history, setHistory] = useState<CanvasData[]>([state]);
  const [selectedId, setSelectId] = useState<string>();
  const [scale, setScale] = useState(100);

  const windowSize = useWindowSize();

  const onChangeState = (state: CanvasData) => {
    console.log(state);
    onChange(state);
    setHistory(history.concat([state]));
  };

  useEffect(() => {
    const handleRevert = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        let lastHistory: CanvasData | undefined = undefined;
        if (history.length > 1) {
          lastHistory = history.pop();
        } else {
          lastHistory = history.at(0);
        }

        if (lastHistory) {
          onChange(lastHistory);
          if (history.length > 1) {
            setHistory(history.slice());
          }
        }
      }
    };

    window.addEventListener("keydown", handleRevert);

    return () => window.removeEventListener("keydown", handleRevert);
  }, [history]);

  return (
    <div>
      <div style={{ paddingTop: 10 }}></div>

      <CanvasMenu
        state={state}
        onChange={onChangeState}
        selectedId={selectedId}
      />

      <div style={{ paddingTop: 10 }}></div>
      <div>
        <ZoomSlider value={scale} onChange={setScale} className="mr-2 mt-2" />
        <Canvas
          state={state}
          width={windowSize.width}
          height={
            windowSize.height ? windowSize.height - 60 : windowSize.height
          }
          selectedId={selectedId}
          scale={scale}
          editable
          draggable
          onChange={onChangeState}
          onSelect={setSelectId}
          onDropFile={async (files, x, y) => {
            const dataUrls = [];
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              const url = await readFileAsDataUrl(file);
              if (url) {
                dataUrls.push(url);
              }
            }

            onChange({
              ...state,
              items: state.items.concat(
                dataUrls.map((u) => {
                  return {
                    id: uuidv4(),
                    type: "image",
                    data: { src: u as string, x, y },
                  };
                })
              ),
            });
          }}
        />
      </div>
    </div>
  );
};
