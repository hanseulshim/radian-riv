import React, { useState } from 'react'

interface Props {
  options: string[]
  value: string
  placeholder: string
  label: string
  onChange?: (e: string) => void
}

const Select: React.FC<Props> = ({
  options,
  value,
  placeholder,
  label,
  onChange
}) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  const onSelect = (option: string) => {
    toggleOpen()
    onChange(option)
  }
  return (
    <div className="custom-select-container">
      <div
        className={`custom-select ${value ? 'selected-value' : 'placeholder'} `}
        onClick={toggleOpen}
      >
        {!value && <span>{placeholder} ...</span>}
        {value && <span className="field-label">{label}</span>}
        <span>{value}</span>
        <img
          src={`${process.env.baseUrl}/images/select_down_arrow.svg`}
          className={'select-dropdown-arrow'}
        />
      </div>
      {open && (
        <ul>
          {options.map(option => {
            return (
              <li onClick={() => onSelect(option)} key={option}>
                {option}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Select
