import { EllipseConfig } from 'konva/lib/shapes/Ellipse'
import { Fragment, useEffect, useRef } from 'react'
import { Ellipse, Transformer } from 'react-konva'
import { defaultTransformSettings } from './settings'

export const TEllipse = (
  props: EllipseConfig & {
    isSelected: boolean
    onChange: (value: EllipseConfig) => void
    onSelect: () => void
  }
) => {
  const { isSelected, onChange, onSelect, ...shapeProps } = props
  const shapeRef = useRef<any>(null)
  const trRef = useRef<any>(null)

  useEffect(() => {
    if (isSelected && trRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current])
      trRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  return (
    <Fragment>
      <Ellipse
        ref={shapeRef}
        {...shapeProps}
        strokeScaleEnabled={false}
        onTap={onSelect}
        onClick={onSelect}
        onDragStart={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y()
          })
        }}
        onTransformEnd={(transform) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current
          const scaleX = transform.target.scaleX()
          const scaleY = transform.target.scaleY()

          // we will reset it back
          node.scaleX(1)
          node.scaleY(1)
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            radiusX: node.radiusX() * scaleX,
            radiusY: node.radiusY() * scaleY,
            width: node.width() * scaleX,
            height: node.height() * scaleY,
            rotation: transform.target.rotation()
          })
        }}
      />
      {isSelected && <Transformer ref={trRef} {...defaultTransformSettings} />}
    </Fragment>
  )
}
