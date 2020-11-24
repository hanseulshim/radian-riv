import React, { useState } from 'react'

interface Props {
  value: string
  label: string
  type?: string
  required?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<Props> = ({
  value,
  label,
  type = 'text',
  required = false,
  onChange
}) => {
  const [focus, setFocus] = useState(false)
  return (
    <div className="input-group">
      <input
        type={type}
        placeholder={`${required ? '   ' : ''}${label}...`}
        name={label}
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {required && !focus && !value && (
        <span className="placeholder required-field">*</span>
      )}
      <label className={value ? 'input-label' : null} htmlFor={label}>
        {required && <span className="required-field">* </span>}
        {label}
      </label>
    </div>
  )
}

export default Input
