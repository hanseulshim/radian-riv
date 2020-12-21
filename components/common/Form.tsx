import * as React from 'react'
import Alert from 'components/common/Alert'

type Props = {
  id: string
  children: React.ReactNode
  onSubmit: () => Promise<void>
  alert: {
    type: string
    message: string
  }
}

export default function Form({ children, id, onSubmit, alert }: Props) {
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit()
  }
  return (
    <form id={id} onSubmit={handleForm}>
      {children}
      {alert && <Alert type={alert.type} message={alert.message} />}
    </form>
  )
}
