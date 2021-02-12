import { useState } from 'react'
import { validateForm } from 'utils'
import FileUploader from 'components/common/FileUploader'
import Input from 'components/common/Input'
import Modal from 'components/common/Modal'
import Form from 'components/common/Form'
import { uploadAdditionalDocuments } from 'api'

interface Props {
  closeModal: () => void
}

const defaultState = {
  filename: '',
  file: null
}

export default function AdditionalDocuments({ closeModal }: Props) {
  const [form, setForm] = useState({ ...defaultState })
  const [alert, setAlert] = useState(null)
  const [error, setError] = useState({
    ...defaultState
  })

  const handleInput = (e: any, key: string) => {
    if (error[key]) {
      setError({ ...error, [key]: '' })
    }
    if (key === 'filename') {
      setForm({ ...form, [key]: e.target.value })
    } else {
      setForm({ ...form, [key]: e })
    }
  }

  const onUpload = async () => {
    const errorCopy = { ...defaultState }
    const errorObj = validateForm(form)
    const errorArr = Object.keys(errorObj)
    if (errorArr.length) {
      errorArr.forEach(key => {
        errorCopy[key] = errorObj[key]
      })
    } else {
      try {
        setAlert(null)
        const response = await uploadAdditionalDocuments(form)
        if (response) {
          setAlert({
            type: 'success',
            message: response
          })
        }
      } catch (e) {
        setAlert({ type: 'error', message: e.message })
      }
    }
    setError(errorCopy)
  }

  return (
    <Modal width={800} closeModal={closeModal} title="">
      <Form id="additional-documents" alert={alert} onSubmit={onUpload}>
        <div className="additional-documents">
          <h2>File Upload</h2>
          <Input
            onChange={e => handleInput(e, 'filename')}
            value={form.filename}
            error={error.filename}
            label="Friendly Name..."
          />
          <FileUploader
            handleFile={e => handleInput(e, 'file')}
            selectedFile={form.file}
            accept={'.xls, .xlsx, .pdf, .jpeg, .png, .gif'}
          />
          <div className="attachment-requirements">
            <h4>Attachment Requirements:</h4>
            <p>*Must be PDF, XLS, XLSX, JPEG, PNG, or GIF</p>
          </div>
          <button className="btn" disabled={!form.file} type="submit">
            Upload
          </button>
        </div>
      </Form>
    </Modal>
  )
}
