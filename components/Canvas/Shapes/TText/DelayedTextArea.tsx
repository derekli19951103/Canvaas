import _debounce from 'lodash/debounce'
import { useCallback, useEffect, useState } from 'react'

const DEFAULT_WAIT = 300

export const DelayedTextArea = (
  props: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > & { delay?: number }
) => {
  const { value, onChange, delay, ...rest } = props
  const [dispVal, setDispVal] = useState(value)

  useEffect(() => {
    setDispVal(value)
  }, [value])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouceOnChange = useCallback(
    _debounce(onChange!, delay || DEFAULT_WAIT),
    [onChange]
  )

  return (
    <textarea
      {...rest}
      value={dispVal}
      onChange={(e) => {
        setDispVal(e.target.value)
        debouceOnChange(e)
      }}
    />
  )
}
