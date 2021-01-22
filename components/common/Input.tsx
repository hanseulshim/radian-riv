import React, { useState } from 'react'

interface Props {
  value: string | number
  label?: string
  type?: string
  required?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error: string
  disabled?: boolean
}

export default function Input({
  value,
  label,
  type = 'text',
  required = false,
  onChange,
  error,
  disabled = false
}: Props) {
  const [focus, setFocus] = useState(false)
  return (
    <div className="input-group">
      <input
        className={error ? 'error-input' : null}
        type={type}
        placeholder={label && `${required ? '   ' : ''}${label}...`}
        name={label}
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        disabled={disabled}
      />
      {required && !focus && !value && (
        <span className="placeholder required-field">*</span>
      )}
      {label && (
        <label className={value ? 'input-label' : null} htmlFor={label}>
          {required && <span className="required-field">* </span>}
          {label}
        </label>
      )}
      <span className="error-input-message">{error}</span>
    </div>
  )
}
