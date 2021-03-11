import React, { useState } from 'react'
import FileUploader from 'components/common/FileUploader'
import { uploadBulkOrder, IGreenForm } from 'api'
import Alert from 'components/common/Alert'
interface Props {
  greenForm: IGreenForm
}

export default function BulkOrder({ greenForm }: Props) {
  const [file, setFile] = useState(null)
  const [alert, setAlert] = useState(null)

  const submitFile = async () => {
    try {
      const message = await uploadBulkOrder(file, greenForm)
      setAlert({ type: 'success', message })
    } catch (error) {
      setAlert({ type: 'error', message: error.message })
    }
  }

  return (
    <div>
      <div className="mb-4">
        <span>Upload Order File (XLS)</span>
        <a
          className="link ml-4"
          target="_blank"
          href={`${process.env.baseUrl}/AVE_Order_Template.xls`}
        >
          Order Template
        </a>
      </div>
      <FileUploader
        handleFile={e => setFile(e)}
        selectedFile={file}
        accept={'.xls, .xlsx'}
      />
      <button className="btn mt-10" onClick={submitFile} disabled={!file}>
        Submit
      </button>
      <div className="mt-4">
        {alert && <Alert type={alert.type} message={alert.message} />}
      </div>
    </div>
  )
}
