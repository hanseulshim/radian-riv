import React, { useState, useEffect, useCallback } from 'react'
import {
  getSingleOrderPropertiesTable,
  SingleOrderForm,
  NewOrderSuggestionsInterface
} from 'api'
import { useTrending } from 'context/TrendingProvider'
import Table from 'components/common/Table'

interface Props {
  form: SingleOrderForm
  setForm: (e: any) => void
}

export default function Suggestions({ form, setForm }: Props) {
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
        'mlsNumber',
        'address',
        'city',
        'state',
        'zip',
        'bed',
        'bath',
        'sqft',
        'garage',
        'lotSize',
        'year'
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
      zip,
      address,
      city,
      state,
      bed,
      bath,
      sqft,
      garage,
      lotSize,
      year
    } = row
    const stateMatch = stateList.find(stateObj => stateObj.value === state)

    setForm({
      ...form,
      zip,
      address,
      city,
      state: stateMatch,
      bed,
      bath,
      sqft,
      garage,
      lotSize,
      year
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
