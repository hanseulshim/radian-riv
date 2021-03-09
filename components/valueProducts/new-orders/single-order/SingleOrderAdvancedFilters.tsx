import { SingleOrderForm } from 'api'
import Input from 'components/common/Input'

interface Props {
  form: SingleOrderForm
  setForm: (e: any) => void
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => void
  error: SingleOrderForm
}

export default function SingleOrderAdvancedFilters({
  form,
  setForm,
  handleInputChange,
  error
}: Props) {
  return (
    <div className="advanced-filters">
      <div className="top-row">
        <Input
          value={form.bed}
          label="Bed"
          onChange={e => handleInputChange(e, 'bed')}
          error={error.bed}
        />
        <Input
          value={form.bath}
          label="Bath"
          onChange={e => handleInputChange(e, 'bath')}
          error={error.bath}
        />
        <Input
          value={form.sqft}
          label="Sqft"
          onChange={e => handleInputChange(e, 'sqft')}
          error={error.sqft}
        />
        <Input
          value={form.lotSize}
          label="Lot Size"
          onChange={e => handleInputChange(e, 'lotSize')}
          error={error.lotSize}
        />
        <Input
          value={form.garage}
          label="Garage"
          onChange={e => handleInputChange(e, 'garage')}
          error={error.garage}
        />
        <Input
          value={form.year}
          label="Year Built"
          onChange={e => handleInputChange(e, 'year')}
          error={error.year}
        />
      </div>
      <div className="bottom-row">
        <Input
          value={form.asOfDate}
          label="As of Date"
          onChange={e => handleInputChange(e, 'asOfDate')}
          error={error.asOfDate}
        />
        <Input
          value={form.contactName}
          label="Contact Name"
          onChange={e => handleInputChange(e, 'contactName')}
          error={error.contactName}
        />
        <Input
          value={form.contactPhone}
          label="Contact Phone"
          onChange={e => handleInputChange(e, 'contactPhone')}
          error={error.contactPhone}
        />
        <Input
          value={form.clientName}
          label="Client Name"
          onChange={e => handleInputChange(e, 'clientName')}
          error={error.clientName}
        />
      </div>
    </div>
  )
}
