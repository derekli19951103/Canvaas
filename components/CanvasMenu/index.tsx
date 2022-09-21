import { Button, Col, Row, Space } from "antd";
import { useMemo } from "react";
import { CanvasData, CanvasItem } from "types/datatypes";
import { TextMenu } from "./TextMenu";
import { CgFormatText } from "react-icons/cg";

export const CanvasMenu = (props: {
  state: CanvasData;
  onChange: (state: CanvasData) => void;
  selectedId?: string;
}) => {
  const { selectedId, state, onChange } = props;
  const selectedItem = useMemo(() => {
    if (selectedId) {
      return state.items.find((i) => i.id === selectedId);
    }
  }, [selectedId, state]);

  const onChangeData = (value: any, i: CanvasItem) => {
    const { items, ...rest } = state;
    const itemsCopy = items.slice();
    const index = items.findIndex((s) => s.id === i.id);

    if (index > -1) {
      const item = items[index];

      itemsCopy[index] = {
        ...item,
        data: value,
      };

      onChange({ items: itemsCopy, ...rest });
    }
  };

  return (
    <Row justify="space-between">
      <Col>
        <Space>
          <Button icon={<CgFormatText size="25px" />} />
          <Button icon={<CgFormatText size="25px" />} />
          <Button icon={<CgFormatText size="25px" />} />
          <Button icon={<CgFormatText size="25px" />} />
          <Button icon={<CgFormatText size="25px" />} />
        </Space>
      </Col>

      <Col>
        {selectedItem?.type === "text" && (
          <TextMenu
            value={selectedItem.data}
            onChange={(value) => {
              onChangeData(value, selectedItem);
            }}
          />
        )}
      </Col>
    </Row>
  );
};
