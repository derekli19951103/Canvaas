import { AiOutlineRedo } from 'react-icons/ai'
import { CanvasData } from 'types/datatypes'
import { IconButton } from './IconButton'

export const CleanCanvasButton = (props: {
  state: CanvasData
  onChange: (state: CanvasData) => void
}) => {
  const { state, onChange } = props

  return (
    <IconButton
      onClick={() => {
        onChange({ ...state, items: [] })
      }}
      style={{ width: 110 }}
    >
      <AiOutlineRedo size="25px" />
      <span className="ml-2 select-none"> Clear Page</span>
    </IconButton>
  )
}
