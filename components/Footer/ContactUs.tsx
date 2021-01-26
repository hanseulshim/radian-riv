import React, { useState } from 'react'
import Input from 'components/common/Input'
import Modal from 'components/common/Modal'
import Form from 'components/common/Form'
import { validateEmail } from 'utils'

interface Props {
  closeModal: () => void
}

export default function ContactUs({ closeModal }: Props) {
  const toEmail = 'vow@redbellre.com'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [address, setAddress] = useState('')
  const [comment, setComment] = useState('')
  const [emailError, setEmailError] = useState('')
  const [alert, setAlert] = useState(null)
  const submitForm = async () => {
    setAlert(null)
    const error = validateEmail(email)
    if (error) {
      setEmailError(error)
    } else {
      setAlert({ type: 'success', message: 'Email Sent' })
      const a = document.createElement('a')
      a.href = `mailto:${toEmail}?subject=${subject}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AProperty Address: ${address}%0D%0AComment: ${comment}`
      a.click()
    }
  }
  return (
    <Modal closeModal={closeModal} title={'Contact Us'} width={800}>
      <Form id="contact-us" onSubmit={submitForm} alert={alert}>
        <Input
          label="To"
          value={toEmail}
          error={''}
          onChange={() => {}}
          disabled
        />
        <div className="form-row">
          <div className="form-spacer">
            <Input
              label="Name"
              value={name}
              error={''}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="form-spacer">
            <Input
              label="Email"
              value={email}
              error={emailError}
              onChange={e => {
                setEmail(e.target.value)
                setEmailError('')
              }}
            />
          </div>
        </div>
        <Input
          label="Subject"
          value={subject}
          error={''}
          onChange={e => setSubject(e.target.value)}
        />
        <Input
          label="Property Address"
          value={address}
          error={''}
          onChange={e => setAddress(e.target.value)}
        />
        <textarea
          placeholder="Comment Field..."
          onChange={e => setComment(e.target.value)}
          value={comment}
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </Form>
    </Modal>
  )
}
