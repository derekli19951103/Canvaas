import type { NextPage } from "next";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { shapes } from "constant/constant";
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

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <Canvas state={state} onChange={setState} />
    </div>
  );
};

export default Home;
