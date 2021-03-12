import { useEffect, useState } from 'react'
import {
  Option,
  getSearchOrderOptions,
  ISearchOrderOptions,
  ISearchOrderFilters,
  getMsas
} from 'api'
import { useTrending } from 'context/TrendingProvider'
import CustomSelect from 'components/common/CustomSelect'
import Input from 'components/common/Input'
import Alert from 'components/common/Alert'

interface Props {
  advancedFilters: boolean
  setFilters: React.Dispatch<React.SetStateAction<ISearchOrderFilters>>
  filters: ISearchOrderFilters
  error: ISearchOrderFilters
  handleSelectChange: (opt: Option, key: string) => void
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => void
  handleMultiSelect: (arr: Option[], key: string) => void
}

export default function SearchOrdersAdvancedFilters({
  filters,
  error,
  handleSelectChange,
  handleInputChange,
  advancedFilters,
  setFilters,
  handleMultiSelect
}: Props) {
  // All of the option lists for the dropdowns...
  const { stateList } = useTrending()
  const [
    searchOrderOptions,
    setSearchOrderOptions
  ] = useState<ISearchOrderOptions>({
    propertyTypes: [],
    clients: [],
    productTypes: [],
    departments: [],
    orderedByUsers: [],
    statuses: [],
    reconcileStatuses: [],
    pools: []
  })
  const [msaOptions, setMsaOptions] = useState([])
  const [selectedState, setSelectedState] = useState(null)
  const [propertyType, setPropertyType] = useState(null)
  const [msa, setMsa] = useState(null)
  const [clients, setClients] = useState([])
  const [product, setProduct] = useState(null)
  const [department, setDepartment] = useState(null)
  const [orderByIdUser, setOrderByIdUser] = useState(null)
  const [status, setStatus] = useState(null)
  const [reconcileStatus, setReconcileStatus] = useState(null)
  const [pools, setPools] = useState([])
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const geAllOptions = async () => {
      try {
        const initialFilter = { ...filters }
        const optionsObj = await getSearchOrderOptions()
        setSearchOrderOptions(optionsObj)
        // Default product
        if (optionsObj.productTypes.length) {
          setProduct(optionsObj.productTypes[0])
          initialFilter.productId = optionsObj.productTypes[0].value as string
        }

        // Default department
        if (optionsObj.departments.length) {
          setDepartment(optionsObj.departments[0])
          initialFilter.departmentId = optionsObj.departments[0].value as string
        }

        // Default orderByUser
        if (optionsObj.orderedByUsers.length) {
          setOrderByIdUser(optionsObj.orderedByUsers[0])
          initialFilter.orderByIdUser = optionsObj.orderedByUsers[0]
            .value as string
        }

        // Default RIV status
        if (optionsObj.statuses.length) {
          setStatus(optionsObj.statuses[0])
          initialFilter.status = optionsObj.statuses[0].value as string
        }

        // Default reconcile status
        if (optionsObj.reconcileStatuses.length) {
          setReconcileStatus(optionsObj.reconcileStatuses[0])
          initialFilter.reconcileStatusId = optionsObj.reconcileStatuses[0]
            .value as string
        }

        setFilters(initialFilter)
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    geAllOptions()
  }, [])

  useEffect(() => {
    const stateMatch = stateList.find(state => state.value === filters.state)
    if (stateMatch) {
      setSelectedState(stateMatch)
    } else {
      setSelectedState(null)
    }

    const propTypeMatch = searchOrderOptions.propertyTypes.find(
      opt => opt.value === filters.propertyTypeId
    )
    if (propTypeMatch) {
      setPropertyType(propTypeMatch)
    } else {
      setPropertyType(null)
    }

    const msaMatch = msaOptions.find(opt => opt.value === filters.msaId)
    if (msaMatch) {
      setMsa(msaMatch)
    } else {
      setMsa(null)
    }

    const clientMatches = searchOrderOptions.clients.filter(opt =>
      filters.clientIds.includes(opt.value as string)
    )
    if (clientMatches.length) {
      setClients(clientMatches)
    } else {
      setClients([])
    }

    const productMatch = searchOrderOptions.productTypes.find(
      opt => opt.value === filters.productId
    )
    if (productMatch) {
      setProduct(productMatch)
    } else {
      setProduct(null)
    }

    const departmentMatch = searchOrderOptions.departments.find(
      opt => opt.value === filters.departmentId
    )
    if (departmentMatch) {
      setDepartment(departmentMatch)
    } else {
      setDepartment(null)
    }

    const userMatch = searchOrderOptions.orderedByUsers.find(
      opt => opt.value === filters.orderByIdUser
    )
    if (userMatch) {
      setOrderByIdUser(userMatch)
    } else {
      setOrderByIdUser(null)
    }

    const statusMatch = searchOrderOptions.statuses.find(
      opt => opt.value === filters.status
    )
    if (statusMatch) {
      setStatus(statusMatch)
    } else {
      setStatus(null)
    }

    const reconcileMatch = searchOrderOptions.reconcileStatuses.find(
      opt => opt.value === filters.reconcileStatusId
    )
    if (reconcileMatch) {
      setReconcileStatus(reconcileMatch)
    } else {
      setReconcileStatus(null)
    }

    const poolMatches = searchOrderOptions.pools.filter(opt =>
      filters.poolIds.includes(opt.value as string)
    )
    if (poolMatches) {
      setPools(poolMatches)
    } else {
      setPools([])
    }
  }, [
    filters.state,
    filters.propertyTypeId,
    filters.msaId,
    filters.clientIds,
    filters.productId,
    filters.departmentId,
    filters.orderByIdUser,
    filters.status,
    filters.reconcileStatusId,
    filters.poolIds
  ])

  useEffect(() => {
    if (selectedState) {
      const getMsaOptions = async () => {
        const options = await getMsas(selectedState.value)
        setMsaOptions(options)
      }
      getMsaOptions()
    }
  }, [selectedState])

  if (!advancedFilters) {
    return null
  }

  return (
    <div className="bg-light-gray p-4 py-8 -mx-4 transparent advanced-filters">
      <div className="flex space-x-4 w-3/4">
        <Input
          value={filters.city}
          label="City"
          onChange={e => handleInputChange(e, 'city')}
          error={error.city}
        />
        <CustomSelect
          value={selectedState}
          label="State"
          placeholder="State"
          onChange={opt => {
            handleSelectChange(opt.value, 'state')
            setSelectedState(opt)
          }}
          options={stateList}
          classNamePrefix="transparent"
          id="AF-select-state"
        />
        <CustomSelect
          value={propertyType}
          label="Property Type"
          placeholder="Property Type"
          onChange={opt => {
            handleSelectChange(opt.value, 'propertyTypeId')
            setPropertyType(opt)
          }}
          options={searchOrderOptions.propertyTypes}
          classNamePrefix="transparent"
          id="AF-select-property-type"
        />
      </div>
      <div className="flex space-x-4 w-3/4">
        <CustomSelect
          value={msa}
          label="MSA"
          placeholder="MSA"
          onChange={opt => {
            handleSelectChange(opt.value, 'msaId')
            setMsa(opt)
          }}
          options={msaOptions}
          classNamePrefix="transparent"
          disabled={!filters.state}
          id="AF-select-msa"
        />
        <CustomSelect
          value={clients}
          label="Client"
          placeholder="Client"
          onChange={arr => {
            handleMultiSelect(arr as any, 'clientIds')
            setClients(arr as any)
          }}
          options={searchOrderOptions.clients}
          isMulti
          classNamePrefix="transparent"
          id="AF-select-client"
        />
        <Input
          value={'Radian'}
          disabled
          label="Base Client"
          onChange={e => e}
          error={''}
        />
      </div>
      <div className="flex space-x-4 w-3/4">
        <Input
          value={filters.initialCompleteDate}
          label="Complete Date From"
          onChange={e => handleInputChange(e, 'initialCompleteDate')}
          error={error.initialCompleteDate}
        />
        <Input
          value={filters.completeDate}
          label="Complete Date To"
          onChange={e => handleInputChange(e, 'completeDate')}
          error={error.completeDate}
        />
        <CustomSelect
          value={product}
          label="Products"
          placeholder="Products"
          onChange={opt => {
            handleSelectChange(opt.value, 'productId')
            setProduct(opt)
          }}
          options={searchOrderOptions.productTypes}
          classNamePrefix="transparent"
          id="AF-select-products"
        />
      </div>
      <div className="flex space-x-4 w-3/4">
        <CustomSelect
          value={department}
          label="Department"
          placeholder="Department"
          onChange={opt => {
            handleSelectChange(opt.value, 'departmentId')
            setDepartment(opt)
          }}
          options={searchOrderOptions.departments}
          classNamePrefix="transparent"
          id="AF-select-department"
        />
        <CustomSelect
          value={orderByIdUser}
          label="Ordered By"
          placeholder="Ordered By"
          onChange={opt => {
            handleSelectChange(opt.value, 'orderByIdUser')
            setOrderByIdUser(opt)
          }}
          options={searchOrderOptions.orderedByUsers}
          classNamePrefix="transparent"
          id="AF-select-orderByUser"
        />
        <CustomSelect
          value={status}
          label="Radian Interactive Value Status"
          placeholder="RIV Status"
          onChange={opt => {
            handleSelectChange(opt.value, 'status')
            setStatus(opt)
          }}
          options={searchOrderOptions.statuses}
          classNamePrefix="transparent"
          id="AF-select-rivStatus"
        />
      </div>
      <div className="flex w-1/2 space-x-4 mt-8">
        <CustomSelect
          value={reconcileStatus}
          label="Reconcile Status"
          placeholder="Reconcile Status"
          onChange={opt => {
            handleSelectChange(opt.value, 'reconcileStatusId')
            setReconcileStatus(opt)
          }}
          options={searchOrderOptions.reconcileStatuses}
          classNamePrefix="transparent"
          className="reconcile-status"
          id="AF-select-reconcileStatus"
        />
        <CustomSelect
          value={pools}
          label="Selected Pools"
          placeholder="Select Pools"
          onChange={arr => {
            handleMultiSelect(arr as any, 'poolIds')
            setPools(arr as any)
          }}
          classNamePrefix="transparent"
          isMulti
          options={searchOrderOptions.pools}
          className="select-pools"
          id="AF-select-pools"
        />
      </div>
      {alert && <Alert type={alert.type} message={alert.message} />}
    </div>
  )
}
