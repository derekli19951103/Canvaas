import { CanvasMenu } from "components/CanvasMenu";
import { shapes } from "constant/constant";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CanvasData } from "types/datatypes";

const Canvas = dynamic(
  () => import("components/Canvas").then((mod) => mod.Canvas),
  { ssr: false }
);

const Home: NextPage = () => {
  const [state, setState] = useState<CanvasData>({
    background: "white",
    items: shapes,
  });
  const [selectedId, setSelectId] = useState<string>();

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div style={{ padding: 20 }}>
      <CanvasMenu state={state} onChange={setState} selectedId={selectedId} />
      <Canvas
        state={state}
        onChange={setState}
        selectedId={selectedId}
        onSelect={setSelectId}
      />
    </div>
  );
};

export default Home;
