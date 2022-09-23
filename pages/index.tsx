import { Col, Row } from "antd";
import { CanvasMenu } from "components/CanvasMenu";
import { IconButton } from "components/CanvasMenu/IconButton";
import { shapes } from "constant/constant";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CanvasData } from "types/datatypes";
import { MdOutlineGridOff, MdOutlineGridOn } from "react-icons/md";

const Canvas = dynamic(
  () => import("components/Canvas").then((mod) => mod.Canvas),
  { ssr: false }
);

const Home: NextPage = () => {
  const [state, setState] = useState<CanvasData>({
    background: "#F2F2F2",
    items: shapes,
  });
  const [selectedId, setSelectId] = useState<string>();
  const [dispGrid, setDispGrid] = useState(false);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <Row justify="space-between">
        <CanvasMenu state={state} onChange={setState} selectedId={selectedId} />

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
      </Row>
      <div style={{ paddingTop: 10 }}></div>
      <Canvas
        state={state}
        onChange={setState}
        selectedId={selectedId}
        onSelect={setSelectId}
        dispGrid={dispGrid}
        editable
      />
    </div>
  );
};

export default Home;
