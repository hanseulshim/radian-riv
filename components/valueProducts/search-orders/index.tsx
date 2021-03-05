import { useEffect, useState } from 'react'
import { validateForm, formatDate } from 'utils'
import Checkbox from 'components/common/Checkbox'
import SearchFilters from './SearchOrdersFilters'
import Form from 'components/common/Form'
import {
  Option,
  Filters,
  Search,
  getSavedSearches,
  getOrders,
  SearchOrderInterface
} from 'api'
import SearchOrdersAdvancedFilters from './SearchOrdersAdvancedFilters'
import SaveSearchModal from './SaveSearchModal'
import OrdersTable from './OrdersTable'

const defaultState = {
  orderDateFrom: '',
  orderDateTo: '',
  clientLoanNumber: '',
  orderId: '',
  address: '',
  zip: '',
  city: '',
  state: null,
  msa: null,
  client: null,
  baseClient: '',
  propertyType: null,
  completeDateFrom: '',
  completeDateTo: '',
  products: null,
  department: null,
  orderedBy: null,
  rivStatus: null,
  reconcileStatus: null,
  selectedPools: []
}

export default function SearchOrders() {
  const [filters, setFilters] = useState<Filters>({ ...defaultState })
  const [advancedFilters, showAdvancedFilters] = useState(false)
  const [error, setError] = useState({ ...defaultState })
  const [alert, setAlert] = useState(null)
  const [savedSearches, setSavedSearches] = useState<Search[]>([])
  const [showMenu, setShowMenu] = useState(false)
  const [showSaveSearch, setSaveSearch] = useState(false)
  const [orderList, setOrderList] = useState<SearchOrderInterface[]>([])

  useEffect(() => {
    const setDefaults = () => {
      setFilters({
        ...filters,
        orderDateFrom: formatDate(new Date(Date.now() - 12096e5)),
        orderDateTo: formatDate(new Date())
      })
    }
    setDefaults()
  }, [])

  useEffect(() => {
    const getFirstOrders = async () => {
      const response = await getOrders({
        ...filters,
        orderDateFrom: formatDate(new Date(Date.now() - 12096e5)),
        orderDateTo: formatDate(new Date())
      })
      setOrderList(response)
    }
    getFirstOrders()
  }, [])

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key = 'string'
  ) => {
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    setFilters({ ...filters, [key]: e.target.value })
  }

  const handleSelectChange = (opt: Option, key = 'string') => {
    setFilters({ ...filters, [key]: opt })
  }

  useEffect(() => {
    const savedSearch = async () => {
      const searches = await getSavedSearches()
      setSavedSearches(searches)
    }
    savedSearch()
  }, [])
  const onClearAll = () => {
    setError({ ...defaultState })
    setFilters({ ...defaultState })
  }

  return (
    <div className="search-orders-container">
      <Checkbox
        label="Show Advanced Filters"
        checked={advancedFilters}
        onChange={() => showAdvancedFilters(!advancedFilters)}
      />
      <Form onSubmit={onSubmit} alert={alert} id={'search-orders'}>
        <div className="form">
          <SearchFilters
            filters={filters}
            handleInputChange={handleInputChange}
            error={error}
          />
          {advancedFilters && (
            <SearchOrdersAdvancedFilters
              filters={filters}
              setFilters={setFilters}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              error={error}
            />
          )}
          <div className="btn-row">
            <div className="dropdown-container">
              <button
                type="button"
                className="btn btn-small btn-icon"
                onClick={() => setShowMenu(!showMenu)}
              >
                <span>Saved Searches</span>
                <span className="icon-container">
                  <img
                    src={`${process.env.baseUrl}/images/select_down_arrow.svg`}
                    alt="print"
                  />
                </span>
              </button>
              {showMenu && (
                <ul className="dropdown">
                  {savedSearches.map(search => (
                    <li
                      key={search.name}
                      onClick={() => {
                        setFilters({
                          ...search.filters,
                          orderDateFrom: search.filters.orderDateFrom
                            ? search.filters.orderDateFrom
                            : '',
                          orderDateTo: search.filters.orderDateTo
                            ? search.filters.orderDateTo
                            : '',
                          clientLoanNumber: search.filters.clientLoanNumber
                            ? search.filters.clientLoanNumber
                            : '',
                          orderId: search.filters.orderId
                            ? search.filters.orderId
                            : '',
                          address: search.filters.address
                            ? search.filters.address
                            : '',
                          zip: search.filters.zip ? search.filters.zip : '',
                          city: search.filters.city ? search.filters.city : '',
                          baseClient: search.filters.baseClient
                            ? search.filters.baseClient
                            : '',
                          completeDateFrom: search.filters.completeDateFrom
                            ? search.filters.completeDateFrom
                            : '',
                          completeDateTo: search.filters.completeDateTo
                            ? search.filters.completeDateTo
                            : ''
                        })
                        setShowMenu(false)
                      }}
                    >
                      {search.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="button"
              className="btn btn-small"
              disabled={!filters.zip}
              onClick={() => setSaveSearch(true)}
            >
              Save Search
            </button>
          </div>
          <div className="form-submit">
            <button className="btn" type="submit" id="search-orders-button">
              Search
            </button>
            <button className="btn btn-link" onClick={onClearAll} type="button">
              Clear All
            </button>
          </div>
        </div>
        <OrdersTable tableData={orderList} />
      </Form>
      {showSaveSearch && (
        <SaveSearchModal
          closeModal={() => setSaveSearch(false)}
          savedSearches={savedSearches}
          filters={filters}
          setSavedSearches={setSavedSearches}
        />
      )}
    </div>
  )
}
