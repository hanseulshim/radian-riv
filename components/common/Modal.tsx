type Props = {
  title: string
  children: React.ReactNode
  width?: number
  closeModal: () => void
}

//TODO #8 add in CSS animations for modal open/close
export default function Modal({ children, title, closeModal, width }: Props) {
  const handleClick = e => {
    if (e.target.className === 'modal-container') {
      closeModal()
    }
  }
  return (
    <div className="modal-container" onClick={handleClick}>
      <div className="form" style={{ width }}>
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
