import * as React from 'react'

type Props = {
  title: string
  children: React.ReactNode
  width?: number
  closeModal: () => void
}

const Modal: React.FC<Props> = ({ children, title, closeModal, width }) => {
  const handleClick = e => {
    if (e.target.className === 'modal-container') {
      closeModal()
    }
  }
  return (
    <div className="modal-container" onClick={handleClick}>
      <div className="form" style={{ width }}>
        {title && <h3 className="form-title">{title}</h3>}
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

export default Modal
