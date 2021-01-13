import { useState } from 'react'
import Input from 'components/common/Input'
import Modal from 'components/common/Modal'
import Form from 'components/common/Form'
import { useAuth } from 'components/auth/AuthProvider'

interface Props {
  closeModal: () => void
}

export default function WebsiteSupport({ closeModal }: Props) {
  const {
    auth: { user }
  } = useAuth()
  const toEmail = 'vow@redbellre.com'
  const [subject, setSubject] = useState('')
  const [issue, setIssue] = useState('')
  const [alert, setAlert] = useState(null)
  const submitForm = async () => {
    setAlert(null)
    setAlert({ type: 'success', message: 'Email Sent' })
    const a = document.createElement('a')
    a.href = `mailto:${toEmail}?subject=${subject}&body=Name: ${name}%0D%0AEmail: ${user.email}%0D%0AIssue: ${issue}`
    a.click()
  }
  return (
    <Modal closeModal={closeModal} title={'Website Support'} width={800}>
      <div style={{ marginBottom: '1em' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '1em' }}>
          NOTE: This page is for reporting technical problems only.
        </div>
        <div>
          If you are having business related issues (such as problems with work
          assigments, training on use of website, etc.) please contact your
          supervisor directly instead of using this form. The technical support
          team is unable to help with business/training related issues.
        </div>
      </div>
      <Form id="reset-password" onSubmit={submitForm} alert={alert}>
        <Input
          label="To"
          value={toEmail}
          error={''}
          onChange={() => {}}
          disabled
        />
        <Input
          label="From"
          value={user.email}
          error={''}
          onChange={() => {}}
          disabled
        />
        <Input
          label="Subject"
          value={subject}
          error={''}
          onChange={e => setSubject(e.target.value)}
        />
        <textarea
          placeholder="Please describe the technical problem you are having and the page where you are experiencing the issue:"
          onChange={e => setIssue(e.target.value)}
          value={issue}
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </Form>
    </Modal>
  )
}
