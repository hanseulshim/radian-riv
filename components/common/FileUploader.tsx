import React, { useRef } from 'react'

interface Props {
  handleFile: (e) => void
  selectedFile: File
  accept?: string
}

export default function FileUploader({
  handleFile,
  selectedFile,
  accept
}: Props) {
  const hiddenFileInput = useRef(null)

  const handleClick = event => {
    hiddenFileInput.current.click()
  }

  const handleChange = event => {
    const fileUploaded = event.target.files[0]
    handleFile(fileUploaded)
  }
  return (
    <div className="custom-file-uploader">
      <button className="btn btn-small" onClick={handleClick} type="button">
        Choose File...
      </button>
      <span>{selectedFile ? selectedFile.name : 'No file chosen'}</span>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
        accept={accept}
      />
    </div>
  )
}
