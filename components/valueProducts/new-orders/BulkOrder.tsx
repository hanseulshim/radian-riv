import React, { useState } from 'react'
import FileUploader from 'components/common/FileUploader'
import { SingleOrderForm } from 'api'

interface Props {
  form: SingleOrderForm
  setForm: (e: any) => void
  onSubmit: () => void
}

export default function BulkOrder({ form, setForm, onSubmit }: Props) {
  return (
    <div className="bulk-order">
      <span>Comment</span>
      <textarea
        onChange={e => setForm({ ...form, comment: e.target.value })}
        value={form.comment}
        className="outline-black focus:outline-black "
      />
      <div className="upload-row">
        <span>Upload Order File (XLS)</span>
        <a
          className="link"
          target="_blank"
          href={`${process.env.baseUrl}/BulkOrder.pdf`}
        >
          Order Template
        </a>
      </div>
      <FileUploader
        handleFile={e => setForm({ ...form, file: e })}
        selectedFile={form.file}
        accept={'.xls, .xlsx'}
      />
      <button
        className="btn submit"
        type="submit"
        onClick={onSubmit}
        disabled={!form.file}
      >
        Submit
      </button>
    </div>
  )
}
