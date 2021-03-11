import { ISingleOrderForm } from 'api'
import Input from 'components/common/Input'

interface Props {
  form: ISingleOrderForm
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => void
  error: ISingleOrderForm
}

export default function SingleOrderAdvancedFilters({
  form,
  handleInputChange,
  error
}: Props) {
  return (
    <div className="flex-col w-full mb-4 bg-light-gray px-4 -ml-4">
      <div className="flex space-x-4 transparent">
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
          value={form.yrBuilt}
          label="Year Built"
          onChange={e => handleInputChange(e, 'yrBuilt')}
          error={error.yrBuilt}
        />
      </div>
      <div className="flex space-x-4 transparent">
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
