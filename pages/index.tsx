import { CanvasMenu } from "components/CanvasMenu";
import { ZoomSlider } from "components/CanvasMenu/ZoomSlider";
import { shapes } from "constant/constant";
import { readFileAsDataUrl } from "helpers/utils";
import { useWindowSize } from "hooks/useWindowResize";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import { CanvasData } from "types/datatypes";
import { v4 as uuidv4 } from "uuid";

const Canvas = dynamic(
  () => import("components/Canvas/Canvas").then((mod) => mod.Canvas),
  { ssr: false }
);

const Home: NextPage = () => {
  const windowSize = useWindowSize();
  const [state, setState] = useState<CanvasData>({
    background: "#F2F2F2",
    items: shapes,
  });
  const [selectedId, setSelectId] = useState<string>();
  const [scale, setScale] = useState(100);

  return (
    <div>
      <div style={{ paddingTop: 10 }}></div>

      <CanvasMenu state={state} onChange={setState} selectedId={selectedId} />

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
          onChange={(state) => {
            console.log(state);
            setState(state);
          }}
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

            setState({
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

export default Home;
