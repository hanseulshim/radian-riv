import { useState } from 'react'

interface item {
  label: string
  value: string | number
}
interface Props {
  options: item[]
  value: item
  placeholder?: string
  label?: string
  onChange?: (e: any) => void
  disabled?: boolean
}

export default function Select({
  options,
  value,
  placeholder,
  label,
  onChange,
  disabled = false
}: Props) {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    if (!disabled) {
      setOpen(!open)
    }
  }

  const onSelect = (item: item) => {
    toggleOpen()
    onChange(item)
  }
  return (
    <>
      <div
        className={`custom-select${disabled ? ' disabled' : ''}`}
        onClick={toggleOpen}
      >
        {!value && (
          <span className="placeholder">
            <span>{placeholder}</span>
            <img
              src={`${process.env.baseUrl}/images/select_down_arrow.svg`}
              className={'select-dropdown-arrow'}
            />
          </span>
        )}
        {value !== null && (
          <>
            {label && <span className="field-label">{label}</span>}
            <span className="selected-value">
              <span>{value.label}</span>
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
                  {option.label || '...'}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}
