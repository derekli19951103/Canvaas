import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import { CanvasData } from "types/datatypes";

const CanvasEditor = dynamic(
  () => import("components/CanvasEditor").then((mod) => mod.CanvasEditor),
  { ssr: false }
);

const Home: NextPage = () => {
  const [state, setState] = useState<CanvasData>({
    background: "#F2F2F2",
    items: [],
  });
  return <CanvasEditor state={state} onChange={setState} />;
};

export default Home;
