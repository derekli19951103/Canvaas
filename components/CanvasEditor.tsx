import { ZoomSlider } from "components/CanvasMenu/ZoomSlider";
import { readFileAsDataUrl } from "helpers/utils";
import { useWindowSize } from "hooks/useWindowResize";
import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { CanvasData } from "types/datatypes";
import { v4 as uuidv4 } from "uuid";
import { Canvas } from "./Canvas/Canvas";
import { CanvasMenu } from "./CanvasMenu";
import { IconButton } from "./CanvasMenu/IconButton";

export const CanvasEditor = (props: {
  state: CanvasData;
  onChange: (state: CanvasData) => void;
}) => {
  const { state, onChange } = props;

  const printRef = useRef(null);

  const [history, setHistory] = useState<CanvasData[]>([state]);
  const [selectedId, setSelectId] = useState<string>();
  const [scale, setScale] = useState(100);
  const [beforePrintScale, setBeforePrintScale] = useState<number>();

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
      >
        <ReactToPrint
          content={() => printRef?.current}
          documentTitle={`Moodboard`}
          pageStyle={`@page { size: landscape; }`}
          trigger={() => (
            <IconButton style={{ width: 60 }} className="select-none">
              Export
            </IconButton>
          )}
          onBeforeGetContent={() => {
            setBeforePrintScale(scale);
            setScale(100);
          }}
          onAfterPrint={() => {
            setScale(beforePrintScale!);
          }}
        />
      </CanvasMenu>

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
          ref={printRef}
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
          onDropLink={(imageLink, x, y) => {
            onChange({
              ...state,
              items: state.items.concat([
                {
                  id: uuidv4(),
                  type: "image",
                  data: { src: imageLink, x, y },
                },
              ]),
            });
          }}
        />
      </div>
    </div>
  );
};
