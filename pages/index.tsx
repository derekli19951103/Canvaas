import { Slider } from "antd";
import { CanvasMenu } from "components/CanvasMenu";
import { IconButton } from "components/CanvasMenu/IconButton";
import { shapes } from "constant/constant";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MdOutlineGridOff, MdOutlineGridOn } from "react-icons/md";
import { CanvasData } from "types/datatypes";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { useWindowSize } from "hooks/useWindowResize";
import { ZoomSlider } from "components/CanvasMenu/ZoomSlider";

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
  const [dispGrid, setDispGrid] = useState(false);
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
          onChange={(state) => {
            console.log(state);
            setState(state);
          }}
          selectedId={selectedId}
          onSelect={setSelectId}
          scale={scale}
          editable
          draggable
        />
      </div>
    </div>
  );
};

export default Home;
