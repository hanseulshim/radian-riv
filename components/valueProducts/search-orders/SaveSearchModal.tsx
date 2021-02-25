import React, { useState, useEffect } from 'react'
import { Filters, Search, saveSavedSearches } from 'api'
import Modal from 'components/common/Modal'
import Input from 'components/common/Input'
import Radio from 'components/common/Radio'

interface Props {
  closeModal: () => void
  savedSearches: Search[]
  filters: Filters
  setSavedSearches: React.Dispatch<React.SetStateAction<Search[]>>
}

export default function SaveSearchModal({
  closeModal,
  savedSearches,
  filters,
  setSavedSearches
}: Props) {
  const [selectedSearch, setSelectedSearch] = useState(null)
  const [searchList, setSearchList] = useState<Search[]>([])
  const [searchListError, setSearchListError] = useState([])

  useEffect(() => {
    const arr = savedSearches.slice()
    arr.push({
      name: '',
      filters
    })
    setSearchList(arr)
    setSearchListError(arr.map(() => ''))
    setSelectedSearch(arr.length - 1)
  }, [])

  const handleSearchInput = (name: string, index: number) => {
    const arr = searchList.slice()
    arr[index].name = name
    setSearchList(arr)
    setSearchListError(arr.map(() => ''))
  }

  const saveSearch = async () => {
    if (searchList.length - 1 !== savedSearches.length) {
      const arr = searchList.slice()
      arr.pop()
      setSavedSearches(arr)
      await saveSavedSearches(arr)
      closeModal()
      return
    }
    const selected = searchList[selectedSearch]
    const errorArr = searchListError.slice()
    const duplicateName = searchList.find(
      (search, index) =>
        search.name === selected.name && index !== selectedSearch
    )
    if (selected.name === '') {
      errorArr[selectedSearch] = 'Search name cannot be blank'
      setSearchListError(errorArr)
    } else if (duplicateName) {
      errorArr[selectedSearch] = 'This name already exists'
      setSearchListError(errorArr)
    } else {
      const arr = searchList.slice()
      if (selectedSearch !== searchList.length - 1) {
        arr.pop()
      }
      arr[selectedSearch].filters = filters
      setSavedSearches(arr)
      await saveSavedSearches(arr)
      closeModal()
    }
  }

  return (
    <Modal
      closeModal={closeModal}
      title={''}
      id="save-search-modal"
      width={600}
    >
      <h2>Save Search</h2>
      <div className="search-container">
        <div className="search-name">Search Name</div>
        {searchList.map((search, index) => (
          <div className="row" key={index}>
            <div
              className={`radio-input${
                selectedSearch === index ? '' : ' inactive'
              }${index === searchList.length - 1 ? ' short' : ''}`}
              onClick={() => setSelectedSearch(index)}
            >
              <Radio
                onChange={() => {}}
                value=""
                checked={selectedSearch === index}
                label={''}
              />
              <Input
                value={search.name}
                label={index === searchList.length - 1 ? 'Search Name' : ''}
                onChange={e => {
                  handleSearchInput(e.target.value, index)
                }}
                error={searchListError[index]}
              />
            </div>
            {index !== searchList.length - 1 && (
              <img
                className="icon"
                src={`${process.env.baseUrl}/images/icon_x_circle_fill.svg`}
                onClick={() => {
                  const arr = searchList.slice()
                  arr.splice(index, 1)
                  setSelectedSearch(arr.length - 1)
                  setSearchListError(arr.map(() => ''))
                  setSearchList(arr)
                }}
              />
            )}
          </div>
        ))}
      </div>
      <button className="btn" onClick={saveSearch} id="save-search">
        Save
      </button>
      <button className="btn btn-link" onClick={closeModal}>
        Cancel
      </button>
    </Modal>
  )
}
