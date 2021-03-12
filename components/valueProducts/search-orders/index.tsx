import { useEffect, useState } from 'react'
import { validateForm, formatDate } from 'utils'
import Checkbox from 'components/common/Checkbox'
import SearchFilters from './SearchOrdersFilters'
import Form from 'components/common/Form'
import { Option, ISearchOrderFilters, getOrders, ISearchOrders } from 'api'
import SearchOrdersAdvancedFilters from './SearchOrdersAdvancedFilters'
import SavedSearch from './SavedSearch'
import OrdersTable from './OrdersTable'

const defaultState = {
  name: '',
  loanNum: '',
  ordersId: '',
  address: '',
  zip: '',
  city: '',
  state: '',
  propertyTypeId: '',
  initialCompleteDate: '',
  completeDate: '',
  orderByIdUser: '',
  status: '',
  reconcileStatusId: '',
  orderDateFrom: '',
  orderDateTo: '',
  msaId: '',
  clientIds: [],
  productId: '',
  departmentId: '',
  poolIds: []
}

export default function SearchOrders() {
  // Form state
  const [filters, setFilters] = useState<ISearchOrderFilters>({
    ...defaultState,
    orderDateFrom: formatDate(new Date(Date.now() - 12096e5)),
    orderDateTo: formatDate(new Date())
  })

  // Other
  const [advancedFilters, showAdvancedFilters] = useState(false)
  const [orderList, setOrderList] = useState<ISearchOrders[]>([])
  const [error, setError] = useState({ ...defaultState })
  const [alert, setAlert] = useState(null)

  // Get default table
  useEffect(() => {
    const getFirstOrders = async () => {
      const data = await getOrders(filters)
      setOrderList(data)
    }
    getFirstOrders()
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    setFilters({ ...filters, [key]: e.target.value })
  }

  const handleMultiSelect = (arr: Option[], key: string) => {
    setFilters({
      ...filters,
      [key]: arr && arr.length ? arr.map(opt => opt.value) : []
    })
  }

  const handleSelectChange = (opt: Option, key = 'string') => {
    setFilters({ ...filters, [key]: opt })
  }

  const onSubmit = async () => {
    setAlert(null)
    const errorCopy = { ...defaultState }
    const errorObj = validateForm(filters)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      try {
        const response = await getOrders(filters)
        setOrderList(response)
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    setError(errorCopy)
  }

  return (
    <div className="search-orders-container">
      <Checkbox
        label="Show Advanced Filters"
        checked={advancedFilters}
        onChange={() => showAdvancedFilters(!advancedFilters)}
      />
      <Form onSubmit={onSubmit} alert={alert} id={'search-orders'}>
        <SearchFilters
          filters={filters}
          handleInputChange={handleInputChange}
          error={error}
        />
        <SearchOrdersAdvancedFilters
          advancedFilters={advancedFilters}
          filters={filters}
          setFilters={setFilters}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleMultiSelect={handleMultiSelect}
          error={error}
        />
        <SavedSearch filters={filters} setFilters={setFilters} />
        <div className="form-submit">
          <button className="btn" type="submit" id="search-orders-button">
            Search
          </button>
          <button
            className="btn btn-link"
            onClick={() => setFilters({ ...defaultState })}
            type="button"
          >
            Clear All
          </button>
        </div>
      </Form>
      <OrdersTable tableData={orderList} />
    </div>
  )
}
