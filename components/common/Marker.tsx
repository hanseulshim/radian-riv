interface Props {
  type: string
  lat: number
  lng: number
  order: number
}
export default function Marker({ type, order }: Props) {
  return (
    <div className="marker">
      <img alt={type} src={`${process.env.baseUrl}/images/${type}.svg`} />
      {type !== 'marker-subject' ? (
        <span className={`${type}${order > 9 ? ' double-digit' : ''}`}>
          {order}
        </span>
      ) : null}
    </div>
  )
}
