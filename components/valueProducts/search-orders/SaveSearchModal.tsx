import React, { useState, useEffect } from 'react'
import { ISearchOrderFilters, saveSearch } from 'api'
import Modal from 'components/common/Modal'
import Input from 'components/common/Input'
import Radio from 'components/common/Radio'

interface Props {
  closeModal: () => void
  savedSearches: ISearchOrderFilters[]
  filters: ISearchOrderFilters
  setSavedSearches: React.Dispatch<React.SetStateAction<ISearchOrderFilters[]>>
}

export default function SaveSearchModal({
  closeModal,
  savedSearches,
  filters,
  setSavedSearches
}: Props) {
  const [selectedSearch, setSelectedSearch] = useState(null)
  const [searchList, setSearchList] = useState<ISearchOrderFilters[]>([])
  const [searchListError, setSearchListError] = useState([])

  useEffect(() => {
    const arr = savedSearches.slice()
    arr.push({
      ...filters,
      name: ''
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

  const submitSearch = async () => {
    if (searchList.length - 1 !== savedSearches.length) {
      const arr = searchList.slice()
      arr.pop()
      setSavedSearches(arr)
      await saveSearch(arr)
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
      arr[selectedSearch] = { ...filters }
      setSavedSearches(arr)
      await saveSearch(arr)
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
      <div className="flex flex-col w-full">
        <div className="bg-prussian-blue text-white py-4 px-8">Search Name</div>
        {searchList.map((search, index) => (
          <div className="flex px-4" key={index}>
            <div
              className={`flex flex-1 items-center${
                selectedSearch === index ? '' : ' opacity-50'
              }${index === searchList.length - 1 ? ' mr-8' : ''}`}
              onClick={() => setSelectedSearch(index)}
            >
              <div className="mt-4">
                <Radio
                  onChange={() => {}}
                  value=""
                  checked={selectedSearch === index}
                  label={''}
                />
              </div>
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
                className="ml-4"
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
      <button className="btn" onClick={submitSearch} id="save-search">
        Save
      </button>
      <button className="btn btn-link" onClick={closeModal}>
        Cancel
      </button>
    </Modal>
  )
}
