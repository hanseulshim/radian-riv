import React from 'react'
interface Props {
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  leftLabel?: boolean
  small?: boolean
}

export default function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  leftLabel = false,
  small = false,
  ...props
}: Props) {
  return (
    <div className="checkbox-container">
      <label>
        {leftLabel && label && (
          <span className={`left-label${disabled ? ' disabled' : ''}`}>
            {label}
          </span>
        )}
        <input
          type="checkbox"
          className="hidden-checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        <div
          className={`styled-checkbox${checked ? ' checked' : ''}${
            disabled ? ' disabled' : ''
          }${small ? ' small' : ''}`}
        >
          <svg viewBox="0 0 24 24">
            <polyline
              className={`checkmark${!checked ? ' hidden' : ''}`}
              points="20 6 9 17 4 12"
            />
          </svg>
        </div>
        {!leftLabel && label && (
          <span className={`label${disabled ? ' disabled' : ''}`}>{label}</span>
        )}
      </label>
    </div>
  )
}
