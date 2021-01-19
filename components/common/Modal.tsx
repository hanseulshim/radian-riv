type Props = {
  title: string
  children: React.ReactNode
  width?: number
  percent?: number
  closeModal: () => void
}

export default function Modal({
  children,
  title,
  closeModal,
  width,
  percent
}: Props) {
  const handleClick = e => {
    if (e.target.className === 'modal-container') {
      closeModal()
    }
  }
  return (
    <div className="modal-container" onClick={handleClick}>
      <div
        className="form"
        style={{ width: width ? width : percent ? `${percent}%` : null }}
      >
        {title && <h2 className="form-title">{title}</h2>}
        <img
          src={`${process.env.baseUrl}/images/icon_x.svg`}
          className={'close-form'}
          onClick={closeModal}
        />
        {children}
      </div>
    </div>
  )
}
