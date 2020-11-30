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
    <>
      <div className={`custom-select`} onClick={toggleOpen}>
        {!value && (
          <span className="placeholder">
            {placeholder}{' '}
            <img
              src={`${process.env.baseUrl}/images/select_down_arrow.svg`}
              className={'select-dropdown-arrow'}
            />
          </span>
        )}
        {value && (
          <>
            <span className="field-label">{label}</span>
            <span className="selected-value">
              {value}
              <img
                src={`${process.env.baseUrl}/images/select_down_arrow.svg`}
                className={'select-dropdown-arrow'}
              />
            </span>
          </>
        )}
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
    </>
  )
}

export default Select
