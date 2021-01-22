import React from 'react'
interface Props {
  type: string
  message: string
}
export default function Alert({ type, message }: Props) {
  return (
    <div className={`alert alert-${type === 'error' ? 'danger' : 'success'}`}>
      <pre>{message}</pre>
    </div>
  )
}
