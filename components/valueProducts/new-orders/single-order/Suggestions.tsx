import React, { useState, useEffect, useCallback, memo } from 'react'
import {
  getSingleOrderPropertiesTable,
  ISingleOrderForm,
  NewOrderSuggestionsInterface,
  Option
} from 'api'
import { useTrending } from 'context/TrendingProvider'
import Table from 'components/common/Table'

interface Props {
  form: ISingleOrderForm
  setForm: (e: any) => void
  setSelectedState: React.Dispatch<React.SetStateAction<Option>>
}

function Suggestions({ form, setForm, setSelectedState }: Props) {
  const { stateList } = useTrending()
  const [suggestions, setSuggestions] = useState<
    NewOrderSuggestionsInterface[]
  >([])
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const getSuggestions = async () => {
      const data = await getSingleOrderPropertiesTable(form)
      setSuggestions(data)
    }
    getSuggestions()
  }, [form])

  const fetchData = useCallback(async () => {
    const tableData = suggestions
    if (tableData.length) {
      const cols = [
        'mlsListNo',
        'address',
        'city',
        'state',
        'zip',
        'bed',
        'bath',
        'sqft',
        'garage',
        'lotSize',
        'yrBuilt'
      ]
      const tableColumns = cols.map(key => ({
        Header: key.charAt(0).toUpperCase() + key.slice(1),
        accessor: key
      }))
      setColumns(tableColumns)
    }
  }, [form])

  const handleRowClick = (row: NewOrderSuggestionsInterface) => {
    const {
      mlsListNo,
      zip,
      address,
      city,
      state,
      bed,
      bath,
      sqft,
      garage,
      lotSize,
      yrBuilt
    } = row
    const stateMatch = stateList.find(stateObj => stateObj.value === state)
    setSelectedState(stateMatch)

    setForm({
      ...form,
      mlsListNo,
      zip,
      address,
      city,
      bed,
      bath,
      sqft,
      garage,
      lotSize,
      yrBuilt
    })
  }

  if (!suggestions.length) {
    return null
  }

  return (
    <div className="suggestions-container">
      <h2>Results</h2>
      <Table
        columns={columns}
        data={suggestions}
        fetchData={fetchData}
        width={1200}
        highlightHoveredRow
        handleRowClick={handleRowClick}
      />
    </div>
  )
}

export default memo(Suggestions)
