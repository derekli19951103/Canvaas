import { Input, Modal, Select } from "antd";
import { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { CanvasData } from "types/datatypes";
import { IconButton } from "./IconButton";
import { v4 as uuidv4 } from "uuid";

export const ExternalImageLinkMenu = (props: {
  state: CanvasData;
  onChange: (state: CanvasData) => void;
}) => {
  const { state, onChange } = props;

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState<string>();
  const defaultX = 300;
  const defaultY = 300;

  const onClose = () => {
    setOpen(false);
    setUrl(undefined);
  };

  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
      >
        <IoImageOutline size="25px" />
      </IconButton>

      <Modal
        open={open}
        title="Add image links"
        onCancel={onClose}
        onOk={() => {
          if (url) {
            onChange({
              ...state,
              items: state.items.concat([
                {
                  id: uuidv4(),
                  type: "image",
                  data: { src: url, x: defaultX, y: defaultY },
                },
              ]),
            });
            onClose();
          }
        }}
      >
        <Input
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </Modal>
    </>
  );
};
