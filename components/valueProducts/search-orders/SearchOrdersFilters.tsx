import { Filters } from 'api'
import Input from 'components/common/Input'

interface Props {
  filters: Filters
  error: Filters
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => void
}

export default function SearchOrdersFilters({
  filters,
  error,
  handleInputChange
}: Props) {
  return (
    <>
      <div className="flex space-x-4 mt-4">
        <Input
          value={filters.orderDateFrom}
          label="Order Date From"
          onChange={e => handleInputChange(e, 'orderDateFrom')}
          error={error.orderDateFrom}
        />
        <Input
          value={filters.orderDateTo}
          label="Order Date To"
          onChange={e => handleInputChange(e, 'orderDateTo')}
          error={error.orderDateTo}
        />
        <Input
          value={filters.clientLoanNumber}
          label="Client Loan #"
          onChange={e => handleInputChange(e, 'clientLoanNumber')}
          error={error.clientLoanNumber}
        />
        <Input
          value={filters.orderId}
          label="Order ID #"
          onChange={e => handleInputChange(e, 'orderId')}
          error={error.orderId}
        />
      </div>
      <div className="flex space-x-4 w-1/2">
        <Input
          value={filters.address}
          label="Street Address"
          onChange={e => handleInputChange(e, 'address')}
          error={error.address}
        />
        <div className="w-1/4">
          <Input
            value={filters.zip}
            label="Zip"
            onChange={e => handleInputChange(e, 'zip')}
            error={error.zip}
          />
        </div>
      </div>
    </>
  )
}
