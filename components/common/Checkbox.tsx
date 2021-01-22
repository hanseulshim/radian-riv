import React from 'react'
interface Props {
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export default function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  ...props
}: Props) {
  return (
    <div className="checkbox-container">
      <label>
        <input
          type="checkbox"
          className="hidden-checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        <div
          className={`styled-checkbox ${checked && 'checked'} ${
            disabled && 'disabled'
          }`}
        >
          <svg viewBox="0 0 24 24">
            <polyline
              className={`checkmark ${!checked && 'hidden'}`}
              points="20 6 9 17 4 12"
            />
          </svg>
        </div>
        <span className={`${disabled && 'disabled'}`}>{label}</span>
      </label>
    </div>
  )
}
