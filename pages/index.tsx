import { CanvasEditor } from "components/CanvasEditor";
import type { NextPage } from "next";
import { useState } from "react";
import { CanvasData } from "types/datatypes";

const Home: NextPage = () => {
  const [state, setState] = useState<CanvasData>({
    background: "#F2F2F2",
    items: [],
  });
  return <CanvasEditor state={state} onChange={setState} />;
};

export default Home;
