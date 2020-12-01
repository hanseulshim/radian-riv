import React, { useState } from 'react'

interface item {
  label: string
  value: string | number
}
interface Props {
  options: item[]
  value: item
  placeholder: string
  label: string
  onChange?: (e: item) => void
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

  const onSelect = (item: item) => {
    toggleOpen()
    onChange(item)
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
        {value !== null && (
          <>
            <span className="field-label">{label}</span>
            <span className="selected-value">
              {value.label}
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
                <li onClick={() => onSelect(option)} key={option.label}>
                  {option.label}
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
