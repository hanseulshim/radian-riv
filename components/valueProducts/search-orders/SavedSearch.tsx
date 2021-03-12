import React, { useEffect, useState } from 'react'
import SaveSearchModal from './SaveSearchModal'
import { ISearchOrderFilters, getSavedSearches } from 'api'

interface Props {
  setFilters: React.Dispatch<React.SetStateAction<ISearchOrderFilters>>
  filters: ISearchOrderFilters
}

export default function SavedSearch({ setFilters, filters }: Props) {
  const [savedSearches, setSavedSearches] = useState<ISearchOrderFilters[]>([])
  const [showMenu, setShowMenu] = useState(false)
  const [showSaveSearch, setSaveSearch] = useState(false)
  useEffect(() => {
    const savedSearch = async () => {
      const searches = await getSavedSearches()
      setSavedSearches(searches)
    }
    savedSearch()
  }, [])

  return (
    <div className="flex my-4 space-x-4">
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
            {savedSearches.map(filter => (
              <li
                key={filter.name}
                onClick={() => {
                  console.log(filter)
                  setFilters(filter)
                  setShowMenu(false)
                }}
              >
                {filter.name}
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
