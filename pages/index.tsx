import type { NextPage } from "next";
import { Canvas } from "components/Canvas";
import { useState } from "react";

export interface CanvasData {
  background: string;
  items: {
    type: string;
    data: any;
  }[];
}

const Home: NextPage = () => {
  const [state, setState] = useState<CanvasData>({
    background: "white",
    items: [
      {
        type: "text",
        data: {
          content: "GGGGGGIiberrish",
        },
      },
      {
        type: "image",
        data: {
          src: "https://file-assets-prod.bspacesoft.com/files/R_photo/0/2022/8/8/18c19ad0420845e9a4c845f180f6a5d7/4569d7ea-99b1-4fdf-bc53-38d1c40c7ed2.jpg",
        },
      },
    ],
  });

  return (
    <div>
      <Canvas state={state} onChange={console.log} />
    </div>
  );
};

export default Home;
