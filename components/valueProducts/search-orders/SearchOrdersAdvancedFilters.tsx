import { useEffect, useState } from 'react'
import {
  Option,
  getClientList,
  getProducts,
  getDepartments,
  getRivStatuses,
  getOrderedByUsers,
  getReconcileStatuses,
  getPools,
  getMsas,
  getPropertyTypes,
  Filters
} from 'api'
import { useTrending } from 'context/TrendingProvider'
import CustomSelect from 'components/common/CustomSelect'
import Input from 'components/common/Input'
import Alert from 'components/common/Alert'

interface Props {
  filters: Filters
  error: Filters
  handleSelectChange: (opt: Option, key: string) => void
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => void
  setFilters: (Filters) => void
}

export default function SearchOrdersAdvancedFilters({
  filters,
  error,
  handleSelectChange,
  handleInputChange,
  setFilters
}: Props) {
  const { stateList } = useTrending()
  const [propertyTypes, setPropertyTypes] = useState<Option[]>([])
  const [msas, setMsas] = useState<Option[]>([])
  const [clients, setClients] = useState<Option[]>([])
  const [products, setProducts] = useState<Option[]>([])
  const [departments, setDepartments] = useState<Option[]>([])
  const [orderedByUsers, setOrderedByUsers] = useState<Option[]>([])
  const [rivStatuses, setRivStatuses] = useState<Option[]>([])
  const [reconcileStatuses, setReconcileStatuses] = useState<Option[]>([])
  const [pools, setPools] = useState<Option[]>([])
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const geAllOptions = async () => {
      try {
        const initialFilter = { ...filters }
        const resultArray = await Promise.all([
          await getPropertyTypes(),
          await getClientList(),
          await getProducts(),
          await getDepartments(),
          await getOrderedByUsers(),
          await getRivStatuses(),
          await getReconcileStatuses(),
          await getPools()
        ])

        resultArray.forEach((option, index) => {
          if (index === 2) {
            initialFilter.products = option[0]
          } else if (index === 3) {
            initialFilter.department = option[0]
          } else if (index === 4) {
            initialFilter.orderedBy = option[0]
          } else if (index === 5) {
            initialFilter.rivStatus = option[0]
          } else if (index === 6) {
            initialFilter.reconcileStatus = option[0]
          }
        })
        setPropertyTypes(resultArray[0])
        setClients(resultArray[1])
        setProducts(resultArray[2])
        setDepartments(resultArray[3])
        setOrderedByUsers(resultArray[4])
        setRivStatuses(resultArray[5])
        setReconcileStatuses(resultArray[6])
        setPools(resultArray[7])
        setFilters(initialFilter)
        setAlert(null)
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    geAllOptions()
  }, [])

  useEffect(() => {
    if (filters.state) {
      const getMsaOptions = async () => {
        const options = await getMsas(filters.state.value)
        setMsas(options)
      }
      getMsaOptions()
    }
  }, [filters.state])

  return (
    <div className="advanced-filters-container">
      <Input
        value={filters.city}
        label="City"
        onChange={e => handleInputChange(e, 'city')}
        error={error.city}
      />
      <CustomSelect
        value={filters.state}
        label="State"
        placeholder="State"
        onChange={opt => handleSelectChange(opt, 'state')}
        options={stateList}
        classNamePrefix="transparent"
        id="AF-select-state"
      />
      <CustomSelect
        value={filters.propertyType}
        label="Property Type"
        placeholder="Property Type"
        onChange={opt => handleSelectChange(opt, 'propertyType')}
        options={propertyTypes}
        classNamePrefix="transparent"
        id="AF-select-property-type"
      />
      <CustomSelect
        value={filters.msa}
        label="MSA"
        placeholder="MSA"
        onChange={opt => handleSelectChange(opt, 'msa')}
        options={msas}
        classNamePrefix="transparent"
        disabled={!filters.state}
        id="AF-select-msa"
      />
      <CustomSelect
        value={filters.client}
        label="Client"
        placeholder="Client"
        onChange={opt => handleSelectChange(opt, 'client')}
        options={clients}
        classNamePrefix="transparent"
        id="AF-select-client"
      />
      <Input
        value={filters.baseClient}
        label="Base Client"
        onChange={e => handleInputChange(e, 'baseClient')}
        error={error.baseClient}
      />
      <Input
        value={filters.completeDateFrom}
        label="Complete Date From"
        onChange={e => handleInputChange(e, 'completeDateFrom')}
        error={error.completeDateFrom}
      />
      <Input
        value={filters.completeDateTo}
        label="Complete Date To"
        onChange={e => handleInputChange(e, 'completeDateTo')}
        error={error.completeDateTo}
      />
      <CustomSelect
        value={filters.products}
        label="Products"
        placeholder="Products"
        onChange={opt => handleSelectChange(opt, 'products')}
        options={products}
        classNamePrefix="transparent"
        id="AF-select-products"
      />
      <CustomSelect
        value={filters.department}
        label="Department"
        placeholder="Department"
        onChange={opt => handleSelectChange(opt, 'department')}
        options={departments}
        classNamePrefix="transparent"
        id="AF-select-department"
      />
      <CustomSelect
        value={filters.orderedBy}
        label="Ordered By"
        placeholder="Ordered By"
        onChange={opt => handleSelectChange(opt, 'orderedBy')}
        options={orderedByUsers}
        classNamePrefix="transparent"
        id="AF-select-orderedBy"
      />
      <CustomSelect
        value={filters.rivStatus}
        label="Radian Interactive Value Status"
        placeholder="RIV Status"
        onChange={opt => handleSelectChange(opt, 'rivStatus')}
        options={rivStatuses}
        classNamePrefix="transparent"
        id="AF-select-rivStatus"
      />
      <div className="full-width-row">
        <CustomSelect
          value={filters.reconcileStatus}
          label="Reconcile Status"
          placeholder="Reconcile Status"
          onChange={opt => handleSelectChange(opt, 'reconcileStatus')}
          options={reconcileStatuses}
          classNamePrefix="transparent"
          className="reconcile-status"
          id="AF-select-reconcileStatus"
        />
        <CustomSelect
          value={filters.selectedPools}
          label="Selected Pools"
          placeholder="Select Pools"
          onChange={opt => handleSelectChange(opt, 'selectedPools')}
          classNamePrefix="transparent"
          isMulti
          options={pools}
          className="select-pools"
          id="AF-select-pools"
        />
      </div>
      {alert && <Alert type={alert.type} message={alert.message} />}
    </div>
  )
}
