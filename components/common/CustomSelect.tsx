import Select from 'react-select'

interface Option {
  label: string
  value: any
}

interface Props {
  options: Option[]
  value: Option
  onChange: (option: Option, key: string) => void
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
}

const customStyles = {
  option: provided => ({
    ...provided,
    cursor: 'pointer',
    color: 'black',
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: 'rgba(61, 57, 53, 0.05)'
    }
  }),
  menu: provided => ({
    ...provided,
    zIndex: '3'
  }),
  control: provided => ({
    ...provided,
    cursor: 'pointer',
    border: 'none',
    borderBottom: '1px solid #00bab3',
    boxShadow: 'none',
    '&:hover': {
      borderBottom: '1px solid #00bab3'
    },
    borderRadius: 0,
    width: '100%'
  })
}

export default function CustomSelect({
  options,
  value,
  onChange,
  label,
  placeholder,
  className,
  disabled
}: Props) {
  return (
    <div className="custom-select-container">
      {value && <div className="custom-select-label">{label}</div>}
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        isDisabled={disabled}
        styles={customStyles}
      />
    </div>
  )
}
