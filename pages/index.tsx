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

const Canvas = dynamic(
  () => import("components/Canvas/Canvas").then((mod) => mod.Canvas),
  { ssr: false }
);

const Home: NextPage = () => {
  const [state, setState] = useState<CanvasData>({
    background: "#F2F2F2",
    items: shapes,
  });
  const [selectedId, setSelectId] = useState<string>();
  const [dispGrid, setDispGrid] = useState(false);
  const [scale, setScale] = useState(100);

  return (
    <div>
      <CanvasMenu state={state} onChange={setState} selectedId={selectedId}>
        <IconButton
          onClick={() => {
            setDispGrid(!dispGrid);
          }}
        >
          {dispGrid ? (
            <MdOutlineGridOff size="25px" />
          ) : (
            <MdOutlineGridOn size="25px" />
          )}
        </IconButton>
        <div className="flex items-center">
          <AiOutlineZoomIn size="20px" />
          <Slider
            value={scale}
            onChange={setScale}
            style={{ width: 200 }}
            min={1}
            max={100}
          />
          <AiOutlineZoomOut size="20px" className="ml-2" />
          <span className="ml-2">{scale}%</span>
        </div>
      </CanvasMenu>

      <div style={{ paddingTop: 10 }}></div>
      <Canvas
        state={state}
        onChange={(state) => {
          console.log(state);
          setState(state);
        }}
        selectedId={selectedId}
        onSelect={setSelectId}
        dispGrid={dispGrid}
        scale={scale}
        editable
      />
    </div>
  );
};

export default Home;
