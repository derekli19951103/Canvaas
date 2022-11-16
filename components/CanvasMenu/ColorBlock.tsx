export const ColorBlock = (props: { color?: string }) => {
  return (
    <div
      style={{
        backgroundColor: props.color,
        width: 20,
        height: 20
      }}
      className="rounded-md"
    />
  )
}
