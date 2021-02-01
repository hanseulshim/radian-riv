import React from 'react'

interface Props {
  value: string
  label: string
  checked: boolean
  name?: string
  onChange: (e: any) => void
  className?: string
  disabled?: boolean
}

export default function Radio({
  value,
  label,
  checked,
  name,
  onChange,
  className,
  disabled
}: Props) {
  return (
    <div className={`radio ${className || ''}`}>
      <label className={disabled ? 'disabled' : ''}>
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          name={name}
        />
        {label}
      </label>
    </div>
  )
}
